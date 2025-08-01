import { Brain, Target, Video, GamepadIcon, Building2, Network, Users, Palette, Lightbulb } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
  path: string;
}

const tabs: Tab[] = [
  { id: "project-goals", label: "Project Goals", icon: Lightbulb, path: "/project-goals" },
  { id: "reinforcement", label: "Reinforcement Learning", icon: Brain, path: "/reinforcement" },
  { id: "video", label: "Video Analysis", icon: Video, path: "/video" },
  { id: "gameid", label: "Game ID Analysis", icon: GamepadIcon, path: "/gameid" }, 
  { id: "color", label: "Color Scheme Prediction", icon: Palette, path: "/color" },
  { id: "product", label: "AI Health Services", icon: Building2, path: "/product" },
  { id: "neural", label: "Neural Network", icon: Network, path: "/neural" },
  { id: "community", label: "Community", icon: Users, path: "/community" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar 
      className={`${collapsed ? "w-14" : "w-64"} lg:${collapsed ? "w-14" : "w-64"} md:${collapsed ? "w-14" : "w-56"} sm:${collapsed ? "w-12" : "w-52"}`} 
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = location.pathname === tab.path;
                
                return (
                  <SidebarMenuItem key={tab.id}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={tab.path}
                        className={`flex items-center gap-3 transition-all duration-300 hover:bg-primary/10 hover:text-primary ${
                          isActive ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <Icon size={20} className={`${isActive ? "text-primary" : "text-muted-foreground"} hover:text-primary`} />
                        <span className={`text-sm ${isActive ? "text-primary font-medium" : "text-foreground"} hover:text-primary`}>
                          {tab.label}
                        </span>
                      </Link>
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