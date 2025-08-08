import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Bot, Heart } from "lucide-react";

const Productization = () => {
  type Category = { title: string; items: string[] };
  const applications: {
    icon: any;
    title: string;
    description: string;
    categories: Category[];
    contribution: string[];
  }[] = [
    {
      icon: Car,
      title: "Autonomous Driving",
      description:
        "Reinforcement learning powers perception, prediction, and planning for safe, efficient urban mobility in complex, dense cities.",
      categories: [
        {
          title: "Challenges",
          items: [
            "Dense traffic and unpredictable agents",
            "Occlusions, sensor noise, long-tail events",
            "Complex rules and non-stationary contexts",
          ],
        },
        {
          title: "Core Techniques",
          items: [
            "RL planners with safety constraints",
            "Multi-sensor fusion (LiDAR, camera, radar)",
            "V2X-aware intent prediction & coordination",
          ],
        },
        {
          title: "Capabilities",
          items: [
            "Real-time routing, lane selection, merging",
            "Adaptive speed control and gap acceptance",
            "Uncertainty-aware, fail-safe behaviors",
          ],
        },
        {
          title: "Tooling & Evaluation",
          items: [
            "High-fidelity simulation & scenario replay",
            "Reward shaping with safety envelopes",
            "Continuous online/offline learning loops",
          ],
        },
      ],
      contribution: [
        "Urban mobility testbeds and V2X pilots",
        "Scenario libraries from local traffic patterns",
        "Edge deployments with latency-optimized stacks",
        "Public–industry–academia collaboration on safety",
      ],
    },
    {
      icon: Bot,
      title: "Manufacturing Robot Arms",
      description:
        "Robots move beyond brittle, hard-coded motions—learning from demonstrations and feedback to adapt to variation and recover from errors.",
      categories: [
        {
          title: "Why This Matters",
          items: [
            "Replace rigid programs with adaptive skills",
            "Handle part/layout variation in real time",
            "Improve safety, quality, and throughput",
          ],
        },
        {
          title: "Learning Pipeline",
          items: [
            "Vision detection with confidence scoring",
            "Twin‑exoskeleton demonstrations (50+)",
            "Policy fine‑tuning with RL",
          ],
        },
        {
          title: "Capabilities",
          items: [
            "Reliable grasping with error recovery",
            "Adaptive grip and intelligent re‑tries",
            "Generalizes to new lighting/layouts",
          ],
        },
        {
          title: "Operations",
          items: [
            "Fast changeover and flexible cell design",
            "24/7 readiness and monitoring",
            "Scalable to multi‑robot lines",
          ],
        },
      ],
      contribution: [
        "Robotics labs with twin‑exoskeleton teleoperation",
        "Dataset curation and confidence‑driven vision",
        "Rapid end‑effector and fixture prototyping",
        "On‑site trials and changeover playbooks",
      ],
    },
    {
      icon: Heart,
      title: "AI‑Enabled Health Services",
      description:
        "AI augments clinicians in surgery, consultation, and therapy—improving safety and access while keeping experts in the loop.",
      categories: [
        {
          title: "Surgery",
          items: [
            "RL‑assisted motion planning and pathing",
            "Workflow optimization and risk checks",
            "Simulation‑led rehearsal and validation",
          ],
        },
        {
          title: "Consultation",
          items: [
            "Symptom triage via structured forms",
            "LLM‑based decision support",
            "Continual learning with guardrails",
          ],
        },
        {
          title: "Therapy",
          items: [
            "LLM chat guidance under supervision",
            "Personalization from longitudinal data",
            "Safety filters and escalation paths",
          ],
        },
        {
          title: "Safeguards",
          items: [
            "Privacy‑preserving, on‑device learning",
            "Auditability and human‑in‑the‑loop",
            "Regulatory‑aligned evaluation",
          ],
        },
      ],
      contribution: [
        "Partnerships with clinics for de‑identified datasets",
        "Privacy‑first RL+LLM frameworks for triage",
        "Simulation labs for surgical planning validation",
        "Governance patterns for clinical oversight",
      ],
    },
  ];

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Real-World Applications
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Real-world applications show how reinforcement learning delivers practical impact across mobility, manufacturing, and health.</p>
      </header>

      <div className="space-y-10">
        {applications.map((app, index) => {
          const Icon = app.icon;
          return (
            <article key={index}>
              <Card className="p-8 bg-surface border border-border hover:shadow-elevated transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{app.title}</h3>
                    <p className="text-muted-foreground">{app.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {app.categories.map((cat, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background/60 p-4">
                      <h4 className="text-sm font-semibold text-foreground tracking-wide mb-3">
                        {cat.title}
                      </h4>
                      <ul className="space-y-2">
                        {cat.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                      How Hong Kong Productivity Council can contribute
                    </Badge>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {app.contribution.map((c, k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Productization;