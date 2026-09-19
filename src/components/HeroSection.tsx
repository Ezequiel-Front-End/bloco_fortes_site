import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPANY_INFO } from '../data';

interface HeroSectionProps {
  onOpenEstimateModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEstimateModal,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenEstimateModal();
    }
  };

  return (
    <section
      id="home"
      aria-label="Fábrica de Blocos de Concreto & Materiais de Construção - Destaque"
      className="relative min-h-[480px] lg:min-h-[540px] bg-[#0B1320] text-white overflow-hidden flex items-center pt-6 pb-12 lg:py-16"
    >
      {/* Background Image with optimized accessibility overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1600&q=80"
          alt="Canteiro de obras com alvenaria de blocos de concreto estruturais alinhados e paletes de materiais"
          className="w-full h-full object-cover object-center sm:object-[center_35%] opacity-30 filter brightness-90 contrast-105"
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
        />
        {/* Multilayer gradient matching the dark blue screenshot ambience */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320] via-[#0B1320]/95 to-[#0B1320]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-[#0B1320]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Left-Aligned Information Container (Right side left intentionally open) */}
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Geometric Accent Frame Wrapper */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-5 sm:pl-7 py-2"
          >
            {/* Orange L-bracket corner border matching design */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 border-t-[3px] border-l-[3px] border-orange-500 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-7 h-7 border-b-[3px] border-l-[3px] border-orange-500 pointer-events-none"
            />

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Blocos de Concreto de Alta Resistência para sua{' '}
              <span className="text-orange-500 inline-block font-black">
                Obra &amp; Construção
              </span>
            </h1>

            <p className="mt-3.5 text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
              Fábrica especializada em blocos estruturais, de vedação, canaletas e pisos intertravados com certificação ABNT e entrega rápida paletizada.
            </p>
          </motion.div>

          {/* Action Buttons: Request Estimate & Call Now */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-0.5"
          >
            <a
              id="hero-cta-request-service"
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm sm:text-base transition-all shadow-lg shadow-orange-500/25 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none cursor-pointer"
            >
              <span>Solicitar Cotação de Blocos</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              id="hero-cta-call-phone"
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold px-5 py-3 rounded-xl border border-slate-700/80 hover:border-orange-500/50 transition-all text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
            >
              <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span>Vendas: {COMPANY_INFO.phone}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
