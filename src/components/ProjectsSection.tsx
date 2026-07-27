import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";
import { useProjects } from "@/hooks/useSiteContent";
import { coverFor, publicCoverIndex } from "@/lib/covers";
import ProjectImage from "./ProjectImage";
import SectionHeading from "./SectionHeading";

/** How much a card shrinks for every card that ends up stacked on top of it. */
const SHRINK_PER_CARD = 0.03;
/** Vertical offset per card, so the pinned edges of the pile stay visible. */
const OFFSET_PER_CARD = 22;

interface CardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

/**
 * One card in the stack. Every card pins just under the navbar and the next
 * one scrolls over it; a covered card shrinks toward `targetScale` across the
 * remaining scroll, so the pile reads as depth rather than a flat overlap.
 * The last card never scales — it's the one left on top.
 */
const ProjectCard = ({ project, index, total, progress }: CardProps) => {
  const reduceMotion = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * SHRINK_PER_CARD;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[86vh] items-start justify-center md:h-[85vh]">
      <motion.div
        style={{
          scale: reduceMotion ? 1 : scale,
          top: index * OFFSET_PER_CARD,
        }}
        className="group surface-card relative w-full origin-top border border-border shadow-elevated p-6 sm:p-8 md:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-12 items-center">
          {/* Text */}
          <div className="md:col-span-6">
            <div className="flex items-start gap-4 sm:gap-6">
              <span className="font-display font-semibold leading-none text-foreground/15 tabular-nums text-[clamp(2.5rem,7vw,5rem)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2 pt-1 min-w-0">
                <span className="font-body text-[11px] tracking-[0.22em] text-red uppercase">
                  {project.subtitle}
                </span>
                <Link to={`/work/${project.id}`}>
                  <h3 className="font-display text-2xl md:text-4xl font-semibold text-foreground leading-tight tracking-tight hover:text-red transition-colors duration-300">
                    {project.title}
                  </h3>
                </Link>
              </div>
            </div>

            <p className="font-body text-sm md:text-base text-muted-foreground mt-5 max-w-xl leading-relaxed line-clamp-4 md:line-clamp-none">
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

          {/* Cover — always a dark surface so it reads in light mode too */}
          <Link to={`/work/${project.id}`} className="block md:col-span-6">
            <div
              className="dark relative overflow-hidden aspect-[16/10] md:aspect-[4/3] border border-border transition-all duration-500 ease-premium group-hover:border-foreground/20"
              style={coverFor(index)}
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
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Featured Projects — a scroll-stacked pile of cards. Progress is measured
 * across the whole list (its top at the top of the viewport through its bottom
 * edge) and every card reads that same value.
 */
const ProjectsSection = () => {
  const projects = useProjects();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="px-6 md:px-12 py-28 md:py-36 border-t border-border">
      <SectionHeading index="02" label="Selected Work" title="Featured Projects" />

      <div ref={listRef} className="mt-16 md:mt-20 mx-auto max-w-6xl">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
