import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, ThumbsUp, Send, Filter, TrendingUp, Clock, Users } from "lucide-react";

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [filter, setFilter] = useState("all");

  const forumPosts = [
    {
      id: 1,
      author: "Kilas Gallimore",
      avatar: "KG",
      title: "Best strategies for mid-lane domination",
      content: "After analyzing 500+ matches, I've found that positioning and mana management are crucial for mid-lane success. Here are my top tips...",
      category: "strategy",
      likes: 24,
      replies: 8,
      timeAgo: "2 hours ago",
      trending: true
    },
    {
      id: 2,
      author: "Matthew Gregson",
      avatar: "MG",
      title: "How to counter aggressive early game strategies",
      content: "Facing aggressive opponents in early game? Here's a comprehensive guide on defensive positioning and when to engage...",
      category: "tips",
      likes: 18,
      replies: 12,
      timeAgo: "4 hours ago",
      trending: false
    },
    {
      id: 3,
      author: "Angel Huang",
      avatar: "AH",
      title: "Advanced combos for maximum damage output",
      content: "Master these advanced combo sequences to maximize your damage potential. Practice these daily for best results...",
      category: "combos",
      likes: 31,
      replies: 15,
      timeAgo: "6 hours ago",
      trending: true
    },
    {
      id: 4,
      author: "William Nicholas Tiang",
      avatar: "WT",
      title: "Team coordination strategies for ranked matches",
      content: "Communication is key in ranked matches. Here are proven strategies for better team coordination and decision making...",
      category: "teamwork",
      likes: 42,
      replies: 23,
      timeAgo: "1 day ago",
      trending: true
    },
    {
      id: 5,
      author: "EliteBoy76",
      avatar: "EB",
      title: "How to break through skill plateaus",
      content: "Stuck at the same rank? Here's how to identify and overcome skill plateaus with targeted practice techniques...",
      category: "improvement",
      likes: 19,
      replies: 7,
      timeAgo: "1 day ago",
      trending: false
    },
    {
      id: 6,
      author: "Livia Liu",
      avatar: "LL",
      title: "Mastering Godiverse energy management",
      content: "Energy is the key to everything in Apeiron. Learn how to optimize your energy usage for maximum efficiency in battles and exploration...",
      category: "strategy",
      likes: 56,
      replies: 29,
      timeAgo: "2 days ago",
      trending: true
    },
    {
      id: 7,
      author: "Jonathan Chi",
      avatar: "JC",
      title: "Building the ultimate planet for PvP dominance",
      content: "Planet building strategies that give you the edge in competitive matches. From terrain selection to resource allocation...",
      category: "strategy",
      likes: 38,
      replies: 16,
      timeAgo: "3 days ago",
      trending: false
    },
    {
      id: 8,
      author: "Allison Shao",
      avatar: "AS",
      title: "Understanding creature synergies and team compositions",
      content: "Deep dive into creature abilities and how to build the most effective teams for different game modes and strategies...",
      category: "teamwork",
      likes: 45,
      replies: 22,
      timeAgo: "3 days ago",
      trending: true
    },
    {
      id: 9,
      author: "Wilbert",S
      avatar: "W",
      title: "Elemental advantages and counter-strategies",
      content: "Master the elemental system! Complete guide to elemental weaknesses, strengths, and how to exploit them in combat...",
      category: "tips",
      likes: 33,
      replies: 14,
      timeAgo: "4 days ago",
      trending: false
    },
    {
      id: 10,
      author: "ProGamer123",
      avatar: "PG",
      title: "From Bronze to Mythic: My journey and lessons learned",
      content: "Sharing my complete journey from Bronze rank to Mythic tier, including mistakes to avoid and key insights for rapid improvement...",
      category: "improvement",
      likes: 67,
      replies: 41,
      timeAgo: "5 days ago",
      trending: true
    },
    {
      id: 11,
      author: "Lorris Leung",
      avatar: "LO",
      title: "Stealth strategies and ambush tactics",
      content: "Master the art of stealth gameplay with these advanced ambush techniques and positioning strategies for surprise attacks...",
      category: "strategy",
      likes: 28,
      replies: 9,
      timeAgo: "6 days ago",
      trending: false
    },
    {
      id: 12,
      author: "NightCrawler99",
      avatar: "NC",
      title: "Boss fight patterns and optimal damage windows",
      content: "Detailed analysis of boss attack patterns and the best timing for maximum damage output during raid encounters...",
      category: "tips",
      likes: 54,
      replies: 18,
      timeAgo: "1 week ago",
      trending: true
    },
    {
      id: 13,
      author: "GuildMaster42",
      avatar: "GM",
      title: "Building and managing successful gaming communities",
      content: "Leadership tips for guild masters and community managers on fostering positive environments and coordinating group activities...",
      category: "teamwork",
      likes: 39,
      replies: 26,
      timeAgo: "1 week ago",
      trending: false
    },
    {
      id: 14,
      author: "Eric Lu",
      avatar: "VG",
      title: "Optimization techniques for faster clear times",
      content: "Advanced movement optimization and route planning for competitive speedrunning and efficient dungeon clearing...",
      category: "improvement",
      likes: 47,
      replies: 13,
      timeAgo: "1 week ago",
      trending: true
    },
    {
      id: 15,
      author: "CraftingKing",
      avatar: "CK",
      title: "Resource management and crafting efficiency",
      content: "Complete guide to resource allocation, crafting rotations, and market strategies for maximizing your in-game economy...",
      category: "tips",
      likes: 36,
      replies: 21,
      timeAgo: "2 weeks ago",
      trending: false
    }
  ];

  const categories = [
    { id: "all", name: "All Posts", count: 247 },
    { id: "strategy", name: "Strategy", count: 78 },
    { id: "tips", name: "Tips & Tricks", count: 45 },
    { id: "combos", name: "Combos", count: 23 },
    { id: "teamwork", name: "Teamwork", count: 38 },
    { id: "improvement", name: "Improvement", count: 63 }
  ];

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Handle new post submission
      setNewPost("");
    }
  };

  const filteredPosts = filter === "all" 
    ? forumPosts 
    : forumPosts.filter(post => post.category === filter);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">Gaming Community</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with fellow gamers, share strategies, discuss tactics, and level up your gameplay together.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center bg-surface border border-border">
          <Users className="mx-auto mb-2 text-primary" size={32} />
          <div className="text-2xl font-bold text-primary">4,392</div>
          <div className="text-sm text-muted-foreground">Active Members</div>
        </Card>
        <Card className="p-6 text-center bg-surface border border-border">
          <MessageCircle className="mx-auto mb-2 text-accent" size={32} />
          <div className="text-2xl font-bold text-accent">2,847</div>
          <div className="text-sm text-muted-foreground">Discussions</div>
        </Card>
        <Card className="p-6 text-center bg-surface border border-border">
          <TrendingUp className="mx-auto mb-2 text-secondary" size={32} />
          <div className="text-2xl font-bold text-secondary">234</div>
          <div className="text-sm text-muted-foreground">Posts Today</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Create Post */}
          <Card className="p-6 bg-surface border border-border">
            <h3 className="text-lg font-semibold text-primary mb-4">Share Your Knowledge</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="What strategy, tip, or question would you like to share?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handlePostSubmit} className="w-full">
                <Send size={16} className="mr-2" />
                Post to Community
              </Button>
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-6 bg-surface border border-border">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <Filter size={18} />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    filter === category.id
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>

          {/* Trending Topics */}
          <Card className="p-6 bg-surface border border-border">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              Trending Topics
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                <div className="text-sm font-medium text-accent">#MetaShift</div>
                <div className="text-xs text-muted-foreground">48 posts today</div>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-sm font-medium text-primary">#RankedTips</div>
                <div className="text-xs text-muted-foreground">31 posts today</div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="text-sm font-medium text-secondary">#NewPlayer</div>
                <div className="text-xs text-muted-foreground">22 posts today</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="p-6 bg-surface border border-border hover:shadow-elevated transition-all duration-300">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 bg-primary/20 text-primary border border-primary/30">
                  <span className="text-sm font-semibold">{post.avatar}</span>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{post.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        {post.trending && (
                          <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/30">
                            Trending
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-primary mb-2">{post.title}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock size={14} />
                      {post.timeAgo}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{post.content}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp size={16} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle size={16} />
                        <span className="text-sm">{post.replies} replies</span>
                      </button>
                    </div>
                    <Button variant="outline" size="sm">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" className="px-8">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;