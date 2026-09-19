import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesSection } from './components/ServicesSection';
import { MaterialsSection } from './components/MaterialsSection';
import { ContactSection } from './components/ContactSection';
import { EstimateModal } from './components/EstimateModal';
import { Footer } from './components/Footer';
import { SpecialOffer, PlumbingMaterial } from './types';

export default function App() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1.0);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string>('');
  const [modalPromoCode, setModalPromoCode] = useState<string>('');
  const [announcement, setAnnouncement] = useState<string>('');

  const announce = (msg: string) => {
    setAnnouncement(msg);
    setTimeout(() => setAnnouncement(''), 4000);
  };

  const handleAdjustFontScale = (delta: number) => {
    setFontScale((prev) => {
      const next = Math.max(0.9, Math.min(1.3, Number((prev + delta).toFixed(1))));
      announce(`Tamanho da fonte ajustado para ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleToggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      announce(next ? 'Modo de alto contraste ativado' : 'Modo de alto contraste desativado');
      return next;
    });
  };

  const handleOpenEstimateModal = (serviceTitle = '', promo = '') => {
    setModalService(serviceTitle);
    setModalPromoCode(promo);
    setIsEstimateModalOpen(true);
  };

  const handleSelectMaterial = (material: PlumbingMaterial) => {
    announce(`Material ${material.name} selecionado para cotação`);
    handleOpenEstimateModal(`Material: ${material.name}`, 'BLOCO-FABRICA');
  };

  const handleClaimOffer = (offer: SpecialOffer) => {
    announce(`Oferta para ${offer.title} selecionada com código ${offer.code}`);
    handleOpenEstimateModal(offer.title, offer.code);
  };

  return (
    <div
      style={{ fontSize: `${fontScale}rem` }}
      className={`min-h-screen bg-[#0B1320] text-slate-100 flex flex-col font-sans transition-colors ${
        highContrast ? 'contrast-125 brightness-110' : ''
      }`}
    >
      {/* Accessible Skip to Main Content Link */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* Screen Reader Live Region for status notifications */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
        id="a11y-status-announcer"
      >
        {announcement}
      </div>

      {/* Navigation Landmark */}
      <Navbar
        onOpenEstimateModal={() => handleOpenEstimateModal()}
        onSelectService={(serviceId) => {
          const target = document.getElementById('services');
          target?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Section 1: Hero Section */}
        <HeroSection
          onOpenEstimateModal={() => handleOpenEstimateModal()}
        />

        {/* Section 2: A Fábrica FlowBlocos */}
        <WelcomeSection />

        {/* Section 3: Linha de Soluções e Serviços */}
        <ServicesSection
          onSelectServiceForEstimate={(serviceTitle) =>
            handleOpenEstimateModal(serviceTitle)
          }
        />

        {/* Section 4: Catálogo de Blocos e Materiais */}
        <MaterialsSection
          onSelectMaterial={handleSelectMaterial}
          onSimulateQuote={(summary) => {
            announce(`Simulação transferida para cotação`);
            handleOpenEstimateModal(summary, 'SIMULACAO-FABRICA');
          }}
        />

        {/* Section 5: Fale Conosco & Cotação de Carga */}
        <ContactSection
          onServiceBooked={(details) => {
            announce(`Cotação enviada com sucesso para ${details.service}`);
          }}
        />
      </main>

      {/* Footer Landmark with Contact, Accessibility & Social Details */}
      <Footer
        highContrast={highContrast}
        onToggleHighContrast={handleToggleHighContrast}
        fontScale={fontScale}
        onAdjustFontScale={handleAdjustFontScale}
      />

      {/* Estimate Modal Dialog */}
      <EstimateModal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        defaultService={modalService}
        promoCode={modalPromoCode}
      />
    </div>
  );
}
