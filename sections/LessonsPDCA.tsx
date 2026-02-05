import React from 'react';
import { Lightbulb, RefreshCcw, BookOpen, Star } from 'lucide-react';

export default function LessonsPDCA() {
  const lessons = [
    { title: 'Migração ERP', desc: 'Sistemas legados tinham mais personalização do que o mapeado inicialmente.', gain: 'Melhor diagnóstico prévio em fases futuras.', area: 'TI' },
    { title: 'Treinamento Digital', desc: 'Gamificação aumentou a retenção de conhecimento em 40%.', gain: 'Padrão para todos os novos softwares.', area: 'Pessoas' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Lições Aprendidas & Melhoria Contínua</h2>
        <p className="text-slate-400 mt-1">Base de conhecimento para evitar re-trabalho e escalar acertos.</p>
      </div>

      <div className="storytelling mb-8 p-6 bg-gradient-to-r from-cyan-900/50 to-slate-800 rounded-2xl border border-cyan-500/30 shadow-2xl">
        <h3 className="text-xl font-bold text-cyan-300 mb-2">📖 Jornada da Transformação</h3>
        <p className="text-slate-300 leading-relaxed">
          Lessons Learned database captura 43 lições reais: "Piloto 3 lojas {'>'} 30" salvou R$1.8M. Knowledge transfer 360° acelerou Fase2 27%.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center text-cyan-400 uppercase tracking-widest">
               <BookOpen className="w-5 h-5 mr-2" /> Knowledge Base (Lições)
            </h3>
            {lessons.map((l, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
                 <div className="absolute top-4 right-4 text-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className="w-6 h-6 fill-current" />
                 </div>
                 <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold uppercase">{l.area}</span>
                    <h4 className="font-bold text-white">{l.title}</h4>
                 </div>
                 <p className="text-sm text-slate-400 mb-4 leading-relaxed italic">"{l.desc}"</p>
                 <div className="pt-4 border-t border-slate-800/50">
                    <p className="text-[10px] text-cyan-400 font-bold uppercase mb-1">Ação de Melhoria:</p>
                    <p className="text-xs text-slate-300">{l.gain}</p>
                 </div>
              </div>
            ))}
         </div>

         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-lg font-bold flex items-center text-purple-400 uppercase tracking-widest mb-8">
               <RefreshCcw className="w-5 h-5 mr-2" /> Ciclos PDCA Ativos
            </h3>
            <div className="space-y-8">
               {[
                 { label: 'E-commerce Checkout', step: 'C', progress: 75, status: 'Verificando logs de erro' },
                 { label: 'IoT Linha B', step: 'D', progress: 40, status: 'Instalação de sensores' },
                 { label: 'Cloud ERP Migration', step: 'P', progress: 95, status: 'Finalizando desenho processos' }
               ].map((pdca, i) => (
                 <div key={i} className="relative">
                    <div className="flex justify-between items-end mb-2">
                       <div>
                          <p className="text-sm font-bold text-white">{pdca.label}</p>
                          <p className="text-[10px] text-slate-500 italic">{pdca.status}</p>
                       </div>
                       <div className="text-right">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/40 inline-block`}>
                             {pdca.step}
                          </span>
                       </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${pdca.progress}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}