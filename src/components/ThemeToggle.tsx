import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-colors duration-300 ${className}`}
    >
      {mounted && (
        <>
          <Sun
            size={16}
            className={`absolute transition-all duration-500 ease-premium ${
              isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <Moon
            size={16}
            className={`absolute transition-all duration-500 ease-premium ${
              isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
            }`}
          />
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
