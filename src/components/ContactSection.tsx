import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  Send,
  Calendar,
  Sparkles,
  MessageSquare,
  User
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPANY_INFO, SERVICES_LIST } from '../data';
import { CustomSelect } from './CustomSelect';

interface ContactSectionProps {
  onServiceBooked?: (details: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onServiceBooked }) => {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    urgency: 'Programada para esta Semana',
    message: '',
    promoCode: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Por favor, informe seu nome completo ou razão social';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Por favor, informe seu telefone ou WhatsApp';
    } else if (!/^[0-9\s()+-]{7,}$/.test(formData.phone.trim())) {
      errors.phone = 'Por favor, informe um telefone válido';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Por favor, informe um e-mail válido';
    }
    if (!formData.service) {
      errors.service = 'Por favor, selecione o material ou serviço desejado';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const text = `Olá, gostaria de solicitar uma cotação.
*Nome:* ${formData.name}
*Telefone:* ${formData.phone}
*Email:* ${formData.email || 'Não informado'}
*Material:* ${formData.service}
*Prazo:* ${formData.urgency}
*Código Promocional:* ${formData.promoCode || 'Nenhum'}
*Detalhes:* ${formData.message || 'Nenhum'}`;
      
      const whatsappUrl = `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');

      if (onServiceBooked) {
        onServiceBooked(formData);
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      urgency: 'Programada para esta Semana',
      message: '',
      promoCode: '',
    });
    setFormErrors({});
  };

  return (
    <section
      id="contact"
      aria-label="Fale Conosco e Solicite uma Cotação de Blocos"
      className="py-16 sm:py-20 lg:py-24 bg-[#080F1B] border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Decorative background glow accents */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-2.5 h-1 bg-orange-500 rounded-sm" aria-hidden="true" />
            <span className="text-orange-500 text-xs font-bold tracking-wider uppercase">
              Atendimento Comercial &amp; Fábrica
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Solicite sua <span className="text-orange-500">Cotação de Blocos</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Preencha os dados da sua obra para receber nossa melhor proposta com frete paletizado e valores direto da fábrica.
          </p>
        </motion.div>

        {/* 2-Column Grid: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details & Guarantees */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Box */}
            <div className="bg-[#0E1A2E]/90 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500" aria-hidden="true" />
                <span>Central de Vendas &amp; Suporte</span>
              </h3>

              <div className="space-y-4 text-sm">
                {/* Emergency Hotline */}
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="group flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Vendas e Cotações:</span>
                    <span className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {COMPANY_INFO.phone}
                    </span>
                    <span className="text-xs text-orange-400 block mt-0.5">
                      Orçamentos em até 15 minutos úteis
                    </span>
                  </div>
                </a>

                {/* Email Support */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="group flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-slate-400 block">Envio de Projetos &amp; Plantas:</span>
                    <span className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors break-all">
                      {COMPANY_INFO.email}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Aceitamos DWG, PDF e planilhas
                    </span>
                  </div>
                </a>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Expedição &amp; Atendimento:</span>
                    <span className="text-sm font-semibold text-white">
                      {COMPANY_INFO.hours}
                    </span>
                    <span className="text-xs text-emerald-400 block mt-0.5 font-medium">
                      Carregamento e Entregas Programadas
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Fábrica &amp; Pátio de Blocos:</span>
                    <span className="text-sm font-semibold text-white">
                      {COMPANY_INFO.address}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Entregas para Construtoras e Obras da Região
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Guarantee Card */}
            <div className="bg-[#0E1A2E]/50 border border-slate-800 rounded-2xl p-5 text-xs text-slate-300 space-y-3">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <ShieldCheck className="w-4 h-4 text-orange-500" aria-hidden="true" />
                <span>Compromisso de Fábrica BLOCO FORTE</span>
              </div>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-hidden="true" />
                  <span>Blocos em conformidade técnica com normas ABNT NBR 6136 e 12118</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-hidden="true" />
                  <span>Descarga mecanizada com caminhão munk direto no ponto da obra</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-hidden="true" />
                  <span>Preço competitivo direto do fabricante com condição para CNPJ</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: The Contact & Service Request Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div
              id="contact-form-container"
              className="bg-[#0E1A2E]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative"
            >
              {isSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-8 text-center space-y-4 animate-in fade-in"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Cotação Enviada com Sucesso!</h3>
                  <p className="text-sm text-emerald-200 max-w-md mx-auto leading-relaxed">
                    Obrigado, <span className="font-bold text-white">{formData.name}</span>. Recebemos
                    sua solicitação para <span className="font-bold text-white">{formData.service}</span>. Nosso
                    departamento técnico-comercial entrará em contato pelo telefone{' '}
                    <span className="font-bold text-white">{formData.phone}</span> em até 15 minutos
                    com os valores e opções de entrega munk.
                  </p>
                  {formData.promoCode && (
                    <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs px-3 py-1.5 rounded-md font-mono">
                      Condição comercial <strong>{formData.promoCode}</strong> registrada
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-4 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm transition-all"
                    >
                      <span>Fazer Nova Cotação</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  id="main-contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Formulário de solicitação de cotação de blocos"
                  className="space-y-5"
                >
                  <div className="border-b border-slate-800/80 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Envie os Dados da Obra &amp; Solicite Orçamento
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Informe os blocos ou metragem estimada. Garantimos retorno rápido com proposta completa.
                    </p>
                  </div>

                  {/* Row 1: Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-300 mb-1"
                      >
                        Nome / Construtora <span className="text-orange-500" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-slate-500" aria-hidden="true" />
                        </div>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="ex: Engenharia Silva / Carlos"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                          }}
                          aria-required="true"
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                          className={`w-full bg-[#080E18] border ${
                            formErrors.name ? 'border-rose-500 focus:ring-rose-400' : 'border-slate-700/80 focus:border-orange-500'
                          } text-white rounded-lg pl-10 pr-3.5 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                        />
                      </div>
                      {formErrors.name && (
                        <p id="contact-name-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-slate-300 mb-1"
                      >
                        Telefone / WhatsApp <span className="text-orange-500" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-slate-500" aria-hidden="true" />
                        </div>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="(11) 98765-4321"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                          }}
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'contact-phone-error' : undefined}
                          className={`w-full bg-[#080E18] border ${
                            formErrors.phone ? 'border-rose-500 focus:ring-rose-400' : 'border-slate-700/80 focus:border-orange-500'
                          } text-white rounded-lg pl-10 pr-3.5 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p id="contact-phone-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & Urgency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-300 mb-1"
                      >
                        E-mail <span className="text-slate-500 text-[11px]">(para envio da proposta)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
                        </div>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="contato@construtora.com.br"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                          }}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                          className={`w-full bg-[#080E18] border ${
                            formErrors.email ? 'border-rose-500 focus:ring-rose-400' : 'border-slate-700/80 focus:border-orange-500'
                          } text-white rounded-lg pl-10 pr-3.5 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                        />
                      </div>
                      {formErrors.email && (
                        <p id="contact-email-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Urgency / Timeframe */}
                    <div>
                      <label
                        htmlFor="contact-urgency"
                        className="block text-xs font-semibold text-slate-300 mb-1"
                      >
                        Prazo de Entrega Desejado
                      </label>
                      <CustomSelect
                        value={formData.urgency}
                        onChange={(val) => setFormData({ ...formData, urgency: val })}
                        options={[
                          { value: "Entrega Imediata (Pronta Entrega)", label: "⚡ Entrega Imediata (Pronta Entrega)" },
                          { value: "Programada para esta Semana", label: "📅 Programada para esta Semana" },
                          { value: "Programada para os Próximos 15-30 dias", label: "🏗️ Programada para os Próximos 15-30 dias" },
                          { value: "Apenas Orçamento / Fase de Projeto", label: "💬 Apenas Cotação / Fase de Planejamento" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection & Promo Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Needed */}
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-semibold text-slate-300 mb-1"
                      >
                        Material / Serviço Desejado <span className="text-orange-500" aria-hidden="true">*</span>
                      </label>
                      <CustomSelect
                        value={formData.service}
                        onChange={(val) => {
                          setFormData({ ...formData, service: val });
                          if (formErrors.service) setFormErrors({ ...formErrors, service: '' });
                        }}
                        error={!!formErrors.service}
                        placeholder="Selecione o tipo de bloco ou serviço..."
                        options={[
                          ...SERVICES_LIST.map((svc) => ({ value: svc.title, label: `${svc.title} (${svc.startingPrice})` })),
                          { value: "Blocos Estruturais 14x19x39", label: "Blocos Estruturais 14x19x39 (4.5 a 12 MPa)" },
                          { value: "Blocos de Vedação 09x19x39 / 14x19x39", label: "Blocos de Vedação Convencionais" },
                          { value: "Canaletas Estruturais em 'U'", label: "Canaletas Estruturais em 'U' e 'J'" },
                          { value: "Piso Intertravado Paver 16 Faces", label: "Pisos Intertravados de Concreto" },
                          { value: "Carga Fechada de Blocos com Munk", label: "Carga Fechada / Atacado com Descarregamento" },
                          { value: "Outro / Cotação Completa de Projeto", label: "Outro / Cotação Completa de Projeto" },
                        ]}
                      />
                      {formErrors.service && (
                        <p id="contact-service-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span>{formErrors.service}</span>
                        </p>
                      )}
                    </div>

                    {/* Promo Code (Optional) */}
                    <div>
                      <label
                        htmlFor="contact-promo"
                        className="block text-xs font-semibold text-slate-300 mb-1"
                      >
                        Código Promocional / Parceiro <span className="text-slate-500 text-[11px]">(opcional)</span>
                      </label>
                      <input
                        id="contact-promo"
                        name="promoCode"
                        type="text"
                        placeholder="ex: CARGAFECHADA, OBRALIMPA"
                        value={formData.promoCode}
                        onChange={(e) => setFormData({ ...formData, promoCode: e.target.value.toUpperCase() })}
                        className="w-full bg-[#080E18] border border-slate-700/80 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors uppercase"
                      />
                    </div>
                  </div>

                  {/* Message / Problem Description */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-slate-300 mb-1"
                    >
                      Detalhes da Obra / Quantidade Estimada{' '}
                      <span className="text-slate-500 text-[11px]">(opcional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      placeholder="Ex: Preciso de 3.200 blocos estruturais 14x19x39 de 6MPa e 300 canaletas para obra no bairro Jardim das Flores com descarga munk..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#080E18] border border-slate-700/80 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-y min-h-[80px]"
                    />
                  </div>

                  {/* Submit Button & Reassurance */}
                  <div className="pt-2 space-y-3">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-75 text-slate-950 font-extrabold py-3.5 px-6 rounded-lg text-base transition-all shadow-lg shadow-orange-500/25 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>{isSubmitting ? 'Calculando Frete e Proposta...' : 'Enviar Solicitação & Obter Cotação Direto da Fábrica'}</span>
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 text-center">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        Cotação rápida sem compromisso
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        Descarga paletizada com munk
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        Faturamento facilitado para CNPJ
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
