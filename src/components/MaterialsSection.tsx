import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  ShoppingCart,
  Check,
  PackageCheck,
  ShieldCheck,
  Layers,
  Sparkles,
  Sliders,
  Eye
} from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { PLUMBING_MATERIALS } from '../data';
import { PlumbingMaterial } from '../types';
import { BlockVisual } from './BlockVisual';
import { BlockSimulator } from './BlockSimulator';

interface MaterialsSectionProps {
  onSelectMaterial?: (material: PlumbingMaterial) => void;
  onSimulateQuote?: (summary: string) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  onSelectMaterial,
  onSimulateQuote,
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Bloco Estrutural 14
  const [viewMode, setViewMode] = useState<'carousel' | 'simulator'>('carousel');
  const [simulatorBlockId, setSimulatorBlockId] = useState<string>('bloco-estrutural-14');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addedMaterialId, setAddedMaterialId] = useState<string | null>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const totalItems = PLUMBING_MATERIALS.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  }, [totalItems]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  }, [totalItems]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelect = (material: PlumbingMaterial, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAddedMaterialId(material.id);
    setTimeout(() => setAddedMaterialId(null), 2200);
    if (onSelectMaterial) {
      onSelectMaterial(material);
    }
  };

  const handleOpenSimulationForBlock = (blockId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSimulatorBlockId(blockId);
    setViewMode('simulator');
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (viewMode !== 'carousel') return;
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch / drag handling
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="materiais"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-labelledby="materials-heading"
      className="py-16 sm:py-24 bg-[#080E18] text-white border-t border-slate-800/80 relative overflow-hidden focus:outline-none"
    >
      {/* Anchor fallback for old offers link */}
      <div id="offers" className="sr-only" aria-hidden="true" />

      {/* Subtle ambient lighting on background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3"
        >
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-2.5 h-1 bg-orange-500 rounded-sm" aria-hidden="true" />
            <span className="text-orange-500 text-xs font-bold tracking-wider uppercase">
              Catálogo &amp; Simulador Direto da Fábrica
            </span>
          </div>

          <h2
            id="materials-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Materiais de Blocos &amp; Pavimentação
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Imagens 3D dos blocos com fundo transparente para você inspecionar detalhes, acabamentos e simular alvenarias e pisos em tempo real.
          </p>

          {/* Mode Switcher: Carousel vs Simulator */}
          <div className="pt-3 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-orange-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Carrossel de Blocos</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('simulator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'simulator'
                    ? 'bg-orange-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Simulador de Alvenaria</span>
                <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-700/60 uppercase">
                  3D
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* View Mode 1: Transparent Carousel */}
        {viewMode === 'carousel' ? (
          <div
            ref={carouselContainerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative py-4 select-none animate-in fade-in duration-300"
            role="region"
            aria-roledescription="carrossel de materiais"
            aria-label="Carrossel de materiais e produtos"
          >
            {/* Navigation Arrow: Left */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Material anterior"
              className="absolute -left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-orange-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-orange-400 shadow-xl flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Navigation Arrow: Right */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próximo material"
              className="absolute -right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-orange-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-orange-400 shadow-xl flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Carousel Track: Transparent Items without Card Enclosures */}
            <div className="overflow-hidden px-8 sm:px-14 lg:px-16">
              <div
                className="flex items-center transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(calc(50% - (${activeIndex} * 280px + 140px)))`,
                }}
              >
                {PLUMBING_MATERIALS.map((item, index) => {
                  const isActive = index === activeIndex;
                  const isAdjacent = Math.abs(index - activeIndex) === 1;
                  const isFavorited = favorites.has(item.id);
                  const isJustAdded = addedMaterialId === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      className={`shrink-0 w-[280px] px-3.5 transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'opacity-100 scale-105 z-20'
                          : isAdjacent
                          ? 'opacity-70 scale-95 z-10 hover:opacity-90'
                          : 'opacity-40 scale-90 z-0 hover:opacity-60'
                      }`}
                    >
                      {/* Transparent Product Block (No cards, no borders, no solid background) */}
                      <div className="bg-transparent p-2.5 flex flex-col justify-between h-full group">
                        {/* Top Header Row: Badge & Wishlist Heart */}
                        <div className="flex items-center justify-between w-full mb-2">
                          {item.badge ? (
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">
                              {item.badge}
                            </span>
                          ) : (
                            <span />
                          )}

                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(item.id, e)}
                            aria-label={
                              isFavorited
                                ? `Remover ${item.name} dos favoritos`
                                : `Salvar ${item.name} nos favoritos`
                            }
                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-orange-500 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
                          >
                            <Heart
                              className={`w-4 h-4 transition-all duration-200 ${
                                isFavorited
                                  ? 'fill-orange-500 text-orange-500 scale-110'
                                  : 'text-slate-400 hover:text-orange-400'
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        {/* Product Image Area: 3D Block com tamanho e espaçamento otimizados para responsividade */}
                        <div className="relative w-full aspect-square max-h-52 flex items-center justify-center my-3 group bg-transparent">
                          <div className="w-full h-full flex items-center justify-center bg-transparent">
                            <BlockVisual
                              type={item.id}
                              isHovered={isActive}
                              className="w-full h-full"
                            />
                          </div>

                          {/* Quick button to simulate this specific block */}
                          {isActive && (
                            <button
                              type="button"
                              onClick={(e) => handleOpenSimulationForBlock(item.id, e)}
                              className="absolute bottom-1 bg-slate-900/90 hover:bg-orange-500 text-orange-400 hover:text-slate-950 text-[11px] font-bold px-3 py-1.5 rounded-full border border-orange-500/40 transition-all flex items-center gap-1 shadow-md cursor-pointer active:scale-95"
                              title="Abrir no Simulador de Alvenaria"
                            >
                              <Sliders className="w-3 h-3" />
                              <span>Simular este Bloco</span>
                            </button>
                          )}
                        </div>

                        {/* Mini Dots below Image */}
                        <div
                          className="flex items-center justify-center gap-1.5 my-3"
                          aria-hidden="true"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        </div>

                        {/* Product Info: Title & Description com alturas responsivas para mobile */}
                        <div className="space-y-2 text-left mt-1">
                          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-orange-400 transition-colors">
                            {item.name}
                          </h3>

                          <div className="flex items-center gap-2 text-[11px] text-orange-400/90 font-mono font-medium">
                            <span>{item.dimensions}</span>
                            {item.resistance && (
                              <>
                                <span>•</span>
                                <span>{item.resistance}</span>
                              </>
                            )}
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed min-h-[2.5rem]">
                            {item.description}
                          </p>

                          {/* Rating Row */}
                          <div className="flex items-center gap-1.5 pt-1 text-xs">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" aria-hidden="true" />
                            <span className="font-bold text-slate-200">{item.rating.toFixed(1)}</span>
                            <span className="text-slate-500">({item.reviewsCount})</span>
                          </div>
                        </div>

                        {/* Bottom Row: Price & Action CTA Button */}
                        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/60">
                          <div className="flex flex-col">
                            <span className="text-lg sm:text-xl font-black text-white tracking-tight">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[10px] text-slate-500 line-through">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* CTA Button */}
                          {isActive ? (
                            <button
                              type="button"
                              onClick={(e) => handleSelect(item, e)}
                              aria-label={`Solicitar cotação para ${item.name}`}
                              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer ${
                                isJustAdded
                                  ? 'bg-emerald-500 text-slate-950 font-black'
                                  : 'bg-orange-500 hover:bg-orange-400 text-slate-950 hover:shadow-orange-500/20'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
                                  <span>Adicionado!</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>Cotar Bloco</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleSelect(item, e)}
                              aria-label={`Adicionar ${item.name} ao orçamento`}
                              className="w-9 h-9 rounded-full bg-slate-900/90 hover:bg-orange-500 text-slate-300 hover:text-slate-950 border border-slate-700/80 hover:border-orange-500 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow"
                            >
                              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Pagination Dots */}
            <div
              className="flex items-center justify-center gap-2 mt-8"
              role="tablist"
              aria-label="Controle de slides de materiais"
            >
              {PLUMBING_MATERIALS.map((mat, i) => (
                <button
                  key={mat.id}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Ir para produto ${i + 1}: ${mat.name}`}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === activeIndex
                      ? 'w-7 h-2.5 bg-orange-500 shadow-sm shadow-orange-500/50'
                      : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* View Mode 2: Interactive Simulator with Transparent Background */
          <div className="animate-in fade-in duration-300">
            <BlockSimulator
              initialBlockId={simulatorBlockId}
              onSelectForQuote={(details) => {
                if (onSimulateQuote) {
                  onSimulateQuote(details.summary);
                } else if (onSelectMaterial) {
                  const matched = PLUMBING_MATERIALS.find(
                    (m) => m.name === details.materialName
                  ) || PLUMBING_MATERIALS[0];
                  onSelectMaterial(matched);
                }
              }}
            />
          </div>
        )}

        {/* Assurance Strip below carousel */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-12 text-center text-xs sm:text-sm text-slate-400">
          <div className="flex items-center justify-center gap-2.5">
            <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" aria-hidden="true" />
            <span>Blocos Certificados ABNT NBR 6136 e 12118</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" aria-hidden="true" />
            <span>Descarga Paletizada com Caminhão Munk</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" aria-hidden="true" />
            <span>Preço Direto de Fábrica sem Intermediários</span>
          </div>
        </div>
      </div>
    </section>
  );
};
