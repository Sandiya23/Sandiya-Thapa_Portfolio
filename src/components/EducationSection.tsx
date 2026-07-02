import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

const EducationSection = () => {
  return (
    <section className="px-6 md:px-12 py-28 md:py-36 border-t border-border">
      <SectionHeading index="05" label="Education" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mt-12 md:mt-16 surface-card border border-border p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 group hover:border-foreground/20 transition-colors duration-500"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border text-red group-hover:border-red transition-colors duration-500">
          <GraduationCap size={24} />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:items-center">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              BSc. CSIT
            </h3>
            <p className="font-body text-sm text-muted-foreground mt-1.5">
              Prime College
            </p>
          </div>
          <div className="md:text-right">
            <span className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
              Present — 8th Semester
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EducationSection;
