import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Lightbulb, Zap, Pencil, Save, Plus, Trash2 } from 'lucide-react';

interface SwotQuadrant {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  items: string[];
}

const INITIAL_SWOT: SwotQuadrant[] = [
  { id: 'forces', title: 'Forças', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/5', border: 'border-emerald-400/20',
    items: ['Marca consolidada há 50 anos.', 'Qualidade de produto reconhecida.', 'Domínio técnico da produção.', 'Presença física estabelecida.']
  },
  { id: 'weakness', title: 'Fraquezas', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/5', border: 'border-red-400/20',
    items: ['Sistemas legados obsoletos.', 'Cultura resistente à mudança.', 'Comunicação interna falha.', 'Dependência de processos manuais.']
  },
  { id: 'opportunity', title: 'Oportunidades', icon: Lightbulb, color: 'text-cyan-400', bg: 'bg-cyan-400/5', border: 'border-cyan-400/20',
    items: ['Expansão via E-commerce B2C.', 'Modelos de Assinatura.', 'Big Data para personalização.', 'Foodtech parcerias estratégicas.']
  },
  { id: 'threats', title: 'Ameaças', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-400/5', border: 'border-orange-400/20',
    items: ['Crescimento das Foodtechs nativas.', 'Mudança rápida de hábitos digitais.', 'Custo de migração tecnológica.', 'Escassez de talentos digitais.']
  }
];

export default function SWOT() {
  const [data, setData] = useState<SwotQuadrant[]>(() => {
    const saved = localStorage.getItem('sabor_heranca_swot');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Reidrata os ícones perdidos no JSON
        return parsed.map((q: any) => ({
          ...q,
          icon: INITIAL_SWOT.find(base => base.id === q.id)?.icon || ShieldCheck
        }));
      } catch (e) {
        return INITIAL_SWOT;
      }
    }
    return INITIAL_SWOT;
  });

  const [editingQuadId, setEditingQuadId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('sabor_heranca_swot', JSON.stringify(data));
  }, [data]);

  const addItem = (quadId: string) => {
    if (!newItem.trim()) return;
    setData(prev => prev.map(q => q.id === quadId ? { ...q, items: [...q.items, newItem] } : q));
    setNewItem('');
  };

  const removeItem = (quadId: string, index: number) => {
    setData(prev => prev.map(q => q.id === quadId ? { ...q, items: q.items.filter((_, i) => i !== index) } : q));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Análise SWOT Estratégica</h2>
        <p className="text-slate-400 mt-1">Identificação dinâmica de fatores internos e externos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((quad) => {
          const QuadIcon = quad.icon;
          return (
            <div 
              key={quad.id}
              className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 min-h-[320px] bg-slate-900 flex flex-col ${quad.border} ${editingQuadId === quad.id ? 'ring-2 ring-white/10' : ''}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl bg-slate-800 border ${quad.border}`}>
                    <QuadIcon className={`w-6 h-6 ${quad.color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{quad.title}</h3>
                </div>
                <button 
                  onClick={() => setEditingQuadId(editingQuadId === quad.id ? null : quad.id)}
                  className={`p-2 rounded-xl transition-all ${editingQuadId === quad.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500 hover:text-white'}`}
                >
                  {editingQuadId === quad.id ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                </button>
              </div>
              
              <ul className="space-y-3 flex-1">
                {quad.items.map((item, i) => (
                  <li key={i} className="flex items-start group justify-between gap-3 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${quad.color} mt-1.5 shrink-0`}></div>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                    {editingQuadId === quad.id && (
                      <button onClick={() => removeItem(quad.id, i)} className="text-red-500/50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {editingQuadId === quad.id && (
                <div className="mt-6 flex gap-2 animate-in slide-in-from-bottom-2">
                  <input 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-cyan-500"
                    placeholder="Nova observação..."
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addItem(quad.id)}
                  />
                  <button onClick={() => addItem(quad.id)} className="bg-cyan-500 text-slate-950 p-2 rounded-xl">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}