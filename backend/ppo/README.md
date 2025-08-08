README

To use:
1) Copy files into the working directory
2) At the top of the file in which you're using the model write:
from ppo import PPOAgent
3) To then load the model write:
agent = PPOAgent(input_size=1000,
                     n_inputs=6,
                     d_model=128,
                     device='cpu')
                     
checkpoint = torch.load_state_dict('ppo_model.pt', map_location='cpu')

agent.ac.load_state_dict(checkpoint['actor_critic_state_dict'])
agent.opt.load_state_dict(checkpoint['optimizer_state_dict'])

4) then to use call agent.select_action(character_data).
   this gives out 3 colours. Take the first one for now for the glow effect. The later colours can be 
   used if we find other uses for them.
   
   make sure character_data is a 1d array with stats from 0-1. This array should be normalised using the 
   following function before inputted into the model:
   
   def normalise_state(state, exponent=10):
        if len(state) != 6:
            raise ValueError("State must be of length 6.")
        state = np.array(state, dtype=np.float32)
        state = state ** self.exponent
        state = state / np.sum(self.state)
        return state
