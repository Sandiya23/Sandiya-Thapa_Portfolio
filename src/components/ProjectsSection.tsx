import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  return (
    <section id="work" className="px-6 md:px-12 py-32 border-t border-border">
      <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">Selected Work</span>

      <div className="mt-16 space-y-24">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`group ${i % 2 === 0 ? "md:pr-[20%]" : "md:pl-[20%]"}`}
          >
            <Link to={`/work/${project.id}`}>
              {/* Thumbnail area */}
              <div className="relative overflow-hidden bg-secondary aspect-[16/9] flex items-center justify-center mb-8 group-hover:bg-muted transition-colors duration-500 cursor-pointer">
                <span className="font-display text-4xl md:text-6xl font-extrabold text-muted-foreground/20 group-hover:text-red/40 transition-colors duration-500 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="text-red" size={24} />
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground group-hover:text-red transition-colors duration-300">
                {project.title}
              </h3>
            </Link>
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
