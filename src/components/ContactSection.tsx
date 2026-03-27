import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="px-6 md:px-12 py-32 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">Contact</span>

        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mt-8 leading-tight">
          Let's work<br />together<span className="text-red">.</span>
        </h2>

        <div className="mt-12 space-y-4">
          <a
            href="mailto:sandiyathapa323@gmail.com"
            className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300 block"
          >
            sandiyathapa323@gmail.com
          </a>
          <a
            href="tel:+9779845341517"
            className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300 block"
          >
            +977 9845341517
          </a>
          <p className="font-body text-sm text-muted-foreground">
            Kathmandu, Nepal
          </p>
        </div>

        {/* Let's Talk CTA + Socials */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
  href="mailto:sandiyathapa323@gmail.com"
  className="inline-flex items-center gap-2 bg-red text-red-foreground font-body text-sm font-medium px-8 py-3 hover:bg-red-muted transition-colors duration-300 rounded-full"
>
  Let's Talk
</a>
          <div className="flex items-center gap-4">
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
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="font-body text-xs text-muted-foreground">
          © 2026 Sandiya Thapa. All rights reserved.
        </p>
        <p className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase">
          UI/UX Designer
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
