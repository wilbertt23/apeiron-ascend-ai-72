from .encoder_decoder import EncoderDecoder as ActorCritic
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np

# from env_wrapper import PlayerEnv
# ── PPO Agent ─────────────────────────────────────────────────────────────────
class PPOAgent:
    def __init__(self,
                 input_size=1000,
                 n_inputs=6,
                 d_model=128,
                 n_colours=3,
                 lr=3e-7,
                 gamma=0.99,
                 lam=0.95,
                 clip_eps=0.2,
                 epochs=2,
                 batch_size=64,
                 device='cpu'):

        self.device      = device
        self.gamma       = gamma
        self.lam         = lam
        self.clip_eps    = clip_eps
        self.epochs      = epochs
        self.batch_size  = batch_size

        self.ac = ActorCritic(input_size, n_inputs, d_model, n_colours)\
                     .to(device)
        self.opt = torch.optim.Adam(self.ac.parameters(), lr=lr)

        # storage
        self.states = []
        self.actions = []
        self.logps = []
        self.values = []
        self.rewards = []
        self.dones = []

    @torch.no_grad()
    def select_action(self, state):
        s = torch.tensor(state, dtype=torch.float32)\
                 .unsqueeze(0).to(self.device)
        dist, value = self.ac.get_dist(s)
        a = dist.sample()                      # [1,9]
        logp = dist.log_prob(a).sum(1)         # [1]
        a = a.clamp(0,1).cpu().numpy()[0]      # [9]

        # reshape into (3,3)
        a = a.reshape(3,3)
        return a, logp.item(), value.item()

    def store(self, s, a, logp, v, r, d):
        self.states.append(s)
        self.actions.append(a)
        self.logps.append(logp)
        self.values.append(v)
        self.rewards.append(r)
        self.dones.append(d)

    def finish_path(self, last_value=0):
        """
        Compute GAE advs & returns; reset pointers for next batch.
        """
        rewards = np.array(self.rewards + [last_value], dtype=np.float32)
        values  = np.array(self.values + [last_value], dtype=np.float32)
        dones   = np.array(self.dones + [0], dtype=np.float32)

        # GAE‐λ advantage
        deltas = rewards[:-1] + self.gamma * values[1:] * (1 - dones[:-1]) - values[:-1]
        advs = []
        gae = 0
        for d in deltas[::-1]:
            gae = d + self.gamma * self.lam * gae
            advs.append(gae)
        advs = advs[::-1]
        returns = advs + values[:-1]

        # clear
        #self.states.clear()
        #self.actions.clear()
        #self.logps.clear()
        #self.values.clear()
        #self.rewards.clear()
        #self.dones.clear()

        return np.array(advs, dtype=np.float32), np.array(returns, dtype=np.float32)

    def update(self, advs, returns):
        # to‐tensor
        S = torch.tensor(self.states,   dtype=torch.float32).to(self.device)
        A = torch.tensor(self.actions,  dtype=torch.float32).to(self.device)
        old_logps = torch.tensor(self.logps, dtype=torch.float32).to(self.device)
        advs = torch.tensor(advs,       dtype=torch.float32).to(self.device)
        rets = torch.tensor(returns,    dtype=torch.float32).to(self.device)

        N = len(advs)
        inds = np.arange(N)

        for _ in range(self.epochs):
            np.random.shuffle(inds)
            for start in range(0, N, self.batch_size):
                batch = inds[start:start+self.batch_size]
                dist, vals = self.ac.get_dist(S[batch])
                new_logps = dist.log_prob(A[batch].view(len(batch), -1))\
                                  .sum(1)
                ratio = (new_logps - old_logps[batch]).exp()
                # PPO clipped surrogate
                surr1 = ratio * advs[batch]
                surr2 = torch.clamp(ratio, 1-self.clip_eps, 1+self.clip_eps) * advs[batch]
                policy_loss = -torch.min(surr1, surr2).mean()

                value_loss  = F.mse_loss(vals.view(-1), rets[batch])

                prior_mean = torch.full_like(dist.mean, 0.5)
                prior_std = torch.full_like(dist.stddev, 0.1)
                prior_dist = torch.distributions.Normal(prior_mean, prior_std)

                kl_div = torch.distributions.kl_divergence(dist, prior_dist).mean()


                loss = policy_loss + 0.5 * value_loss + 0.2 * kl_div
                self.opt.zero_grad()
                loss.backward()
                self.opt.step()
        self.states, self.actions, self.logps, self.values, self.rewards, self.dones = [], [], [], [], [], []

# ── Training loop ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    env = PlayerEnv(10)
    agent = PPOAgent(input_size=1000,
                     n_inputs=env.observation_space.shape[0],
                     d_model=128,
                     device='cpu')

    max_episodes = 4000
    total_reward = 0
    for ep in range(max_episodes):
        state, _ = env.reset()
        done = False

        while not done:
            action, logp, value = agent.select_action(state)
            next_state, reward, done, _, info = env.step(action)
            agent.store(state, action, logp, value, reward, done)
            state = next_state
            total_reward += reward

        # finish episode
        advs, rets = agent.finish_path(last_value=0)
        agent.update(advs, rets)

        if ep % 50 == 0:
            print(f"Episode {ep:4d}  Av Reward {total_reward/50:.3f}")
            total_reward = 0
            torch.save({
            'actor_critic_state_dict': agent.ac.state_dict(),
            'optimizer_state_dict': agent.opt.state_dict()
        }, 'ppo_model.pt')
