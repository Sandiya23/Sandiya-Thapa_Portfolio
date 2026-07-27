import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

const tools = [
  "Figma",
  "Adobe XD",
  "Adobe Creative Suite",
  "HTML5",
  "CSS3",
  "JavaScript",
  "Bootstrap",
  "Design Systems",
  "Prototyping",
  "Usability Testing",
];

const AboutSection = () => {
  return (
    <section id="about" className="px-6 md:px-12 py-28 md:py-36 border-t border-border overflow-hidden">
      <SectionHeading index="01" label="About" />

      <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-medium text-foreground leading-[1.15] tracking-tight text-balance"
        >
          Passionate{" "}
          <span className="text-muted-foreground">UI/UX Designer</span> with
          hands-on experience in interface design, wireframing, prototyping and{" "}
          <span className="text-red">responsive web design</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="lg:pt-3"
        >
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Skilled in Figma, Adobe XD, the Adobe Creative Suite, HTML5, CSS3,
            JavaScript and Bootstrap. Strong grounding in interaction design,
            design thinking, information architecture, usability testing and
            accessibility.
          </p>

          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <p className="font-display text-3xl font-semibold text-foreground">5+</p>
              <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground uppercase mt-1">
                Companies
              </p>
            </div>
            <div className="w-px self-stretch bg-border" />
            <div>
              <p className="font-display text-3xl font-semibold text-foreground">10+</p>
              <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground uppercase mt-1">
                Projects
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tools ticker */}
      <div className="relative mt-16 md:mt-24">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...tools, ...tools].map((tool, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-3xl font-medium text-muted-foreground/40 whitespace-nowrap flex items-center gap-10"
              >
                {tool}
                <span className="text-red text-xs">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
