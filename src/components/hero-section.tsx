import { Button } from "@/components/ui/button";
import { Brain, Cpu, Target, TrendingUp, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyber-cyan rounded-full animate-pulse-glow"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyber-blue rounded-full animate-pulse-glow delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-cyber-purple rounded-full animate-pulse-glow delay-2000"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-cyber-pink rounded-full animate-pulse-glow delay-500"></div>
        
        {/* Floating icons */}
        <div className="absolute top-32 right-20 text-cyber-cyan/30 animate-float">
          <Brain size={24} />
        </div>
        <div className="absolute bottom-40 right-60 text-cyber-blue/30 animate-float delay-1000">
          <Cpu size={20} />
        </div>
        <div className="absolute top-1/2 left-20 text-cyber-purple/30 animate-float delay-2000">
          <Zap size={18} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <div className="mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/46c67aa7-aec7-4cf9-93cf-917b36815584.png" 
              alt="Apeiron Logo" 
              className="h-28 md:h-36 w-auto animate-glow"
            />
          </div>
          <div className="text-xl md:text-2xl text-cyber-cyan font-semibold mb-4">
            Apeiron: Ascend the Godiverse
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience personalized gameplay enhancement through advanced reinforcement learning 
            and real-time analytics to elevate your journey through the Godiverse.
          </p>
        </div>


        {/* Feature highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-xl bg-surface border border-border hover:shadow-glow-cyan transition-all duration-300 hover:scale-105">
            <Brain className="mx-auto mb-4 text-cyber-cyan" size={32} />
            <h3 className="text-lg font-semibold mb-2 text-cyber-cyan">Smart AI Training</h3>
            <p className="text-sm text-muted-foreground">
              Advanced reinforcement learning algorithms that adapt and improve
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-surface border border-border hover:shadow-glow-blue transition-all duration-300 hover:scale-105">
            <TrendingUp className="mx-auto mb-4 text-cyber-blue" size={32} />
            <h3 className="text-lg font-semibold mb-2 text-cyber-blue">Real-time Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Live data analysis and personalized gaming insights
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-surface border border-border hover:shadow-glow-cyan transition-all duration-300 hover:scale-105">
            <Zap className="mx-auto mb-4 text-cyber-purple" size={32} />
            <h3 className="text-lg font-semibold mb-2 text-cyber-purple">Performance Boost</h3>
            <p className="text-sm text-muted-foreground">
              Actionable suggestions to enhance your gameplay
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
            About Us
          </h2>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Step into a realm where gods clash and destinies are shaped. We are a team of AI and ML Researchers who are passionate about empowering players like you to rise as true Godlings in Apeiron.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6">
              In the boundless expanse of the Godiverse, every battle is a chance to prove your might. With real-time analytics, we offer tailored tips to sharpen your tactics, helping you conquer even the toughest foes. Whether you're forging alliances or battling for supremacy, we're here to make every moment in Apeiron a step toward greatness. Join us and shape your legacy!
            </p>
          </div>
        </div>

        {/* Project Goals Section */}
        <div className="pt-16 border-t border-border">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Project Goals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-surface border border-border h-full flex flex-col">
              <Target className="mb-4 text-cyber-cyan" size={28} />
              <h3 className="text-lg font-semibold mb-2 text-cyber-cyan">Enhanced Gaming Experience</h3>
              <p className="text-sm text-muted-foreground flex-1">
                Provide personalized AI coaching and real-time performance optimization for Apeiron players
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-surface border border-border h-full flex flex-col">
              <Brain className="mb-4 text-cyber-blue" size={28} />
              <h3 className="text-lg font-semibold mb-2 text-cyber-blue">Advanced AI Development</h3>
              <p className="text-sm text-muted-foreground flex-1">
                Create sophisticated reinforcement learning models that adapt to individual playstyles
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-surface border border-border h-full flex flex-col">
              <TrendingUp className="mb-4 text-cyber-purple" size={28} />
              <h3 className="text-lg font-semibold mb-2 text-cyber-purple">Data-Driven Insights</h3>
              <p className="text-sm text-muted-foreground flex-1">
                Deliver comprehensive analytics and strategic recommendations through advanced data analysis
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border h-full flex flex-col">
              <Zap className="mb-4 text-cyber-pink" size={28} />
              <h3 className="text-lg font-semibold mb-2 text-cyber-pink">Community Empowerment</h3>
              <p className="text-sm text-muted-foreground flex-1">
                Democratize AI-powered gaming tools for the broader gaming community and enable widespread adoption
              </p>
            </div>
          </div>
          <div className="mt-16"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;