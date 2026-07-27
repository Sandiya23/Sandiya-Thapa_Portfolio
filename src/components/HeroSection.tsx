import { motion } from "framer-motion";
import { Download, Calendar, ArrowDown } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteContent";
import HeroBackground from "./HeroBackground";
import SocialLinks from "./SocialLinks";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { roleTitle, tagline, cvUrl, location, timezone, socials } = useSiteSettings();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient animated background */}
      <HeroBackground />

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
                {roleTitle}
              </h1>
              <p className="font-body text-sm md:text-base text-muted-foreground mt-3 tracking-wide max-w-md">
                {tagline}
              </p>

              {/* Social icons */}
              <SocialLinks
                links={socials}
                size={19}
                className="flex items-center gap-5 mt-6"
                linkClassName="text-muted-foreground hover:text-red transition-colors duration-300 hover:-translate-y-0.5 transform-gpu"
              />

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-9">
                <a
                  href="#contact"
                  className="btn-sheen group inline-flex items-center gap-2 bg-red text-red-foreground font-body text-sm font-medium px-7 py-3.5 hover:bg-red-muted transition-colors duration-300 rounded-full"
                >
                  <Calendar size={16} />
                  Book a Consultation
                </a>
                {cvUrl && (
                  <a
                    href={cvUrl}
                    download
                    className="group inline-flex items-center gap-2 border border-border bg-background/30 backdrop-blur-sm text-foreground font-body text-sm font-medium px-7 py-3.5 hover:border-foreground/40 hover:bg-secondary transition-all duration-300 rounded-full"
                  >
                    <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download CV
                  </a>
                )}
              </div>
            </div>

            {location && (
              <div className="md:text-right">
                <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Based in
                </p>
                <p className="font-display text-lg font-medium text-foreground mt-1">{location}</p>
                {timezone && (
                  <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground/70 uppercase mt-1">
                    {timezone}
                  </p>
                )}
              </div>
            )}
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
