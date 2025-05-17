import React from "react";

// Minimal, modern SVG logo for Lingua Forge: a stylized speech bubble and book, evoking language and knowledge
const LinguaForgeLogo: React.FC<{ size?: number | string; className?: string }> = ({ size = 48, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Lingua Forge logo"
    role="img"
  >
    {/* Speech bubble */}
    <rect x="6" y="8" width="36" height="26" rx="8" fill="#22223B" />
    {/* Book pages */}
    <path
      d="M16 17C18.5 15 24 15 24 21C24 15 29.5 15 32 17"
      stroke="#F2E9E4"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Sparkle for 'forge'/creativity */}
    <circle cx="36" cy="14" r="2.2" fill="#C9ADA7" />
    {/* Subtle shadow for depth */}
    <ellipse cx="24" cy="38.5" rx="13" ry="2.5" fill="#C9ADA7" fillOpacity="0.18" />
  </svg>
);

export default LinguaForgeLogo;
