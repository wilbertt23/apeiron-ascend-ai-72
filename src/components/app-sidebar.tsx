import { Brain, Target, Video, GamepadIcon, Building2, Network, Users, Palette, Lightbulb } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const tabs: Tab[] = [
  { id: "project-goals", label: "Project Goals", icon: Lightbulb },
  { id: "reinforcement", label: "Reinforcement Learning", icon: Brain },
  { id: "video", label: "Video Analysis", icon: Video },
  { id: "gameid", label: "Game ID Analysis", icon: GamepadIcon }, 
  { id: "color", label: "Color Scheme Prediction", icon: Palette },
  { id: "product", label: "AI Health Services", icon: Building2 },
  { id: "neural", label: "Neural Network", icon: Network },
  { id: "community", label: "Community", icon: Users },
];

interface AppSidebarProps {
  onNavigate: (sectionId: string) => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} lg:${collapsed ? "w-14" : "w-64"} md:${collapsed ? "w-14" : "w-56"} sm:${collapsed ? "w-12" : "w-52"}`} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                
                return (
                  <SidebarMenuItem key={tab.id}>
                    <SidebarMenuButton
                      onClick={() => onNavigate(tab.id)}
                      className="flex items-center gap-3 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      <Icon size={20} className="text-muted-foreground hover:text-primary" />
                      {!collapsed && (
                        <span className="text-foreground hover:text-primary text-sm">
                          {tab.label}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}