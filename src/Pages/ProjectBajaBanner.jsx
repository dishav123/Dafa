// Banner.jsx — Project Baja
import { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import ProjectBajaLogo from "../assets/ProjectBajaLogo.png";

// ─── Data ─────────────────────────────────────────────────────────────────────
const paragraphText =
  "A living archive dedicated to the preservation of Dafā Sangeet — the sacred drum and devotional music tradition of the Newar people. Through community recordings, intergenerational workshops, and curated stage presentations, we document the rhythmic vocabulary of guthi culture before it fades from living memory.";

// ─── AnimatedWord ─────────────────────────────────────────────────────────────
function AnimatedWord({ word, scrollProgress, threshold }) {
  const [color, setColor] = useState("#D9D9D9");

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const fadeStart = threshold - 0.04;
      const fadeEnd   = threshold;

      if (latest >= fadeEnd) {
        setColor("#0a0a0a");
      } else if (latest >= fadeStart) {
        const t    = (latest - fadeStart) / (fadeEnd - fadeStart);
        const gray = Math.round(217 - t * 207);
        setColor(`rgb(${gray}, ${gray}, ${gray})`);
      } else {
        setColor("#D9D9D9");
      }
    });
    return () => unsubscribe();
  }, [scrollProgress, threshold]);

  return (
    <span
      className="inline-block transition-colors duration-100"
      style={{ color }}
    >
      {word}
    </span>
  );
}

// ─── AnimatedParagraph ────────────────────────────────────────────────────────
function AnimatedParagraph({ text, scrollProgress }) {
  const words = text.split(" ");

  return (
    <p
      className="text-xl md:text-2xl font-light leading-[1.25] tracking-tight"
      style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif" }}
    >
      {words
        .map((word, i) => {
          const threshold = 0.05 + (i / (words.length - 1)) * 0.65;
          return (
            <AnimatedWord
              key={i}
              word={word}
              scrollProgress={scrollProgress}
              threshold={threshold}
            />
          );
        })
        .reduce((acc, el, i) => {
          if (i === 0) return [el];
          return [...acc, " ", el];
        }, [])}
    </p>
  );
}

// ─── ImagePanel ───────────────────────────────────────────────────────────────
function ImagePanel() {
  return (
    <div className="p-8 md:p-12 flex items-center justify-center h-full">
      <div
        className="overflow-hidden"
        style={{
          width: "65%",
          aspectRatio: "4/3",
          borderRadius: "4px",
        }}
      >
        <img
          src={ProjectBajaLogo}
          alt="Project Baja Nepal"
          className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </div>
  );
}

// ─── Banner (main export) ─────────────────────────────────────────────────────
export default function ProjectBajaBanner() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-6 md:px-12 lg:px-20 py-24 md:py-32"
      style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif" }}
    >
      {/* ── Heading ── */}
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-normal mb-3">
          Cultural Heritage Initiative
        </p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950">
          Project Baja Nepal
        </h2>
      </div>

      {/* ── Two-column grid ── */}
      <div className="border border-zinc-200 grid grid-cols-1 md:grid-cols-2">
        {/* Left: scroll-animated paragraph */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col justify-center">
          <AnimatedParagraph
            text={paragraphText}
            scrollProgress={scrollYProgress}
          />
        </div>

        {/* Right: project image — no bg, no border, smaller (65% width) */}
        <ImagePanel />
      </div>
    </section>
  );
}