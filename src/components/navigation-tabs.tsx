import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Target, Video, GamepadIcon, Building2, Network, Users, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const tabs: Tab[] = [
  { id: "video", label: "Video Analysis", icon: Video },
  { id: "color", label: "Color Scheme Prediction", icon: Palette },
  { id: "community", label: "Community", icon: Users },
  { id: "neural", label: "Neural Network", icon: Network },
  { id: "product", label: "Real-World Applications", icon: Building2 },
];

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  return (
    <div className="bg-surface border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-surface/80">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "cyber" : "outline"}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  isActive && "scale-105"
                )}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;