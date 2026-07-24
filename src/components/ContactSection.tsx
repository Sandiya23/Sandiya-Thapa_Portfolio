import { motion } from "framer-motion";
import { Instagram, Linkedin, ArrowUpRight, ArrowUp } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-28 md:py-40 border-t border-border overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,hsl(0_72%_51%/0.12),transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="relative max-w-5xl"
      >
        <div className="flex items-center gap-4">
          <span className="font-body text-[11px] font-medium tracking-[0.25em] text-red">06</span>
          <span className="font-body text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
            Contact
          </span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mt-8 leading-[0.95] tracking-tight">
          Let's work
          <br />
          together<span className="text-red">.</span>
        </h2>

        {/* Oversized email link */}
        <a
          href="mailto:sandiyathapa323@gmail.com"
          className="group mt-12 inline-flex items-center gap-3 md:gap-5"
        >
          <span className="font-display text-2xl md:text-4xl lg:text-5xl font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground break-all">
            sandiyathapa323@gmail.com
          </span>
          <ArrowUpRight
            className="shrink-0 text-red transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            size={32}
          />
        </a>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
          <div>
            <p className="font-body text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-2">
              Phone
            </p>
            <a
              href={`https://wa.me/9779845341517?text=${encodeURIComponent(
                "Hi Sandiya, I found your portfolio and would love to discuss a project with you."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-foreground hover:text-red transition-colors"
            >
              +977 9845341517
            </a>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-2">
              Location
            </p>
            <p className="font-body text-sm text-foreground">Kathmandu, Nepal</p>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-2">
              Socials
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-red transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-red transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <a
          href="mailto:sandiyathapa323@gmail.com"
          className="btn-sheen mt-12 inline-flex items-center gap-2 bg-red text-red-foreground font-body text-sm font-medium px-8 py-3.5 hover:bg-red-muted transition-colors duration-300 rounded-full"
        >
          Start a conversation
          <ArrowUpRight size={16} />
        </a>
      </motion.div>

      {/* Footer */}
      <div className="relative mt-28 md:mt-36 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="font-body text-xs text-muted-foreground">
          © 2026 Sandiya Thapa. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          <p className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase">
            UI/UX Designer
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-foreground tracking-[0.2em] uppercase transition-colors"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border group-hover:border-foreground/40 transition-colors">
              <ArrowUp size={13} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
