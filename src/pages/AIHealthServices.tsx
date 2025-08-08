import { useEffect } from "react";
import ProductizationSection from "@/components/sections/productization";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
const AIHealthServices = () => {
  useEffect(() => {
    document.title = "Real-World Applications | HKPC Reinforcement Learning";
    const meta =
      (document.querySelector('meta[name="description"]') as HTMLMetaElement | null) ||
      (() => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'description');
        document.head.appendChild(el);
        return el as HTMLMetaElement;
      })();
    meta.setAttribute(
      'content',
      'Explore autonomous driving, manufacturing robot arms, and AI-enabled health services using reinforcement learning at HKPC.'
    );

    const link =
      (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null) ||
      (() => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
        return el as HTMLLinkElement;
      })();
    link.setAttribute('href', window.location.href);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <h1 className="ml-4 text-lg font-semibold">Real-World Applications</h1>
          </header>
          
          <div className="flex-1">
            <ProductizationSection />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default AIHealthServices;