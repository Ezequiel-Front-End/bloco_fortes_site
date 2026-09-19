import React from 'react';
import { Blocks, Truck, Building2, FileCheck2, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SERVICES_LIST, COMPANY_INFO } from '../data';

interface ServicesSectionProps {
  onSelectServiceForEstimate: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEstimate,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Map icon keys to accessible SVG lucide icons matching the design
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'structural':
        return <Blocks className="w-5 h-5" aria-hidden="true" />;
      case 'delivery':
        return <Truck className="w-5 h-5" aria-hidden="true" />;
      case 'wholesale':
        return <Building2 className="w-5 h-5" aria-hidden="true" />;
      case 'testing':
      default:
        return <FileCheck2 className="w-5 h-5" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 sm:py-24 bg-[#0B1320] text-white relative overflow-hidden"
    >
      {/* Background Image with dark overlay (Fábrica / Empresa) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div 
          className="absolute inset-0 bg-[url('/factory-bg.jpg')] bg-fixed bg-cover bg-center opacity-30 filter brightness-75 contrast-110" 
          aria-hidden="true" 
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-[#0B1320]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Factory Logistics Photo with "12+ Anos de Fábrica" Badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 order-2 lg:order-1 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo: Concrete blocks manufacturing and logistics */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/services-img.jpg"
                  alt="Caminhão munk entregando paletes de blocos de concreto estruturais na obra"
                  className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={687}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay: 12+ Anos de Fábrica */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
                  id="badge-experience"
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0E1B2E]/95 backdrop-blur-md border border-orange-500/40 rounded-xl px-5 py-3 shadow-2xl flex items-center gap-3"
                >
                  <span className="text-3xl sm:text-4xl font-black text-orange-500 leading-none">
                    {COMPANY_INFO.experienceYears}+
                  </span>
                  <div className="text-xs font-bold text-white uppercase tracking-wider leading-tight">
                    Anos de <br />
                    Fábrica
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Complete Block Solutions List */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            {/* Tag / Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2"
            >
              <span className="w-2.5 h-1 bg-orange-500 rounded-sm" aria-hidden="true" />
              <span className="text-orange-500 text-xs font-bold tracking-wider uppercase">
                Soluções para Construtores
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
              id="services-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
            >
              Soluções em Alvenaria de Blocos
            </motion.h2>

            {/* List of 4 Services */}
            <div className="space-y-3 pt-1">
              {SERVICES_LIST.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: shouldReduceMotion ? 0 : 0.15 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group bg-[#0E1A2E]/60 hover:bg-[#0E1A2E] border border-slate-800/90 hover:border-orange-500/50 rounded-xl p-4 sm:p-5 transition-all flex items-start gap-4 cursor-pointer focus-within:ring-2 focus-within:ring-orange-500"
                  onClick={() => onSelectServiceForEstimate(service.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectServiceForEstimate(service.title);
                    }
                  }}
                  aria-label={`${service.title} - Clique para cotar ou obter atendimento técnico`}
                >
                  {/* Service Icon with orange accent container */}
                  <div
                    className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors mt-0.5"
                    aria-hidden="true"
                  >
                    {getServiceIcon(service.iconName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-xs text-orange-500 font-bold sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Cotar <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

