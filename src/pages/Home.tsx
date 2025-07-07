import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import IdeaCard, { type BlogIdea } from "@/components/IdeaCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Lightbulb, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState<BlogIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateIdeas = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a blog topic or niche");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-ideas', {
        body: { topic }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error("Failed to generate ideas. Please try again.");
        return;
      }

      if (data?.ideas) {
        setIdeas(data.ideas);
        // Store generated ideas in localStorage for blog details page
        localStorage.setItem('lastGeneratedIdeas', JSON.stringify(data.ideas));
        toast.success(`Generated ${data.ideas.length} creative ideas for "${topic}"!`);
      } else {
        toast.error("No ideas were generated. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to generate ideas. Please try again.");
      console.error("Error generating ideas:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleGenerateIdeas();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-secondary px-4 py-2 rounded-full text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Powered by AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Generate Creative
              </span>
              <br />
              <span className="text-foreground">Blog Post Ideas</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform any topic into engaging blog post ideas with AI. Get titles, descriptions, and inspiration to fuel your content creation.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-card border-border/50 shadow-card">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-base font-medium flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span>Enter your blog topic or niche</span>
                </Label>
                <Input
                  id="topic"
                  placeholder="e.g., sustainable living, web development, digital marketing..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="h-12 text-base border-border/50 focus:border-primary"
                />
              </div>
              
              <Button
                onClick={handleGenerateIdeas}
                disabled={isLoading || !topic.trim()}
                variant="hero"
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" variant="default" message="" />
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <LoadingSpinner 
              message={`Generating creative blog ideas for "${topic}"...`}
              size="lg"
            />
          </div>
        )}

        {/* Results Section */}
        {!isLoading && ideas.length > 0 && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Generated Ideas for "{topic}"
              </h2>
              <p className="text-muted-foreground">
                {ideas.length} creative blog post ideas ready to inspire your content
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && ideas.length === 0 && (
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
              <Lightbulb className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground">Ready to brainstorm?</h3>
            <p className="text-muted-foreground">
              Enter a topic above and let AI generate creative blog post ideas for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;