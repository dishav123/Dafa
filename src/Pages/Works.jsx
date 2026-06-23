import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Placeholder logo SVGs ────────────────────────────────────────────────────
// Six distinct minimal marks — each references a real Newar cultural institution
// or arts-adjacent org archetype. Replace src with actual logo assets as needed.
const logos = [
  {
    name: "Patan Museum",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="w-full h-full">
        <rect x="2" y="8" width="16" height="16" stroke="#71717a" strokeWidth="1.2" />
        <rect x="6" y="4" width="8" height="4" stroke="#71717a" strokeWidth="1.2" />
        <line x1="10" y1="8" x2="10" y2="24" stroke="#71717a" strokeWidth="1.2" />
        <text x="24" y="20" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="10" fill="#71717a" fontWeight="300" letterSpacing="0.08em">PATAN</text>
        <text x="24" y="29" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7" fill="#a1a1aa" fontWeight="300" letterSpacing="0.12em">MUSEUM</text>
      </svg>
    ),
  },
  {
    name: "Nepal Arts Council",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="w-full h-full">
        <circle cx="14" cy="16" r="8" stroke="#71717a" strokeWidth="1.2" />
        <circle cx="14" cy="16" r="3" stroke="#71717a" strokeWidth="1.2" />
        <text x="28" y="19" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="8.5" fill="#71717a" fontWeight="300" letterSpacing="0.09em">ARTS</text>
        <text x="28" y="28" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7" fill="#a1a1aa" fontWeight="300" letterSpacing="0.12em">COUNCIL</text>
      </svg>
    ),
  },
  {
    name: "Kathmandu Biennale",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="w-full h-full">
        <polygon points="14,6 22,20 6,20" stroke="#71717a" strokeWidth="1.2" fill="none" />
        <text x="28" y="17" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="8" fill="#71717a" fontWeight="300" letterSpacing="0.08em">KTM</text>
        <text x="28" y="27" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7" fill="#a1a1aa" fontWeight="300" letterSpacing="0.12em">BIENNALE</text>
      </svg>
    ),
  },
  {
    name: "Ras Yatra Foundation",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="w-full h-full">
        <path d="M6 22 Q14 6 22 22" stroke="#71717a" strokeWidth="1.2" fill="none" />
        <path d="M9 22 Q14 12 19 22" stroke="#71717a" strokeWidth="1.2" fill="none" />
        <text x="28" y="17" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7.5" fill="#71717a" fontWeight="300" letterSpacing="0.08em">RAS YATRA</text>
        <text x="28" y="27" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7" fill="#a1a1aa" fontWeight="300" letterSpacing="0.12em">FOUNDATION</text>
      </svg>
    ),
  },
  {
    name: "Newa Guthi",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="w-full h-full">
        <rect x="6" y="10" width="16" height="12" stroke="#71717a" strokeWidth="1.2" rx="0" />
        <line x1="14" y1="6" x2="14" y2="10" stroke="#71717a" strokeWidth="1.2" />
        <line x1="10" y1="6" x2="18" y2="6" stroke="#71717a" strokeWidth="1.2" />
        <text x="28" y="17" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="9" fill="#71717a" fontWeight="300" letterSpacing="0.08em">NEWA</text>
        <text x="28" y="27" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7" fill="#a1a1aa" fontWeight="300" letterSpacing="0.12em">GUTHI</text>
      </svg>
    ),
  },
  {
    name: "Ministry of Culture",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" className="w-full h-full">
        <line x1="14" y1="22" x2="14" y2="8" stroke="#71717a" strokeWidth="1.2" />
        <line x1="6" y1="22" x2="22" y2="22" stroke="#71717a" strokeWidth="1.2" />
        <line x1="9" y1="18" x2="19" y2="18" stroke="#71717a" strokeWidth="1.2" />
        <line x1="11" y1="14" x2="17" y2="14" stroke="#71717a" strokeWidth="1.2" />
        <text x="28" y="17" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7" fill="#71717a" fontWeight="300" letterSpacing="0.08em">MINISTRY OF</text>
        <text x="28" y="27" fontFamily="'SF Pro Display', 'Inter', sans-serif" fontSize="7" fill="#a1a1aa" fontWeight="300" letterSpacing="0.12em">CULTURE</text>
      </svg>
    ),
  },
];

