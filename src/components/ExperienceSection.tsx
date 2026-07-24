import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useExperiences } from "@/hooks/useSiteContent";
import SectionHeading from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

const ExperienceSection = () => {
  const experiences = useExperiences();

  return (
    <section className="px-6 md:px-12 py-28 md:py-36 border-t border-border">
      <SectionHeading index="03" label="Experience" title="Where I've worked" />

      <div className="mt-14 md:mt-16 border-t border-border">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr_2fr] gap-4 md:gap-12 py-10 md:py-12 border-b border-border transition-colors duration-500"
          >
            {/* hover wash */}
            <span className="pointer-events-none absolute inset-x-[-1.5rem] md:inset-x-[-3rem] inset-y-0 bg-gradient-to-r from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <span className="relative font-body text-xs tracking-[0.2em] text-muted-foreground tabular-nums pt-1">
              0{i + 1}
            </span>

            <div className="relative">
              <h3 className="font-display text-xl md:text-3xl font-semibold text-foreground transition-colors duration-300 group-hover:text-red flex items-center gap-2">
                {exp.role}
                <ArrowUpRight
                  size={20}
                  className="opacity-0 -translate-x-2 transition-all duration-300 text-red group-hover:opacity-100 group-hover:translate-x-0"
                />
              </h3>
              <p className="font-body text-sm text-muted-foreground mt-2">{exp.company}</p>
            </div>

            <ul className="relative space-y-2.5">
              {exp.details.map((detail, j) => (
                <li
                  key={j}
                  className="font-body text-sm text-muted-foreground leading-relaxed flex items-start gap-3"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red/70" />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
