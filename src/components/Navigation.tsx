import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-primary p-2 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Badrblogs
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                AI Blog Ideas
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Button
              asChild
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Link to="/">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Generate Ideas</span>
                <span className="sm:hidden">Generate</span>
              </Link>
            </Button>
            

            <Button
              asChild
              variant={location.pathname === "/about" ? "default" : "ghost"}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Link to="/about">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">About</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;