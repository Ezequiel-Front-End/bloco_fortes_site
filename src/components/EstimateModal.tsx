import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, AlertCircle, ShieldCheck, Clock, Phone } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  promoCode?: string;
}

export const EstimateModal: React.FC<EstimateModalProps> = ({
  isOpen,
  onClose,
  defaultService = '',
  promoCode = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || SERVICES_LIST[0].title,
    zipCode: '',
    preferredDate: '',
    issueDescription: '',
    appliedPromo: promoCode,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default service & promoCode when modal opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setFormData((prev) => ({
        ...prev,
        service: defaultService || prev.service || SERVICES_LIST[0].title,
        appliedPromo: promoCode || prev.appliedPromo,
      }));
      setIsSuccess(false);
      setErrors({});

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Focus first input
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultService, promoCode]);

  // Handle keyboard trap & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Nome completo é obrigatório';
    if (!formData.phone.trim()) {
      err.phone = 'Telefone é obrigatório';
    } else if (!/^[0-9\s()+-]{7,}$/.test(formData.phone.trim())) {
      err.phone = 'Por favor, informe um telefone válido';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      err.email = 'Por favor, informe um e-mail válido';
    }
    if (!formData.zipCode.trim()) {
      err.zipCode = 'CEP é obrigatório para cálculo do frete e entrega munk';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="estimate-modal-title"
        aria-describedby="estimate-modal-desc"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0E1A2E] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar diálogo de cotação"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {isSuccess ? (
          <div
            role="status"
            aria-live="polite"
            className="text-center py-6 space-y-4 animate-in fade-in"
          >
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>

            <h2 id="estimate-modal-title" className="text-2xl font-bold text-white">
              Cotação Solicitada com Sucesso!
            </h2>

            <p id="estimate-modal-desc" className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Obrigado, <strong className="text-white">{formData.name}</strong>. Nossa equipe comercial e técnica da FlowBlocos entrará em contato em breve pelo telefone <strong className="text-white">{formData.phone}</strong> para apresentar a proposta e condições de frete.
            </p>

            {formData.appliedPromo && (
              <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs px-3 py-2 rounded-lg inline-block">
                Condição Promocional <strong>{formData.appliedPromo}</strong> vinculada ao seu pedido.
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
                <span>Ligar para Vendas Fábrica</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold py-2.5 px-6 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2.5 h-1 bg-orange-500 rounded-sm" aria-hidden="true" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">
                  Cotação Direto da Fábrica
                </span>
              </div>
              <h2 id="estimate-modal-title" className="text-2xl font-bold text-white tracking-tight">
                Solicitar Cotação de Blocos
              </h2>
              <p id="estimate-modal-desc" className="text-xs sm:text-sm text-slate-300 mt-1">
                Preço direto de fábrica, laudos técnicos ABNT e logística paletizada com caminhão munk para sua obra.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome / Razão Social <span className="text-orange-500">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="modal-name"
                  type="text"
                  required
                  placeholder="ex: Construtora Aliança / Rodrigo"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'modal-name-err' : undefined}
                  className="w-full bg-[#080E18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                />
                {errors.name && (
                  <p id="modal-name-err" className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Phone and ZIP Code Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefone / WhatsApp <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'modal-phone-err' : undefined}
                    className="w-full bg-[#080E18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  />
                  {errors.phone && (
                    <p id="modal-phone-err" className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-zip" className="block text-xs font-semibold text-slate-300 mb-1">
                    CEP da Obra <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="modal-zip"
                    type="text"
                    required
                    placeholder="ex: 01310-100"
                    value={formData.zipCode}
                    onChange={(e) => {
                      setFormData({ ...formData, zipCode: e.target.value });
                      if (errors.zipCode) setErrors({ ...errors, zipCode: '' });
                    }}
                    aria-invalid={!!errors.zipCode}
                    aria-describedby={errors.zipCode ? 'modal-zip-err' : undefined}
                    className="w-full bg-[#080E18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  />
                  {errors.zipCode && (
                    <p id="modal-zip-err" className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="modal-service" className="block text-xs font-semibold text-slate-300 mb-1">
                  Material ou Bloco Desejado
                </label>
                <select
                  id="modal-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#080E18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                >
                  {formData.service &&
                    !SERVICES_LIST.some((s) => s.title === formData.service) && (
                      <option value={formData.service} className="bg-slate-900 text-orange-400 font-semibold">
                        {formData.service}
                      </option>
                    )}
                  {SERVICES_LIST.map((svc) => (
                    <option key={svc.id} value={svc.title} className="bg-slate-900 text-white">
                      {svc.title}
                    </option>
                  ))}
                  <option value="Blocos Estruturais 14x19x39" className="bg-slate-900 text-white">
                    Blocos Estruturais 14x19x39 (4.5 a 12 MPa)
                  </option>
                  <option value="Blocos de Vedação 09x19x39 / 14x19x39" className="bg-slate-900 text-white">
                    Blocos de Vedação Convencionais
                  </option>
                  <option value="Canaletas Estruturais em 'U'" className="bg-slate-900 text-white">
                    Canaletas Estruturais em 'U'
                  </option>
                  <option value="Pisos Intertravados Paver" className="bg-slate-900 text-white">
                    Pisos Intertravados de Concreto
                  </option>
                  <option value="Carga Fechada Atacado com Munk" className="bg-slate-900 text-white">
                    Carga Fechada Atacado com Munk
                  </option>
                </select>
              </div>

              {/* Promo Code if any */}
              <div>
                <label htmlFor="modal-promo" className="block text-xs font-semibold text-slate-300 mb-1">
                  Código de Condição Especial / Parceiro
                </label>
                <input
                  id="modal-promo"
                  type="text"
                  placeholder="Código opcional (ex: CARGAFECHADA)"
                  value={formData.appliedPromo}
                  onChange={(e) => setFormData({ ...formData, appliedPromo: e.target.value.toUpperCase() })}
                  className="w-full bg-[#080E18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors font-mono"
                />
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" aria-hidden="true" />
                  <span>Laudo ABNT NBR 6136</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" aria-hidden="true" />
                  <span>Descarga Munk no Ponto</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-lg active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none cursor-pointer"
                >
                  {isSubmitting ? 'Calculando Frete...' : 'Confirmar Solicitação de Cotação'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
