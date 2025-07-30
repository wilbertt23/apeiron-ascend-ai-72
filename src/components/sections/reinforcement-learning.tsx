import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Target, RefreshCw, Activity, Zap } from "lucide-react";

const ReinforcementLearning = () => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Reinforcement Learning in Apeiron
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our AI agents learn through advanced reinforcement learning algorithms to become formidable opponents
        </p>
      </div>

      {/* What is RL Section */}
      <Card className="p-8 mb-8 bg-surface border-cyber-cyan/20 hover:shadow-glow-cyan transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30">
            <Brain className="text-cyber-cyan" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-cyber-cyan mb-4">What is Reinforcement Learning?</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Reinforcement Learning (RL) is a machine learning paradigm where an agent learns to make decisions 
              by interacting with an environment. The agent receives rewards or penalties based on its actions, 
              gradually learning optimal strategies through trial and error.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30">
                <Activity className="mr-1" size={12} />
                Trial & Error Learning
              </Badge>
              <Badge variant="secondary" className="bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">
                <Target className="mr-1" size={12} />
                Reward-Based Training
              </Badge>
              <Badge variant="secondary" className="bg-cyber-purple/10 text-cyber-purple border-cyber-purple/30">
                <RefreshCw className="mr-1" size={12} />
                Continuous Improvement
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* How we use RL */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 bg-surface border-cyber-blue/20 hover:shadow-glow-blue transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-cyber-blue" size={24} />
            <h3 className="text-xl font-semibold text-cyber-blue">Agent Training</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Our AI agents are trained in the Apeiron game environment, learning optimal strategies 
            through millions of simulated battles against various opponents.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full"></div>
              Deep Q-Networks (DQN) for decision making
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full"></div>
              Multi-agent training environments
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full"></div>
              Continuous learning from player interactions
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-surface border-cyber-purple/20 hover:shadow-glow-cyan transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-cyber-purple" size={24} />
            <h3 className="text-xl font-semibold text-cyber-purple">Adaptive Difficulty</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            The RL system dynamically adjusts AI difficulty based on player performance, 
            ensuring challenging yet fair gameplay experiences.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyber-purple rounded-full"></div>
              Real-time skill assessment
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyber-purple rounded-full"></div>
              Progressive difficulty scaling
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyber-purple rounded-full"></div>
              Personalized challenge curves
            </li>
          </ul>
        </Card>
      </div>

      {/* Technical Implementation */}
      <Card className="p-8 bg-surface border border-border hover:border-cyber-blue/30 transition-colors duration-300">
        <h3 className="text-2xl font-semibold text-cyber-pink mb-6 text-center">Technical Implementation</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-pink/10 border border-cyber-pink/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyber-pink">1</span>
            </div>
            <h4 className="font-semibold text-cyber-pink mb-2">Environment Setup</h4>
            <p className="text-sm text-muted-foreground">
              Create simulated Apeiron game environments for AI training
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyber-cyan">2</span>
            </div>
            <h4 className="font-semibold text-cyber-cyan mb-2">Neural Networks</h4>
            <p className="text-sm text-muted-foreground">
              Deploy deep neural networks to process game states and actions
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyber-blue">3</span>
            </div>
            <h4 className="font-semibold text-cyber-blue mb-2">Deployment</h4>
            <p className="text-sm text-muted-foreground">
              Integrate trained agents into live gameplay systems
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ReinforcementLearning;