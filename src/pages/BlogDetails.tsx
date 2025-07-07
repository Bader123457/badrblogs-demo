import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  topic?: string;
  content: string;
  readTime?: string;
}

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    generateBlogContent();
  }, [id, navigate]);

  const generateBlogContent = async () => {
    setIsLoading(true);
    try {
      // Get blog idea details from URL state or use mock data
      const storedIdeas = localStorage.getItem('lastGeneratedIdeas');
      let blogIdea = null;
      
      if (storedIdeas) {
        const ideas = JSON.parse(storedIdeas);
        blogIdea = ideas.find((idea: any) => idea.id === id);
      }

      if (!blogIdea) {
        // Fallback mock data if idea not found
        blogIdea = {
          id: id,
          title: "Sample Blog Post",
          description: "This is a sample blog post description.",
          topic: "Sample Topic"
        };
      }

      // Generate full blog content
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: { 
          title: blogIdea.title,
          description: blogIdea.description,
          topic: blogIdea.topic
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        // Use mock content as fallback
        setBlog({
          ...blogIdea,
          content: generateMockContent(blogIdea.title, blogIdea.description),
          readTime: "3 min read"
        });
      } else if (data?.content) {
        setBlog({
          ...blogIdea,
          content: data.content,
          readTime: data.readTime || "3 min read"
        });
      } else {
        // Fallback to mock content
        setBlog({
          ...blogIdea,
          content: generateMockContent(blogIdea.title, blogIdea.description),
          readTime: "3 min read"
        });
      }
    } catch (error) {
      console.error("Error generating blog content:", error);
      toast.error("Failed to load blog content");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const formatBlogContent = (content: string): string => {
    return content
      .replace(/\n/g, '<br />')
      .replace(/## (.*?)<br \/>/g, '<h2 style="font-size: 1.75rem; font-weight: 700; margin: 2rem 0 1rem 0; color: hsl(var(--foreground)); border-bottom: 2px solid hsl(var(--border)); padding-bottom: 0.5rem;">$1</h2>')
      .replace(/### (.*?)<br \/>/g, '<h3 style="font-size: 1.4rem; font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: hsl(var(--foreground));">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: hsl(var(--foreground));">$1</strong>')
      .replace(/- (.*?)<br \/>/g, '<li style="margin: 0.5rem 0; padding-left: 0.5rem;">$1</li>')
      .replace(/```([\s\S]*?)```/g, '<pre style="background: hsl(var(--muted)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; overflow-x: auto;"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code style="background: hsl(var(--muted)); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-family: monospace;">$1</code>');
  };

  const generateMockContent = (title: string, description: string): string => {
    return `
## Introduction

${description}

In this comprehensive guide, we'll explore everything you need to know about this topic. Whether you're a beginner just starting out or an experienced professional looking to expand your knowledge, this article will provide valuable insights and practical tips.

## Key Points to Consider

When approaching this subject, there are several important factors to keep in mind:

- **Understanding the fundamentals** - Building a solid foundation is crucial for long-term success
- **Practical application** - Theory is important, but real-world application is where the magic happens
- **Continuous learning** - This field is constantly evolving, so staying updated is essential
- **Community engagement** - Connecting with others in the field can provide valuable insights and opportunities

## Best Practices

Based on industry experience and research, here are some proven strategies that can help you achieve better results:

### 1. Start with the Basics
Don't rush into advanced concepts without mastering the fundamentals. Take time to understand the core principles and build your knowledge systematically.

### 2. Learn by Doing
Hands-on experience is invaluable. Create projects, experiment with different approaches, and learn from both successes and failures.

### 3. Stay Current
Follow industry leaders, read relevant publications, and participate in professional communities to stay informed about the latest trends and developments.

## Common Challenges and Solutions

Every journey has its obstacles. Here are some common challenges you might face and how to overcome them:

**Challenge**: Information overload
**Solution**: Focus on one concept at a time and practice before moving on to the next topic.

**Challenge**: Lack of practical experience
**Solution**: Start with small projects and gradually take on more complex challenges as your skills develop.

## Conclusion

Mastering this subject requires dedication, practice, and continuous learning. By following the strategies outlined in this guide and staying committed to your goals, you'll be well on your way to success.

Remember, everyone's journey is unique. What works for one person may not work for another, so don't be afraid to adapt these suggestions to fit your specific situation and learning style.

Keep experimenting, stay curious, and most importantly, enjoy the process of learning and growing in this exciting field!
    `.trim();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <LoadingSpinner 
            message="Generating blog content..."
            size="lg"
          />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Blog not found</h1>
            <Button onClick={() => navigate("/")} variant="default">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Ideas</span>
          </Button>
        </div>

        {/* Blog Header */}
        <Card className="mb-8 bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {blog.topic && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {blog.topic}
                  </div>
                )}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Blog Post</span>
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                {blog.title}
              </CardTitle>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {blog.description}
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Blog Content */}
        <Card className="bg-card border-border/50 shadow-card">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
                <div 
                className="text-foreground leading-relaxed prose prose-lg max-w-none"
                style={{ 
                  lineHeight: '1.8',
                  fontSize: '1.1rem'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: formatBlogContent(blog.content)
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate("/")} 
            variant="default"
            size="lg"
            className="px-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Generate More Ideas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;