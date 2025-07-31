import { Brain, Target, Video, GamepadIcon, Building2, Network, Users, Palette } from "lucide-react";
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
  { id: "reinforcement", label: "Reinforcement Learning", icon: Brain },
  { id: "video", label: "Video Analysis", icon: Video },
  { id: "gameid", label: "Game ID Analysis", icon: GamepadIcon }, 
  { id: "color", label: "Color Scheme Prediction", icon: Palette },
  { id: "product", label: "Productization", icon: Building2 },
  { id: "neural", label: "Neural Network", icon: Network },
  { id: "community", label: "Community", icon: Users },
];

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <SidebarMenuItem key={tab.id}>
                    <SidebarMenuButton
                      onClick={() => onTabChange(tab.id)}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        isActive 
                          ? "bg-primary/20 text-primary border-l-2 border-primary" 
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
                      {!collapsed && (
                        <span className={isActive ? "text-primary font-medium" : "text-foreground"}>
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