import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Sparkles, Zap, BookOpen, Target, Wand2 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-secondary px-4 py-2 rounded-full text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Content Creation</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Badrblogs
              </span>
            </h1>
            
            <p className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              AI Blog Ideas Generator
            </p>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform any topic into engaging blog post ideas with the power of AI. 
              Generate creative titles, detailed descriptions, and inspiration to fuel your content creation journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="hero" className="text-lg px-8 py-4">
              <Wand2 className="h-5 w-5 mr-2" />
              Try Badrblogs Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <BookOpen className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Smart Idea Generation</h3>
              <p className="text-muted-foreground">
                Generate 5 unique, creative blog post ideas for any topic or niche in seconds using advanced AI technology.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Topic-Focused Content</h3>
              <p className="text-muted-foreground">
                Each generated idea includes compelling titles and detailed descriptions tailored to your specific topic.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Save & Organize</h3>
              <p className="text-muted-foreground">
                Save your favorite ideas for later reference and build your personal library of content inspiration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get instant results with our optimized AI processing. No waiting, no delays - just immediate inspiration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI-Powered</h3>
              <p className="text-muted-foreground">
                Leveraging cutting-edge GPT technology to ensure creative, engaging, and unique blog post ideas every time.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Easy to Use</h3>
              <p className="text-muted-foreground">
                Simply enter your topic and let Badrblogs do the rest. No complex setup, no learning curve required.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center space-y-12 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to unlimited blog inspiration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Enter Your Topic</h3>
              <p className="text-muted-foreground">
                Type in any topic, niche, or subject you want to write about
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Generates Ideas</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your topic and creates 5 unique, engaging blog post ideas
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Save & Create</h3>
              <p className="text-muted-foreground">
                Save your favorites and start creating amazing content for your blog
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="text-center space-y-8 max-w-3xl mx-auto mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              About the Creator
            </h2>
            <p className="text-xl text-muted-foreground">
              This project was created by Badreldin Elsayed, First Year Computer Science Student at the University of Manchester.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Create Amazing Blogs?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of content creators who use Badrblogs to generate endless blog ideas
            </p>
          </div>

          <Button size="lg" variant="hero" className="text-lg px-8 py-4">
            <Sparkles className="h-5 w-5 mr-2" />
            Start Generating Ideas
          </Button>

          <p className="text-sm text-muted-foreground">
            No credit card required • Generate 5 ideas instantly • Save favorites with free account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;