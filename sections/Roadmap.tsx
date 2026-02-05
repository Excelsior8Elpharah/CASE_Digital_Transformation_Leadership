import React, { useState, useEffect } from 'react';
import { ROADMAP_ITEMS as INITIAL_ROADMAP } from '../constants';
import { RoadmapItem } from '../types';
import { Plus, Pencil, Trash2, Save, X, Clock } from 'lucide-react';

export default function Roadmap() {
  const [items, setItems] = useState<RoadmapItem[]>(() => {
    const saved = localStorage.getItem('sabor_heranca_roadmap');
    return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);

  useEffect(() => {
    localStorage.setItem('sabor_heranca_roadmap', JSON.stringify(items));
  }, [items]);

  const months = Array.from({ length: 18 }, (_, i) => i + 1);

  const handleOpenModal = (item?: RoadmapItem) => {
    setEditingItem(item || {
      id: Date.now(),
      task: '',
      description: '',
      startMonth: 1,
      duration: 3,
      status: 'planejado'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setItems(prev => {
      const exists = prev.find(i => i.id === editingItem.id);
      if (exists) {
        return prev.map(i => i.id === editingItem.id ? editingItem : i);
      }
      return [...prev, editingItem];
    });
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja excluir esta iniciativa do roadmap?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Roadmap Executivo (Gantt)</h2>
          <p className="text-slate-400 mt-1">Visualização temporal e gestão das iniciativas de transformação.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" /> Nova Iniciativa
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 shadow-2xl">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="flex mb-6 border-b border-slate-800 pb-4">
              <div className="w-72 shrink-0 text-xs font-black text-slate-500 uppercase tracking-widest">Iniciativas Estratégicas</div>
              <div className="flex-1 flex justify-between px-2">
                {months.map(m => (
                  <div key={m} className="flex-1 text-center text-[10px] text-slate-600 font-bold">M{m}</div>
                ))}
              </div>
              <div className="w-20 shrink-0"></div>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center group">
                  <div className="w-72 shrink-0 pr-4">
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.task}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{item.description}</p>
                  </div>
                  
                  <div className="flex-1 flex relative h-10 bg-slate-800/10 rounded-xl overflow-hidden">
                    {months.map(m => (
                      <div key={m} className="flex-1 border-r border-slate-800/30 h-full"></div>
                    ))}
                    
                    <div 
                      className={`
                        absolute h-6 top-2 rounded-full transition-all duration-700 shadow-xl group-hover:brightness-110 cursor-pointer
                        ${item.status === 'concluido' ? 'bg-emerald-500/80 shadow-emerald-500/10' : 
                          item.status === 'em-andamento' ? 'bg-cyan-500/80 shadow-cyan-500/10 animate-pulse' : 
                          'bg-slate-600/50 shadow-slate-900/10'}
                      `}
                      style={{
                        left: `${(item.startMonth - 1) * (100 / 18)}%`,
                        width: `${item.duration * (100 / 18)}%`
                      }}
                      onClick={() => handleOpenModal(item)}
                    >
                      <div className="px-3 flex items-center h-full overflow-hidden">
                        <span className="text-[8px] font-black text-white whitespace-nowrap uppercase tracking-tighter">
                          {item.status === 'em-andamento' ? 'EM EXECUÇÃO' : item.status === 'concluido' ? 'FINALIZADO' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-20 shrink-0 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                    <button onClick={() => handleOpenModal(item)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
           <div className="flex gap-6">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
               <span>Concluído</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-cyan-500/80"></div>
               <span>Em Andamento</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-slate-600/50"></div>
               <span>Planejado</span>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Clock className="w-3 h-3" />
             <span>Ciclo de 18 Meses</span>
           </div>
        </div>
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-white">Gerenciar Iniciativa Roadmap</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Título da Iniciativa</label>
                <input 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                  value={editingItem.task}
                  onChange={e => setEditingItem({...editingItem, task: e.target.value})}
                  placeholder="Ex: Expansão Logística Digital"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Descrição Curta</label>
                <input 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                  value={editingItem.description}
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  placeholder="Ex: Rollout do novo WMS na planta principal"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Mês de Início (1-18)</label>
                  <input 
                    type="number" min="1" max="18"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                    value={editingItem.startMonth}
                    onChange={e => setEditingItem({...editingItem, startMonth: parseInt(e.target.value) || 1})}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Duração (Meses)</label>
                  <input 
                    type="number" min="1" max="18"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                    value={editingItem.duration}
                    onChange={e => setEditingItem({...editingItem, duration: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Status Atual</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                  value={editingItem.status}
                  onChange={e => setEditingItem({...editingItem, status: e.target.value as any})}
                >
                  <option value="concluido">Concluído</option>
                  <option value="em-andamento">Em Andamento</option>
                  <option value="planejado">Planejado</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl font-bold transition-all shadow-lg shadow-cyan-500/20">
                  <Save className="w-4 h-4 inline mr-2" /> Salvar Iniciativa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}