import { useState } from "react";
import HeroSection from "@/components/hero-section";
import NavigationTabs from "@/components/navigation-tabs";
import ReinforcementLearning from "@/components/sections/reinforcement-learning";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import VideoAnalysis from "@/components/sections/video-analysis";
import GameIDAnalysis from "@/components/sections/gameid-analysis";
import ColorSchemePrediction from "@/components/sections/color-scheme-prediction";
import Productization from "@/components/sections/productization";
import NeuralNetwork from "@/components/sections/neural-network";
import Community from "@/components/sections/community";

const Index = () => {
  const [activeTab, setActiveTab] = useState("reinforcement");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case "reinforcement":
        return <ReinforcementLearning />;
      case "video":
        return <VideoAnalysis />;
      case "gameid":
        return <GameIDAnalysis />;
      case "color":
        return <ColorSchemePrediction />;
      case "product":
        return <Productization />;
      case "neural":
        return <NeuralNetwork />;
      case "community":
        return <Community />;
      default:
        return <ReinforcementLearning />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="pt-8">
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <main>
        {renderActiveSection()}
      </main>
      
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
  );
};

export default Index;
