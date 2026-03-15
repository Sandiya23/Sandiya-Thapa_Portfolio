import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <span className="font-display text-sm font-bold tracking-widest text-foreground">
            SANDIYA THAPA
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-display text-[20vw] md:text-[12vw] font-extrabold text-muted-foreground/10 leading-none select-none">
            {String(projectIndex + 1).padStart(2, "0")}
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mt-[-2vw] leading-tight">
            {project.title}
          </h1>
          <p className="font-body text-xs tracking-[0.2em] text-red mt-4 uppercase">
            {project.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Thumbnail placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-6 md:px-12 mt-12"
      >
        <div className="bg-secondary aspect-[16/9] flex items-center justify-center border border-border">
          <span className="font-body text-sm text-muted-foreground">Thumbnail Image</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-8">
              <h3 className="font-body text-xs tracking-[0.2em] text-muted-foreground uppercase mb-3">Role</h3>
              <p className="font-body text-sm text-foreground">{project.subtitle.split("—")[1]?.trim()}</p>
            </div>

            {project.tools && (
              <div>
                <h3 className="font-body text-xs tracking-[0.2em] text-muted-foreground uppercase mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-body text-xs px-3 py-1.5 border border-border text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Overview</h2>
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-12">
              {project.description}
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mb-6">Key Contributions</h3>
            <ul className="space-y-4">
              {project.details.map((detail, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red mt-2 shrink-0" />
                  <span className="font-body text-sm text-muted-foreground leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Next project */}
      {projectIndex < projects.length - 1 && (
        <Link to={`/work/${projects[projectIndex + 1].id}`}>
          <div className="border-t border-border px-6 md:px-12 py-16 group cursor-pointer hover:bg-secondary/50 transition-colors duration-300">
            <span className="font-body text-xs tracking-[0.2em] text-muted-foreground uppercase">Next Project</span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-4 group-hover:text-red transition-colors duration-300">
              {projects[projectIndex + 1].title}
            </h3>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProjectDetail;
