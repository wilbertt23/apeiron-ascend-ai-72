import { useState } from "react";
import HeroSection from "@/components/hero-section";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import ReinforcementLearning from "@/components/sections/reinforcement-learning";
import VideoAnalysis from "@/components/sections/video-analysis";
import GameIDAnalysis from "@/components/sections/gameid-analysis";
import ColorSchemePrediction from "@/components/sections/color-scheme-prediction";
import Productization from "@/components/sections/productization";
import NeuralNetwork from "@/components/sections/neural-network";
import Community from "@/components/sections/community";
import ProjectGoals from "@/components/sections/project-goals";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar onNavigate={scrollToSection} />
        
        <div className="flex-1 flex flex-col">
          {/* Header with menu trigger */}
          <header className="h-16 flex items-center border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <h1 className="ml-4 text-lg font-semibold">Apeiron</h1>
          </header>

          <div className="flex-1">
            <HeroSection />
            <main className="space-y-0">
              <div id="project-goals"><ProjectGoals /></div>
              <div id="reinforcement"><ReinforcementLearning /></div>
              <div id="video"><VideoAnalysis /></div>
              <div id="gameid"><GameIDAnalysis /></div>
              <div id="color"><ColorSchemePrediction /></div>
              <div id="product"><Productization /></div>
              <div id="neural"><NeuralNetwork /></div>
              <div id="community"><Community /></div>
            </main>
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

export default Index;
