import React from 'react';
import { Mail, Users, Megaphone, CheckCircle2 } from 'lucide-react';

export default function Governance() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Governança & Comunicação</h2>
        <p className="text-slate-400 mt-1">Estrutura de liderança e marcos de engajamento do projeto.</p>
      </div>

      <div className="storytelling mb-8 p-6 bg-gradient-to-r from-cyan-900/50 to-slate-800 rounded-2xl border border-cyan-500/30 shadow-2xl">
        <h3 className="text-xl font-bold text-cyan-300 mb-2">📖 Jornada da Transformação</h3>
        <p className="text-slate-300 leading-relaxed">
          Governance framework: RACI matrix + steering committee cadence. Raphael Serafim aprovou 18 gates, garantindo alignment estratégico-tático.
        </p>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center">
          <Users className="w-5 h-5 mr-2 text-cyan-400" /> Comitê de Transformação Digital
        </h3>
        <div className="flex flex-col items-center">
          <div className="bg-cyan-500 text-slate-950 p-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/20 text-center w-64 mb-12 relative">
            <p className="text-xs opacity-70 mb-1 font-bold">CDO</p>
            Raphael Serafim
            <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 w-0.5 bg-slate-700"></div>
          </div>

          <div className="relative w-full max-w-4xl h-0.5 bg-slate-700 mb-12">
            <div className="absolute top-0 left-0 w-px h-12 bg-slate-700"></div>
            <div className="absolute top-0 left-1/4 w-px h-12 bg-slate-700"></div>
            <div className="absolute top-0 left-2/4 w-px h-12 bg-slate-700"></div>
            <div className="absolute top-0 left-3/4 w-px h-12 bg-slate-700"></div>
            <div className="absolute top-0 left-full w-px h-12 bg-slate-700"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
            {[
              { role: 'TI', lead: 'André' },
              { role: 'Operações', lead: 'Carla' },
              { role: 'Comercial', lead: 'Roberto' },
              { role: 'Marketing', lead: 'Juliana' },
              { role: 'RH', lead: 'Fernanda' }
            ].map((node, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center hover:border-cyan-500 transition-colors">
                <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">{node.role}</p>
                <p className="text-sm font-semibold text-slate-200">{node.lead}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-slate-500/10 rounded-2xl">
              <Mail className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-xl font-bold">Comunicação Interna</h4>
          </div>
          <ul className="space-y-6">
             {[
               { title: 'Newsletters Quinzenais', desc: 'Progresso da transformação para todos os colaboradores.' },
               { title: 'Townhalls Mensais', desc: 'Q&A direto com o CDO Raphael Serafim para tirar dúvidas e reduzir medos.' },
               { title: 'Treinamentos de Upskilling', desc: 'Workshops práticos de ferramentas digitais e metodologia ágil.' }
             ].map((item, i) => (
               <li key={i} className="flex items-start space-x-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
               </li>
             ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <Megaphone className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold">Comunicação Externa</h4>
          </div>
          <ul className="space-y-6">
             {[
               { title: 'Lançamento E-commerce', desc: 'Campanha massiva de marketing digital e SEO para B2B.' },
               { title: 'Novidades Omnichannel', desc: 'Comunicação personalizada via CRM para clientes recorrentes.' },
               { title: 'Posicionamento Moderno', desc: 'Rebranding sutil para destacar a tecnologia da Sabor & Herança.' }
             ].map((item, i) => (
               <li key={i} className="flex items-start space-x-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
               </li>
             ))}
          </ul>
        </div>
      </section>
    </div>
  );
}