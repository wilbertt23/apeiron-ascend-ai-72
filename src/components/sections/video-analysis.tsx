import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Play, CheckCircle, Target, Zap, Clock, TrendingUp, History, X, FileVideo } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadarChart, Radar } from "recharts";
import analyzeMedia from "@/controllers/vila-api";

const VideoAnalysis = () => {
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup video URL on component unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file (MP4, AVI, MOV)');
      return;
    }

    // Validate file size (500MB limit)
    const maxSize = 500 * 1024 * 1024; // 500MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 500MB');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setShowPreview(true);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileSelection(file);
    }
  };

  const handleCancelPreview = () => {
    setShowPreview(false);
    setSelectedFile(null);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalysis = async () => {
    const invokeUrl = "https://ai.api.nvidia.com/v1/vlm/nvidia/vila";
    // const invokeUrl = "/invoke";
    const stream = false;
    const query = 'Describe the scene';
    if (!selectedFile) {
      handleFileInputClick();
      return;
    }
    
    setShowPreview(false);
    setAnalyzing(true);
    // Simulate analysis process
    await analyzeMedia([selectedFile], query);
    setAnalysisComplete(true);
    setAnalyzing(false);
  };

  // Mock analysis results
  const analysisResults = {
    overallScore: "8.7",
    playstyle: "Aggressive Strategist",
    strengths: [
      "Excellent reaction time",
      "Strong positioning",
      "Good resource management"
    ],
    weaknesses: [
      "Tendency to overextend",
      "Inconsistent last-hitting",
      "Map awareness gaps"
    ],
    suggestions: [
      "Practice safe positioning during team fights",
      "Focus on minimap awareness training",
      "Work on farming efficiency in early game"
    ],
    metrics: {
      apm: 285,
      accuracy: 78,
      efficiency: 82,
      adaptability: 75
    }
  };

  // Generate random skill data for different results each time
  const generateRandomSkillData = () => {
    const skills = ["Off", "Def", "Man", "Tac", "Ski"];
    return skills.map(skill => ({
      skill,
      value: Math.floor(Math.random() * 40) + 60, // Random value between 60-100
      fullMark: 100
    }));
  };

  // Pentagon radar data for skills
  const skillData = analysisComplete ? generateRandomSkillData() : [
    { skill: "Off", value: 0, fullMark: 100 },
    { skill: "Def", value: 0, fullMark: 100 },
    { skill: "Man", value: 0, fullMark: 100 },
    { skill: "Tac", value: 0, fullMark: 100 },
    { skill: "Ski", value: 0, fullMark: 100 }
  ];

  // Bar chart data
  const barData = [
    { name: "Offense", value: skillData.find(s => s.skill === "Off")?.value || 0 },
    { name: "Defense", value: skillData.find(s => s.skill === "Def")?.value || 0 },
    { name: "Mana Management", value: skillData.find(s => s.skill === "Man")?.value || 0 },
    { name: "Tactics", value: skillData.find(s => s.skill === "Tac")?.value || 0 },
    { name: "Skill Usage", value: skillData.find(s => s.skill === "Ski")?.value || 0 }
  ];

  // Match history data
  const matchHistory = [
    { date: "2024-01-15", opponent: "ProGamer123", result: "Win", score: "8.9", duration: "32m" },
    { date: "2024-01-14", opponent: "SkillMaster", result: "Loss", score: "7.2", duration: "28m" },
    { date: "2024-01-13", opponent: "ElitePlayer", result: "Win", score: "9.1", duration: "35m" },
    { date: "2024-01-12", opponent: "Champion99", result: "Win", score: "8.4", duration: "30m" },
    { date: "2024-01-11", opponent: "ProLegend", result: "Loss", score: "6.8", duration: "25m" }
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyber-pink mb-4">AI Video Analysis</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload your gameplay videos and get detailed AI-powered analysis of your performance, strategies, and improvement opportunities.
        </p>
        {analysisComplete && (
          <Button
            onClick={() => setShowHistory(!showHistory)}
            variant="outline"
            className="mt-4 mr-4"
          >
            <History className="mr-2 h-4 w-4" />
            {showHistory ? "Hide" : "View"} Match History
          </Button>
        )}
      </div>

      {!analysisComplete ? (
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Upload Interface */}
          <Card className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-cyber-cyan mb-6">
                {showPreview ? "Video Preview" : "Upload Your Video"}
              </h3>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {showPreview ? (
                /* Video Preview */
                <div className="space-y-6">
                  <div className="bg-black rounded-lg overflow-hidden">
                    <video
                      src={videoUrl}
                      controls
                      className="w-full max-h-96 object-contain"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* File Info */}
                  <div className="bg-surface rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <FileVideo className="text-cyber-cyan" size={20} />
                      <span className="font-semibold text-foreground truncate">
                        {selectedFile?.name}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Size: {selectedFile && formatFileSize(selectedFile.size)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={handleAnalysis} 
                      className="flex-1"
                      disabled={analyzing}
                    >
                      {analyzing ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Analysis
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={handleCancelPreview} 
                      variant="outline"
                      disabled={analyzing}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 transition-all duration-300 ${
                    dragActive 
                      ? "border-cyber-cyan bg-cyber-cyan/5 scale-105" 
                      : "border-border hover:border-cyber-cyan/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {analyzing ? (
                    <div className="space-y-4">
                      <div className="animate-spin mx-auto w-12 h-12 border-4 border-cyber-cyan border-t-transparent rounded-full"></div>
                      <p className="text-cyber-cyan font-semibold">Analyzing your gameplay...</p>
                      <div className="text-sm text-muted-foreground">
                        Processing video with AI models...
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto text-cyber-cyan" size={48} />
                      <div>
                        <p className="text-lg font-semibold text-cyber-cyan mb-2">
                          Drop your gameplay video here
                        </p>
                        <p className="text-muted-foreground mb-4">
                          Supported: MP4, AVI, MOV (Max 500MB)
                        </p>
                        <Button onClick={handleFileInputClick} className="w-full">
                          Select Video File
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Features Info */}
          <Card className="p-8 bg-surface border border-border">
            <h3 className="text-2xl font-semibold text-cyber-blue mb-6">What We Analyze</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyber-cyan rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Performance Metrics</h4>
                  <p className="text-sm text-muted-foreground">APM, accuracy, efficiency and adaptability scores</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Strategic Analysis</h4>
                  <p className="text-sm text-muted-foreground">Decision making patterns and tactical awareness</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyber-purple rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Skill Assessment</h4>
                  <p className="text-sm text-muted-foreground">Pentagon breakdown of key gaming abilities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyber-pink rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Improvement Areas</h4>
                  <p className="text-sm text-muted-foreground">Identify weaknesses and growth opportunities</p>
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
          {/* Overall Score */}
          <Card className="p-8 text-center bg-gradient-primary">
            <h3 className="text-3xl font-bold text-background mb-2">Overall Performance Score</h3>
            <div className="text-6xl font-bold text-background mb-4">{analysisResults.overallScore}</div>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-background text-primary">
              {analysisResults.playstyle}
            </Badge>
          </Card>

          {/* Detailed Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Clock className="mx-auto mb-2 text-cyber-cyan" size={24} />
              <div className="text-2xl font-bold text-cyber-cyan">{analysisResults.metrics.apm}</div>
              <div className="text-sm text-muted-foreground">Actions Per Minute</div>
            </Card>
            <Card className="p-4 text-center">
              <Target className="mx-auto mb-2 text-cyber-blue" size={24} />
              <div className="text-2xl font-bold text-cyber-blue">{analysisResults.metrics.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </Card>
            <Card className="p-4 text-center">
              <Zap className="mx-auto mb-2 text-cyber-purple" size={24} />
              <div className="text-2xl font-bold text-cyber-purple">{analysisResults.metrics.efficiency}%</div>
              <div className="text-sm text-muted-foreground">Efficiency</div>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp className="mx-auto mb-2 text-cyber-pink" size={24} />
              <div className="text-2xl font-bold text-cyber-pink">{analysisResults.metrics.adaptability}%</div>
              <div className="text-sm text-muted-foreground">Adaptability</div>
            </Card>
          </div>

          {/* Skill Analysis */}
          <Card className="p-8 bg-surface border border-border">
            <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Skill Analysis</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Hexagon Chart */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-center">Skill Pentagon</h4>
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

          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-cyber-cyan/20">
              <h3 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Strengths
              </h3>
              <div className="space-y-2">
                {analysisResults.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyber-cyan rounded-full"></div>
                    <span className="text-foreground">{strength}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-destructive/20">
              <h3 className="text-xl font-semibold text-destructive mb-4 flex items-center gap-2">
                <Target size={20} />
                Areas for Improvement
              </h3>
              <div className="space-y-2">
                {analysisResults.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="text-foreground">{weakness}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Suggestions */}
          <Card className="p-8 bg-surface">
            <h3 className="text-2xl font-semibold text-cyber-blue mb-6">Personalized Recommendations</h3>
            <div className="space-y-4">
              {analysisResults.suggestions.map((suggestion, index) => (
                <div key={index} className="p-4 rounded-lg bg-cyber-blue/5 border border-cyber-blue/20">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyber-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-cyber-blue">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => {
              setAnalysisComplete(false);
              setShowPreview(false);
              setSelectedFile(null);
              if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
                setVideoUrl("");
              }
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}>
              Analyze Another Video
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;