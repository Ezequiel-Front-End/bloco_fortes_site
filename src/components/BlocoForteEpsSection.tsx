import React from 'react';
import {
  Feather,
  Thermometer,
  Volume2,
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Sliders,
  Check
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BLOCO_FORTE_EPS_DETAILS } from '../data';
import { BlockVisual } from './BlockVisual';

interface BlocoForteEpsSectionProps {
  onSimulate?: () => void;
  onOpenQuote?: (serviceOrMaterial?: string) => void;
}

export const BlocoForteEpsSection: React.FC<BlocoForteEpsSectionProps> = ({
  onSimulate,
  onOpenQuote,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const data = BLOCO_FORTE_EPS_DETAILS;

  return (
    <section
      id="bloco-forte-eps"
      aria-labelledby="bloco-forte-heading"
      className="py-16 sm:py-24 bg-[#0A101D] text-white border-t border-b border-slate-800/80 relative overflow-hidden"
    >
      {/* Background glow accents */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Brand Banner matching flyer header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800/80">
          {/* Logo Bloco Forte */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center p-1.5 shadow-lg">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* House contour */}
                <path
                  d="M15 45 L50 15 L85 45 L85 85 L15 85 Z"
                  stroke="#F97316"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
                {/* Internal block */}
                <rect x="30" y="45" width="40" height="28" rx="2" fill="#94A3B8" />
                {/* EPS middle stripe */}
                <rect x="42" y="45" width="16" height="28" fill="#FFFFFF" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white uppercase">
                  BLOCO <span className="text-orange-500">FORTE</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-500 text-slate-950">
                  Original
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-orange-400/90 font-bold uppercase tracking-wider">
                {data.tagline}
              </p>
            </div>
          </div>

          {/* Slogan pill matching flyer handwriting */}
          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-orange-500/30 shadow">
              <Sparkles className="w-4 h-4 text-orange-400" aria-hidden="true" />
              <span className="text-sm font-bold text-orange-300 italic">
                "{data.slogan}"
              </span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Hero: Product Title, 3D Visual & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual & Rendimento (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Title Callout */}
            <div className="w-full text-left mb-4">
              <div className="inline-block bg-orange-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1 rounded-md mb-2 shadow">
                NOVA TECNOLOGIA CONSTRUTIVA
              </div>
              <h2
                id="bloco-forte-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
              >
                BLOCO DE <span className="text-orange-500">CONCRETO COM EPS</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-medium mt-1">
                {data.productSubtitle}
              </p>
            </div>

            {/* 3D Visual of the block on transparent background with badge */}
            <div className="relative w-full max-w-lg aspect-4/3 flex items-center justify-center my-2">
              <BlockVisual
                type="bloco-concreto-eps"
                isHovered={true}
                className="w-full h-full"
              />

              {/* Flyer badge: "Leve, resistente e de alta qualidade!" */}
              <div className="absolute top-2 left-0 sm:left-2 -rotate-3 bg-linear-to-r from-orange-600 to-amber-500 text-white font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-xl border border-orange-300/40">
                ⭐ {data.badge}
              </div>
            </div>

            {/* Orange Rendimento Box matching flyer */}
            <div className="w-full bg-linear-to-r from-orange-600 to-orange-500 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-950 mt-4 border border-orange-400 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 text-orange-400 flex items-center justify-center shrink-0 shadow">
                  <svg
                    className="w-7 h-7 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950 text-white px-2 py-0.5 rounded">
                    {data.rendimento.title}
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight mt-0.5">
                    100 BLOCOS = APROX. <span className="text-3xl font-black text-white underline decoration-slate-950">50 m²</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                    {data.rendimento.subtext}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onSimulate}
                className="shrink-0 bg-slate-950 hover:bg-slate-900 text-orange-400 hover:text-white px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95"
              >
                <Sliders className="w-4 h-4" />
                <span>Simular Paredes</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4 Benefits & Tabela de Valores (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 4 Pillars with circular icons matching flyer */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Diferenciais Construtivos
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {/* 1. Leve */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center text-slate-950 shrink-0 shadow">
                    <Feather className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-wide">
                      LEVE
                    </h4>
                    <p className="text-xs text-slate-300 leading-tight">
                      Facilita o transporte e a execução.
                    </p>
                  </div>
                </div>

                {/* 2. Conforto Térmico */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center text-slate-950 shrink-0 shadow">
                    <Thermometer className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-wide">
                      CONFORTO TÉRMICO
                    </h4>
                    <p className="text-xs text-slate-300 leading-tight">
                      Mantém o ambiente mais agradável.
                    </p>
                  </div>
                </div>

                {/* 3. Conforto Acústico */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center text-slate-950 shrink-0 shadow">
                    <Volume2 className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-wide">
                      CONFORTO ACÚSTICO
                    </h4>
                    <p className="text-xs text-slate-300 leading-tight">
                      Reduz ruídos externos e internos.
                    </p>
                  </div>
                </div>

                {/* 4. Resistente */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center text-slate-950 shrink-0 shadow">
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-wide">
                      RESISTENTE
                    </h4>
                    <p className="text-xs text-slate-300 leading-tight">
                      Mais segurança para sua obra.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TABELA DE VALORES matching flyer layout */}
            <div className="bg-slate-900/95 border-2 border-orange-500/40 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
              {/* Header pill */}
              <div className="inline-block bg-orange-500 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-md mb-2">
                TABELA DE VALORES
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 font-mono pb-2 border-b border-slate-800">
                <span>BLOCO DE CONCRETO COM EPS</span>
                <span className="text-orange-400 font-bold">100 x 50 x 15 cm</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-800 mt-2">
                <div className="flex items-center justify-between py-2.5 text-sm font-medium">
                  <span className="text-slate-300">1 unidade</span>
                  <span className="text-lg font-black text-white">R$ 89,00</span>
                </div>
                <div className="flex items-center justify-between py-2.5 text-sm font-medium bg-orange-500/10 px-2 rounded-lg">
                  <span className="text-orange-300 font-bold">100 unidades (50 m²)</span>
                  <span className="text-xl font-black text-orange-400">R$ 8.900,00</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => onOpenQuote?.('Bloco de Concreto com EPS (100x50x15cm)')}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black py-3 rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer active:scale-95"
              >
                <span>Solicitar Cotação Direta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer info bar matching flyer footer */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-400" />
              <span>{data.conditions.delivery}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-orange-400" />
              <span>{data.conditions.payment}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{data.conditions.guarantee}</span>
            </div>
          </div>

          <div className="text-orange-400 font-extrabold italic tracking-wide text-sm">
            ✨ {data.conditions.footerSlogan}
          </div>
        </div>
      </div>
    </section>
  );
};
