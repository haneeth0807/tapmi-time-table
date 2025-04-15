
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4 p-6 max-w-md">
        <div className="flex justify-center">
          <CalendarX size={60} className="text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page not found</p>
        <p className="text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Button asChild>
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
