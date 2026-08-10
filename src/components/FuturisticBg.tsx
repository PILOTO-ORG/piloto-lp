// Fundo SVG animado — estética futurista de "piloto de sistemas de IA":
// grade em perspectiva, orbs de gradiente pulsantes e anéis de radar/scan.
const FuturisticBg = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="orbA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbC" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="scan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#334155" strokeOpacity="0.25" strokeWidth="1" />
          </pattern>
        </defs>

        {/* grade sutil */}
        <rect width="1440" height="900" fill="url(#grid)" className="pf-grid" />

        {/* orbs de gradiente flutuando */}
        <circle cx="260" cy="220" r="320" fill="url(#orbA)" className="pf-orb pf-orb-a" />
        <circle cx="1180" cy="180" r="300" fill="url(#orbB)" className="pf-orb pf-orb-b" />
        <circle cx="820" cy="720" r="360" fill="url(#orbC)" className="pf-orb pf-orb-c" />

        {/* anéis de radar (scan) */}
        <g transform="translate(1180 640)" opacity="0.5">
          <circle r="60" fill="none" stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="1" className="pf-ring pf-ring-1" />
          <circle r="60" fill="none" stroke="#22d3ee" strokeOpacity="0.25" strokeWidth="1" className="pf-ring pf-ring-2" />
          <circle r="60" fill="none" stroke="#22d3ee" strokeOpacity="0.18" strokeWidth="1" className="pf-ring pf-ring-3" />
        </g>

        {/* linha de varredura horizontal */}
        <rect x="0" y="0" width="1440" height="2" fill="url(#scan)" className="pf-scan" />
      </svg>
      <div className="absolute inset-0 bg-gray-900/40" />
    </div>
  );
};

export default FuturisticBg;
