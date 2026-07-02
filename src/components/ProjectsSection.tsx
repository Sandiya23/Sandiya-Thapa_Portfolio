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

      <div className="mt-16 md:mt-20 space-y-20 md:space-y-28">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className={`group ${i % 2 === 0 ? "md:pr-[14%]" : "md:pl-[14%]"}`}
          >
            <Link to={`/work/${project.id}`} className="block">
              {/* Cover art — always dark surface; scope tokens to dark so overlay text stays legible in light mode */}
              <div
                className="dark relative overflow-hidden aspect-[16/10] border border-border transition-all duration-500 ease-premium group-hover:border-foreground/20 group-hover:shadow-elevated-lg"
                style={coverFor(i)}
              >
                <ProjectImage
                  explicit={project.image}
                  publicIndex={publicCoverIndex(project)}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  scrimClassName="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10"
                  fallback={
                    /* subtle grid texture placeholder */
                    <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(hsl(0_0%_100%/0.06)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
                  }
                />

                {/* Ghost index — parallax-scales on hover */}
                <span className="absolute -bottom-6 left-4 md:left-8 font-display text-[26vw] md:text-[15vw] font-semibold leading-none text-white/[0.04] select-none transition-transform duration-700 ease-premium group-hover:scale-105 group-hover:text-red/[0.09]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title on cover */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <span className="font-body text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                      {project.tools?.[0] ?? "Case Study"}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/40 backdrop-blur-sm text-foreground opacity-0 -translate-y-1 transition-all duration-500 ease-premium group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-red group-hover:text-red">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-4xl font-semibold text-foreground leading-tight tracking-tight max-w-[80%]">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Meta row */}
            <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <p className="font-body text-[11px] tracking-[0.22em] text-red uppercase">
                  {project.subtitle}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </div>
              {project.tools && (
                <div className="flex flex-wrap gap-2 md:justify-end md:max-w-[240px]">
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
            </div>

            <Link
              to={`/work/${project.id}`}
              className="link-underline mt-5 inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-foreground hover:text-red transition-colors"
            >
              View case study
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
