import React from 'react';
import { Blocks, Phone, Mail, Clock, Shield, ChevronUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPANY_INFO, SERVICES_LIST } from '../data';

interface FooterProps {
  highContrast?: boolean;
  onToggleHighContrast?: () => void;
  fontScale?: number;
  onAdjustFontScale?: (delta: number) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      role="contentinfo"
      aria-label="Rodapé e detalhes de contato da fábrica"
      className="bg-[#060A12] text-slate-400 text-sm border-t border-slate-800/90"
    >
      {/* Main Footer Links & Info */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-orange-500/40 text-orange-500">
                <Blocks className="w-4 h-4 text-orange-500" aria-hidden="true" />
              </div>
              <div className="flex items-center">
                <span className="font-extrabold text-lg text-white">BLOCO FORTE</span>
                <span className="text-orange-500 text-lg font-black">.</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fábrica e distribuição especializada de blocos de concreto estruturais, vedação, canaletas e pisos intertravados para construtoras e obras residenciais e comerciais.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Shield className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
              <span>Conformidade Técnica ABNT NBR 6136 &amp; 12118</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Conecte-se Conosco</div>
              <div className="flex items-center space-x-2.5 text-slate-400" aria-label="Redes sociais">
                <a
                  id="footer-social-facebook"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BLOCO FORTE no Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-orange-500 hover:border-orange-500/40 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  id="footer-social-twitter"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BLOCO FORTE no Twitter"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-orange-500 hover:border-orange-500/40 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  id="footer-social-instagram"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BLOCO FORTE no Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-orange-500 hover:border-orange-500/40 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  id="footer-social-linkedin"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BLOCO FORTE no LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-orange-500 hover:border-orange-500/40 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Soluções
            </h3>
            <ul className="space-y-2 text-xs">
              {SERVICES_LIST.map((svc) => (
                <li key={svc.id}>
                  <a
                    href="#services"
                    className="hover:text-orange-400 transition-colors focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                  >
                    {svc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Navegação
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-orange-400 transition-colors">Início</a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">A Fábrica</a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">Soluções</a>
              </li>
              <li>
                <a href="#materiais" className="hover:text-orange-400 transition-colors">Materiais &amp; Blocos</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Vendas &amp; Pátio
            </h3>
            <div className="flex items-start gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-slate-500 block text-[11px]">Central de Vendas:</span>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-white font-medium hover:text-orange-400 transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-slate-500 block text-[11px]">Projetos &amp; Cotações:</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-white font-medium hover:text-orange-400 transition-colors break-all">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-slate-500 block text-[11px]">Expedição e Fábrica:</span>
                <span className="text-white font-medium">{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar with Back to Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-slate-800/80">
        <div>
          &copy; {new Date().getFullYear()} BLOCO FORTE Materiais &amp; Fábrica de Blocos de Concreto. Todos os direitos reservados.
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Voltar ao topo da página"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-orange-400 py-1 px-2.5 rounded border border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer"
        >
          <span>Voltar ao topo</span>
          <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};
