import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Layers,
  Calculator,
  Truck,
  CheckCircle2,
  FileText,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { BlockVisual } from './BlockVisual';
import { PLUMBING_MATERIALS } from '../data';
import { PlumbingMaterial } from '../types';

interface BlockSimulatorProps {
  initialBlockId?: string;
  onSelectForQuote?: (details: {
    materialName: string;
    summary: string;
    blockCount: number;
    estimatedCost: string;
  }) => void;
}

export const BlockSimulator: React.FC<BlockSimulatorProps> = ({
  initialBlockId = 'bloco-estrutural-14',
  onSelectForQuote,
}) => {
  // Available selectable block models
  const blockOptions = useMemo(() => {
    return PLUMBING_MATERIALS.slice(0, 6);
  }, []);

  const [selectedBlockId, setSelectedBlockId] = useState<string>(initialBlockId);
  const [wallWidthMeters, setWallWidthMeters] = useState<number>(4.0); // 4 meters long
  const [wallHeightMeters, setWallHeightMeters] = useState<number>(2.6); // 2.6 meters high
  const [includeChannelBeam, setIncludeChannelBeam] = useState<boolean>(true); // Top lintel beam with U channels
  const [paverAreaM2, setPaverAreaM2] = useState<number>(30); // for pavers
  const [copiedSummary, setCopiedSummary] = useState(false);

  const selectedBlock = useMemo(() => {
    return (
      blockOptions.find((b) => b.id === selectedBlockId) || blockOptions[0]
    );
  }, [blockOptions, selectedBlockId]);

  const isPaver = selectedBlock.id.includes('paver');
  const isEps = selectedBlock.id.includes('eps');

  // Engineering Calculations
  // Standard block: 39cm length + 1cm mortar joint = 40cm (0.4m), 19cm height = ~12.5 blocks/m²
  // EPS block: 100x50x15cm = 0.5m² per block = exactly 2 blocks per m²! (100 blocks = 50m² de parede pronta)
  const calculations = useMemo(() => {
    if (isPaver) {
      // Paver 10x20cm = 50 pieces per m²
      const piecesPerM2 = 50;
      const exactCount = Math.ceil(paverAreaM2 * piecesPerM2);
      const withMargin = Math.ceil(exactCount * 1.05); // 5% technical margin
      const weightPerPieceKg = 2.6;
      const totalWeightTons = ((withMargin * weightPerPieceKg) / 1000).toFixed(2);
      const unitPrice = 44.9; // R$ per m²
      const totalEstimatedCost = (paverAreaM2 * unitPrice).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      const palletsCount = Math.ceil(paverAreaM2 / 12); // ~12m² per pallet

      return {
        areaM2: paverAreaM2.toFixed(1),
        blocksCount: withMargin,
        exactCount,
        halfBlocks: 0,
        channelCount: 0,
        palletsCount,
        mortarBags: Math.ceil(paverAreaM2 * 0.4), // sand / base
        totalWeightTons,
        totalEstimatedCost,
        isEps: false,
      };
    }

    const areaM2 = wallWidthMeters * wallHeightMeters;

    if (isEps) {
      // Bloco de Concreto com EPS 100x50x15cm (Bloco Forte)
      // Rendimento: 2 blocos por m² (100 blocos = 50 m² de parede pronta, já com reboco)
      const exactCount = Math.ceil(areaM2 * 2);
      const withMargin = Math.ceil(exactCount * 1.05); // 5% technical margin
      const blockWeightKg = 26; // Bloco leve conforme catálogo
      const totalWeightTons = ((withMargin * blockWeightKg) / 1000).toFixed(2);
      const unitPrice = 89.0; // R$ 89,00 un
      const totalEstimatedCost = (withMargin * unitPrice).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      const palletsCount = Math.ceil(withMargin / 25); // ~25 blocos grandes por lote/palete

      return {
        areaM2: areaM2.toFixed(1),
        blocksCount: withMargin,
        exactCount,
        halfBlocks: 0,
        channelCount: 0,
        palletsCount,
        mortarBags: Math.ceil(withMargin * 0.1), // Fixação simplificada
        totalWeightTons,
        totalEstimatedCost,
        rowCount: Math.round(wallHeightMeters / 0.5),
        blocksPerRow: Math.round(wallWidthMeters / 1.0),
        isEps: true,
      };
    }

    // Standard masonry block (14x19x39)
    const rowCount = Math.round(wallHeightMeters / 0.2); // 20cm per row
    const blocksPerRow = Math.round(wallWidthMeters / 0.4); // 40cm per block
    const baseBlocks = rowCount * blocksPerRow;

    // Top channel row deduction if enabled
    const channelCount = includeChannelBeam ? blocksPerRow : 0;
    const regularBlocks = includeChannelBeam ? Math.max(0, baseBlocks - blocksPerRow) : baseBlocks;

    // Technical margin +5%
    const finalRegularBlocks = Math.ceil(regularBlocks * 1.05);
    // Half-blocks for staggered corners: 1 per row
    const halfBlocks = rowCount;

    // Weight: 14x19x39 structural block weighs ~13.5 kg
    const blockWeightKg = selectedBlock.id.includes('vedacao') ? 10.5 : 13.5;
    const totalWeightKg =
      finalRegularBlocks * blockWeightKg +
      channelCount * 14 +
      halfBlocks * (blockWeightKg / 2);
    const totalWeightTons = (totalWeightKg / 1000).toFixed(2);

    // Pallet has 84 pieces
    const palletsCount = Math.ceil((finalRegularBlocks + channelCount) / 84);

    // Mortar: approx 1 bag (20kg) per 35 blocks
    const mortarBags = Math.ceil((finalRegularBlocks + channelCount) / 35);

    // Price calculation
    const priceNumber = parseFloat(
      selectedBlock.price.replace('R$', '').replace(',', '.').trim()
    ) || 4.35;
    const totalEstimatedCost = (
      finalRegularBlocks * priceNumber +
      channelCount * 5.8 +
      halfBlocks * 2.75
    ).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return {
      areaM2: areaM2.toFixed(1),
      blocksCount: finalRegularBlocks,
      exactCount: regularBlocks,
      halfBlocks,
      channelCount,
      palletsCount,
      mortarBags,
      totalWeightTons,
      totalEstimatedCost,
      rowCount,
      blocksPerRow,
      isEps: false,
    };
  }, [isPaver, isEps, paverAreaM2, wallWidthMeters, wallHeightMeters, includeChannelBeam, selectedBlock]);

  const handleRequestQuote = () => {
    const summary = isPaver
      ? `Simulação de Piso Paver: Área de ${calculations.areaM2} m² = aprox. ${calculations.blocksCount} peças de Paver (${calculations.palletsCount} paletes, ${calculations.totalWeightTons} ton)`
      : isEps
      ? `Simulação Bloco Forte (Concreto com EPS): ${wallWidthMeters}m x ${wallHeightMeters}m (${calculations.areaM2} m²) = ${calculations.blocksCount} blocos (100x50x15cm). Rendimento: 100 blocos = 50m² de parede pronta já com reboco! Valor estimado: ${calculations.totalEstimatedCost}`
      : `Simulação de Parede: ${wallWidthMeters}m x ${wallHeightMeters}m (${calculations.areaM2} m²) = ${calculations.blocksCount} un ${selectedBlock.name} + ${calculations.halfBlocks} meio-blocos${
          calculations.channelCount > 0 ? ` + ${calculations.channelCount} canaletas U` : ''
        } (${calculations.palletsCount} paletes, ${calculations.totalWeightTons} ton)`;

    if (onSelectForQuote) {
      onSelectForQuote({
        materialName: selectedBlock.name,
        summary,
        blockCount: calculations.blocksCount,
        estimatedCost: calculations.totalEstimatedCost,
      });
    }

    // Scroll smoothly to contact or trigger quote modal
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-transparent text-white space-y-8">
      {/* Block Type Selection Bar (No cards, transparent buttons) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-orange-500" aria-hidden="true" />
            <span>Escolha o Bloco para Simulação</span>
          </label>
          <span className="text-[11px] text-orange-400 font-medium">
            Imagens 3D isoladas sem fundo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {blockOptions.map((opt) => {
            const isSelected = opt.id === selectedBlockId;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedBlockId(opt.id)}
                className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/50'
                }`}
              >
                {/* 3D Visual with 100% transparent background */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-transparent my-1">
                  <BlockVisual type={opt.id} isHovered={isSelected} />
                </div>

                <span className="text-xs font-bold text-white line-clamp-1 mt-1">
                  {opt.name.replace('Bloco de Concreto ', '').replace('Canaleta de Concreto ', 'Canaleta ')}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {opt.dimensions}
                </span>

                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Interactive Live Render Canvas (Transparent Background) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span>Simulação Visual de Alvenaria (Fundo Transparente)</span>
            </span>
            <span className="text-[11px] text-slate-400">
              {isPaver ? `${paverAreaM2} m² de calçamento` : `${wallWidthMeters}m larg. × ${wallHeightMeters}m alt.`}
            </span>
          </div>

          {/* Interactive Simulated Wall / Paver Surface */}
          <div className="relative min-h-[320px] sm:min-h-[380px] w-full rounded-2xl border border-slate-800/80 p-6 flex flex-col items-center justify-center overflow-hidden bg-transparent">
            {/* Subtle alignment grid pattern in pure SVG transparent strokes */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #f97316 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />

            {!isPaver ? (
              /* Simulated Concrete Block Wall with Transparent Background */
              <div className="w-full flex flex-col items-center justify-center z-10 select-none py-4">
                {/* Dimension label - Top width */}
                <div className="flex items-center justify-center gap-2 mb-3 text-xs text-orange-400 font-mono">
                  <span className="h-[1px] w-12 bg-orange-500/40" />
                  <span>Comprimento: {wallWidthMeters.toFixed(1)} metros</span>
                  <span className="h-[1px] w-12 bg-orange-500/40" />
                </div>

                {/* Staggered Rows of Concrete Blocks */}
                <div className="w-full max-w-md flex flex-col gap-1.5 transition-all duration-300">
                  {/* Top Canaleta Row (if enabled) */}
                  {includeChannelBeam && (
                    <div className="flex items-center justify-center gap-1.5 w-full opacity-95">
                      {[...Array(6)].map((_, colIdx) => (
                        <div
                          key={`canaleta-${colIdx}`}
                          className="flex-1 h-6 sm:h-7 rounded-sm border border-orange-500/60 bg-orange-500/15 flex items-center justify-center text-[8px] font-mono text-orange-300 uppercase tracking-tighter shadow-sm"
                          title="Canaleta U para Cinta de Amarração"
                        >
                          U-14
                        </div>
                      ))}
                    </div>
                  )}

                  {/* EPS Modular Wall Panels or Standard Staggered Wall Rows */}
                  {calculations.isEps ? (
                    /* Bloco Forte: 100x50x15cm Modular Wall with EPS Core (Transparent background) */
                    <div className="w-full space-y-2 py-1">
                      {[...Array(Math.min(5, Math.max(3, calculations.rowCount || 4)))].map((_, rowIdx) => (
                        <div key={`eps-row-${rowIdx}`} className="flex items-center gap-2 w-full">
                          {[...Array(3)].map((_, colIdx) => (
                            <div
                              key={`eps-panel-${colIdx}`}
                              className="flex-1 h-10 sm:h-12 rounded-lg border-2 border-slate-600/90 bg-slate-800/80 flex items-center justify-between px-2 relative overflow-hidden shadow-md hover:border-orange-500 transition-colors"
                              title="Bloco de Concreto com EPS 100x50x15cm (Bloco Forte)"
                            >
                              <div className="w-2 h-full bg-slate-400/40 rounded-xs" />
                              {/* Central White EPS isopor core */}
                              <div className="flex-1 h-full mx-2 bg-slate-100 flex items-center justify-center rounded-xs shadow-inner">
                                <span className="text-[9px] font-black text-slate-900 font-mono tracking-wider uppercase">
                                  EPS ISOPOR
                                </span>
                              </div>
                              <div className="w-2 h-full bg-slate-400/40 rounded-xs" />
                            </div>
                          ))}
                        </div>
                      ))}
                      <div className="text-center pt-1">
                        <span className="inline-block text-[11px] text-orange-400 font-bold bg-orange-500/15 border border-orange-500/30 px-3 py-1 rounded-full">
                          ⭐ 100 blocos = ~50 m² de parede pronta, já com reboco!
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Standard Staggered Wall Rows */
                    [...Array(Math.min(7, calculations.rowCount || 5))].map((_, rowIdx) => {
                      const isEvenRow = rowIdx % 2 === 0;
                      return (
                        <div
                          key={`wall-row-${rowIdx}`}
                          className="flex items-center justify-center gap-1.5 w-full"
                        >
                          {isEvenRow ? (
                            // Full blocks row
                            [...Array(6)].map((_, colIdx) => (
                              <div
                                key={`block-even-${colIdx}`}
                                className="flex-1 h-7 sm:h-8 rounded-sm border border-slate-600/80 bg-slate-800/40 hover:bg-orange-500/20 hover:border-orange-400 transition-colors flex items-center justify-center relative group/block shadow-sm"
                                title={`${selectedBlock.name} (14x19x39 cm)`}
                              >
                                {/* 2 inner hollow holes simulation */}
                                <div className="flex gap-1 opacity-70">
                                  <span className="w-1.5 h-3 rounded-xs bg-[#0B1320]" />
                                  <span className="w-1.5 h-3 rounded-xs bg-[#0B1320]" />
                                </div>
                              </div>
                            ))
                          ) : (
                            // Staggered row with 1/2 half-blocks at ends
                            <>
                              {/* Left Half-Block */}
                              <div
                                className="w-[8%] h-7 sm:h-8 rounded-sm border border-amber-500/70 bg-amber-500/20 flex items-center justify-center text-[7px] text-amber-300 font-mono shadow-sm"
                                title="Meio Bloco Estrutural (Amarração)"
                              >
                                ½
                              </div>
                              {/* 5 Full Blocks */}
                              {[...Array(5)].map((_, colIdx) => (
                                <div
                                  key={`block-odd-${colIdx}`}
                                  className="flex-1 h-7 sm:h-8 rounded-sm border border-slate-600/80 bg-slate-800/40 hover:bg-orange-500/20 hover:border-orange-400 transition-colors flex items-center justify-center relative shadow-sm"
                                  title={`${selectedBlock.name} (14x19x39 cm)`}
                                >
                                  <div className="flex gap-1 opacity-70">
                                    <span className="w-1.5 h-3 rounded-xs bg-[#0B1320]" />
                                    <span className="w-1.5 h-3 rounded-xs bg-[#0B1320]" />
                                  </div>
                                </div>
                              ))}
                              {/* Right Half-Block */}
                              <div
                                className="w-[8%] h-7 sm:h-8 rounded-sm border border-amber-500/70 bg-amber-500/20 flex items-center justify-center text-[7px] text-amber-300 font-mono shadow-sm"
                                title="Meio Bloco Estrutural (Amarração)"
                              >
                                ½
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Dimension label - Height */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-orange-400 font-mono">
                  <span>Altura: {wallHeightMeters.toFixed(1)} metros</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-300">{calculations.areaM2} m² de parede</span>
                </div>
              </div>
            ) : (
              /* Simulated Interlocking Paver Pattern on Transparent Background */
              <div className="w-full flex flex-col items-center justify-center z-10 select-none py-4">
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 p-3 rounded-xl border border-slate-800 bg-transparent">
                  {[...Array(32)].map((_, i) => {
                    const isOrange = i % 3 === 0;
                    return (
                      <div
                        key={`paver-sim-${i}`}
                        className={`w-8 h-12 sm:w-10 sm:h-14 rounded-sm border transition-transform hover:scale-105 ${
                          isOrange
                            ? 'bg-orange-600/40 border-orange-500/70'
                            : 'bg-slate-700/40 border-slate-600/70'
                        } flex items-center justify-center shadow-md`}
                        title="Piso Paver Intertravado de Concreto 6cm"
                      />
                    );
                  })}
                </div>
                <div className="mt-3 text-xs font-mono text-orange-400">
                  Paginação Intertravada de Pavimento • 50 peças/m²
                </div>
              </div>
            )}

            {/* Floating 3D Single Isolated Block Preview in Bottom Right (Transparent Background) */}
            <div className="absolute bottom-3 right-3 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none opacity-90">
              <BlockVisual type={selectedBlock.id} />
            </div>
          </div>

          {/* Simulation Slider Inputs */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            {!isPaver ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Wall Width Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Comprimento da Parede</span>
                    <span className="font-mono text-orange-400 font-bold">{wallWidthMeters} m</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="15.0"
                    step="0.5"
                    value={wallWidthMeters}
                    onChange={(e) => setWallWidthMeters(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                    aria-label="Comprimento da parede em metros"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1.5m</span>
                    <span>15.0m</span>
                  </div>
                </div>

                {/* Wall Height Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Altura da Parede</span>
                    <span className="font-mono text-orange-400 font-bold">{wallHeightMeters} m</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.2"
                    value={wallHeightMeters}
                    onChange={(e) => setWallHeightMeters(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                    aria-label="Altura da parede em metros"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1.0m (Mureta)</span>
                    <span>2.6m (Padrão)</span>
                    <span>4.0m (Galpão)</span>
                  </div>
                </div>

                {/* Top Channel Checkbox */}
                <div className="sm:col-span-2 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeChannelBeam}
                      onChange={(e) => setIncludeChannelBeam(e.target.checked)}
                      className="rounded accent-orange-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Incluir fiada de Canaleta "U" para viga de amarração no topo</span>
                  </label>
                  <span className="text-[11px] text-orange-400 font-medium">
                    {includeChannelBeam ? '+ Canaletas Calculadas' : 'Sem canaleta'}
                  </span>
                </div>
              </div>
            ) : (
              /* Paver Area Input */
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Área a Pavimentar</span>
                  <span className="font-mono text-orange-400 font-bold">{paverAreaM2} m²</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={paverAreaM2}
                  onChange={(e) => setPaverAreaM2(parseInt(e.target.value, 10))}
                  className="w-full accent-orange-500 cursor-pointer"
                  aria-label="Área a pavimentar em metros quadrados"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10 m² (Calçada)</span>
                  <span>100 m² (Pátio)</span>
                  <span>300 m² (Condomínio)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Quantities Card & Instant Order Dispatch */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-500" aria-hidden="true" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Quantitativo de Materiais
                </h3>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                +5% Margem Inclusa
              </span>
            </div>

            {/* Highlight Metric: Total Blocks Needed */}
            <div className="bg-[#080E18] p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total de Blocos Estimados</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {calculations.blocksCount}
                  </span>
                  <span className="text-xs font-semibold text-orange-400 uppercase">
                    peças
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Área Coberta</span>
                <span className="text-base font-bold text-slate-200">
                  {calculations.areaM2} m²
                </span>
              </div>
            </div>

            {/* Detailed Spec List */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                <span className="text-slate-400">Modelo Selecionado:</span>
                <span className="font-semibold text-white text-right max-w-[200px] truncate">
                  {selectedBlock.name}
                </span>
              </div>

              {!isPaver && calculations.halfBlocks > 0 && (
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-400">Meio-Blocos p/ Amarração:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {calculations.halfBlocks} un
                  </span>
                </div>
              )}

              {!isPaver && calculations.channelCount > 0 && (
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-400">Canaletas "U" (Viga Superior):</span>
                  <span className="font-mono font-bold text-orange-400">
                    {calculations.channelCount} un
                  </span>
                </div>
              )}

              <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                <span className="text-slate-400">Paletes de Fábrica:</span>
                <span className="font-mono font-bold text-white">
                  ~{calculations.palletsCount} paletes
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                <span className="text-slate-400">Argamassa Estimada (20kg):</span>
                <span className="font-mono font-bold text-white">
                  ~{calculations.mortarBags} sacos
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                <span className="text-slate-400">Peso Total da Carga:</span>
                <span className="font-mono font-bold text-white">
                  ~{calculations.totalWeightTons} toneladas
                </span>
              </div>
            </div>

            {/* Estimated Total Price & CTA */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400">Valor Estimado Direto Fábrica:</span>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {calculations.totalEstimatedCost}
                </span>
              </div>

              <button
                type="button"
                onClick={handleRequestQuote}
                className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Cotar Esta Simulação com Frete Munk</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                <Truck className="w-3 h-3 text-orange-500" aria-hidden="true" />
                <span>Descarga mecanizada direto no seu canteiro de obras</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
