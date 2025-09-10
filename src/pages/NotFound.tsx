import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="bg-gradient-card rounded-2xl p-8 shadow-lg">
          <h1 className="mb-4 text-6xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent">404</h1>
          <p className="mb-6 text-xl text-card-foreground">Oops! Page not found</p>
          <p className="mb-8 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-gradient-primary hover:shadow-glow">
            <a href="/">Return to Blog</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
