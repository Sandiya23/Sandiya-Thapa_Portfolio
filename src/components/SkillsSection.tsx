import { motion } from "framer-motion";
import { useSkillGroups } from "@/hooks/useSiteContent";
import SectionHeading from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

const SkillsSection = () => {
  const skillGroups = useSkillGroups();

  return (
    <section className="px-6 md:px-12 py-28 md:py-36 border-t border-border">
      <SectionHeading index="04" label="Capabilities" title="Skills & tools" />

      <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {skillGroups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
            className="surface-card p-8 md:p-10 group"
          >
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                {group.category}
              </h3>
              <span className="font-body text-[11px] tracking-[0.2em] text-muted-foreground tabular-nums">
                0{i + 1}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-body text-xs tracking-wide text-muted-foreground border border-border px-4 py-2 rounded-full transition-all duration-300 hover:text-red-foreground hover:bg-red hover:border-red"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
