import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="px-6 md:px-12 py-32 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">About</span>
        <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mt-8 leading-snug max-w-4xl">
          Passionate UI/UX Designer with hands-on experience in interface design, wireframing, prototyping, and responsive web design.
        </p>
        <p className="font-body text-base md:text-lg text-muted-foreground mt-8 max-w-2xl leading-relaxed">
          Skilled in Figma, Adobe XD, Adobe Creative Suite, HTML5, CSS3, JavaScript, and Bootstrap. Strong understanding of interaction design, design thinking, information architecture, usability testing, and accessibility.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
