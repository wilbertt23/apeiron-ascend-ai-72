import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Target, Clock, User, Trophy, Calendar, History } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from "recharts";

const GameIDAnalysis = () => {
  const [gameId, setGameId] = useState("");
  const [searching, setSearching] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = () => {
    if (!gameId.trim()) return;
    
    setSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearching(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  // Mock data for visualization
  const performanceData = [
    { date: "Jan 1", score: 7.2, wins: 8, losses: 3 },
    { date: "Jan 8", score: 7.8, wins: 12, losses: 2 },
    { date: "Jan 15", score: 8.1, wins: 15, losses: 1 },
    { date: "Jan 22", score: 8.5, wins: 18, losses: 2 },
    { date: "Jan 29", score: 8.9, wins: 20, losses: 1 }
  ];

  // Generate random skill data for different results each time
  const generateRandomSkillData = () => {
    const skills = ["Off", "Def", "Man", "Ski", "Tac", "Pos"];
    return skills.map(skill => ({
      skill,
      value: Math.floor(Math.random() * 40) + 60, // Random value between 60-100
      fullMark: 100
    }));
  };

  // Hexagon radar data for skills  
  const skillData = analysisComplete ? generateRandomSkillData() : [
    { skill: "Off", value: 0, fullMark: 100 },
    { skill: "Def", value: 0, fullMark: 100 },
    { skill: "Man", value: 0, fullMark: 100 },
    { skill: "Ski", value: 0, fullMark: 100 },
    { skill: "Tac", value: 0, fullMark: 100 },
    { skill: "Pos", value: 0, fullMark: 100 }
  ];

  // Bar chart data
  const barData = [
    { name: "Offense", value: skillData.find(s => s.skill === "Off")?.value || 0 },
    { name: "Defense", value: skillData.find(s => s.skill === "Def")?.value || 0 },
    { name: "Mana Management", value: skillData.find(s => s.skill === "Man")?.value || 0 },
    { name: "Skill Usage", value: skillData.find(s => s.skill === "Ski")?.value || 0 },
    { name: "Tactics", value: skillData.find(s => s.skill === "Tac")?.value || 0 },
    { name: "Positioning", value: skillData.find(s => s.skill === "Pos")?.value || 0 }
  ];

  const playerStats = {
    rank: "#1,247",
    winRate: "78%",
    totalGames: 156,
    averageScore: 78,
    bestStreak: 12,
    playtime: "47h 32m"
  };

  const recentMatches = [
    { date: "2024-01-15", opponent: "EpicGamer42", result: "Victory", duration: "28:34", score: "8.9" },
    { date: "2024-01-14", opponent: "ProPlayer99", result: "Defeat", duration: "31:22", score: "7.2" },
    { date: "2024-01-13", opponent: "SkillMaster", result: "Victory", duration: "25:18", score: "9.1" },
    { date: "2024-01-12", opponent: "Champion123", result: "Victory", duration: "33:45", score: "8.4" },
    { date: "2024-01-11", opponent: "EliteGaming", result: "Defeat", duration: "29:12", score: "6.8" }
  ];

  // Match history data
  const matchHistory = [
    { date: "2024-01-10", opponent: "ProGamer123", result: "Win", score: "8.9", duration: "32m" },
    { date: "2024-01-09", opponent: "SkillMaster", result: "Loss", score: "7.2", duration: "28m" },
    { date: "2024-01-08", opponent: "ElitePlayer", result: "Win", score: "9.1", duration: "35m" },
    { date: "2024-01-07", opponent: "Champion99", result: "Win", score: "8.4", duration: "30m" },
    { date: "2024-01-06", opponent: "ProLegend", result: "Loss", score: "6.8", duration: "25m" }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-cyber-cyan mb-4">Game ID Analysis</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Enter your Game ID to get comprehensive performance analysis, skill breakdowns, and personalized improvement recommendations.
        </p>
        {analysisComplete && (
          <Button
            onClick={() => setShowHistory(!showHistory)}
            variant="outline"
            className="mt-4"
          >
            <History className="mr-2 h-4 w-4" />
            {showHistory ? "Hide" : "View"} Match History
          </Button>
        )}
      </div>

      {!analysisComplete ? (
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <User className="mx-auto mb-4 text-cyber-cyan" size={48} />
              <h3 className="text-2xl font-semibold text-cyber-cyan mb-2">Enter Your Game ID</h3>
              <p className="text-muted-foreground">
                We'll analyze your gameplay history and provide insights
              </p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="gameId" className="text-sm font-medium">Game ID</Label>
              <div className="flex gap-4">
                <Input
                  id="gameId"
                  placeholder="Enter your Game ID (e.g., Player#1234)"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={!gameId.trim() || searching}
                  className="px-8"
                >
                  {searching ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={16} className="mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground text-center">
                Your Game ID can be found in your game profile
              </div>
            </div>

            {/* Features Preview */}
            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="text-lg font-semibold text-center mb-6">Analysis Features</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/20">
                  <TrendingUp className="text-cyber-cyan mb-2" size={20} />
                  <h5 className="font-semibold text-cyber-cyan mb-1">Performance Trends</h5>
                  <p className="text-sm text-muted-foreground">Track your improvement over time</p>
                </div>
                <div className="p-4 rounded-lg bg-cyber-blue/5 border border-cyber-blue/20">
                  <Target className="text-cyber-blue mb-2" size={20} />
                  <h5 className="font-semibold text-cyber-blue mb-1">Skill Pentagon</h5>
                  <p className="text-sm text-muted-foreground">5-point skill analysis breakdown</p>
                </div>
                <div className="p-4 rounded-lg bg-cyber-purple/5 border border-cyber-purple/20">
                  <Trophy className="text-cyber-purple mb-2" size={20} />
                  <h5 className="font-semibold text-cyber-purple mb-1">Match History</h5>
                  <p className="text-sm text-muted-foreground">Detailed game-by-game results</p>
                </div>
                <div className="p-4 rounded-lg bg-cyber-pink/5 border border-cyber-pink/20">
                  <Calendar className="text-cyber-pink mb-2" size={20} />
                  <h5 className="font-semibold text-cyber-pink mb-1">Personalized Tips</h5>
                  <p className="text-sm text-muted-foreground">AI-generated improvement advice</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : showHistory ? (
        /* Match History */
        <Card className="p-6">
          <h3 className="text-2xl font-semibold text-cyber-cyan mb-6 flex items-center gap-2">
            <History size={24} />
            Match Analysis History
          </h3>
          <div className="space-y-4">
            {matchHistory.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">{match.date}</div>
                  <div className="font-medium">vs {match.opponent}</div>
                  <Badge variant={match.result === "Win" ? "default" : "destructive"}>
                    {match.result}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-cyber-cyan font-semibold">Score: {match.score}</div>
                  <div className="text-sm text-muted-foreground">{match.duration}</div>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={() => setShowHistory(false)}
            className="w-full mt-6"
          >
            Back to Latest Analysis
          </Button>
        </Card>
      ) : (
        /* Analysis Results */
        <div className="space-y-8">
          {/* Player Overview */}
          <Card className="p-8 bg-gradient-primary">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-background">Player: {gameId}</h3>
                <Badge variant="secondary" className="mt-2 bg-background text-primary">
                  Competitive Player
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-background">{playerStats.rank}</div>
                <div className="text-sm text-background/80">Global Rank</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-background">{playerStats.winRate}</div>
                <div className="text-sm text-background/80">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-background">{playerStats.totalGames}</div>
                <div className="text-sm text-background/80">Total Games</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-background">{playerStats.averageScore}</div>
                <div className="text-sm text-background/80">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-background">{playerStats.bestStreak}</div>
                <div className="text-sm text-background/80">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-background">{playerStats.playtime}</div>
                <div className="text-sm text-background/80">Playtime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-background">A+</div>
                <div className="text-sm text-background/80">Grade</div>
              </div>
            </div>
          </Card>

          {/* Performance Trend */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Performance Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Skill Analysis */}
          <Card className="p-8 bg-surface border border-border mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Skill Analysis</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Hexagon Chart */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-center">Skill Hexagon</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      domain={[0, 100]} 
                      tick={false} 
                      axisLine={false}
                    />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-center">Detailed Breakdown</h4>
                <div className="space-y-3">
                  {barData.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
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

          {/* Recent Matches */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-cyber-blue mb-4 flex items-center gap-2">
              <Clock size={20} />
              Recent Match History
            </h3>
            <div className="space-y-3">
              {recentMatches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{match.date}</div>
                    <div className="text-sm text-muted-foreground">vs {match.opponent}</div>
                    <Badge variant={match.result === "Victory" ? "default" : "destructive"}>
                      {match.result}
                    </Badge>
                    <div className="text-cyber-cyan font-semibold">Score: {match.score}</div>
                    <div className="text-sm text-muted-foreground">{match.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-8 bg-surface">
            <h3 className="text-2xl font-semibold text-cyber-blue mb-6">Personalized Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/20">
                <h4 className="font-semibold text-cyber-cyan mb-2">Focus on Positioning</h4>
                <p className="text-sm text-muted-foreground">
                  Your positioning score (75%) has room for improvement. Practice map awareness and safe positioning during team fights.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-cyber-blue/5 border border-cyber-blue/20">
                <h4 className="font-semibold text-cyber-blue mb-2">Optimize Play Schedule</h4>
                <p className="text-sm text-muted-foreground">
                  You perform best between 7-9 PM. Schedule competitive matches during these peak hours for better results.
                </p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => setAnalysisComplete(false)}>
              Analyze Another Player
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameIDAnalysis;