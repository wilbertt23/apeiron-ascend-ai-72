import CommunitySection from "@/components/sections/community";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Community = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <h1 className="ml-4 text-lg font-semibold">Community</h1>
          </header>
          
          <div className="flex-1">
            <CommunitySection />
          </div>
        </div>
        
        {/* Back to top button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full bg-cyber-cyan hover:bg-cyber-cyan/80 text-black shadow-lg hover:shadow-glow-cyan transition-all duration-300"
          >
            <ArrowUp size={20} />
          </Button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Community;