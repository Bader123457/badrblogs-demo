import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

export interface BlogIdea {
  id?: string;
  title: string;
  description: string;
  topic?: string;
  createdAt?: string;
}

interface IdeaCardProps {
  idea: BlogIdea;
  onSave?: (idea: BlogIdea) => void;
  onDelete?: (id: string) => void;
  isSaved?: boolean;
  isLoading?: boolean;
}

const IdeaCard = ({ idea, onSave, onDelete, isSaved = false, isLoading = false }: IdeaCardProps) => {
  const handleSave = () => {
    if (onSave && !isLoading) {
      onSave(idea);
      toast.success("Idea saved successfully!");
    }
  };

  const handleDelete = () => {
    if (onDelete && idea.id && !isLoading) {
      onDelete(idea.id);
      toast.success("Idea deleted successfully!");
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card hover:shadow-elegant transition-all duration-300 border-border/50">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {idea.title}
            </CardTitle>
          </div>
          <div className="flex-shrink-0">
            <div className="p-2 bg-gradient-secondary rounded-lg">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-4">
        <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
          {idea.description}
        </CardDescription>
        
        {idea.topic && (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            Topic: {idea.topic}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          {idea.createdAt && (
            <span className="text-xs text-muted-foreground">
              {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          )}
          
          <div className="flex items-center space-x-2">
            {!isSaved && onSave && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleSave}
                disabled={isLoading}
                className="group/btn"
              >
                <Save className="h-3.5 w-3.5 mr-1.5 group-hover/btn:text-primary transition-colors" />
                Save
              </Button>
            )}
            
            {isSaved && onDelete && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleDelete}
                disabled={isLoading}
                className="group/btn text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaCard;