import { useEffect, useMemo } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, Award, Star, Lock } from "lucide-react";

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: React.ComponentType<any>;
}

const Achievements = () => {
  useEffect(() => {
    document.title = "Achievements – Community";

    const metaDesc = document.querySelector('meta[name="description"]');
    const content =
      "Browse your Steam-style achievements. Unlocked achievements glow; locked ones are dimmed until you earn them.";
    if (metaDesc) metaDesc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = window.location.href;
    else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    }
  }, []);

  const achievements: AchievementItem[] = useMemo(
    () => [
      { id: "first-visit", title: "First Visit", description: "Open the app for the first time.", unlocked: true, icon: Star },
      { id: "community-starter", title: "Community Starter", description: "View the Community page.", unlocked: true, icon: Award },
      { id: "color-curious", title: "Color Curious", description: "Try the Color Scheme Prediction tool.", unlocked: false, icon: Trophy },
      { id: "video-analyst", title: "Video Analyst", description: "Analyze a video clip.", unlocked: false, icon: Trophy },
      { id: "neural-novice", title: "Neural Novice", description: "Visit the Neural Network page.", unlocked: true, icon: Star },
      { id: "goal-getter", title: "Goal Getter", description: "Read the Project Goals.", unlocked: true, icon: Award },
      { id: "streak-3", title: "3-Day Streak", description: "Open the app three days in a row.", unlocked: false, icon: Trophy },
      { id: "helper", title: "Helper", description: "Engage with a community post.", unlocked: false, icon: Award },
      { id: "explorer", title: "Explorer", description: "Visit every main section.", unlocked: false, icon: Star },
    ],
    []
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <h1 className="ml-4 text-lg font-semibold">Achievements</h1>
          </header>

          <main className="flex-1">
            <section className="max-w-6xl mx-auto px-6 py-10">
              <header className="text-center mb-8 animate-fade-in">
                <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Your Achievements
                </h2>
                <p className="text-muted-foreground mt-2">
                  Steam-style grid: unlocked shine, locked stay subdued until earned.
                </p>
              </header>

              <TooltipProvider>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((a) => {
                    const Icon = a.icon;
                    return (
                      <Tooltip key={a.id}>
                        <TooltipTrigger asChild>
                          <div
                            role="button"
                            aria-pressed={a.unlocked}
                            className={
                              `aspect-square rounded-xl border transition-all hover-scale animate-fade-in ` +
                              (a.unlocked
                                ? "bg-card border-border ring-1 ring-primary/30 shadow-md"
                                : "bg-muted border-border opacity-80")
                            }
                          >
                            <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
                              <div className={a.unlocked ? "text-primary" : "text-muted-foreground"}>
                                <Icon size={40} />
                              </div>
                              <h3 className="mt-4 text-lg font-semibold text-foreground">
                                {a.title}
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                                {a.description}
                              </p>
                              {!a.unlocked && (
                                <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                                  <Lock size={16} />
                                  <span className="text-xs">Locked</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-center">
                          {a.unlocked ? "Unlocked" : "Unlock this by exploring the app."}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Achievements;
