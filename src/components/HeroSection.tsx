import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Marquee name */}
      <div className="overflow-hidden py-8">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display text-[12vw] md:text-[10vw] font-extrabold text-foreground mx-4 leading-none"
            >
              Sandiya Thapa&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Role + location */}
      <div className="px-6 md:px-12 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              UI/UX Designer
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground mt-2 tracking-wide">
              Frontend Development & Design Systems
            </p>
          </div>
          <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mt-6 md:mt-0 uppercase">
            Based in Kathmandu, Nepal
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-6 md:left-12"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
          <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
            <motion.div
              className="w-full h-4 bg-foreground"
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
