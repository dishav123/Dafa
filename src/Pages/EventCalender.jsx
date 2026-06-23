// EventCalendar.jsx — Project Baja Nepal
// <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">

const events = [
  {
    id: 1,
    day: "Wed",
    date: "28",
    location: "Khokana, Lalitpur",
    title: "Echoes in the valley",
    description:
      "A ceremonial opening performance marking the launch of the archive — featuring senior Dafā practitioners from Bhaktapur.",
    organizer: "Echoes in the Valley",
    bg: "rgba(255, 235, 230, 1)",
    dateColor: "#E8603C",
    accent: "#E8603C",
    border: "rgba(232, 96, 60, 0.15)",
  },
  {
    id: 2,
    day: "Fri",
    date: "30",
    location: "Patan Museum, Lalitpur",
    title: "Intergenerational Workshop",
    description:
      "Youth musicians learn foundational Dafā rhythms directly from elder guthi members in a structured hands-on session.",
    organizer: "Newa Guthi & Project Baja",
    bg: "rgba(229, 242, 255, 1)",
    dateColor: "#2C7BE5",
    accent: "#2C7BE5",
    border: "rgba(44, 123, 229, 0.15)",
  },
  {
    id: 3,
    day: "Sun",
    date: "02",
    location: "Durbar Square, Bhaktapur",
    title: "Panchadan Festival Performance",
    description:
      "A full moon evening performance of traditional Dafā Bhajan in the open courtyards of Bhaktapur's historic palace square.",
    organizer: "Bhaktapur Municipality",
    bg: "rgba(225, 245, 237, 1)",
    dateColor: "#1A9E75",
    accent: "#1A9E75",
    border: "rgba(26, 158, 117, 0.15)",
  },
  {
    id: 4,
    day: "Tue",
    date: "11",
    location: "Kathmandu University, Dhulikhel",
    title: "Archive Documentation Session",
    description:
      "Community recording session — participants help transcribe and tag oral recordings from the 2023 field collection.",
    organizer: "Project Baja Nepal",
    bg: "rgba(240, 234, 255, 1)",
    dateColor: "#7C3AED",
    accent: "#7C3AED",
    border: "rgba(124, 58, 237, 0.15)",
  },
  {
    id: 5,
    day: "Sat",
    date: "16",
    location: "Asan Tole, Kathmandu",
    title: "Street Heritage Walk",
    description:
      "A guided walk through Asan's historic guthi houses with live Dafā performances at key ceremonial courtyards.",
    organizer: "Kathmandu Heritage Walks",
    bg: "rgba(255, 248, 224, 1)",
    dateColor: "#C47F17",
    accent: "#C47F17",
    border: "rgba(196, 127, 23, 0.15)",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const PinIcon = ({ color }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 21c-4-4-7-7.5-7-10.5a7 7 0 1114 0C19 13.5 16 17 12 21z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const UserIcon = ({ color }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ─── Layout constants ─────────────────────────────────────────────────────────
// DATE_W + DIVIDER + LOCATION_W + DIVIDER = fixed left region
// Everything after is the description column — starts at exact same x on every card
const DATE_W   = 64;   // px — date block width
const LOC_W    = 160;  // px — location block fixed width (enough for longest location)
const GAP      = 1;    // divider line width
const PAD      = 20;   // outer card padding

// ─── EventCard ────────────────────────────────────────────────────────────────
function EventCard({ event }) {
  return (
    <div
      style={{
        background: event.bg,
        border: `1px solid ${event.border}`,
        borderRadius: "16px",
        padding: `14px ${PAD}px`,
        fontFamily: "'Manrope', sans-serif",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        // Mobile: stack vertically. Desktop: row.
        display: "grid",
        gridTemplateColumns: `${DATE_W}px 1px ${LOC_W}px 1px 1fr`,
        gridTemplateRows: "auto",
        alignItems: "center",
        gap: 0,
      }}
      className="event-card"
    >
      {/* ── 1. Date ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "16px",
          gap: "2px",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: event.dateColor }}>
          {event.day}
        </span>
        <span style={{ fontSize: "34px", fontWeight: "700", lineHeight: "1", color: event.dateColor, letterSpacing: "-0.03em" }}>
          {event.date}
        </span>
      </div>

      {/* ── Divider 1 ── */}
      <div style={{ width: "1px", alignSelf: "stretch", background: event.border }} />

      {/* ── 2. Location ── */}
      <div
        style={{
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          gap: "7px",
        }}
      >
        <PinIcon color={event.accent} />
        <span style={{ fontSize: "12px", fontWeight: "500", color: "#333", lineHeight: "1.45" }}>
          {event.location}
        </span>
      </div>

      {/* ── Divider 2 ── */}
      <div style={{ width: "1px", alignSelf: "stretch", background: event.border }} />

      {/* ── 3. Description block ── */}
      <div
        style={{
          paddingLeft: "18px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "13.5px", fontWeight: "600", color: "#0f0f0f", margin: 0, lineHeight: "1.3", letterSpacing: "-0.01em" }}>
          {event.title}
        </p>
        <p style={{ fontSize: "12px", fontWeight: "400", color: "#555", margin: 0, lineHeight: "1.6" }}>
          {event.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
          <UserIcon color={event.accent} />
          <span style={{ fontSize: "11px", fontWeight: "600", color: event.accent, letterSpacing: "0.02em" }}>
            {event.organizer}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── EventCalendar ────────────────────────────────────────────────────────────
export default function EventCalendar() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');

        .event-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.07);
        }

        /* ── Mobile: stack into 2-row layout ── */
        @media (max-width: 640px) {
          .event-card {
            grid-template-columns: 52px 1fr !important;
            grid-template-rows: auto auto !important;
            row-gap: 10px !important;
            padding: 16px !important;
          }
          /* Date stays top-left, spans both rows */
          .event-card .ec-date   { grid-column: 1; grid-row: 1 / 3; align-self: start; padding-right: 12px !important; border-right: 1px solid var(--ec-border); }
          /* Dividers hidden on mobile */
          .event-card .ec-div1,
          .event-card .ec-div2   { display: none !important; }
          /* Location top-right */
          .event-card .ec-loc    { grid-column: 2; grid-row: 1; padding: 0 0 0 12px !important; }
          /* Description bottom-right */
          .event-card .ec-desc   { grid-column: 2; grid-row: 2; padding: 0 0 0 12px !important; }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          background: "#fff",
          padding: "clamp(40px, 8vw, 96px) clamp(20px, 5vw, 64px)",
          fontFamily: "'Manrope', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* ── Header ── */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a1a1aa", margin: "0 0 8px 0" }}>
            Upcoming Events
          </p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: "700", letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: "1.05", margin: 0 }}>
            Event Calendar
          </h2>
        </div>

        {/* ── Cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                background: event.bg,
                border: `1px solid ${event.border}`,
                borderRadius: "16px",
                padding: "14px 20px",
                fontFamily: "'Manrope', sans-serif",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
                display: "grid",
                gridTemplateColumns: `${DATE_W}px 1px ${LOC_W}px 1px 1fr`,
                alignItems: "center",
              }}
              className="event-card"
            >
              {/* Date */}
              <div
                className="ec-date"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingRight: "16px", gap: "2px" }}
              >
                <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: event.dateColor }}>
                  {event.day}
                </span>
                <span style={{ fontSize: "34px", fontWeight: "700", lineHeight: "1", color: event.dateColor, letterSpacing: "-0.03em" }}>
                  {event.date}
                </span>
              </div>

              {/* Divider 1 */}
              <div className="ec-div1" style={{ width: "1px", alignSelf: "stretch", background: event.border }} />

              {/* Location */}
              <div
                className="ec-loc"
                style={{ padding: "0 18px", display: "flex", alignItems: "center", gap: "7px" }}
              >
                <PinIcon color={event.accent} />
                <span style={{ fontSize: "12px", fontWeight: "500", color: "#333", lineHeight: "1.45" }}>
                  {event.location}
                </span>
              </div>

              {/* Divider 2 */}
              <div className="ec-div2" style={{ width: "1px", alignSelf: "stretch", background: event.border }} />

              {/* Description */}
              <div
                className="ec-desc"
                style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center" }}
              >
                <p style={{ fontSize: "13.5px", fontWeight: "600", color: "#0f0f0f", margin: 0, lineHeight: "1.3", letterSpacing: "-0.01em" }}>
                  {event.title}
                </p>
                <p style={{ fontSize: "12px", fontWeight: "400", color: "#555", margin: 0, lineHeight: "1.6" }}>
                  {event.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
                  <UserIcon color={event.accent} />
                  <span style={{ fontSize: "11px", fontWeight: "600", color: event.accent, letterSpacing: "0.02em" }}>
                    {event.organizer}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}