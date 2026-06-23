import { useState } from "react";
import { motion } from "framer-motion";

import MahalaxmiMB from "../assets/MahalaxmiMB.png";
import Echoes from "../assets/Echoes.jpeg";
import Echoes2 from "../assets/Echoes2.png";
import Kanti from "../assets/Kanti.png";
import Kanti2 from "../assets/kanti2.png";
import Echoes3 from "../assets/Echoes3.jpeg";
import Echoes4 from "../assets/Echoes4.jpeg";
import KGH1 from "../assets/KGH1.png";
import KGH2 from "../assets/KGH2.png";
// ─── Gallery data ─────────────────────────────────────────────────────────────
const galleryItems = [
  { id: 1, src: Echoes2, alt: "Mahalaxmi temple deity" },
  { id: 2, src: Echoes,           alt: "Portrait of man in Vans cap" },
  { id: 3, src: Kanti,           alt: "Extreme macro skin texture" },
  { id: 4, src: KGH1,           alt: "Motion blur through green foliage" },
  { id: 5, src: Echoes3,           alt: "Golden tree in dynamic blur" },
  { id: 6, src: KGH2,           alt: "Baseball player in red helmet" },
];

// ─── GalleryCard ─────────────────────────────────────────────────────────────
// Hovered card expands to fill ~60% of row; siblings compress into thin pillars.
function GalleryCard({ item, hoveredId, onHover, onLeave }) {
  const isActive  = hoveredId === item.id;
  const isSibling = hoveredId !== null && !isActive;

  const flexValue = isActive ? "5 1 0%" : isSibling ? "0.2 1 0%" : "1 1 0%";

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer h-full"
      style={{ minWidth: 0 }}
      initial={{ flex: "1 1 0%" }}
      animate={{ flex: flexValue }}
      transition={{ type: "spring", stiffness: 180, damping: 26, mass: 1 }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={onLeave}
    >
      {/* Image scales subtly on expand */}
      <motion.div
        className="w-full h-full"
        animate={{ scale: isActive ? 1.04 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ height: "100%" }}
      >
        {item.src ? (
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}
      </motion.div>

      {/* Subtle vignette — lightens when active so image is fully readable */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
        animate={{ opacity: isActive ? 0.4 : 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

// ─── ShowGallery ──────────────────────────────────────────────────────────────
export default function ShowGallery() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      className="w-full bg-black px-6 md:px-12 lg:px-16 py-16 md:py-24 rounded-2xl"
      style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif" }}
    >
      {/* ── Heading ── */}
      <h2 className="text-white text-2xl md:text-4xl font-light tracking-tight mb-10 md:mb-14">
        Event Museum Gallery
      </h2>

      {/* ── Desktop: horizontal pillar gallery ── */}
      {/* overflow-hidden stops cards bleeding outside container during spring animation */}
      <div
        className="hidden md:flex gap-[5px] w-full overflow-hidden"
        style={{ height: "clamp(400px, 58vh, 640px)" }}
      >
        {galleryItems.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>

      {/* ── Mobile: simple stacked cards ── */}
      <div className="flex md:hidden flex-col gap-3 w-full">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="relative w-full overflow-hidden"
            style={{ height: 200 }}
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-zinc-800" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}