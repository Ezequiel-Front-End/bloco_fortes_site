import React from 'react';
import { Feather, Thermometer, Volume2, Shield, Truck, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const EpsBlockPromo: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#080E18] to-[#0B1320] border-t border-slate-800/80 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-orange-500/10 text-orange-400 font-bold px-4 py-1.5 rounded-full text-sm tracking-wider uppercase border border-orange-500/20">
              Novidade na Bloco Forte
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
          >
            BLOCO DE CONCRETO <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">COM EPS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 font-medium"
          >
            Mais conforto, praticidade e economia para sua obra!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Features */}
          <div className="space-y-6">
            {[
              { icon: Feather, title: "LEVE", desc: "Facilita o transporte e a execução." },
              { icon: Thermometer, title: "CONFORTO TÉRMICO", desc: "Mantém o ambiente mais agradável." },
              { icon: Volume2, title: "CONFORTO ACÚSTICO", desc: "Reduz ruídos." },
              { icon: Shield, title: "RESISTENTE", desc: "Mais segurança para sua obra." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Pricing Table & Info */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Table */}
            <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 sm:p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h3 className="text-2xl sm:text-3xl font-black text-white relative z-10 drop-shadow-md">TABELA DE VALORES</h3>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    <div className="w-8 h-6 border-2 border-slate-400 rounded-sm relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-500/50"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Tamanho:</p>
                    <p className="text-xl font-black text-white">100 x 50 x 15 cm</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-lg font-bold text-slate-300">1 unidade</span>
                    <span className="text-2xl font-black text-white">R$ 89,00</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-lg font-bold text-slate-300">100 unidades</span>
                    <span className="text-2xl font-black text-orange-400">R$ 8.900,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rendimento Highlight */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-10">
                 <Shield className="w-32 h-32" />
               </div>
               <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-orange-200 font-bold uppercase tracking-widest text-sm mb-1">Rendimento Excepcional</h4>
                    <p className="text-white text-xl sm:text-2xl font-black leading-tight">
                      100 BLOCOS = APROX. <span className="text-3xl text-orange-300">50m²</span><br/>
                      <span className="text-lg font-medium text-orange-100">DE PAREDE PRONTA, JÁ COM REBOCO.</span>
                    </p>
                  </div>
               </div>
            </div>

          </motion.div>
        </div>

        {/* Footer Features */}
        <div className="mt-16 pt-8 border-t border-slate-800/60">
          <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <Truck className="w-8 h-8 text-slate-400" />
              <div>
                <p className="font-bold text-white text-sm">Entrega:</p>
                <p className="text-slate-400 text-sm">consultar valor.</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <CreditCard className="w-8 h-8 text-slate-400" />
              <div>
                <p className="font-bold text-white text-sm">Pagamento:</p>
                <p className="text-slate-400 text-sm">consultar condições.</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <CheckCircle className="w-8 h-8 text-slate-400" />
              <div>
                <p className="font-bold text-white text-sm">Qualidade e segurança</p>
                <p className="text-slate-400 text-sm">em cada detalhe.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
              "Invista em qualidade!"
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};