// ─── TrustedBy ────────────────────────────────────────────────────────────────
function TrustedBy() {
  return (
    <div className="p-8 md:p-12 flex flex-col justify-between h-full">
      {/* Heading */}
      <span
        className="text-xs tracking-[0.18em] uppercase text-zinc-400 font-normal mb-8 block"
        style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif" }}
      >
        Trusted by
      </span>

      {/* 3×2 logo grid */}
      <div className="grid grid-cols-3 gap-0 flex-1">
        {logos.map((logo, i) => (
          <div
            key={logo.name}
            className={[
              "flex items-center justify-start py-6 pr-4",
              // Right border on cols 0 and 1
              i % 3 !== 2 ? "border-r border-zinc-100" : "",
              // Bottom border on row 0 (indices 0–2)
              i < 3 ? "border-b border-zinc-100" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            title={logo.name}
          >
            <div className="w-20 h-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
              {logo.svg}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ number, label }) {
  return (
    <div className="flex flex-col gap-2 py-8 pr-8 border-t border-zinc-200">
      <span
        className="text-5xl md:text-6xl font-light tracking-tight text-zinc-950"
        style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif" }}
      >
        {number}
      </span>
      <span
        className="text-sm text-zinc-500 font-normal tracking-wide leading-snug max-w-[120px]"
        style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── AnimatedWord ─────────────────────────────────────────────────────────────
function AnimatedWord({ word, scrollProgress, threshold }) {
  const [color, setColor] = useState("#D9D9D9");

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const fadeStart = threshold - 0.04;
      const fadeEnd = threshold;

      if (latest >= fadeEnd) {
        setColor("#0a0a0a");
      } else if (latest >= fadeStart) {
        const t = (latest - fadeStart) / (fadeEnd - fadeStart);
        const gray = Math.round(217 - t * 207);
        setColor(`rgb(${gray}, ${gray}, ${gray})`);
      } else {
        setColor("#D9D9D9");
      }
    });
    return () => unsubscribe();
  }, [scrollProgress, threshold]);

  return (
    <span className="inline-block transition-colors duration-100" style={{ color }}>
      {word}
    </span>
  );
}

// ─── AnimatedParagraph ────────────────────────────────────────────────────────
function AnimatedParagraph({ text, scrollProgress }) {
  const words = text.split(" ");

  return (
    <p
      className="text-3xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.15] tracking-tight"
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

// ─── Works (main export) ──────────────────────────────────────────────────────
export default function Works() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end start"],
  });

  const stats = [
    { number: "50+",   label: "Performances Delivered" },
    { number: "30+",   label: "Different Cultural Locations" },
    { number: "100k+", label: "Audience Views Generated" },
    { number: "100+",  label: "Organizations Partnered With" },
  ];

  const paragraphText =
    "More than music, Dafā Sangeet is a millennium-old Newar tradition where sacred rhythms and voices unite in devotion.";

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-6 md:px-12 lg:px-20 py-24 md:py-32"
    >
      {/* ── Two-column hero row ── */}
      <div className="border border-zinc-200 grid grid-cols-1 md:grid-cols-2 mb-16 md:mb-24">
        {/* Left: animated paragraph */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-200">
          <AnimatedParagraph text={paragraphText} scrollProgress={scrollYProgress} />
        </div>

        {/* Right: Trusted By */}
        <TrustedBy />
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((stat) => (
          <StatCard key={stat.label} number={stat.number} label={stat.label} />
        ))}
      </div>
    </section>
  );
}