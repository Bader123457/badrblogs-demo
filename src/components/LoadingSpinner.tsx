import { Loader2, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gradient";
}

const LoadingSpinner = ({ 
  message = "Generating creative ideas...", 
  size = "md",
  variant = "gradient"
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const containerClasses = {
    sm: "p-4",
    md: "p-8",
    lg: "p-12"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      <div className="relative">
        {/* Spinning gradient background */}
        {variant === "gradient" && (
          <div className="absolute inset-0 bg-gradient-primary rounded-full blur-sm opacity-75 animate-pulse" />
        )}
        
        {/* Main spinner */}
        <div className="relative">
          {variant === "gradient" ? (
            <div className="relative">
              <Sparkles className={`${sizeClasses[size]} text-primary animate-spin`} />
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-ping" />
            </div>
          ) : (
            <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
          )}
        </div>
      </div>
      
      {message && (
        <p className="mt-4 text-sm text-muted-foreground font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;