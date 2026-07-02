import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  label: string;
  title?: string;
}

/**
 * Editorial section header: a numbered eyebrow with a hairline rule,
 * optionally followed by a large display title.
 */
const SectionHeading = ({ index, label, title }: SectionHeadingProps) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        <span className="font-body text-[11px] font-medium tracking-[0.25em] text-red tabular-nums">
          {index}
        </span>
        <span className="font-body text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-5xl font-semibold text-foreground mt-6 leading-[1.05] tracking-tight"
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
};

export default SectionHeading;
