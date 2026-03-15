import { motion } from "framer-motion";

const projects = [
  {
    title: "Interactive Web Platform",
    subtitle: "College Hackathon — UI/UX & Frontend",
    description:
      "Designed complete website layout and user flows. Led frontend development with HTML, CSS, and JavaScript. Applied responsive design with intuitive, task-oriented interaction design.",
  },
  {
    title: "Styles E-commerce",
    subtitle: "E-commerce Website — UI/UX Design",
    description:
      "Designed modern e-commerce UI including product pages and checkout flow. Created responsive prototypes in Figma and implemented frontend using HTML, CSS, JavaScript.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="work" className="px-6 md:px-12 py-32 border-t border-border">
      <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">Selected Work</span>

      <div className="mt-16 space-y-24">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`group ${i % 2 === 0 ? "md:pr-[20%]" : "md:pl-[20%]"}`}
          >
            {/* Project card area */}
            <div className="relative overflow-hidden bg-secondary aspect-[16/9] flex items-center justify-center mb-8 group-hover:bg-muted transition-colors duration-500">
              <span className="font-display text-4xl md:text-6xl font-extrabold text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors duration-500 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mt-2 uppercase">
              {project.subtitle}
            </p>
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
