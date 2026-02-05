import React from 'react';
import { Database, Laptop, BarChart, Server, Shield } from 'lucide-react';

export default function TechArch() {
  const tiers = [
    {
      title: 'Experiência do Cliente (Omnichannel)',
      icon: Laptop,
      color: 'bg-cyan-500',
      items: [
        { name: 'E-commerce B2B/B2C', desc: 'Plataforma VTEX / Adobe Commerce.' },
        { name: 'App Fidelidade', desc: 'React Native com programa de pontos.' },
        { name: 'CRM Integrado', desc: 'Salesforce para visão 360 do cliente.' }
      ]
    },
    {
      title: 'Inteligência & Analytics',
      icon: BarChart,
      color: 'bg-purple-500',
      items: [
        { name: 'BI Centralizado', desc: 'Power BI dashboards em tempo real.' },
        { name: 'Predictive Analytics', desc: 'Previsão de demanda e churn.' },
        { name: 'Data Lake', desc: 'Repositório único em Azure/AWS.' }
      ]
    },
    {
      title: 'Núcleo Operacional (ERP & IoT)',
      icon: Database,
      color: 'bg-blue-500',
      items: [
        { name: 'ERP em Nuvem', desc: 'SAP S/4HANA Cloud (Migration).' },
        { name: 'Industrial IoT', desc: 'Sensores em linha para qualidade.' },
        { name: 'RPA Tasks', desc: 'Automação de processos financeiros.' }
      ]
    },
    {
      title: 'Infraestrutura & Segurança',
      icon: Server,
      color: 'bg-slate-700',
      items: [
        { name: 'Cloud Foundation', desc: 'Arquitetura Multi-cloud escalável.' },
        { name: 'Blockchain Trace', desc: 'Rastreabilidade de insumos.' },
        { name: 'Cyber Security', desc: 'Proteção LGPD e zero-trust.' }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Arquitetura Digital & Tecnologias</h2>
        <p className="text-slate-400 mt-1">Mapa das ferramentas que sustentam o novo modelo de negócio.</p>
      </div>

      <div className="storytelling mb-8 p-6 bg-gradient-to-r from-cyan-900/50 to-slate-800 rounded-2xl border border-cyan-500/30 shadow-2xl">
        <h3 className="text-xl font-bold text-cyan-300 mb-2">📖 Jornada da Transformação</h3>
        <p className="text-slate-300 leading-relaxed">
          Tech Stack modelou migração on-premise→AWS + IA Gemini. De RPA básico → Transformação com Computer Vision receitas antigas. Deploy GitHub Actions zerou downtime 99.9% SLA.
        </p>
      </div>

      <div className="flex flex-col space-y-6">
        {tiers.map((tier, idx) => {
          const TierIcon = tier.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="shrink-0 flex items-center gap-4 w-full md:w-64">
                <div className={`p-4 rounded-2xl ${tier.color} text-white shadow-lg`}>
                  <TierIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold leading-tight">{tier.title}</h3>
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {tier.items.map((item, i) => (
                  <div key={i} className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-colors">
                    <p className="text-sm font-bold text-white mb-1">{item.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-3xl flex items-start gap-4">
        <Shield className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
        <div>
          <h4 className="text-cyan-400 font-bold mb-1">Governança de Dados & LGPD</h4>
          <p className="text-sm text-slate-300">
            Toda a arquitetura foi desenhada com "Privacy by Design", garantindo conformidade com a LGPD e protegendo os 
            dados de clientes e receitas proprietárias da Sabor & Herança.
          </p>
        </div>
      </div>
    </div>
  );
}