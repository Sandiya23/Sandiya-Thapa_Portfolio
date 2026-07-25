import { motion } from "framer-motion";
import { Instagram, Linkedin, Download, Calendar, ArrowDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-background">
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
        {/* Bottom fade into the page */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_50%,var(--hero-vignette))]" />
      </div>

      <div className="relative z-10">
        {/* Marquee name */}
        <div className="overflow-hidden pt-28 md:pt-24 pb-6 md:pb-8">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="font-display text-[13vw] md:text-[10.5vw] font-semibold mx-5 leading-none flex items-center"
              >
                <span className={i % 2 === 0 ? "text-foreground" : "text-outline"}>
                  Sandiya Thapa
                </span>
                <span className="text-red mx-6 text-[0.5em]">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Role + location */}
        <div className="px-6 md:px-12 mt-6 md:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          >
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-[1.02] tracking-tight">
                UI/UX Designer
              </h1>
              <p className="font-body text-sm md:text-base text-muted-foreground mt-3 tracking-wide max-w-md">
                Crafting intuitive interfaces & design systems — from wireframe to
                pixel-perfect, responsive build.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-5 mt-6">
                <a
                  href="https://www.instagram.com/_sandiya11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-red transition-colors duration-300 hover:-translate-y-0.5 transform-gpu"
                >
                  <Instagram size={19} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sandiya-thapa-a5a78b278/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-red transition-colors duration-300 hover:-translate-y-0.5 transform-gpu"
                >
                  <Linkedin size={19} />
                </a>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-9">
                <a
                  href="#contact"
                  className="btn-sheen group inline-flex items-center gap-2 bg-red text-red-foreground font-body text-sm font-medium px-7 py-3.5 hover:bg-red-muted transition-colors duration-300 rounded-full"
                >
                  <Calendar size={16} />
                  Book a Consultation
                </a>
                <a
                  href="/Sandiya_Thapa_CV.pdf"
                  download
                  className="group inline-flex items-center gap-2 border border-border bg-background/30 backdrop-blur-sm text-foreground font-body text-sm font-medium px-7 py-3.5 hover:border-foreground/40 hover:bg-secondary transition-all duration-300 rounded-full"
                >
                  <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download CV
                </a>
              </div>
            </div>

            <div className="md:text-right">
              <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Based in
              </p>
              <p className="font-display text-lg font-medium text-foreground mt-1">
                Kathmandu, Nepal
              </p>
              <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground/70 uppercase mt-1">
                UTC+5:45
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 group"
        >
          <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase group-hover:text-foreground transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground group-hover:text-red transition-colors"
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
