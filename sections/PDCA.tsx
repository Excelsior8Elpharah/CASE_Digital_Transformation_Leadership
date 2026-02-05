import React, { useState, useEffect } from 'react';
import { PencilLine, Play, Search, Zap, CheckCircle2, Save, X, Edit3, Plus, Trash2, Pencil } from 'lucide-react';

interface PDCAAction {
  text: string;
  done: boolean;
}

interface PDCAStep {
  id: number;
  title: string;
  icon: React.ElementType;
  color: string;
  text: string;
  actions: PDCAAction[];
  notes: string;
  status: string;
}

const INITIAL_STEPS: PDCAStep[] = [
  { id: 0, title: 'Planejar (P)', icon: PencilLine, color: 'bg-blue-500', text: 'Metas e processos iniciais.', status: 'Concluído', notes: 'Budget de R$ 3M aprovado pelo board em 12/23.', actions: [
    { text: 'Definir KPIs de market share', done: true }, { text: 'Mapear processos manuais', done: true }, { text: 'Alocar orçamento', done: true }
  ]},
  { id: 1, title: 'Executar (D)', icon: Play, color: 'bg-cyan-500', text: 'Implementação prática.', status: 'Em Andamento', notes: 'Foco atual no rollout do ERP Cloud Planta MG.', actions: [
    { text: 'Lançamento MVP E-commerce', done: true }, { text: 'Migração ERP Cloud', done: false }, { text: 'IoT Industrial Sensores', done: false }
  ]},
  { id: 2, title: 'Verificar (C)', icon: Search, color: 'bg-purple-500', text: 'Auditoria e medição.', status: 'Iniciado', notes: 'KPI de churn estável, OEE linha A validado.', actions: [
    { text: 'Dashboards Mensais BI', done: true }, { text: 'Auditoria Segurança', done: false }, { text: 'Pesquisa NPS', done: false }
  ]},
  { id: 3, title: 'Agir (A)', icon: Zap, color: 'bg-emerald-500', text: 'Melhoria e padronização.', status: 'Planejado', notes: 'Planejando padronização ágil para Q3/24.', actions: [
    { text: 'Refinar algoritmos IA', done: false }, { text: 'Rollout Planta MG', done: false }, { text: 'Padronizar Agilidade', done: false }
  ]}
];

