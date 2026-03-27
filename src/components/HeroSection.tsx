import { motion } from "framer-motion";
import { Instagram, Linkedin, Download, Calendar } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10">
        {/* Marquee name */}
        <div className="overflow-hidden py-8">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-display text-[12vw] md:text-[10vw] font-extrabold text-foreground mx-4 leading-none"
              >
                Sandiya Thapa&nbsp;&nbsp;<span className="text-red">·</span>&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Role + location */}
        <div className="px-6 md:px-12 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between"
          >
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
                UI/UX Designer
              </h1>
              <p className="font-body text-sm md:text-base text-muted-foreground mt-2 tracking-wide">
                Frontend Development & Design Systems
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-red transition-colors duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-red transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-red text-red-foreground font-body text-sm font-medium px-6 py-3 hover:bg-red-muted transition-colors duration-300 rounded-full"
                >
                  <Calendar size={16} />
                  Book a Consultation
                </a>
                <a
                  href="/Sandiya_Thapa_CV.pdf"
                  download
                  className="inline-flex items-center gap-2 border border-border text-foreground font-body text-sm font-medium px-6 py-3 hover:bg-secondary transition-colors duration-300 rounded-full"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>
            </div>
            <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mt-6 md:mt-0 uppercase">
              Based in Kathmandu, Nepal
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-6 md:left-12"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
            <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
              <motion.div
                className="w-full h-4 bg-red"
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;