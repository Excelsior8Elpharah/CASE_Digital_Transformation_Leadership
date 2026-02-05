import React from 'react';
import { PORTFOLIO_BEFORE, PORTFOLIO_AFTER } from '../constants';
import { Layers, TrendingUp, DollarSign, Target, Briefcase } from 'lucide-react';
import { ModoTransformacao } from '../types';

interface PortfolioProps {
  modo: ModoTransformacao;
}

export default function Portfolio({ modo }: PortfolioProps) {
  const isAfter = modo === 'depois';
  const projects = isAfter ? PORTFOLIO_AFTER : PORTFOLIO_BEFORE;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className={`text-2xl font-bold ${isAfter ? 'text-white' : 'text-red-400'}`}>
          Portfólio Digital: Investimentos & ROI
        </h2>
        <p className="text-slate-400 mt-1">
          {isAfter ? 'Iniciativas estratégicas de alto impacto selecionadas pelo CDO.' : 'Alocação reativa de recursos em manutenção de legados.'}
        </p>
      </div>

      <div className={`storytelling p-6 rounded-2xl border shadow-xl transition-all duration-500 ${isAfter ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
        <h3 className={`text-xl font-bold mb-2 ${isAfter ? 'text-cyan-300' : 'text-red-400'}`}>
          {isAfter ? '🚀 Maximização de Valor Digital' : '⚠️ Desperdício Operacional'}
        </h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          {isAfter 
            ? 'Nosso portfólio atual foca em projetos com ROI superior a 150%, alinhando tecnologia ao core business da Sabor & Herança.'
            : 'Historicamente, 80% do budget era consumido por correções de bugs em sistemas obsoletos, com ROI irrisório.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className={`bg-slate-900 border ${isAfter ? 'border-slate-800 hover:border-cyan-500/30' : 'border-red-500/20 hover:border-red-500/40'} rounded-3xl p-6 transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-800 rounded-lg">
                <Layers className={`w-5 h-5 ${isAfter ? 'text-cyan-400' : 'text-slate-500'}`} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                !isAfter ? 'bg-red-500/10 text-red-500' :
                project.phase === 'Concluído' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-cyan-500/10 text-cyan-400'
              }`}>
                {project.phase}
              </span>
            </div>
            
            <h4 className="text-lg font-bold text-white mb-1">{project.name}</h4>
            <p className="text-xs text-slate-500 mb-6 uppercase font-bold tracking-widest">{project.type}</p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
               <div>
                 <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Custo</p>
                 <div className="flex items-center text-sm font-bold text-slate-200">
                    <DollarSign className="w-3 h-3 mr-1 text-slate-500" /> {project.cost}
                 </div>
               </div>
               <div>
                 <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">ROI</p>
                 <div className={`flex items-center text-sm font-bold ${isAfter ? 'text-emerald-400' : 'text-red-400'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" /> {project.roi}
                 </div>
               </div>
            </div>

            <div className={`mt-6 p-4 rounded-2xl border ${isAfter ? 'bg-slate-950/50 border-slate-800/50' : 'bg-red-950/10 border-red-900/20'}`}>
               <p className="text-[10px] text-slate-500 font-bold uppercase mb-1 flex items-center">
                 <Target className="w-3 h-3 mr-1" /> Impacto:
               </p>
               <p className="text-xs text-slate-300 font-medium italic">"{project.benefit}"</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h4 className="font-bold text-lg mb-6 flex items-center">
              <div className={`w-2 h-6 ${isAfter ? 'bg-cyan-500' : 'bg-red-500'} rounded-full mr-3`}></div>
              Alocação Estratégica do Budget
            </h4>
            <div className="space-y-6">
               {[
                 { label: 'Inovação/IA', val: isAfter ? 45 : 5, color: isAfter ? 'bg-emerald-500' : 'bg-red-900' },
                 { label: 'E-commerce', val: isAfter ? 35 : 10, color: isAfter ? 'bg-cyan-500' : 'bg-red-700' },
                 { label: 'Legado/Suporte', val: isAfter ? 20 : 85, color: isAfter ? 'bg-slate-700' : 'bg-red-500' }
               ].map((bar, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                      <span>{bar.label}</span>
                      <span>{bar.val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full ${bar.color} transition-all duration-1000`} style={{ width: `${bar.val}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className={`border ${isAfter ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'} rounded-3xl p-8 flex flex-col justify-center items-center text-center`}>
            <div className={`w-16 h-16 ${isAfter ? 'bg-emerald-500/10' : 'bg-red-500/10'} rounded-full flex items-center justify-center mb-4`}>
               <Briefcase className={`w-8 h-8 ${isAfter ? 'text-emerald-400' : 'text-red-400'}`} />
            </div>
            <h4 className="text-xl font-bold mb-2">Health Score do Portfólio</h4>
            <p className={`text-5xl font-extrabold mb-4 ${isAfter ? 'text-emerald-400' : 'text-red-400'}`}>
              {isAfter ? 'A+' : 'D-'}
            </p>
            <p className="text-sm text-slate-500">
              {isAfter ? '↑ +12.5% vs Q1 2024' : 'Erosão de valor contínua'}
            </p>
         </div>
      </div>
    </div>
  );
}