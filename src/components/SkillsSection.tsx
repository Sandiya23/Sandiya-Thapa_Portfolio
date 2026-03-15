import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "UI/UX Design",
    skills: ["UI Design", "UX Design", "Wireframing", "Prototyping", "Interaction Design", "Responsive Design"],
  },
  {
    category: "Tools",
    skills: ["Figma", "Adobe XD", "Adobe Creative Suite"],
  },
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
  },
  {
    category: "Soft Skills",
    skills: ["Design Thinking", "Team Collaboration", "Communication", "Attention to Detail"],
  },
];

const SkillsSection = () => {
  return (
    <section className="px-6 md:px-12 py-32 border-t border-border">
      <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">Skills</span>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        {skillGroups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="font-display text-lg font-bold text-foreground mb-6">{group.category}</h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-body text-xs tracking-wide text-muted-foreground border border-border px-4 py-2 hover:text-foreground hover:border-foreground transition-colors duration-300"
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
