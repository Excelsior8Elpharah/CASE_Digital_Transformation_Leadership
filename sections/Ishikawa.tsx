import React, { useState, useEffect } from 'react';
import { 
  Users, Settings, Cpu, Globe, AlertCircle, Zap, BookOpen, Clock, Package, Smartphone, Layout, Target, Coins, FileText, Plus, Trash2, Save
} from 'lucide-react';

interface CauseItem {
  id: string;
  text: string;
  icon: React.ElementType;
}

interface CauseCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  textColor: string;
  causes: CauseItem[];
  position: 'top' | 'bottom';
}

const ICON_MAP: Record<string, React.ElementType> = {
  'Users': Users, 'Settings': Settings, 'Cpu': Cpu, 'Globe': Globe, 
  'BookOpen': BookOpen, 'Zap': Zap, 'Clock': Clock, 'Package': Package, 
  'Smartphone': Smartphone, 'Layout': Layout, 'Target': Target, 'Coins': Coins, 
  'FileText': FileText
};

const INITIAL_CATEGORIES: CauseCategory[] = [
  { id: 'pessoas', title: 'Pessoas', icon: Users, color: 'bg-violet-500', textColor: 'text-violet-400', position: 'top', causes: [
    { id: 'p1', text: 'Falta treinamento digital', icon: BookOpen },
    { id: 'p2', text: 'Resistência à mudança', icon: Zap }
  ]},
  { id: 'processos', title: 'Processos', icon: Settings, color: 'bg-blue-500', textColor: 'text-blue-400', position: 'top', causes: [
    { id: 'pr1', text: 'Pedidos manuais lentos', icon: Clock },
    { id: 'pr2', text: 'Estoque ineficiente', icon: Package }
  ]},
  { id: 'tecnologia', title: 'Tecnologia', icon: Cpu, color: 'bg-emerald-500', textColor: 'text-emerald-400', position: 'bottom', causes: [
    { id: 't1', text: 'Sem app mobile', icon: Smartphone },
    { id: 't2', text: 'Site desatualizado', icon: Layout }
  ]},
  { id: 'ambiente', title: 'Ambiente', icon: Globe, color: 'bg-amber-500', textColor: 'text-amber-400', position: 'bottom', causes: [
    { id: 'a1', text: 'Concorrência foodtechs', icon: Target },
    { id: 'a2', text: 'Inflação insumos', icon: Coins }
  ]}
];

export default function Ishikawa() {
  const [categories, setCategories] = useState<CauseCategory[]>(() => {
    const saved = localStorage.getItem('sabor_heranca_ishikawa');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Reidrata os ícones que foram perdidos na serialização JSON
        return parsed.map((cat: any) => ({
          ...cat,
          icon: INITIAL_CATEGORIES.find(c => c.id === cat.id)?.icon || Settings,
          causes: cat.causes.map((cause: any) => ({
            ...cause,
            icon: ICON_MAP[cause.text.split(' ')[0]] || FileText
          }))
        }));
      } catch (e) {
        return INITIAL_CATEGORIES;
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCauseText, setNewCauseText] = useState('');

  useEffect(() => {
    localStorage.setItem('sabor_heranca_ishikawa', JSON.stringify(categories));
  }, [categories]);

  const addCause = (catId: string) => {
    if (!newCauseText.trim()) return;
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          causes: [...cat.causes, { id: Math.random().toString(), text: newCauseText, icon: FileText }]
        };
      }
      return cat;
    }));
    setNewCauseText('');
  };

  const removeCause = (catId: string, causeId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return { ...cat, causes: cat.causes.filter(c => c.id !== causeId) };
      }
      return cat;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/5">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
               <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            Causa Raiz (Ishikawa)
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Análise estrutural da perda de competitividade.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map(cat => {
          const CatIcon = cat.icon;
          return (
            <div key={cat.id} className="bg-slate-900 border border-slate-800/50 p-6 rounded-3xl relative overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${cat.color} text-black shadow-lg`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <h4 className={`font-black text-lg uppercase tracking-tight ${cat.textColor}`}>
                    {cat.title}
                  </h4>
                </div>
                <button 
                  onClick={() => setEditingCategory(editingCategory === cat.id ? null : cat.id)}
                  className={`p-2 rounded-lg transition-colors ${editingCategory === cat.id ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {editingCategory === cat.id ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-3 flex-1">
                {cat.causes.map(cause => {
                  const CauseIcon = cause.icon;
                  return (
                    <div key={cause.id} className="flex items-center justify-between group p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all">
                      <div className="flex items-center gap-3">
                        <CauseIcon className="w-3 h-3 text-slate-600" />
                        <span className="text-sm text-slate-300 font-medium">{cause.text}</span>
                      </div>
                      {editingCategory === cat.id && (
                        <button onClick={() => removeCause(cat.id, cause.id)} className="text-red-500 opacity-50 hover:opacity-100">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {editingCategory === cat.id && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2 animate-in slide-in-from-top-2">
                  <input 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-cyan-500"
                    placeholder="Nova causa..."
                    value={newCauseText}
                    onChange={e => setNewCauseText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCause(cat.id)}
                  />
                  <button 
                    onClick={() => addCause(cat.id)}
                    className="bg-cyan-500 text-slate-950 p-2 rounded-xl"
                  >
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