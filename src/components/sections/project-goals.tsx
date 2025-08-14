import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, Shield, Gamepad2, BarChart3 } from "lucide-react";

const ProjectGoals = () => {
  const goals = [
    {
      icon: Shield,
      title: "Adaptable Data Pipeline",
      description: "Develop a data pipeline which can be quickly and easily adapted to provide solutions for problems in other domains.",
      color: "cyber-cyan",
      
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Implement comprehensive data analytics to track player performance and provide actionable insights for improvement.",
      color: "cyber-blue",
      
    },
    {
      icon: Users,
      title: "Enhanced Player Experience",
      description: "Create a more engaging gaming environment where players can learn, improve, and enjoy competitive gameplay.",
      color: "cyber-purple",
      
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Enable AI systems to continuously learn and adapt from new gameplay data and player interactions.",
      color: "cyber-pink",
      
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
                </div>
              </div>
            </Card>
          );
        })}
      </div>

    </section>
  );
};

export default ProjectGoals;