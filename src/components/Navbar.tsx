import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between px-6 md:px-12 transition-all duration-500 ease-premium ${
          scrolled ? "py-3.5" : "py-5"
        }`}
      >
        <a
          href="#"
          className="font-display text-sm font-semibold tracking-[0.2em] text-foreground transition-opacity hover:opacity-70"
        >
          SANDIYA<span className="text-red">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`link-underline font-body text-xs tracking-[0.22em] uppercase transition-colors duration-300 ${
                active === link.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#contact"
            className="btn-sheen font-body text-xs tracking-[0.15em] uppercase text-red-foreground bg-red hover:bg-red-muted px-5 py-2.5 rounded-full transition-colors duration-300"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-px bg-foreground transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-foreground transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-red via-red to-red/40"
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.05 }}
                  className="flex items-center justify-between font-display text-2xl font-medium text-foreground hover:text-red py-3 transition-colors"
                >
                  {link.label}
                  <span className="font-body text-[10px] tracking-[0.2em] text-muted-foreground">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
