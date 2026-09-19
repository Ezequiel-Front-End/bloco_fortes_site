import React from 'react';
import { Plus } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { WELCOME_POINTS } from '../data';

export const WelcomeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="welcome-heading"
      className="py-16 sm:py-24 bg-[#080E18] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Checklist */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Tag / Eyebrow matching design */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-1 bg-orange-500 rounded-sm" aria-hidden="true" />
              <span className="text-orange-500 text-xs font-bold tracking-wider uppercase">
                Bem-vindo à FlowBlocos Materiais
              </span>
            </div>

            <h2
              id="welcome-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
            >
              Estrutura Sólida e Eficiência para sua Obra
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Fornecemos blocos de concreto com geometria rigorosa, arestas perfeitas e alta resistência à compressão para acelerar o ritmo da sua construção com economia real e desperdício zero.
            </p>

            {/* 6 Feature Bullets with '+' icons matching design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4">
              {WELCOME_POINTS.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : 0.15 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center text-orange-500 bg-orange-500/10 border border-orange-500/30 shrink-0 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors"
                    aria-hidden="true"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-100 group-hover:text-orange-400 transition-colors">
                      {point.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bathroom image with orange geometric frame & dot grid */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 45 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Orange Geometric Accent Frame behind image matching design */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 w-48 h-48 border-t-[3px] border-r-[3px] border-orange-500 rounded-tr-2xl pointer-events-none z-0"
              />

              {/* Dot matrix pattern on the bottom-left */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 grid grid-cols-6 gap-2 opacity-30 pointer-events-none z-0"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                ))}
              </div>

              {/* Main Photo: Concrete blocks and modern masonry construction */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80"
                  alt="Alvenaria de blocos de concreto estruturais com juntas perfeitamente niveladas e canteiro de obras organizado"
                  className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={687}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
