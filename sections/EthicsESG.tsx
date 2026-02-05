import React, { useMemo, useState } from 'react';
import { Leaf, Download, ShieldCheck, Share2, TrendingUp, TrendingDown, Gavel, Info, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ModoTransformacao } from '../types';

interface EthicsESGProps {
  modo: ModoTransformacao;
}

const ESG_NORMATIVE_INFO: Record<string, string> = {
  'Governança (G)': 'ISO 37000:2021 (Governança Organizacional) e ISO 37001 (Sistemas de Gestão Antissuborno). Cláusulas 4.4 (Sistema de Gestão) e 8.10 (Investigação e Tratamento). Integrada ao framework de Ética em IA para garantir transparência algorítmica e responsabilidade executiva.',
  'Ambiental (E)': 'ISO 14001:2015 - Sistema de Gestão Ambiental. Cláusula 6.1.2 (Aspectos Ambientais) e 8.1 (Planejamento e Controle). Aplicada na rastreabilidade total de café sustentável, eficiência energética e redução drástica de resíduos industriais.',
  'Social (S)': 'ISO 26000:2010 (Diretrizes sobre Responsabilidade Social). Temas centrais: Práticas de Trabalho Justas, Meio Ambiente e Envolvimento com a Comunidade. Inclui auditoria de diversidade, inclusão digital e impacto social local.'
};

export default function EthicsESG({ modo }: EthicsESGProps) {
  const isAfter = modo === 'depois';
  const [activeEsgId, setActiveEsgId] = useState<string>('Governança (G)');
  
  const detailedScores = useMemo(() => isAfter 
    ? [
        { label: 'Governança (G)', score: 8.4, desc: 'Conselho de Conformidade e Ética em IA', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { label: 'Ambiental (E)', score: 7.9, desc: 'Cadeia de Suprimentos Carbono Zero', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Social (S)', score: 9.1, desc: 'Comunidade e Diversidade Tecnológica', color: 'text-purple-400', bg: 'bg-purple-500/10' }
      ]
    : [
        { label: 'Governança (G)', score: 3.1, desc: 'Falta de Transparência Transacional', color: 'text-red-500', bg: 'bg-red-500/10' },
        { label: 'Ambiental (E)', score: 3.8, desc: 'Alto Desperdício na Produção', color: 'text-red-400', bg: 'bg-red-400/10' },
        { label: 'Social (S)', score: 4.2, desc: 'Baixo Engajamento Digital', color: 'text-red-300', bg: 'bg-red-300/10' }
      ]
  , [isAfter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h2 className={`text-3xl font-black ${isAfter ? 'text-white' : 'text-red-400'}`}>
            Ética, Governança & ESG
          </h2>
          <p className="text-slate-400 mt-1 text-lg">Integridade e sustentabilidade baseada em cláusulas normativas internacionais.</p>
        </div>
        <button 
          onClick={() => alert("Gerando Relatório de Transparência...")}
          className={`flex items-center space-x-2 px-6 py-3 ${isAfter ? 'bg-emerald-600' : 'bg-red-600'} text-white rounded-2xl text-sm font-bold transition-all shadow-xl hover:scale-105 active:scale-95`}
        >
          <Download className="w-4 h-4" />
          <span>Exportar Relatório ESG</span>
        </button>
      </div>

      <div className={`storytelling p-10 rounded-[2.5rem] border shadow-2xl transition-all duration-700 ${isAfter ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h3 className={`text-2xl font-black mb-4 flex items-center gap-3 ${isAfter ? 'text-emerald-400' : 'text-red-400'}`}>
              <ShieldCheck className="w-8 h-8" /> {isAfter ? 'Governança Digital de Alto Impacto' : 'Riscos de Integridade & Conformidade'}
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg">
              {isAfter 
                ? 'Nosso framework atual integra o compliance normativo ao core business. Com rastreabilidade via Blockchain e auditorias de IA baseadas na ISO 37000, garantimos transparência total em todas as transações da Sabor & Herança.'
                : 'A ausência de controles normativos criava lacunas críticas (violação da ISO 26000). O desperdício não era monitorado sob a ótica da ISO 14001, expondo a marca a passivos ambientais e reputacionais.'}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Pontuação ESG Global</span>
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center text-4xl font-black ${isAfter ? 'border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20' : 'border-red-500 text-red-500 animate-pulse'}`}>
              {isAfter ? '8.4' : '3.5'}
            </div>
            <span className={`text-xs font-bold mt-2 ${isAfter ? 'text-emerald-500' : 'text-red-500'}`}>
              {isAfter ? 'Nível: Classe Mundial' : 'Nível: Reativo'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {detailedScores.map((kpi, i) => (
          <div 
            key={i} 
            onClick={() => setActiveEsgId(kpi.label)}
            className={`
              bg-slate-900 border cursor-pointer p-8 rounded-[2rem] transition-all group relative overflow-hidden flex flex-col
              ${activeEsgId === kpi.label ? 'border-primary ring-1 ring-primary' : isAfter ? 'border-slate-800 hover:border-slate-700' : 'border-red-500/20'}
            `}
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 ${kpi.bg}`}></div>
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${kpi.bg} ${kpi.color}`}>
                <span className="text-3xl font-black">{kpi.score}</span>
                <span className="text-[10px] block opacity-60 font-bold">/10.0</span>
              </div>
              <div className={`p-1.5 rounded-lg transition-colors ${activeEsgId === kpi.label ? 'bg-primary text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                <Info className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex-1">
               <h4 className="text-xl font-bold text-white mb-2">{kpi.label}</h4>
               <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-wider mb-4">{kpi.desc}</p>
            </div>

            <div className="w-full h-2 bg-slate-950 rounded-full mt-6 overflow-hidden border border-slate-800">
               <div className={`h-full ${isAfter ? 'bg-gradient-to-r from-cyan-500 to-emerald-400' : 'bg-red-500'} transition-all duration-1000`} style={{ width: `${kpi.score * 10}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in slide-in-from-top-4">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Detalhamento das Normas ESG</h3>
            <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Base de Governança & Sustentabilidade</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 space-y-2">
             <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Pilares ESG</p>
             {Object.keys(ESG_NORMATIVE_INFO).map(label => (
               <button 
                key={label}
                onClick={() => setActiveEsgId(label)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeEsgId === label ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
               >
                 <span>{label.split(' ')[0]}</span>
                 {activeEsgId === label && <ChevronDown className="w-4 h-4" />}
               </button>
             ))}
          </div>

          <div className="lg:col-span-3 bg-slate-900/50 rounded-3xl p-8 border border-slate-800/50 min-h-[200px] flex flex-col justify-center">
             <div key={activeEsgId} className="animate-in fade-in duration-500">
                <h4 className="text-emerald-400 font-black text-lg mb-4 uppercase flex items-center gap-2">
                  <Leaf className="w-5 h-5" /> Foco Normativo: {activeEsgId}
                </h4>
                <p className="text-slate-200 leading-relaxed text-base italic border-l-4 border-emerald-500/30 pl-6 py-2">
                  {ESG_NORMATIVE_INFO[activeEsgId]}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Relatório de Transparência 2024</span>
                  <span className="flex items-center gap-2 uppercase">Certificações Associadas: ISO 14001, 26000, 37001</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}