export default function PDCA() {
  const [steps, setSteps] = useState<PDCAStep[]>(() => {
    const saved = localStorage.getItem('sabor_heranca_pdca');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Reidrata ícones perdidos
        return parsed.map((step: any) => ({
          ...step,
          icon: INITIAL_STEPS.find(base => base.id === step.id)?.icon || PencilLine
        }));
      } catch (e) {
        return INITIAL_STEPS;
      }
    }
    return INITIAL_STEPS;
  });

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [editingNotes, setEditingNotes] = useState(false);
  const [newActionText, setNewActionText] = useState('');
  const [editingActionIdx, setEditingActionIdx] = useState<number | null>(null);
  const [editActionText, setEditActionText] = useState('');

  useEffect(() => {
    localStorage.setItem('sabor_heranca_pdca', JSON.stringify(steps));
  }, [steps]);

  const toggleAction = (stepId: number, actionIdx: number) => {
    setSteps(prev => prev.map(s => {
      if (s.id === stepId) {
        const newActions = [...s.actions];
        newActions[actionIdx].done = !newActions[actionIdx].done;
        return { ...s, actions: newActions };
      }
      return s;
    }));
  };

  const addAction = (stepId: number) => {
    if (!newActionText.trim()) return;
    setSteps(prev => prev.map(s => {
      if (s.id === stepId) {
        return { ...s, actions: [...s.actions, { text: newActionText, done: false }] };
      }
      return s;
    }));
    setNewActionText('');
  };

  const removeAction = (stepId: number, actionIdx: number) => {
    setSteps(prev => prev.map(s => {
      if (s.id === stepId) {
        return { ...s, actions: s.actions.filter((_, i) => i !== actionIdx) };
      }
      return s;
    }));
  };

  const startEditAction = (idx: number, text: string) => {
    setEditingActionIdx(idx);
    setEditActionText(text);
  };

  const saveEditAction = (stepId: number) => {
    if (editingActionIdx === null) return;
    setSteps(prev => prev.map(s => {
      if (s.id === stepId) {
        const newActions = [...s.actions];
        newActions[editingActionIdx].text = editActionText;
        return { ...s, actions: newActions };
      }
      return s;
    }));
    setEditingActionIdx(null);
  };

  const updateNotes = (stepId: number, val: string) => {
    setSteps(prev => prev.map(s => s.id === stepId ? { ...s, notes: val } : s));
  };

  const currentStep = steps[activeStepIdx];
  const StepIcon = currentStep.icon;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Ciclo PDCA Interativo</h2>
        <p className="text-slate-400 mt-1">Gestão de progresso, ações dinâmicas e notas de melhoria contínua.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {steps.map((step, idx) => {
            const ItemIcon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => { setActiveStepIdx(idx); setEditingNotes(false); setEditingActionIdx(null); }}
                className={`
                  w-full p-4 rounded-3xl border flex items-center space-x-4 transition-all
                  ${activeStepIdx === idx ? 'bg-slate-900 border-cyan-500 text-white shadow-lg' : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-700'}
                `}
              >
                <div className={`w-10 h-10 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg`}>
                  <ItemIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-widest">{step.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${step.actions.length > 0 ? (step.actions.filter(a => a.done).length / step.actions.length) * 100 : 0}%` }}></div>
                    </div>
                    <p className="text-[10px] font-bold opacity-60 uppercase">{step.status}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col min-h-[600px]">
          <div className="relative z-10 space-y-8 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black mb-2 flex items-center">
                  <span className={`w-3 h-3 rounded-full ${currentStep.color} mr-3`}></span>
                  {currentStep.title}
                </h3>
                <p className="text-slate-400 italic text-sm">{currentStep.text}</p>
              </div>
              <button 
                onClick={() => setEditingNotes(!editingNotes)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${editingNotes ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                {editingNotes ? <><Save className="w-4 h-4" /> Salvar Notas</> : <><Edit3 className="w-4 h-4" /> Editar Notas</>}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Ações e Entregas:</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                  {currentStep.actions.map((action, i) => (
                    <div key={i} className="flex gap-2 group">
                      {editingActionIdx === i ? (
                        <div className="flex-1 flex gap-2">
                           <input 
                              className="flex-1 bg-slate-950 border border-cyan-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                              value={editActionText}
                              onChange={e => setEditActionText(e.target.value)}
                              autoFocus
                           />
                           <button onClick={() => saveEditAction(currentStep.id)} className="p-2 bg-emerald-500 text-slate-950 rounded-xl">
                             <Save className="w-4 h-4" />
                           </button>
                           <button onClick={() => setEditingActionIdx(null)} className="p-2 bg-slate-800 text-slate-400 rounded-xl">
                             <X className="w-4 h-4" />
                           </button>
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => toggleAction(currentStep.id, i)}
                            className={`flex-1 p-4 border rounded-2xl flex items-center gap-3 transition-all text-left ${action.done ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                          >
                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${action.done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'}`}>
                              {action.done && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <span className="text-xs font-bold">{action.text}</span>
                          </button>
                          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEditAction(i, action.text)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => removeAction(currentStep.id, i)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-red-400">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex gap-2">
                  <input 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-cyan-500"
                    placeholder="Nova ação..."
                    value={newActionText}
                    onChange={e => setNewActionText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addAction(currentStep.id)}
                  />
                  <button 
                    onClick={() => addAction(currentStep.id)}
                    className="bg-cyan-500 text-slate-950 p-2 rounded-xl hover:bg-cyan-400 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Notas Executivas:</h4>
                {editingNotes ? (
                  <textarea 
                    className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-slate-200 outline-none focus:border-cyan-500 h-64 resize-none transition-all shadow-inner"
                    value={currentStep.notes}
                    onChange={e => updateNotes(currentStep.id, e.target.value)}
                    placeholder="Adicione observações estratégicas sobre este estágio..."
                  />
                ) : (
                  <div className="bg-slate-950/30 border border-slate-800/50 rounded-3xl p-6 h-64 overflow-y-auto italic text-slate-400 text-sm leading-relaxed scrollbar-thin">
                    {currentStep.notes || 'Nenhuma nota registrada para este estágio.'}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className={`absolute top-0 right-0 p-12 opacity-5 pointer-events-none transition-all duration-500 ${activeStepIdx === 0 ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}`}>
            <StepIcon className="w-64 h-64" />
          </div>
        </div>
      </div>
    </div>
  );
}