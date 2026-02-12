import React from "react";

type PawTrailHoverProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "normal";
};

/**
 * Wrap any row/card to show a subtle paw-print trail on hover.
 * - Pure CSS (Tailwind + keyframes)
 * - Monochrome, low-contrast
 * - Non-interactive overlay (pointer-events-none)
 */
export const PawTrailHover: React.FC<PawTrailHoverProps> = ({
  children,
  className = "",
  intensity = "subtle",
}) => {
  const baseOpacity = intensity === "subtle" ? "opacity-0 group-hover:opacity-60" : "opacity-0 group-hover:opacity-80";
  const color = intensity === "subtle" ? "text-gray-200" : "text-gray-300";

  return (
    <div className={`relative group ${className}`}>
      {/* Trail overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* The prints are placed along a diagonal path; each has a small delay */}
        <PawPrint
          className={`absolute left-6 bottom-4 ${color} ${baseOpacity} paw-pop paw-delay-0`}
          size={14}
          rotate={-12}
        />
        <PawPrint
          className={`absolute left-14 bottom-10 ${color} ${baseOpacity} paw-pop paw-delay-1`}
          size={12}
          rotate={8}
        />
        <PawPrint
          className={`absolute left-24 bottom-16 ${color} ${baseOpacity} paw-pop paw-delay-2`}
          size={13}
          rotate={-6}
        />
        <PawPrint
          className={`absolute left-36 bottom-24 ${color} ${baseOpacity} paw-pop paw-delay-3`}
          size={11}
          rotate={10}
        />
        <PawPrint
          className={`absolute left-48 bottom-32 ${color} ${baseOpacity} paw-pop paw-delay-4`}
          size={12}
          rotate={-8}
        />
      </div>

      {children}

      {/* Local styles (you can move this into a global CSS file if you prefer) */}
      <style>{`
        @keyframes pawPop {
          0%   { transform: translateY(2px) scale(0.96); filter: blur(0.2px); }
          100% { transform: translateY(0px) scale(1);    filter: blur(0px); }
        }
        .paw-pop {
          transition: opacity 240ms ease;
        }
        .group:hover .paw-pop {
          animation: pawPop 360ms ease-out both;
        }
        .paw-delay-0 { animation-delay: 0ms; }
        .paw-delay-1 { animation-delay: 45ms; }
        .paw-delay-2 { animation-delay: 90ms; }
        .paw-delay-3 { animation-delay: 135ms; }
        .paw-delay-4 { animation-delay: 180ms; }
      `}</style>
    </div>
  );
};

const PawPrint: React.FC<{ size?: number; rotate?: number; className?: string }> = ({
  size = 12,
  rotate = 0,
  className = "",
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* Minimal paw: 4 toes + pad */}
      <circle cx="7.2" cy="9" r="1.7" />
      <circle cx="12" cy="7.5" r="1.7" />
      <circle cx="16.8" cy="9" r="1.7" />
      <circle cx="10.2" cy="12.5" r="1.4" />
      <path d="M12 13.2c-3 0-5.2 2.2-5.2 4.4 0 1.8 1.5 3 3.3 2.7.7-.1 1.2-.4 1.9-.7.7-.3 1.2-.6 2-.6s1.3.3 2 .6c.7.3 1.2.6 1.9.7 1.8.3 3.3-.9 3.3-2.7 0-2.2-2.2-4.4-5.2-4.4H12z" />
    </svg>
  );
};
