import NeuralNetworkSection from "@/components/sections/neural-network";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const NeuralNetwork = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <h1 className="ml-4 text-lg font-semibold">Neural Network</h1>
          </header>
          
          <div className="flex-1">
            <NeuralNetworkSection />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NeuralNetwork;