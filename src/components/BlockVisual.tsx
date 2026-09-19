import React from 'react';

export type BlockType =
  | 'bloco-concreto-eps'
  | 'bloco-eps-100'
  | 'bloco-estrutural-14'
  | 'bloco-vedacao-14'
  | 'canaleta-concreto-u'
  | 'paver-intertravado-6cm'
  | 'cobogo-decorativo-concreto'
  | 'meio-bloco-estrutural'
  | 'bloco-celular-cca'
  | 'grout-alvenaria-25kg';

interface BlockVisualProps {
  type: string;
  className?: string;
  size?: number | string;
  isHovered?: boolean;
}

/**
 * Renders realistic 3D isometric concrete blocks with 100% transparent backgrounds.
 * No background color or card wrapping, pure transparent cut-out vector graphics.
 */
export const BlockVisual: React.FC<BlockVisualProps> = ({
  type,
  className = '',
  size = '100%',
  isHovered = false,
}) => {
  // Normalize type
  const normalizedType = type.toLowerCase();

  // Helper gradients and filters for authentic concrete appearance
  const sharedDefs = (
    <defs>
      {/* Concrete top face gradient */}
      <linearGradient id="concrete-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#CBD5E1" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>

      {/* Concrete left front face gradient */}
      <linearGradient id="concrete-front" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      {/* Concrete right side face gradient */}
      <linearGradient id="concrete-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748B" />
        <stop offset="50%" stopColor="#475569" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      {/* Hollow hole internal shading */}
      <linearGradient id="hollow-depth" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="60%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#090D16" />
      </linearGradient>

      {/* Paver terracotta / graphite options */}
      <linearGradient id="paver-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="60%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#C2410C" />
      </linearGradient>

      <linearGradient id="paver-front" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C2410C" />
        <stop offset="100%" stopColor="#9A3412" />
      </linearGradient>

      <linearGradient id="paver-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9A3412" />
        <stop offset="100%" stopColor="#7C2D12" />
      </linearGradient>

      {/* Ambient contact shadow underneath block (transparent feather) */}
      <radialGradient id="contact-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0, 0, 0, 0.45)" />
        <stop offset="60%" stopColor="rgba(0, 0, 0, 0.2)" />
        <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
      </radialGradient>

      {/* EPS Core gradient (pure white styrofoam beads) */}
      <linearGradient id="eps-core" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>

      <linearGradient id="eps-side" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="50%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>
    </defs>
  );

  // 0. BLOCO DE CONCRETO COM EPS (100 x 50 x 15 cm - Bloco Forte)
  if (normalizedType.includes('eps')) {
    return (
      <svg
        viewBox="0 0 420 330"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        } ${className}`}
        style={{ width: size, height: 'auto', background: 'transparent' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ilustração 3D sem fundo de Bloco de Concreto com EPS 100x50x15cm Bloco Forte"
      >
        {sharedDefs}

        {/* Ambient Contact Shadow */}
        <ellipse cx="210" cy="295" rx="160" ry="26" fill="url(#contact-shadow)" />

        {/* BACK / RIGHT CONCRETE SHELL (Thickness ~4cm) */}
        <polygon
          points="275,85 365,135 365,235 275,185"
          fill="url(#concrete-side)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* CENTRAL WHITE EPS (ISOPOR) CORE (Side Face, ~7cm thickness) */}
        <polygon
          points="240,105 275,85 275,185 240,205"
          fill="url(#eps-side)"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />

        {/* Realistic EPS beads/pearls texture on side */}
        <circle cx="250" cy="115" r="3" fill="#FFFFFF" opacity="0.9" />
        <circle cx="260" cy="120" r="2.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="248" cy="130" r="2.8" fill="#FFFFFF" opacity="0.9" />
        <circle cx="262" cy="135" r="2.4" fill="#F8FAFC" opacity="0.9" />
        <circle cx="252" cy="148" r="3.2" fill="#FFFFFF" opacity="0.9" />
        <circle cx="264" cy="155" r="2.7" fill="#E2E8F0" opacity="0.9" />
        <circle cx="248" cy="165" r="3" fill="#FFFFFF" opacity="0.9" />
        <circle cx="260" cy="175" r="2.8" fill="#F8FAFC" opacity="0.9" />
        <circle cx="250" cy="190" r="3.1" fill="#FFFFFF" opacity="0.9" />

        {/* FRONT CONCRETE SHELL (Thickness ~4cm, side view) */}
        <polygon
          points="205,125 240,105 240,205 205,225"
          fill="url(#concrete-side)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* TOP FACE: 3 Layers (Outer concrete - EPS Core - Inner concrete) */}
        {/* Top Back Concrete Layer */}
        <polygon
          points="130,40 220,90 275,85 185,35"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />
        {/* Top Middle EPS Layer (White Styrofoam) */}
        <polygon
          points="95,60 185,110 240,105 150,55"
          fill="url(#eps-core)"
          stroke="#E2E8F0"
          strokeWidth="1.2"
        />
        {/* EPS Pearls on Top Face */}
        <circle cx="125" cy="72" r="2.5" fill="#FFFFFF" />
        <circle cx="140" cy="80" r="2" fill="#E2E8F0" />
        <circle cx="160" cy="90" r="2.5" fill="#FFFFFF" />
        <circle cx="180" cy="100" r="2.2" fill="#F1F5F9" />
        <circle cx="195" cy="95" r="2" fill="#FFFFFF" />
        <circle cx="215" cy="88" r="2.5" fill="#E2E8F0" />

        {/* Top Front Concrete Layer */}
        <polygon
          points="60,80 150,130 205,125 115,75"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />

        {/* FRONT FACE (Length 100cm x Height 50cm - Big Smooth Concrete Panel) */}
        <polygon
          points="60,80 205,125 205,275 60,230"
          fill="url(#concrete-front)"
          stroke="#475569"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Subtle Concrete Panel Texture & Bevel */}
        <line x1="62" y1="83" x2="203" y2="127" stroke="#CBD5E1" strokeWidth="1" opacity="0.7" />
        <line x1="62" y1="83" x2="62" y2="228" stroke="#CBD5E1" strokeWidth="1" opacity="0.6" />
        <circle cx="90" cy="120" r="2" fill="#334155" opacity="0.4" />
        <circle cx="140" cy="150" r="2.5" fill="#334155" opacity="0.4" />
        <circle cx="110" cy="190" r="2" fill="#334155" opacity="0.4" />
        <circle cx="170" cy="220" r="2" fill="#334155" opacity="0.4" />

        {/* Orange Accent Callout: "100 x 50 x 15 cm" */}
        <g transform="translate(48, 250)">
          <rect x="0" y="0" width="112" height="22" rx="6" fill="#0F172A" stroke="#F97316" strokeWidth="1.2" />
          <text x="56" y="15" fill="#F97316" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            100 x 50 x 15 cm
          </text>
        </g>

        {/* Floating EPS Core Zoom Bubble */}
        <g transform="translate(295, 35)">
          <circle cx="35" cy="35" r="34" fill="#0B1220" stroke="#F97316" strokeWidth="2" />
          {/* Zoomed Styrofoam Pearls */}
          <circle cx="35" cy="35" r="30" fill="#F8FAFC" />
          <circle cx="22" cy="25" r="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="34" cy="22" r="5.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="47" cy="28" r="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="26" cy="36" r="5" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="37" cy="36" r="6.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <circle cx="48" cy="42" r="5" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="28" cy="48" r="5.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="39" cy="49" r="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Badge under bubble */}
          <rect x="-2" y="72" width="74" height="18" rx="5" fill="#EA580C" />
          <text x="35" y="84" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            MIOLO EPS
          </text>
        </g>
      </svg>
    );
  }

  // 1. BLOCO ESTRUTURAL 14x19x39 (2 hollow cells with thick load-bearing concrete ribs)
  if (normalizedType.includes('estrutural-14') || normalizedType.includes('estrutural')) {
    return (
      <svg
        viewBox="0 0 400 320"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        } ${className}`}
        style={{ width: size, height: 'auto', background: 'transparent' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ilustração 3D sem fundo do Bloco Estrutural 14x19x39"
      >
        {sharedDefs}

        {/* Realistic contact shadow on transparent ground */}
        <ellipse cx="200" cy="285" rx="145" ry="24" fill="url(#contact-shadow)" />

        {/* Left Front Face (Length 39cm) */}
        <polygon
          points="60,150 200,225 200,275 60,200"
          fill="url(#concrete-front)"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Right Face (Width 14cm) */}
        <polygon
          points="200,225 340,150 340,200 200,275"
          fill="url(#concrete-side)"
          stroke="#334155"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Top Face Outline */}
        <polygon
          points="200,75 340,150 200,225 60,150"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Hollow Hole 1 (Left Cell) */}
        <polygon
          points="130,125 185,155 155,172 100,142"
          fill="url(#hollow-depth)"
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Hollow Hole 1 Inner Wall Depth */}
        <polygon
          points="100,142 155,172 155,220 100,190"
          fill="#0B1320"
          opacity="0.9"
        />
        <polygon
          points="155,172 185,155 185,205 155,220"
          fill="#1E293B"
          opacity="0.95"
        />

        {/* Hollow Hole 2 (Right Cell) */}
        <polygon
          points="215,171 270,141 298,157 245,187"
          fill="url(#hollow-depth)"
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Hollow Hole 2 Inner Wall Depth */}
        <polygon
          points="245,187 298,157 298,207 245,237"
          fill="#1E293B"
          opacity="0.95"
        />
        <polygon
          points="215,171 245,187 245,237 215,221"
          fill="#0B1320"
          opacity="0.9"
        />

        {/* Center Rib Highlight line */}
        <line x1="185" y1="155" x2="215" y2="171" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="200" y1="75" x2="200" y2="225" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    );
  }

  // 2. BLOCO DE VEDAÇÃO 14x19x39 (3 hollow cells, thinner walls)
  if (normalizedType.includes('vedacao')) {
    return (
      <svg
        viewBox="0 0 400 320"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        } ${className}`}
        style={{ width: size, height: 'auto', background: 'transparent' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ilustração 3D sem fundo do Bloco de Vedação"
      >
        {sharedDefs}
        {/* Contact shadow */}
        <ellipse cx="200" cy="285" rx="145" ry="24" fill="url(#contact-shadow)" />

        {/* Left Front Face */}
        <polygon
          points="60,150 200,225 200,275 60,200"
          fill="url(#concrete-front)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Right Side Face */}
        <polygon
          points="200,225 340,150 340,200 200,275"
          fill="url(#concrete-side)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Top Face */}
        <polygon
          points="200,75 340,150 200,225 60,150"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Cell 1 */}
        <polygon
          points="105,138 140,157 122,167 87,148"
          fill="url(#hollow-depth)"
          stroke="#475569"
        />
        <polygon points="87,148 122,167 122,215 87,196" fill="#0B1320" opacity="0.9" />

        {/* Cell 2 */}
        <polygon
          points="160,167 195,186 215,175 180,156"
          fill="url(#hollow-depth)"
          stroke="#475569"
        />
        <polygon points="160,167 195,186 195,234 160,215" fill="#0B1320" opacity="0.9" />

        {/* Cell 3 */}
        <polygon
          points="235,175 270,156 295,170 260,189"
          fill="url(#hollow-depth)"
          stroke="#475569"
        />
        <polygon points="260,189 295,170 295,218 260,237" fill="#1E293B" opacity="0.95" />
      </svg>
    );
  }

  // 3. CANALETA EM "U" 14x19x39 (Open top trough channel)
  if (normalizedType.includes('canaleta')) {
    return (
      <svg
        viewBox="0 0 400 320"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        } ${className}`}
        style={{ width: size, height: 'auto', background: 'transparent' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ilustração 3D sem fundo da Canaleta U de Concreto"
      >
        {sharedDefs}
        {/* Contact shadow */}
        <ellipse cx="200" cy="285" rx="145" ry="24" fill="url(#contact-shadow)" />

        {/* Left Front Face */}
        <polygon
          points="60,150 200,225 200,275 60,200"
          fill="url(#concrete-front)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Right U Section Edge (shows the actual U profile) */}
        <polygon
          points="200,225 340,150 340,200 200,275"
          fill="url(#concrete-side)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Top Rim Walls */}
        {/* Front top rim */}
        <polygon
          points="60,150 200,225 185,217 75,142"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
        />

        {/* Back top rim */}
        <polygon
          points="185,83 325,158 340,150 200,75"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
        />

        {/* Internal Channel Trough Floor and walls */}
        <polygon
          points="75,142 185,217 325,158 185,83"
          fill="url(#hollow-depth)"
        />
        {/* Internal trough bottom */}
        <polygon
          points="105,178 185,221 295,162 215,119"
          fill="#1E293B"
          opacity="0.8"
        />
        <polygon
          points="75,142 105,178 185,221 185,217"
          fill="#0B1320"
          opacity="0.95"
        />
      </svg>
    );
  }

  // 4. PISO INTERTRAVADO PAVER (Holandês / 16 faces)
  if (normalizedType.includes('paver') || normalizedType.includes('intertravado')) {
    return (
      <svg
        viewBox="0 0 400 320"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        } ${className}`}
        style={{ width: size, height: 'auto', background: 'transparent' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ilustração 3D sem fundo do Piso Intertravado Paver"
      >
        {sharedDefs}
        {/* Contact shadow */}
        <ellipse cx="200" cy="270" rx="130" ry="20" fill="url(#contact-shadow)" />

        {/* Paver 1 (Main Red/Terracotta Paver) */}
        {/* Front face */}
        <polygon
          points="100,170 210,230 210,260 100,200"
          fill="url(#paver-front)"
          stroke="#9A3412"
          strokeWidth="1.5"
        />
        {/* Right side face */}
        <polygon
          points="210,230 300,180 300,210 210,260"
          fill="url(#paver-side)"
          stroke="#7C2D12"
          strokeWidth="1.5"
        />
        {/* Top beveled face */}
        <polygon
          points="190,120 300,180 210,230 100,170"
          fill="url(#paver-top)"
          stroke="#FDBA74"
          strokeWidth="1.5"
        />
        {/* Chamfer highlight */}
        <polyline
          points="102,170 210,228 298,180"
          stroke="#FED7AA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        {/* Second Interlocked Paver (Gray Concrete Paver behind) */}
        <polygon
          points="190,120 280,70 370,120 280,170"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        <polygon
          points="280,170 370,120 370,150 280,200"
          fill="url(#concrete-side)"
          stroke="#334155"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // 5. MEIO BLOCO ESTRUTURAL 14x19x19 (Single center hollow cell)
  if (normalizedType.includes('meio-bloco') || normalizedType.includes('meio')) {
    return (
      <svg
        viewBox="0 0 400 320"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        } ${className}`}
        style={{ width: size, height: 'auto', background: 'transparent' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ilustração 3D sem fundo do Meio Bloco de Concreto"
      >
        {sharedDefs}
        {/* Contact shadow */}
        <ellipse cx="200" cy="275" rx="100" ry="20" fill="url(#contact-shadow)" />

        {/* Left Front Face (Square 19x19cm) */}
        <polygon
          points="120,165 200,210 200,265 120,220"
          fill="url(#concrete-front)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Right Side Face (14cm) */}
        <polygon
          points="200,210 280,165 280,220 200,265"
          fill="url(#concrete-side)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Top Face */}
        <polygon
          points="200,120 280,165 200,210 120,165"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Single Hollow Cell */}
        <polygon
          points="155,160 200,185 245,160 200,135"
          fill="url(#hollow-depth)"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <polygon
          points="155,160 200,185 200,230 155,205"
          fill="#0B1320"
          opacity="0.9"
        />
        <polygon
          points="200,185 245,160 245,205 200,230"
          fill="#1E293B"
          opacity="0.95"
        />
      </svg>
    );
  }

  // 6. COBOGÓ DECORATIVO DE CONCRETO (Architectural hollow block)
  if (normalizedType.includes('cobogo') || normalizedType.includes('decorativo')) {
    return (
      <svg
        viewBox="0 0 400 320"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        } ${className}`}
        style={{ width: size, height: 'auto', background: 'transparent' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ilustração 3D sem fundo do Cobogó Decorativo de Concreto"
      >
        {sharedDefs}
        <ellipse cx="200" cy="280" rx="120" ry="20" fill="url(#contact-shadow)" />

        {/* Main outer cuboid */}
        <polygon
          points="100,150 200,210 200,270 100,210"
          fill="url(#concrete-front)"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <polygon
          points="200,210 300,150 300,210 200,270"
          fill="url(#concrete-side)"
          stroke="#334155"
          strokeWidth="1.5"
        />
        <polygon
          points="200,90 300,150 200,210 100,150"
          fill="url(#concrete-top)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* 4 Quadrant Architectural Geometric Cutouts */}
        {/* Cutout Top Left */}
        <polygon points="135,135 160,150 160,175 135,160" fill="url(#hollow-depth)" stroke="#334155" />
        {/* Cutout Top Right */}
        <polygon points="175,150 200,135 200,160 175,175" fill="url(#hollow-depth)" stroke="#334155" />
        {/* Cutout Bottom Left */}
        <polygon points="135,175 160,190 160,215 135,200" fill="url(#hollow-depth)" stroke="#334155" />
        {/* Cutout Bottom Right */}
        <polygon points="175,190 200,175 200,200 175,215" fill="url(#hollow-depth)" stroke="#334155" />

        {/* Side geometric light passes through */}
        <polygon points="220,180 265,152 265,178 220,205" fill="#1E293B" opacity="0.9" />
      </svg>
    );
  }

  // 7. BLOCO CELULAR (CCA) / GROUT / DEFAULT CONCRETE BLOCK
  return (
    <svg
      viewBox="0 0 400 320"
      className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
        isHovered ? 'scale-105 -translate-y-1' : ''
      } ${className}`}
      style={{ width: size, height: 'auto', background: 'transparent' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ilustração 3D sem fundo de Bloco de Concreto"
    >
      {sharedDefs}
      <ellipse cx="200" cy="285" rx="145" ry="24" fill="url(#contact-shadow)" />

      {/* Front Face */}
      <polygon
        points="60,140 200,215 200,270 60,195"
        fill="url(#concrete-front)"
        stroke="#475569"
        strokeWidth="1.5"
      />
      {/* Side Face */}
      <polygon
        points="200,215 340,140 340,195 200,270"
        fill="url(#concrete-side)"
        stroke="#334155"
        strokeWidth="1.5"
      />
      {/* Top Face */}
      <polygon
        points="200,65 340,140 200,215 60,140"
        fill="url(#concrete-top)"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Micro cellular pores texture */}
      <circle cx="120" cy="180" r="2.5" fill="#334155" opacity="0.6" />
      <circle cx="160" cy="195" r="3" fill="#334155" opacity="0.6" />
      <circle cx="140" cy="230" r="2.5" fill="#334155" opacity="0.6" />
      <circle cx="240" cy="190" r="3" fill="#1E293B" opacity="0.6" />
      <circle cx="280" cy="170" r="2" fill="#1E293B" opacity="0.6" />
      <circle cx="180" cy="120" r="2.5" fill="#64748B" opacity="0.6" />
      <circle cx="220" cy="130" r="3" fill="#64748B" opacity="0.6" />
    </svg>
  );
};
