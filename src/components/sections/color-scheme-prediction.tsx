import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Target, Shield, Zap } from "lucide-react";

const ColorSchemePrediction = () => {
  const [gameId, setGameId] = useState("");
  const [prediction, setPrediction] = useState<{
    color: string;
    style: string;
    confidence: number;
    rgb: { r: number; g: number; b: number };
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePlaystyle = () => {
    if (!gameId.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Generate truly random RGB values for different results each time
      const r = Math.floor(Math.random() * 156) + 100; // Random between 100-255
      const g = Math.floor(Math.random() * 156) + 100; // Random between 100-255
      const b = Math.floor(Math.random() * 156) + 100; // Random between 100-255
      
      let style = "Balanced";
      let confidence = Math.floor(Math.random() * 20) + 70; // Random between 70-90
      
      // Determine style based on dominant color
      if (r > g && r > b) {
        style = "Aggressive";
        confidence = Math.round(65 + (r / 255) * 30);
      } else if (g > r && g > b) {
        style = "Tactical";
        confidence = Math.round(70 + (g / 255) * 25);
      } else if (b > r && b > g) {
        style = "Defensive";
        confidence = Math.round(68 + (b / 255) * 27);
      }
      
      setPrediction({
        color: `rgb(${r}, ${g}, ${b})`,
        style,
        confidence,
        rgb: { r, g, b }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStyleIcon = (style: string) => {
    switch (style) {
      case "Aggressive": return <Target className="text-red-400" size={24} />;
      case "Tactical": return <Zap className="text-green-400" size={24} />;
      case "Defensive": return <Shield className="text-blue-400" size={24} />;
      default: return <Palette className="text-cyber-cyan" size={24} />;
    }
  };

  const getStyleDescription = (style: string) => {
    switch (style) {
      case "Aggressive":
        return "Your playstyle is characterized by bold offensive moves, quick decision-making, and high-risk, high-reward strategies. You tend to take initiative and apply pressure on opponents.";
      case "Tactical":
        return "You demonstrate strategic thinking, calculated moves, and excellent resource management. Your gameplay shows patience and the ability to capitalize on opponent mistakes.";
      case "Defensive":
        return "Your approach emphasizes protection, counter-attacks, and positional advantage. You excel at reading opponent patterns and creating opportunities through defensive play.";
      default:
        return "Your playstyle shows elements of all approaches, adapting your strategy based on the situation and opponent.";
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyber-pink mb-4">Color Scheme Prediction</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover your unique playstyle through color analysis. Enter your Game ID to reveal your gaming personality through RGB color mapping.
        </p>
      </div>

      {/* Input Section */}
      <Card className="p-6 mb-8 bg-surface border border-border max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <Label htmlFor="gameId" className="text-lg font-semibold text-cyber-blue">
              Enter Your Game ID
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Your unique Apeiron player identifier for playstyle analysis
            </p>
            <Input
              id="gameId"
              type="text"
              placeholder="Enter Your Game ID (e.g., Player#1234)"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="text-lg"
            />
          </div>
          <Button 
            onClick={analyzePlaystyle} 
            disabled={!gameId.trim() || isAnalyzing}
            className="w-full text-lg py-6"
            variant="cyber"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyber-cyan"></div>
                Analyzing Playstyle...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Palette size={20} />
                Predict Color Scheme
              </div>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      {prediction && (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Color Visualization */}
          <Card className="p-8 bg-surface border border-border">
            <h3 className="text-2xl font-semibold text-cyber-pink mb-6 text-center">Your Color Profile</h3>
            
            <div className="flex flex-col items-center space-y-6">
              <div 
                className="w-32 h-32 rounded-full border-4 border-border shadow-glow-cyan"
                style={{ backgroundColor: prediction.color }}
              ></div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-cyber-cyan mb-2">{prediction.style}</div>
                <div className="text-lg text-muted-foreground mb-4">
                  Confidence: {prediction.confidence}%
                </div>
                <div className="font-mono text-sm bg-background p-3 rounded border">
                  RGB({prediction.rgb.r}, {prediction.rgb.g}, {prediction.rgb.b})
                </div>
              </div>
            </div>

            {/* RGB Breakdown */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded">
                <div className="flex items-center gap-2">
                  <Target className="text-red-400" size={20} />
                  <span className="font-semibold">Aggressive</span>
                </div>
                <span className="font-mono">{prediction.rgb.r}/255</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                <div className="flex items-center gap-2">
                  <Zap className="text-green-400" size={20} />
                  <span className="font-semibold">Tactical</span>
                </div>
                <span className="font-mono">{prediction.rgb.g}/255</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <div className="flex items-center gap-2">
                  <Shield className="text-blue-400" size={20} />
                  <span className="font-semibold">Defensive</span>
                </div>
                <span className="font-mono">{prediction.rgb.b}/255</span>
              </div>
            </div>
          </Card>

          {/* Analysis Results */}
          <Card className="p-8 bg-surface border border-border">
            <h3 className="text-2xl font-semibold text-cyber-blue mb-6 text-center">Playstyle Analysis</h3>
            
            <div className="flex items-center justify-center mb-6">
              {getStyleIcon(prediction.style)}
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-cyber-cyan mb-3">Dominant Style</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {getStyleDescription(prediction.style)}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-cyber-blue mb-3">Strategic Recommendations</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {prediction.style === "Aggressive" && (
                    <>
                      <li>• Consider incorporating more defensive positioning</li>
                      <li>• Practice patience in resource management</li>
                      <li>• Study counter-attack opportunities</li>
                    </>
                  )}
                  {prediction.style === "Tactical" && (
                    <>
                      <li>• Work on faster decision-making in pressure situations</li>
                      <li>• Practice aggressive opening strategies</li>
                      <li>• Focus on maintaining momentum</li>
                    </>
                  )}
                  {prediction.style === "Defensive" && (
                    <>
                      <li>• Develop more offensive capabilities</li>
                      <li>• Practice initiative-taking strategies</li>
                      <li>• Work on transitioning from defense to offense</li>
                    </>
                  )}
                  {prediction.style === "Balanced" && (
                    <>
                      <li>• Continue developing adaptability</li>
                      <li>• Focus on situational awareness</li>
                      <li>• Master specific style techniques</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded">
                <p className="text-sm text-cyber-blue font-semibold">
                  💡 Pro Tip: Your color profile can change as you develop new strategies and adapt your playstyle!
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* How it Works */}
      <Card className="mt-12 p-8 bg-surface border border-border max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-cyber-pink mb-6 text-center">How Color Prediction Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-red-400" size={24} />
            </div>
            <h4 className="font-semibold text-red-400 mb-2">Red Channel</h4>
            <p className="text-sm text-muted-foreground">
              Represents aggressive tendencies, offensive capabilities, and risk-taking behavior patterns
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-green-400" size={24} />
            </div>
            <h4 className="font-semibold text-green-400 mb-2">Green Channel</h4>
            <p className="text-sm text-muted-foreground">
              Indicates tactical thinking, strategic planning, and calculated decision-making skills
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-blue-400" size={24} />
            </div>
            <h4 className="font-semibold text-blue-400 mb-2">Blue Channel</h4>
            <p className="text-sm text-muted-foreground">
              Reflects defensive capabilities, patience, and positional awareness in gameplay
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ColorSchemePrediction;