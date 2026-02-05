import React, { useMemo } from 'react';
import { Target, Zap } from 'lucide-react';
import { ModoTransformacao } from '../types';

interface MaturityDXProps {
  modo: ModoTransformacao;
}

export default function MaturityDX({ modo }: MaturityDXProps) {
  const isAfter = modo === 'depois';
  const score = isAfter ? 4.2 : 1.2;
  
  const levels = [
    { n: 1, title: 'Ad-hoc', desc: 'Sistemas isolados, processos manuais e reativos.', color: 'bg-red-500' },
    { n: 2, title: 'Iniciado', desc: 'Primeiros silos digitais e pilotos isolados.', color: 'bg-orange-500' },
    { n: 3, title: 'Definido', desc: 'Estratégia clara e infraestrutura base estabelecida.', color: 'bg-yellow-500' },
    { n: 4, title: 'Otimizado', desc: 'Dados em tempo real guiam a operação e inovação.', color: 'bg-cyan-500' },
    { n: 5, title: 'Inovador', desc: 'Cultura IA-first com autoajuste e escala global.', color: 'bg-emerald-500' }
  ];

  const axisData = useMemo(() => isAfter 
    ? [
        {name: 'Estratégia e Valor', score: 4.1, color: 'from-emerald-500', desc: 'Plataforma unificada de crescimento.'},
        {name: 'Capacidades Tecnológicas', score: 4.5, color: 'from-cyan-500', desc: 'Arquitetura em nuvem escalável.'},
        {name: 'Cultura Ágil', score: 3.8, color: 'from-purple-500', desc: 'Squads autônomos e mentalidade de teste.'},
        {name: 'Dados e IA', score: 4.4, color: 'from-blue-400', desc: 'Decisões guiadas por algoritmos preditivos.'}
      ]
    : [
        {name: 'Estratégia e Valor', score: 1.1, color: 'from-red-500', desc: 'Foco em manutenção do status quo.'},
        {name: 'Capacidades Tecnológicas', score: 1.5, color: 'from-red-700', desc: 'Servidores físicos obsoletos.'},
        {name: 'Cultura Ágil', score: 0.8, color: 'from-red-900', desc: 'Hierarquia rígida e medo do erro.'},
        {name: 'Dados e IA', score: 1.4, color: 'from-orange-500', desc: 'Dados fragmentados em Excel.'}
      ]
  , [isAfter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className={`text-3xl font-black ${isAfter ? 'text-white' : 'text-red-400'}`}>
          Maturidade Digital (DX Maturity Canvas)
        </h2>
        <p className="text-slate-400 mt-1 text-lg">Avaliação estrutural da organização baseada no framework McKinsey/BCG.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {levels.map((lvl) => (
          <div key={lvl.n} className={`p-6 rounded-3xl border transition-all duration-500 ${score >= lvl.n ? `bg-slate-900 ${isAfter ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-red-500/50'}` : 'bg-slate-950 border-slate-800 opacity-30'}`}>
            <div className={`w-10 h-10 rounded-xl ${score >= lvl.n ? lvl.color : 'bg-slate-800'} flex items-center justify-center text-slate-950 font-black mb-4`}>
              {lvl.n}
            </div>
            <h4 className="font-bold text-white mb-1">{lvl.title}</h4>
            <p className="text-[10px] text-slate-500 leading-tight uppercase font-bold">{lvl.desc}</p>
          </div>
        ))}
      </div>

      <div className={`storytelling p-8 rounded-[2.5rem] border shadow-xl transition-all duration-700 ${isAfter ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
        <div className="flex items-center gap-4 mb-4">
          <h3 className={`text-2xl font-black ${isAfter ? 'text-cyan-300' : 'text-red-400'}`}>
            {isAfter ? 'Nível 4.2: Estágio Otimizado' : 'Nível 1.2: Estágio Inicial'}
          </h3>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${isAfter ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {isAfter ? 'Referência Setorial' : 'Risco Crítico'}
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg italic">
          {isAfter 
            ? 'Atualmente, a Sabor & Herança utiliza uma plataforma unificada que conecta o chão de fábrica ao consumidor final. Nossas decisões de P&D são 100% validadas por Gêmeos Digitais (Digital Twins) das receitas, reduzindo o tempo de lançamento de novos produtos em 70%.'
            : 'No estado inicial, a organização dependia de heróis individuais para apagar incêndios. A falta de infraestrutura digital impedia qualquer tentativa de escala ou inovação ágil, mantendo a empresa refém de custos operacionais crescentes.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
          <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" /> Detalhamento por Eixo DX
          </h4>
          <div className="space-y-8">
            {axisData.map((axis, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h5 className="text-sm font-black text-slate-200 uppercase tracking-widest">{axis.name}</h5>
                    <p className="text-[10px] text-slate-500 italic font-medium">{axis.desc}</p>
                  </div>
                  <span className={`text-lg font-black ${isAfter ? 'text-emerald-400' : 'text-red-400'}`}>{axis.score}</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden shadow-inner border border-slate-800">
                  <div 
                    className={`h-full transition-all duration-1000 bg-gradient-to-r ${axis.color}`}
                    style={{width: `${(axis.score/5)*100}%`}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-center">
          <div className="text-center space-y-6">
            <div className={`w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center ${isAfter ? 'bg-cyan-500/10 border-2 border-cyan-500/50' : 'bg-red-500/10 border-2 border-red-500/50'}`}>
              <Zap className={`w-12 h-12 ${isAfter ? 'text-cyan-400' : 'text-red-400'}`} />
            </div>
            <div>
              <h4 className="text-3xl font-black text-white">Consenso Executivo</h4>
              <p className="text-slate-500 mt-2 uppercase text-xs font-bold tracking-[0.2em]">Framework BCG Gamma Analytics</p>
            </div>
            <div className={`p-6 rounded-2xl ${isAfter ? 'bg-emerald-500/5 border border-emerald-500/10' : 'bg-red-500/5 border border-red-500/10'}`}>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {isAfter 
                  ? 'Nossa maturidade atual nos permite investir em Projetos Experimentais de IA Generativa para criação de novos blends de café com 89% de precisão de aceitação no mercado.'
                  : 'A prioridade absoluta deve ser a estabilização da base tecnológica. Sem um ERP funcional e dados confiáveis, qualquer iniciativa de IA será inútil.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}