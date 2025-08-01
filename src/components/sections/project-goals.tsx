import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, Shield, Gamepad2, BarChart3 } from "lucide-react";

const ProjectGoals = () => {
  const goals = [
    {
      icon: Shield,
      title: "Skilled AI Opponents",
      description: "Develop AI agents capable of providing challenging 1v1 PvP experiences that match or exceed human player skill levels.",
      color: "cyber-cyan",
      metrics: ["90%+ win rate against novice players", "Adaptive difficulty scaling", "Real-time strategy optimization"]
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Implement comprehensive data analytics to track player performance and provide actionable insights for improvement.",
      color: "cyber-blue",
      metrics: ["Live gameplay analysis", "Performance trend tracking", "Personalized recommendations"]
    },
    {
      icon: Users,
      title: "Enhanced Player Experience",
      description: "Create a more engaging gaming environment where players can learn, improve, and enjoy competitive gameplay.",
      color: "cyber-purple",
      metrics: ["Improved player retention", "Skill progression tracking", "Matchmaking optimization"]
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Enable AI systems to continuously learn and adapt from new gameplay data and player interactions.",
      color: "cyber-pink",
      metrics: ["Self-improving algorithms", "Meta-strategy adaptation", "Performance optimization"]
    }
  ];

  const keyMetrics = [
    { label: "AI Training Iterations", value: "10M+", color: "cyber-cyan" },
    { label: "Player Skill Levels Analyzed", value: "500+", color: "cyber-blue" },
    { label: "Gameplay Sessions Recorded", value: "50K+", color: "cyber-purple" },
    { label: "Success Rate Improvement", value: "85%", color: "cyber-pink" }
  ];

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Project Goals & Objectives
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Our mission is to revolutionize competitive gaming through intelligent AI and comprehensive analytics
        </p>
      </div>


      {/* Main Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          return (
            <Card key={index} className={`p-4 sm:p-6 bg-surface border-${goal.color}/20 hover:shadow-glow-${goal.color.split('-')[1]} transition-all duration-300`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-${goal.color}/10 border border-${goal.color}/30`}>
                  <Icon className={`text-${goal.color}`} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg sm:text-xl font-semibold text-${goal.color} mb-3`}>
                    {goal.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {goal.description}
                  </p>
                  <div className="space-y-2">
                    {goal.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 bg-${goal.color} rounded-full`}></div>
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Implementation Timeline */}
      <Card className="p-8 bg-gradient-hero border-border">
        <h3 className="text-2xl font-semibold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Implementation Roadmap
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyber-cyan/20 border-2 border-cyber-cyan flex items-center justify-center">
              <span className="text-sm font-bold text-cyber-cyan">Q1</span>
            </div>
            <h4 className="font-semibold text-cyber-cyan mb-2">Foundation</h4>
            <p className="text-sm text-muted-foreground">
              Setup training infrastructure and initial AI models
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyber-blue/20 border-2 border-cyber-blue flex items-center justify-center">
              <span className="text-sm font-bold text-cyber-blue">Q2</span>
            </div>
            <h4 className="font-semibold text-cyber-blue mb-2">Training</h4>
            <p className="text-sm text-muted-foreground">
              Intensive AI training and performance optimization
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyber-purple/20 border-2 border-cyber-purple flex items-center justify-center">
              <span className="text-sm font-bold text-cyber-purple">Q3</span>
            </div>
            <h4 className="font-semibold text-cyber-purple mb-2">Analytics</h4>
            <p className="text-sm text-muted-foreground">
              Deploy real-time analytics and insights system
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyber-pink/20 border-2 border-cyber-pink flex items-center justify-center">
              <span className="text-sm font-bold text-cyber-pink">Q4</span>
            </div>
            <h4 className="font-semibold text-cyber-pink mb-2">Launch</h4>
            <p className="text-sm text-muted-foreground">
              Full production deployment and user onboarding
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ProjectGoals;