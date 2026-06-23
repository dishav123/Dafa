// VideoMuseum.jsx
// Drop this component anywhere in your React project.
// Requires: framer-motion, tailwindcss
// Font: Add <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"> to your index.html

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Kanti2 from "../assets/Kanti2.png"; 
import PanchaBuddha from "../assets/PanchaBuddhaT.png";
import Sundari from "../assets/SundariT.png";
import Ayala from "../assets/AyalaSundarT.png";
import Ganga from "../assets/GangaMaiT.png";
import Hari from "../assets/HariNamT.png";

// ─── Data ────────────────────────────────────────────────────────────────────
// thumbnail: import your image at the top and reference it here
// progress:  0–100, shows a red watched-progress bar at thumbnail bottom (0 = none)
const videoData = [
  {
    id: 1,
    title: "Dafa Music l Pancha Buddha l पञ्च बुद्ध l",
    channel: "Bipu Shrestha",
    views: "324",
    age: "2 days ago",
    duration: "4:38",
    progress: 38,
    thumbnail: PanchaBuddha, 
    youtubeUrl: "https://youtube.com",
  },
  {
    id: 2,
    title: "Dafa Music l Ganga Mai l गंगा माई l Song of Rain l",
    channel: "Bipu Shrestha",
    views: "1.6K",
    age: "8 days ago",
    duration: "5:48",
    progress: 15,
    thumbnail: Ganga,
    youtubeUrl: "https://www.youtube.com/watch?v=DnzsUqlPVEE&list=RDDnzsUqlPVEE&start_radio=1",
  },
  {
    id: 3,
    title: "Dafa Music ! Hari Naam.",
    channel: "Bipu Shrestha",
    views: "4.8K",
    age: "180 days ago",
    duration: "21:15",
    progress: 0,
    thumbnail: Hari,
    youtubeUrl: "https://www.youtube.com/watch?v=mAJ7CeDu1jI&t=343s",
  },
  {
    id: 4,
    title: "Dafa Music । Raag: Sarang । Ayala Sundar । आयल सुन्दर",
    channel: "Bipu Shrestha",
    views: "18K",
    age: "4 months ago",
    duration: "6:40",
    progress: 90,
    thumbnail: Ayala,
    youtubeUrl: "https://www.youtube.com/watch?v=kDpvEowqrlQ",
  },
  {
    id: 5,
    title: "Dafa Music । कान्ति भैरव । Kanti Bhairav ।",
    channel: "Bipu Shrestha",
    views: "2.3K",
    age: "30 days ago",
    duration: "10:13",
    progress: 10,
    thumbnail: Kanti2, 
    youtubeUrl: "https://www.youtube.com/watch?v=6UJAUoVQRkE",
  },
  {
    id: 6,
    title: "Dafa Music: Love song । सुन्दरी पियारी । Sundari Piyari",
    channel: "Bipu Shrestha",
    views: "1.5K",
    age: "1 year ago",
    duration: "8:51",
    progress: 70,
    thumbnail: Sundari,
    youtubeUrl: "https://youtube.com",
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────
const PlayTriangle = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const VideoPlaceholderIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    stroke="#404040"
    strokeWidth="1.2"
    fill="none"
    strokeLinecap="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const VerifiedIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#aaaaaa"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12l2 2 4-4" />
    <path d="M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    stroke="white"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const DotsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <circle cx="12" cy="5" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="12" cy="19" r="1.8" />
  </svg>
);

// ─── Thumbnail placeholder gradients ─────────────────────────────────────────
const placeholderGradients = [
  ["#1a1a2e", "#16213e"],
  ["#0d1b2a", "#1b263b"],
  ["#1a0a0a", "#2d1515"],
  ["#0a1a0a", "#152d15"],
  ["#1a1a0a", "#2d2d15"],
  ["#0a0a1a", "#15152d"],
];

// ─── Single Video Card ────────────────────────────────────────────────────────
const VideoCard = ({ video, index }) => {
  const [hovered, setHovered] = useState(false);
  const [g1, g2] = placeholderGradients[index % placeholderGradients.length];

  const handleClick = () => {
    window.open(video.youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="flex flex-col gap-2 cursor-pointer"
      style={{ fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* ── Thumbnail ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9", borderRadius: "10px", background: "#272727" }}
      >
        {/* Image or placeholder */}
        <motion.div
          className="w-full h-full"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${g1}, ${g2})`,
              }}
            >
              <VideoPlaceholderIcon />
            </div>
          )}
        </motion.div>

        {/* Duration badge — always visible */}
        <div
          className="absolute bottom-1.5 right-1.5 text-white font-bold"
          style={{
            background: "rgba(0,0,0,0.88)",
            fontSize: "11px",
            padding: "1px 5px",
            borderRadius: "3px",
            letterSpacing: "0.02em",
            lineHeight: "1.65",
          }}
        >
          {video.duration}
        </div>

        {/* Progress bar — shown if progress > 0 */}
        {video.progress > 0 && (
          <div
            className="absolute bottom-0 left-0"
            style={{
              width: "100%",
              height: "3px",
              background: "#717171",
            }}
          >
            <div
              style={{
                width: `${video.progress}%`,
                height: "100%",
                background: "#ff0000",
                borderRadius: "0 2px 0 0",
              }}
            />
          </div>
        )}

        {/* Hover: play overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: "10px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#ff0000",
                  borderRadius: "50%",
                }}
              >
                <PlayTriangle size={14} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover: Save button (top-left) */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              className="absolute top-2 left-2 flex items-center gap-1 text-white"
              style={{
                background: "rgba(0,0,0,0.78)",
                border: "none",
                borderRadius: "3px",
                padding: "4px 8px",
                fontSize: "11px",
                fontWeight: "500",
                fontFamily: "'Roboto', sans-serif",
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ClockIcon />
              Save
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hover: ⋮ menu button (top-right) */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              className="absolute top-2 right-2 flex items-center justify-center"
              style={{
                background: "rgba(0,0,0,0.78)",
                border: "none",
                borderRadius: "50%",
                width: "26px",
                height: "26px",
                cursor: "pointer",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <DotsIcon />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Card Metadata ── */}
      <div className="flex gap-2 items-start">
        {/* Channel avatar */}
        <div
          className="flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#ff0000",
          }}
        >
          <PlayTriangle size={12} />
        </div>

        {/* Text info */}
        <div className="flex flex-col min-w-0" style={{ gap: "2px" }}>
          {/* Title */}
          <p
            className="leading-snug"
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: hovered ? "#ffffff" : "#f1f1f1",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              letterSpacing: "0",
              transition: "color 0.15s ease",
            }}
          >
            {video.title}
          </p>

          {/* Channel name + verified */}
          <div
            className="flex items-center gap-1"
            style={{ fontSize: "12px", color: "#aaaaaa" }}
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {video.channel}
            </span>
            <VerifiedIcon />
          </div>

          {/* Views · Age */}
          <div
            className="flex items-center gap-1"
            style={{ fontSize: "12px", color: "#717171" }}
          >
            <span>{video.views} views</span>
            <span
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "#717171",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span>{video.age}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Video Museum Section ─────────────────────────────────────────────────────
const ShowVideo = () => {
  return (
    <section
      className="w-full px-5 md:px-12 lg:px-20 py-8 md:py-12 mt-5 rounded-2xl"
      style={{
        background: "#0f0f0f",
        fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Section heading */}
      <div className="mb-6 md:mb-8">
        <p
          style={{
            fontSize: "10px",
            fontWeight: "400",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "6px",
          }}
        >
          Curated collection
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 3.5vw, 38px)",
            fontWeight: "400",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            color: "#ffffff",
          }}
        >
          Video{" "}
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>
            Museum
          </em>
        </h2>
      </div>

      {/* Grid: 2 cols mobile → 3 cols tablet → 6 cols desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {videoData.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ShowVideo;