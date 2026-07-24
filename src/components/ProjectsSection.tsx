import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { publicCoverIndex } from "@/lib/covers";
import ProjectImage from "./ProjectImage";
import SectionHeading from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

/** Distinct generated cover art per project — dark base with a shifting red key light. */
const coverFor = (i: number) => {
  const spots = [
    { x: "22%", y: "18%" },
    { x: "78%", y: "24%" },
    { x: "30%", y: "80%" },
    { x: "82%", y: "78%" },
    { x: "50%", y: "20%" },
  ];
  const s = spots[i % spots.length];
  return {
    backgroundImage: `
      radial-gradient(60% 80% at ${s.x} ${s.y}, hsl(0 72% 51% / 0.16), transparent 55%),
      radial-gradient(50% 60% at 80% 10%, hsl(0 0% 18%), transparent 60%),
      linear-gradient(160deg, hsl(0 0% 9%), hsl(0 0% 4.5%))
    `,
  };
};

const ProjectsSection = () => {
  return (
    <section id="work" className="px-6 md:px-12 py-28 md:py-36 border-t border-border">
      <SectionHeading index="02" label="Selected Work" title="Featured Projects" />

      <div className="mt-16 md:mt-20 space-y-16 md:space-y-24">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start"
          >
            {/* Text — primary */}
            <div className={`md:col-span-8 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="flex items-center gap-4">
                <span className="font-body text-xs font-medium tracking-[0.25em] text-red tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[11px] tracking-[0.22em] text-red uppercase">
                  {project.subtitle}
                </span>
              </div>

              <Link to={`/work/${project.id}`} className="block mt-4">
                <h3 className="font-display text-2xl md:text-4xl font-semibold text-foreground leading-tight tracking-tight group-hover:text-red transition-colors duration-300">
                  {project.title}
                </h3>
              </Link>

              <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">
                {project.description}
              </p>

              {project.tools && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-body text-[11px] text-muted-foreground border border-border px-3 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}

              <Link
                to={`/work/${project.id}`}
                className="link-underline mt-7 inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-foreground hover:text-red transition-colors"
              >
                View case study
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Cover — secondary side piece; always dark surface so it reads in light mode too */}
            <Link
              to={`/work/${project.id}`}
              className={`block md:col-span-4 md:mt-2 ${i % 2 === 1 ? "md:order-1" : ""}`}
            >
              <div
                className="dark relative overflow-hidden aspect-[4/3] border border-border transition-all duration-500 ease-premium group-hover:border-foreground/20 group-hover:shadow-elevated-lg"
                style={coverFor(i)}
              >
                <ProjectImage
                  explicit={project.image}
                  publicIndex={publicCoverIndex(project)}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                  fallback={
                    /* subtle grid texture placeholder */
                    <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(hsl(0_0%_100%/0.06)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
                  }
                />
                <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/40 backdrop-blur-sm text-foreground opacity-0 -translate-y-1 transition-all duration-500 ease-premium group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-red group-hover:text-red">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
