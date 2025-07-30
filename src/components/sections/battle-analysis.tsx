import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const BattleAnalysis = () => {
  const [battleCode, setBattleCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [realtimeData, setRealtimeData] = useState({
    currentHp: 85,
    enemyHp: 72,
    mana: 65,
    position: "Mid Lane",
    lastAction: "Skill Cast"
  });

  // Generate random skill data for different results each time
  const generateRandomSkillData = () => {
    const skills = ["Off", "Def", "Man", "Ski", "Tac", "Pos"];
    const fullNames = ["Offense", "Defense", "Mana Management", "Skill Usage", "Tactics", "Positioning"];
    return skills.map((skill, index) => ({
      name: skill,
      value: Math.floor(Math.random() * 40) + 60, // Random value between 60-100
      fullName: fullNames[index]
    }));
  };

  // Mock skill data for hexagon chart
  const skillData = analysisComplete ? generateRandomSkillData() : [
    { name: "Off", value: 0, fullName: "Offense" },
    { name: "Def", value: 0, fullName: "Defense" },
    { name: "Man", value: 0, fullName: "Mana Management" },
    { name: "Ski", value: 0, fullName: "Skill Usage" },
    { name: "Tac", value: 0, fullName: "Tactics" },
    { name: "Pos", value: 0, fullName: "Positioning" }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const Hexagon = ({ data }: { data: any[] }) => {
    const size = 200;
    const center = size / 2;
    const radius = 70;
    
    // Calculate hexagon points
    const points = data.map((_, i) => {
      const angle = (i * 2 * Math.PI / 6) - Math.PI / 2;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle)
      };
    });

    // Calculate data points
    const dataPoints = data.map((item, i) => {
      const angle = (i * 2 * Math.PI / 6) - Math.PI / 2;
      const dataRadius = (item.value / 100) * radius;
      return {
        x: center + dataRadius * Math.cos(angle),
        y: center + dataRadius * Math.sin(angle)
      };
    });

    return (
      <div className="relative">
        <svg width={size} height={size} className="mx-auto">
          {/* Hexagon outline */}
          <polygon
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((scale, i) => (
            <polygon
              key={i}
              points={points.map(p => {
                const scaledX = center + (p.x - center) * scale;
                const scaledY = center + (p.y - center) * scale;
                return `${scaledX},${scaledY}`;
              }).join(' ')}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
          
          {/* Data area */}
          <polygon
            points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
            fill="hsl(var(--primary))"
            fillOpacity="0.2"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {dataPoints.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--primary))"
            />
          ))}
          
          {/* Labels */}
          {points.map((point, i) => (
            <text
              key={i}
              x={point.x + (point.x - center) * 0.3}
              y={point.y + (point.y - center) * 0.3}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-current"
            >
              {data[i].name}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">Battle Analysis</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Enter your battle code for real-time analysis and comprehensive performance insights during live matches.
        </p>
      </div>

      {/* Battle Code Input */}
      <Card className="p-6 mb-8 bg-surface border border-border">
        <div className="max-w-md mx-auto space-y-4">
          <div>
            <Label htmlFor="battle-code" className="text-base font-medium">
              Battle Code
            </Label>
            <Input
              id="battle-code"
              placeholder="Enter your battle code (e.g., BT-2024-001)"
              value={battleCode}
              onChange={(e) => setBattleCode(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={!battleCode || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing Battle..." : "Start Real-Time Analysis"}
          </Button>
        </div>
      </Card>

      {/* Real-time Status */}
      {isAnalyzing && (
        <Card className="p-6 mb-8 bg-surface border border-border">
          <h3 className="text-xl font-semibold text-primary mb-4 text-center">Real-Time Battle Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{realtimeData.currentHp}%</div>
              <div className="text-sm text-muted-foreground">Your HP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{realtimeData.enemyHp}%</div>
              <div className="text-sm text-muted-foreground">Enemy HP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{realtimeData.mana}%</div>
              <div className="text-sm text-muted-foreground">Mana</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{realtimeData.position}</div>
              <div className="text-sm text-muted-foreground">Position</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{realtimeData.lastAction}</div>
              <div className="text-sm text-muted-foreground">Last Action</div>
            </div>
          </div>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisComplete && (
        <div className="space-y-8">
          {/* Skill Analysis */}
          <Card className="p-8 bg-surface border border-border">
            <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Battle Performance Analysis</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Hexagon Chart */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-center">Skill Hexagon</h4>
                <Hexagon data={skillData} />
              </div>

              {/* Bar Chart */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-center">Detailed Breakdown</h4>
                <div className="space-y-3">
                  {skillData.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.fullName}</span>
                        <span className="text-sm text-muted-foreground">{skill.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-surface border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-2">127</div>
              <div className="text-sm text-muted-foreground">Actions/Minute</div>
            </Card>
            <Card className="p-6 bg-surface border border-border text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Battle Accuracy</div>
            </Card>
            <Card className="p-6 bg-surface border border-border text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">15:32</div>
              <div className="text-sm text-muted-foreground">Battle Duration</div>
            </Card>
          </div>

          {/* AI Suggestions */}
          <Card className="p-6 bg-surface border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">AI Coaching Suggestions</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Tactics</Badge>
                <p className="text-sm text-muted-foreground">
                  Focus on team coordination during mid-game. Your individual skill is strong but team engagement could improve.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Positioning</Badge>
                <p className="text-sm text-muted-foreground">
                  Maintain safer distance during team fights. You're taking unnecessary damage in 32% of engagements.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Defense</Badge>
                <p className="text-sm text-muted-foreground">
                  Work on defensive positioning. Consider building more defensive items in the early game.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BattleAnalysis;