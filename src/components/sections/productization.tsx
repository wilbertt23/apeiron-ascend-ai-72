import { Card } from "@/components/ui/card";

import { Car, Bot, Heart } from "lucide-react";

const Productization = () => {
  type Category = { title: string; items: string[] };
  const applications: {
    icon: any;
    title: string;
    description: string;
    categories: Category[];
  }[] = [
    {
      icon: Car,
      title: "Autonomous Driving",
      description:
        "Reinforcement learning and real-time analytics work together to perceive, plan, and act safely in complex urban environments.",
      categories: [
        {
          title: "Object Detection",
          items: [
            "Algorithms process multi‑sensor data to identify pedestrians, vehicles, and obstacles.",
            "RL dynamically ranks nearby threats based on proximity and vehicle speed.",
            "Supports deployment in dense cities like Hong Kong.",
          ],
        },
        {
          title: "Pathing",
          items: [
            "Real-time analytics adjusts routes using live traffic, road conditions, and construction updates.",
            "RL learns optimal steering for complex patterns like roundabouts and merges.",
            "Predictive analytics forecasts hazards (e.g., a car swerving) to slow down proactively.",
          ],
        },
        {
          title: "Emergency Handling",
          items: [
            "RL trains safe maneuvers such as controlled braking and evasive actions from simulated incidents.",
            "Onboard analytics watches sensor anomalies to trigger failsafes.",
            "Post‑event learning improves future response policies.",
          ],
        },
      ],
    },
    {
      icon: Bot,
      title: "Task‑Specific Robot Arms",
      description:
        "RL‑powered robotic arms streamline repetitive tasks, reduce costs, and shift human labor toward higher‑value roles.",
      categories: [
        {
          title: "Impact",
          items: [
            "Streamlines processes, improving cycle time and quality.",
            "Reduces operational costs and downtime across cells.",
            "Elevates workers into supervision and exception handling.",
          ],
        },
        {
          title: "How It Works",
          items: [
            "Learn‑from‑demonstration initializes skills, then reinforcement learning refines them.",
            "Adapts to part/layout variation and lighting changes in real time.",
            "Recovers from errors with intelligent re‑tries and grip adjustments.",
          ],
        },
      ],
    },
    {
      icon: Heart,
      title: "AI‑Enabled Health Services",
      description:
        "AI augments clinicians across surgery, consultation, and therapy—improving safety, efficiency, and access while keeping experts in the loop.",
      categories: [
        {
          title: "AI‑Assisted Surgery",
          items: [
            "Algorithms analyze historical and intraoperative data to guide clinical actions and strategies.",
            "Automation streamlines workflows and reduces manual effort.",
            "Reinforcement learning and repetition improve system performance over time.",
          ],
        },
        {
          title: "AI‑Assisted Medical Consultation",
          items: [
            "RL improves diagnostic accuracy over time through feedback and outcomes.",
            "Medication suggestions are generated based on patient symptoms and interaction data.",
            "Clinician oversight and safety guardrails maintain accountability.",
          ],
        },
        {
          title: "AI‑Assisted Therapy",
          items: [
            "Large Language Models learn from vast text data to improve language comprehension.",
            "Advanced emotional and linguistic understanding enables more effective guidance.",
            "Personalization from longitudinal data tailors interventions to each patient.",
          ],
        },
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

              </Card>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Productization;