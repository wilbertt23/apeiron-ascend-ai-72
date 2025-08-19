import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectGoals from "./pages/ProjectGoals";
import ReinforcementLearning from "./pages/ReinforcementLearning";
import VideoAnalysis from "./pages/VideoAnalysis";
import GameIDAnalysis from "./pages/GameIDAnalysis";
import AIHealthServices from "./pages/AIHealthServices";
import NeuralNetwork from "./pages/NeuralNetwork";
import Community from "./pages/Community";
import Achievements from "./pages/Achievements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project-goals" element={<ProjectGoals />} />
          <Route path="/reinforcement" element={<ReinforcementLearning />} />
          <Route path="/video" element={<VideoAnalysis />} />
          <Route path="/gameid" element={<GameIDAnalysis />} />
          <Route path="/product" element={<AIHealthServices />} />
          <Route path="/neural" element={<NeuralNetwork />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/achievements" element={<Achievements />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
