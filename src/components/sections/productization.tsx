import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Bot, Heart } from "lucide-react";

const Productization = () => {
  const applications = [
    {
      icon: Car,
      title: "Autonomous Driving",
      description: "HKPC-led smart mobility research applies reinforcement learning (RL) to deliver safer, more efficient autonomous navigation in dense, dynamic cities.",
      features: [
        "RL route planning with real-time traffic context",
        "Sensor fusion perception (LiDAR, camera, radar)",
        "V2X-ready decision making and coordination",
        "Edge compute for sub-100ms control loops",
        "Safety validation with high-fidelity simulation"
      ],
      benefits: [
        "30% reduced travel time",
        "99.9% critical-event avoidance (sim)",
        "20% energy savings",
        "100ms planning latency"
      ],
      color: "cyber-cyan"
    },
    {
      icon: Bot,
      title: "Manufacturing Robot Arms",
      description: "HKPC's Robotics and AI Dept. uses RL to make robot arms truly adaptive—combining vision and human-in-the-loop demos (twin exoskeleton) to generalize tasks like plate picking.",
      features: [
        "Vision part detection with confidence scoring",
        "Twin-exoskeleton teleoperation for demos",
        "Policy learning from 50+ human examples",
        "Adaptive grip, error recovery, re-tries",
        "Generalizes to new layouts and lighting"
      ],
      benefits: [
        "40% fewer defects in assembly",
        "30% faster cycle times",
        "20% less downtime at changeover",
        "24/7 operation readiness"
      ],
      color: "cyber-blue"
    },
    {
      icon: Heart,
      title: "AI-Enabled Health Services",
      description: "Applying RL and LLMs to surgery, consultation, and therapy to improve safety, efficiency, and access while keeping clinicians in the loop.",
      features: [
        "RL-assisted surgical motion planning",
        "Diagnostic decision support from patterns",
        "Adaptive triage via UX forms/questionnaires",
        "Privacy-preserving on-device learning",
        "Continuous improvement with oversight"
      ],
      benefits: [
        "25% shorter consult time targets",
        "15-30% better triage accuracy",
        "60% faster pre-op planning",
        "10-15% lower readmissions"
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
                  <h4 className="text-lg font-semibold text-foreground mb-6">Impact & Benefits</h4>
                  <div className="space-y-4">
                    {app.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="p-6 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-primary min-w-fit">
                            {benefit.split(' ')[0]}
                          </div>
                          <div className="text-base text-foreground font-medium">
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
      <Card className="p-8 mt-12 bg-surface border border-border">
        <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">Technology Foundation</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary">Reinforcement Learning</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Adaptive decision-making algorithms</li>
              <li>• Continuous learning from experience</li>
              <li>• Multi-agent coordination systems</li>
              <li>• Reward optimization strategies</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary">Real-Time Data Analysis</h4>
            <ul className="space-y-2 text-muted-foreground">
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