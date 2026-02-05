import React from 'react';
import { RISKS_EXTENDED } from '../constants';
import { AlertTriangle, Info } from 'lucide-react';

export default function Risks() {
  const getSeverity = (prob: number, imp: number) => {
    const score = prob * imp;
    if (score >= 15) return 'Crítico';
    if (score >= 8) return 'Médio';
    return 'Baixo';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Gestão Profissional de Riscos</h2>
        <p className="text-slate-400 mt-1">Matriz de Probabilidade x Impacto para Transformação Digital.</p>
      </div>

      <div className="storytelling mb-8 p-6 bg-gradient-to-r from-cyan-900/50 to-slate-800 rounded-2xl border border-cyan-500/30 shadow-2xl">
        <h3 className="text-xl font-bold text-cyan-300 mb-2">📖 Jornada da Transformação</h3>
        <p className="text-slate-300 leading-relaxed">
          Matriz heatmapeia 23 ameaças. Cultural Resistance (HIGH/HIGH) mitigada RH via gamification(-42% resistance). RISKS_DATA previu 87% mitigação alcançada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h4 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-wider">Matriz de Criticidade (Heatmap)</h4>
          <div className="flex flex-col">
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map(row => (
                <div key={row} className="flex gap-1 h-12">
                  <div className="w-8 flex items-center justify-center text-[10px] text-slate-500 font-bold">{row}</div>
                  {[1, 2, 3, 4, 5].map(col => {
                    const score = row * col;
                    const isRisk = RISKS_EXTENDED.some(r => r.probability === col && r.impact === row);
                    return (
                      <div 
                        key={`${row}-${col}`} 
                        className={`flex-1 rounded flex items-center justify-center transition-all
                          ${score >= 15 ? 'bg-red-500/20 text-red-500' : score >= 8 ? 'bg-orange-500/20 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'}
                          ${isRisk ? 'ring-2 ring-white scale-110 z-10' : 'opacity-40'}
                        `}
                      >
                        {isRisk && <AlertTriangle className="w-4 h-4" />}
                      </div>
                    )
                  })}
                </div>
              ))}
              <div className="flex gap-1">
                <div className="w-8"></div>
                {[1, 2, 3, 4, 5].map(col => (
                  <div key={col} className="flex-1 text-center text-[10px] text-slate-500 font-bold pt-1">{col}</div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-between text-[10px] text-slate-500 uppercase font-bold px-8">
              <span>Impacto (Y)</span>
              <span>Probabilidade (X)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {RISKS_EXTENDED.map(risk => (
               <div key={risk.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-cyan-500/40 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">{risk.category}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold
                      ${getSeverity(risk.probability, risk.impact) === 'Crítico' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-400'}
                    `}>{getSeverity(risk.probability, risk.impact)}</span>
                  </div>
                  <h5 className="font-bold text-slate-100 mb-1">{risk.risk}</h5>
                  <p className="text-xs text-slate-500 mb-4 flex items-center"><Info className="w-3 h-3 mr-1" /> KRI: {risk.kri}</p>
                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Mitigação:</p>
                    <p className="text-xs text-slate-300 italic">"{risk.mitigation}"</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-[10px] uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">Risco</th>
              <th className="px-6 py-4 text-center">P x I</th>
              <th className="px-6 py-4">Responsável</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {RISKS_EXTENDED.map(risk => (
              <tr key={risk.id} className="text-sm hover:bg-slate-800/20">
                <td className="px-6 py-4 font-medium text-slate-200">{risk.risk}</td>
                <td className="px-6 py-4 text-center font-bold text-slate-400">{risk.probability} x {risk.impact}</td>
                <td className="px-6 py-4 text-slate-400">{risk.responsible}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${risk.status === 'Encerrado' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-cyan-500/10 text-cyan-400'}`}>
                    {risk.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}