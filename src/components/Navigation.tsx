import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, BookOpen, Sparkles, LogIn, LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";

const Navigation = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed out successfully");
      }
    } catch (error) {
      toast.error("Failed to sign out");
      console.error("Sign out error:", error);
    }
  };
  
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
                BlogBoost
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
              variant={location.pathname === "/saved" ? "default" : "ghost"}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Link to="/saved">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Saved Ideas</span>
                <span className="sm:hidden">Saved</span>
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