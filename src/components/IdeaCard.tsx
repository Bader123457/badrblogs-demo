import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface BlogIdea {
  id?: string;
  title: string;
  description: string;
  topic?: string;
  createdAt?: string;
}

interface IdeaCardProps {
  idea: BlogIdea;
}

const IdeaCard = ({ idea }: IdeaCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Store the current ideas in localStorage for the blog details page
    const currentIdeas = [idea]; // You can store multiple ideas if needed
    localStorage.setItem('lastGeneratedIdeas', JSON.stringify(currentIdeas));
    navigate(`/blog/${idea.id}`);
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-card hover:shadow-elegant transition-all duration-300 border-border/50 cursor-pointer"
      onClick={handleCardClick}
    >
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
        
        {idea.createdAt && (
          <div className="pt-2">
            <span className="text-xs text-muted-foreground">
              {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IdeaCard;