import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X, Blocks, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';
import { NAV_LINKS, SERVICES_LIST, COMPANY_INFO } from '../data';

interface NavbarProps {
  onOpenEstimateModal: () => void;
  onSelectService?: (serviceId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimateModal, onSelectService }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard navigation for dropdown (Escape to close)
  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setServicesDropdownOpen(false);
      dropdownButtonRef.current?.focus();
    }
  };

  return (
    <nav
      id="main-navigation"
      aria-label="Navegação principal da fábrica de blocos"
      className="w-full bg-[#0B1320]/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-800/80 transition-shadow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo for Block Materials Factory */}
          <a
            id="brand-logo"
            href="#home"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none rounded-lg p-1"
            aria-label="FlowBlocos Materiais - Voltar ao início"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-orange-500/40 text-orange-500 group-hover:border-orange-500 transition-colors shadow-sm">
              <Blocks className="w-5 h-5 text-orange-500" aria-hidden="true" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-500 rounded-full border border-slate-950" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  FlowBlocos
                </span>
                <span className="text-orange-500 text-2xl font-extrabold leading-none">.</span>
              </div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-[0.22em] mt-0.5">
                Materiais de Blocos
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative"
                    onKeyDown={handleDropdownKeyDown}
                  >
                    <button
                      id="nav-services-dropdown-btn"
                      ref={dropdownButtonRef}
                      type="button"
                      onClick={() => setServicesDropdownOpen((prev) => !prev)}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                      aria-controls="nav-services-menu"
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${
                        servicesDropdownOpen
                          ? 'text-orange-500 bg-slate-900/60'
                          : 'text-slate-200 hover:text-orange-500 hover:bg-slate-900/40'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-orange-500' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Accessible Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div
                        id="nav-services-menu"
                        role="menu"
                        aria-label="Lista de soluções e serviços"
                        className="absolute top-full left-0 mt-2 w-80 bg-[#0E1726] border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                          Soluções em Blocos de Concreto
                        </div>
                        {SERVICES_LIST.map((service) => (
                          <a
                            key={service.id}
                            href="#services"
                            role="menuitem"
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              if (onSelectService) onSelectService(service.id);
                            }}
                            className="flex items-start gap-3 px-3 py-2.5 text-sm text-slate-200 hover:bg-slate-800/80 hover:text-orange-500 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none rounded-lg mx-1"
                          >
                            <div className="mt-0.5 p-1.5 rounded-md bg-orange-500/10 text-orange-500">
                              <Blocks className="w-3.5 h-3.5" aria-hidden="true" />
                            </div>
                            <div>
                              <div className="font-medium leading-tight">{service.title}</div>
                              <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                {service.description}
                              </div>
                            </div>
                          </a>
                        ))}
                        <div className="mt-2 pt-2 border-t border-slate-800/80 px-3">
                          <a
                            href="#materiais"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1.5 py-1"
                          >
                            <span>Ver Catálogo Completo de Blocos →</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${
                    link.current
                      ? 'text-orange-500 font-semibold'
                      : 'text-slate-200 hover:text-orange-500'
                  }`}
                  aria-current={link.current ? 'page' : undefined}
                >
                  {link.name}
                  {link.current && (
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-orange-500 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right CTA Button: "Solicitar Cotação" */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              id="navbar-cta-estimate"
              type="button"
              onClick={onOpenEstimateModal}
              className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none cursor-pointer"
              aria-label="Solicitar cotação de blocos - Abre formulário de orçamento"
            >
              Solicitar Cotação
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="p-2.5 rounded-lg text-slate-200 hover:text-orange-500 hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navegação Móvel"
          className="lg:hidden border-t border-slate-800 bg-[#0B1320] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-150"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                link.current
                  ? 'text-orange-500 bg-slate-900/80 font-bold'
                  : 'text-slate-200 hover:text-orange-500 hover:bg-slate-850'
              }`}
            >
              {link.name}
            </a>
          ))}

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimateModal();
              }}
              className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold py-3 px-4 rounded-lg text-sm text-center transition-colors shadow-md cursor-pointer"
            >
              Solicitar Cotação de Blocos
            </button>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-slate-300 bg-slate-900 rounded-lg border border-slate-800 font-medium"
            >
              <span>Central de Vendas: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

