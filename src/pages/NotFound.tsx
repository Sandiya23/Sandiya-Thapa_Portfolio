import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,hsl(0_72%_51%/0.12),transparent_65%)]" />
      <div className="relative text-center">
        <h1 className="font-display text-[28vw] md:text-[16vw] font-semibold leading-none text-outline select-none">
          404
        </h1>
        <p className="font-body text-lg text-muted-foreground -mt-4 md:-mt-8">
          This page wandered off the map.
        </p>
        <Link
          to="/"
          className="btn-sheen group mt-10 inline-flex items-center gap-2 bg-red text-red-foreground font-body text-sm font-medium px-7 py-3.5 rounded-full hover:bg-red-muted transition-colors duration-300"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
