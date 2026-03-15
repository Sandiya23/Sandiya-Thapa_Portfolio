import { motion } from "framer-motion";

const experiences = [
  {
    role: "UI/UX Designer",
    company: "RewaSoft Pvt. Ltd",
    details: [
      "Designed UI for an expedition and travel website",
      "Created wireframes and high-fidelity prototypes using Figma",
      "Structured layouts to improve navigation and user engagement",
      "Collaborated with developers to ensure accurate UI implementation",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Neutroline Pvt. Ltd.",
    details: [
      "Designed an admin dashboard for managing staff, customers, and services",
      "Created wireframes and interactive prototypes in Figma",
      "Improved information architecture to simplify navigation and workflows",
      "Collaborated with developers for UI implementation using HTML5 and CSS3",
    ],
  },
  {
    role: "UI/UX & Frontend Intern",
    company: "Quasar Technology",
    details: [
      "Designed homepage UI focused on first-time user experience and clarity",
      "Created high-fidelity mockups and interactive prototypes",
      "Built responsive layouts for desktop and mobile devices",
      "Improved accessibility, readability, and visual hierarchy",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section className="px-6 md:px-12 py-32 border-t border-border">
      <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">Experience</span>

      <div className="mt-16 space-y-0">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-12 border-b border-border group"
          >
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                {exp.role}
              </h3>
              <p className="font-body text-sm text-muted-foreground mt-1">{exp.company}</p>
            </div>
            <ul className="space-y-2">
              {exp.details.map((detail, j) => (
                <li key={j} className="font-body text-sm text-muted-foreground leading-relaxed">
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
