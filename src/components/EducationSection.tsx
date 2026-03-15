import { motion } from "framer-motion";

const EducationSection = () => {
  return (
    <section className="px-6 md:px-12 py-32 border-t border-border">
      <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">Education</span>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12"
      >
        <div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">Bsc. CSIT</h3>
          <p className="font-body text-sm text-muted-foreground mt-1">Present — 8th Semester</p>
        </div>
        <div>
          <p className="font-body text-base text-muted-foreground">Prime College</p>
        </div>
      </motion.div>
    </section>
  );
};

export default EducationSection;
