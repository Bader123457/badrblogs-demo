import { useState, useEffect } from "react";
import IdeaCard, { type BlogIdea } from "@/components/IdeaCard";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SavedIdeas = () => {
  const [savedIdeas, setSavedIdeas] = useState<BlogIdea[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedIdeas();
  }, []);

  const loadSavedIdeas = async () => {
    try {
      setIsLoading(true);
      // TODO: Load from Supabase database when connected
      const saved = JSON.parse(localStorage.getItem("blogboost-saved-ideas") || "[]");
      setSavedIdeas(saved);
    } catch (error) {
      toast.error("Failed to load saved ideas");
      console.error("Error loading saved ideas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIdea = async (id: string) => {
    try {
      // TODO: Delete from Supabase database when connected
      const updated = savedIdeas.filter(idea => idea.id !== id);
      setSavedIdeas(updated);
      localStorage.setItem("blogboost-saved-ideas", JSON.stringify(updated));
    } catch (error) {
      toast.error("Failed to delete idea");
      console.error("Error deleting idea:", error);
    }
  };

  const handleClearAll = () => {
    if (savedIdeas.length === 0) return;
    
    if (window.confirm("Are you sure you want to delete all saved ideas? This action cannot be undone.")) {
      setSavedIdeas([]);
      localStorage.setItem("blogboost-saved-ideas", JSON.stringify([]));
      toast.success("All ideas cleared successfully");
    }
  };

  const filteredIdeas = savedIdeas.filter(idea =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (idea.topic && idea.topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded-lg w-48"></div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-secondary px-4 py-2 rounded-full text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              <span>Your Library</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Saved Ideas
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {savedIdeas.length === 0 
                ? "No saved ideas yet. Generate some ideas and save your favorites!"
                : `${savedIdeas.length} saved idea${savedIdeas.length === 1 ? '' : 's'} ready for your next blog post`
              }
            </p>
          </div>

          {savedIdeas.length > 0 && (
            <>
              {/* Search and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search saved ideas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-border/50"
                  />
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleClearAll}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              {/* Results count */}
              {searchTerm && (
                <div className="text-sm text-muted-foreground">
                  {filteredIdeas.length === 0 
                    ? "No ideas match your search"
                    : `Showing ${filteredIdeas.length} of ${savedIdeas.length} ideas`
                  }
                </div>
              )}

              {/* Ideas Grid */}
              {filteredIdeas.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredIdeas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      onDelete={handleDeleteIdea}
                      isSaved={true}
                    />
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No matching ideas</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or clear the search to see all ideas.
                  </p>
                </div>
              ) : null}
            </>
          )}

          {/* Empty State */}
          {savedIdeas.length === 0 && (
            <div className="text-center py-16">
              <Card className="max-w-md mx-auto bg-gradient-card border-border/50">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">No saved ideas yet</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Start by generating some blog ideas on the home page, then save your favorites here for easy access.
                  </p>
                  <Button asChild variant="default" className="mt-4">
                    <a href="/">Generate Ideas</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedIdeas;