import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { publicCoverIndex } from "@/lib/covers";
import ProjectImage from "@/components/ProjectImage";
import ThemeToggle from "@/components/ThemeToggle";

const ease = [0.16, 1, 0.3, 1] as const;

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

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const projectIndex = projects.findIndex((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground">Project not found</h1>
          <Link to="/" className="font-body text-sm text-red mt-4 inline-block hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const next = projects[projectIndex + 1];

  const cover = (
    <div
      className="dark relative overflow-hidden aspect-[16/9] border border-border shadow-elevated-lg group"
      style={coverFor(projectIndex)}
    >
      <ProjectImage
        explicit={project.image}
        publicIndex={publicCoverIndex(project)}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        fallback={
          <>
            <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(hsl(0_0%_100%/0.06)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[30vw] md:text-[16vw] font-semibold leading-none text-white/[0.05] select-none">
              {String(projectIndex + 1).padStart(2, "0")}
            </span>
          </>
        }
      />
      {project.link && (
        <span className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm text-foreground opacity-0 -translate-y-1 transition-all duration-500 ease-premium group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-red group-hover:text-red">
          <ArrowUpRight size={18} />
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link
            to="/#work"
            className="group inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-display text-sm font-semibold tracking-[0.2em] text-foreground"
            >
              SANDIYA<span className="text-red">.</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 md:pt-40 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center gap-4">
            <span className="font-body text-xs font-medium tracking-[0.25em] text-red tabular-nums">
              {String(projectIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
              Case Study
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mt-8 leading-[1.02] tracking-tight max-w-4xl">
            {project.title}
          </h1>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="font-body text-xs tracking-[0.22em] text-red uppercase">
              {project.subtitle}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 font-body text-xs tracking-[0.15em] uppercase text-foreground hover:text-red transition-colors"
              >
                Visit live site
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Cover */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="px-6 md:px-12 mt-12"
      >
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
            {cover}
          </a>
        ) : (
          cover
        )}
      </motion.div>

      {/* Content */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="md:sticky md:top-28 md:self-start space-y-8"
          >
            <div>
              <h3 className="font-body text-[11px] tracking-[0.22em] text-muted-foreground uppercase mb-3">
                Role
              </h3>
              <p className="font-body text-sm text-foreground">
                {project.subtitle.split("—")[1]?.trim() ?? "UI/UX Design"}
              </p>
            </div>

            {project.tools && (
              <div>
                <h3 className="font-body text-[11px] tracking-[0.22em] text-muted-foreground uppercase mb-3">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-body text-xs px-3 py-1.5 border border-border text-muted-foreground rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen inline-flex items-center gap-2 bg-red text-red-foreground font-body text-sm font-medium px-6 py-3 rounded-full hover:bg-red-muted transition-colors duration-300"
              >
                Visit live site
                <ArrowUpRight size={16} />
              </a>
            )}
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Overview
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-14">
              {project.description}
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Key Contributions
            </h3>
            <ul className="space-y-5">
              {project.details.map((detail, j) => (
                <li key={j} className="flex items-start gap-4 group">
                  <span className="font-body text-xs text-red tabular-nums pt-1 w-6 shrink-0">
                    0{j + 1}
                  </span>
                  <span className="font-body text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Next project */}
      {next && (
        <Link to={`/work/${next.id}`}>
          <div className="border-t border-border px-6 md:px-12 py-16 md:py-20 group cursor-pointer relative overflow-hidden">
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center justify-between gap-6">
              <div>
                <span className="font-body text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                  Next Project
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-semibold text-foreground mt-4 group-hover:text-red transition-colors duration-300">
                  {next.title}
                </h3>
              </div>
              <ArrowRight
                size={40}
                className="shrink-0 text-muted-foreground transition-all duration-500 ease-premium group-hover:text-red group-hover:translate-x-2"
              />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProjectDetail;
