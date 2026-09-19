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
import { COMPANY_INFO } from './data';

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

        {/* Section 2: A Fábrica BLOCO FORTE */}
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

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20de%20blocos.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/40 transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 group"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <span className="absolute inline-flex h-[130%] w-[130%] rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
