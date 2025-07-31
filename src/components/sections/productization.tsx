import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Bot, Heart } from "lucide-react";

const Productization = () => {
  const applications = [
    {
      icon: Car,
      title: "Autonomous Driving",
      description: "Advanced reinforcement learning for self-driving vehicles with real-time decision making",
      features: [
        "Dynamic route optimization",
        "Real-time obstacle detection", 
        "Adaptive traffic response",
        "Emergency scenario handling",
        "Multi-vehicle coordination"
      ],
      benefits: [
        "99.9% safety accuracy",
        "30% reduced travel time",
        "Zero-emission optimization",
        "Predictive maintenance"
      ],
      color: "cyber-cyan"
    },
    {
      icon: Bot,
      title: "Manufacturing Robot Arms",
      description: "Intelligent robotic systems with adaptive learning capabilities for precision manufacturing",
      features: [
        "Precision assembly operations",
        "Quality control automation",
        "Adaptive grip strength",
        "Real-time error correction",
        "Multi-task coordination"
      ],
      benefits: [
        "95% efficiency improvement",
        "Zero-defect manufacturing",
        "24/7 autonomous operation",
        "Predictive maintenance"
      ],
      color: "cyber-blue"
    },
    {
      icon: Heart,
      title: "AI-Enabled Health Services",
      description: "Advanced healthcare AI systems leveraging machine learning for personalized treatment and predictive diagnostics",
      features: [
        "Medical imaging analysis with 98% accuracy",
        "Predictive disease modeling",
        "Personalized treatment optimization",
        "Real-time patient monitoring",
        "Drug discovery acceleration"
      ],
      benefits: [
        "50% faster diagnosis",
        "35% reduced treatment costs", 
        "90% early detection rate",
        "24/7 continuous monitoring"
      ],
      color: "cyber-purple"
    }
  ];

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Real-World Applications
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Leveraging reinforcement learning and real-time data analysis across critical industries
        </p>
      </div>

      {/* Core Applications */}
      <div className="space-y-8">
        {applications.map((app, index) => {
          const Icon = app.icon;
          return (
            <Card key={index} className="p-8 bg-surface border border-border hover:shadow-elevated transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Side - Overview */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                      <Icon className="text-primary" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {app.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {app.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {app.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Benefits */}
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Impact & Benefits</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {app.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary mb-1">
                            {benefit.split(' ')[0]}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {benefit.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Technology Foundation */}
      <Card className="p-8 mt-12 bg-gradient-primary">
        <h3 className="text-2xl font-semibold text-center mb-8 text-background">Technology Foundation</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-background">Reinforcement Learning</h4>
            <ul className="space-y-2 text-background/90">
              <li>• Adaptive decision-making algorithms</li>
              <li>• Continuous learning from experience</li>
              <li>• Multi-agent coordination systems</li>
              <li>• Reward optimization strategies</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-background">Real-Time Data Analysis</h4>
            <ul className="space-y-2 text-background/90">
              <li>• Sub-millisecond response times</li>
              <li>• High-frequency data processing</li>
              <li>• Predictive analytics integration</li>
              <li>• Edge computing optimization</li>
            </ul>
          </div>
        </div>
      </Card>

    </section>
  );
};

export default Productization;