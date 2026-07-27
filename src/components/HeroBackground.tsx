import { Suspense, lazy, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const BioluminescentScene = lazy(() => import("./BioluminescentScene"));

/** Reactively tracks the user's reduced-motion preference. */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

const HeroBackground = () => {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const show3D = mounted && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      {/* CSS ambient field — the light theme, reduced-motion and pre-load state */}
      <div aria-hidden className="absolute inset-0">
        {/* Drifting aurora fields */}
        <div className="animate-aurora-1 absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full blur-[120px] bg-[radial-gradient(circle,hsl(0_72%_51%/0.20),transparent_70%)]" />
        <div className="animate-aurora-2 absolute top-1/4 -right-1/4 h-[65vh] w-[65vh] rounded-full blur-[130px] bg-[radial-gradient(circle,hsl(0_60%_40%/0.15),transparent_70%)]" />
        <div
          className="animate-aurora-1 absolute -bottom-1/4 left-1/4 h-[55vh] w-[55vh] rounded-full blur-[120px] bg-[radial-gradient(circle,hsl(var(--foreground)/0.07),transparent_70%)]"
          style={{ animationDelay: "-9s" }}
        />

        {/* Fine dot grid, softly masked toward the center */}
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(80%_60%_at_50%_35%,black,transparent_78%)]" />

        {/* Radial key light from the top */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_-10%,hsl(0_72%_51%/0.10),transparent_60%)]" />
      </div>

      {/* Bioluminescent shader field, layered over the CSS ambience. The light
          preset is held back further so the theme's dark body copy stays legible. */}
      {show3D && (
        <Suspense fallback={null}>
          <div
            aria-hidden
            className={`absolute inset-0 ${isDark ? "opacity-50" : "opacity-40"}`}
          >
            <BioluminescentScene theme={isDark ? "dark" : "light"} />
          </div>
        </Suspense>
      )}

      {/* Scrims sit above the field so hero copy keeps its contrast */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_50%,var(--hero-vignette))]" />
    </div>
  );
};

export default HeroBackground;
