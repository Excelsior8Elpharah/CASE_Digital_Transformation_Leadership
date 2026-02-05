import React, { useState, useEffect } from 'react';
import { Info, Pencil, Save } from 'lucide-react';

interface FiveWItem {
  key: string;
  question: string;
  title: string;
  description: string;
  details: string[];
}

const INITIAL_DATA: FiveWItem[] = [
  { 
    key: 'what', question: 'O Quê?', title: 'Transformação Digital Integrada',
    description: 'Implementar a jornada digital completa na Sabor & Herança.',
    details: ['E-commerce Omnichannel', 'ERP Cloud S/4HANA', 'BI & Analytics', 'IoT Industrial', 'Cultura Ágil']
  },
  { 
    key: 'why', question: 'Por Quê?', title: 'Competitividade & Market Share',
    description: 'Recuperar 8% de market share e modernizar a marca frente às foodtechs.',
    details: ['Redução de custos operacionais', 'Aumento da agilidade de inovação', 'Aproximação com o consumidor digital', 'Tomada de decisão baseada em dados']
  },
  { 
    key: 'where', question: 'Onde?', title: 'Corporativo & Fábrica',
    description: 'Matriz administrativa e principais unidades produtivas.',
    details: ['Escritório Central (SP)', 'Planta Industrial (MG)', 'Canais Digitais Globais']
  },
  { 
    key: 'when', question: 'Quando?', title: 'Cronograma de 18 Meses',
    description: 'Execução dividida em 3 fases estratégicas.',
    details: ['Fase 1: Meses 1-6 (Base)', 'Fase 2: Meses 7-12 (Expansão)', 'Fase 3: Meses 13-18 (Otimização)']
  },
  { 
    key: 'who', question: 'Quem?', title: 'Equipe de Governança',
    description: 'Liderada pelo CDO e Comitê de Transformação Digital.',
    details: ['Raphael Serafim (CDO)', 'CTO & Squads de TI', 'Gerência de Operações', 'Marketing & Comercial', 'Consultoria Parceira']
  },
  { 
    key: 'how', question: 'Como?', title: 'Metodologia Ágil & PDCA',
    description: 'Processos estruturados e ciclos curtos de entrega.',
    details: ['Sprints quinzenais', 'Migração gradual para Nuvem', 'Treinamento contínuo', 'Pilotos industriais']
  },
  { 
    key: 'howmuch', question: 'Quanto?', title: 'Investimento Projetado',
    description: 'Orçamento estimado entre R$ 2–3 milhões.',
    details: ['ROI esperado: 24 meses', 'CAPEX em infraestrutura', 'OPEX em softwares as a service', 'Budget para capacitação']
  },
];

export default function FiveWTwoH() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [data, setData] = useState<FiveWItem[]>(() => {
    const saved = localStorage.getItem('sabor_heranca_5w2h');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<FiveWItem | null>(null);

  useEffect(() => {
    localStorage.setItem('sabor_heranca_5w2h', JSON.stringify(data));
  }, [data]);

  const handleEdit = (e: React.MouseEvent, item: FiveWItem) => {
    e.stopPropagation();
    setEditingId(item.key);
    setEditItem({ ...item });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editItem) return;
    setData(prev => prev.map(item => item.key === editItem.key ? editItem : item));
    setEditingId(null);
    setEditItem(null);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Plano de Ação 5W2H</h2>
        <p className="text-slate-400 mt-1">Definição estratégica editável de objetivos e responsabilidades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <div 
            key={item.key}
            onClick={() => setSelectedId(selectedId === item.key ? null : item.key)}
            className={`
              p-6 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden
              ${selectedId === item.key 
                ? 'bg-cyan-500/10 border-cyan-500 ring-1 ring-cyan-500 shadow-lg shadow-cyan-500/10' 
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedId === item.key ? 'text-cyan-400' : 'text-slate-500'}`}>
                {item.question}
              </span>
              <div className="flex gap-2">
                {editingId === item.key ? (
                  <button onClick={handleSave} className="p-1 text-emerald-400 hover:scale-110 transition-transform">
                    <Save className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={(e) => handleEdit(e, item)} className="p-1 text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
                <Info className={`w-4 h-4 transition-colors ${selectedId === item.key ? 'text-cyan-400' : 'text-slate-600'}`} />
              </div>
            </div>

            {editingId === item.key ? (
              <div className="space-y-3" onClick={e => e.stopPropagation()}>
                <input 
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm font-bold text-white outline-none focus:border-cyan-500"
                  value={editItem?.title}
                  onChange={e => setEditItem(prev => prev ? {...prev, title: e.target.value} : null)}
                />
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-400 outline-none focus:border-cyan-500 h-16 resize-none"
                  value={editItem?.description}
                  onChange={e => setEditItem(prev => prev ? {...prev, description: e.target.value} : null)}
                />
              </div>
            ) : (
              <>
                <h3 className={`text-lg font-bold mb-2 transition-colors ${selectedId === item.key ? 'text-white' : 'text-slate-200'}`}>
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </>
            )}

            {selectedId === item.key && (
              <div className="mt-4 space-y-2 border-t border-cyan-500/20 pt-4 animate-in fade-in slide-in-from-top-2">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="text-[10px] text-cyan-200 flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                    {detail}
                  </li>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}