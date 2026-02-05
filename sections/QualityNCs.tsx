import React, { useState, useEffect } from 'react';
import { ClipboardList, AlertCircle, CheckCircle2, History, Plus, Pencil, Save, X, Trash2 } from 'lucide-react';

interface NonConformity {
  id: string;
  area: string;
  desc: string;
  norm: string;
  gravity: 'Crítica' | 'Maior' | 'Menor';
  impact: number;
  status: 'Aberta' | 'Em tratamento' | 'Encerrada';
  dueDate: string;
}

const INITIAL_NCS: NonConformity[] = [
  { id: 'NC-001', area: 'Produção', desc: 'Falha no sensor IoT de temperatura na linha A', gravity: 'Menor', impact: 4, norm: 'ISO 9001', status: 'Aberta', dueDate: '2024-06-20' },
  { id: 'NC-002', area: 'TI', desc: 'Acesso de usuário desligado não revogado no ERP', gravity: 'Maior', impact: 8, norm: 'ISO 27001', status: 'Em tratamento', dueDate: '2024-06-15' },
  { id: 'NC-003', area: 'Logística', desc: 'Vazamento de óleo no setor B (estacionamento)', gravity: 'Menor', impact: 2, norm: 'ISO 14001', status: 'Encerrada', dueDate: '2024-05-30' },
];

export default function QualityNCs() {
  const [ncs, setNcs] = useState<NonConformity[]>(() => {
    const saved = localStorage.getItem('sabor_heranca_ncs');
    return saved ? JSON.parse(saved) : INITIAL_NCS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNC, setEditingNC] = useState<NonConformity | null>(null);

  useEffect(() => {
    localStorage.setItem('sabor_heranca_ncs', JSON.stringify(ncs));
  }, [ncs]);

  const handleOpenModal = (nc?: NonConformity) => {
    setEditingNC(nc || {
      id: `NC-${String(ncs.length + 1).padStart(3, '0')}`,
      area: 'Produção',
      desc: '',
      norm: 'ISO 9001',
      gravity: 'Menor',
      impact: 5,
      status: 'Aberta',
      dueDate: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNC) return;

    setNcs(prev => {
      const exists = prev.find(n => n.id === editingNC.id);
      if (exists) {
        return prev.map(n => n.id === editingNC.id ? editingNC : n);
      }
      return [...prev, editingNC];
    });
    setIsModalOpen(false);
    setEditingNC(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir esta NC?')) {
      setNcs(prev => prev.filter(n => n.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Qualidade & Não Conformidades</h2>
          <p className="text-slate-400 mt-1">Gestão de desvios e aderência às normas certificadoras.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" /> Nova NC
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
               <AlertCircle className="w-6 h-6" />
            </div>
            <div>
               <p className="text-2xl font-bold">{ncs.filter(n => n.status !== 'Encerrada').length}</p>
               <p className="text-xs text-slate-500 font-bold uppercase">NCs Abertas</p>
            </div>
         </div>
         <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <p className="text-2xl font-bold">{ncs.filter(n => n.status === 'Encerrada').length}</p>
               <p className="text-xs text-slate-500 font-bold uppercase">NCs Encerradas</p>
            </div>
         </div>
         <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
               <History className="w-6 h-6" />
            </div>
            <div>
               <p className="text-2xl font-bold">14d</p>
               <p className="text-xs text-slate-500 font-bold uppercase">Tempo Médio Tratativa</p>
            </div>
         </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-[10px] uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">ID / Área</th>
              <th className="px-6 py-4">Descrição do Desvio</th>
              <th className="px-6 py-4">Impacto</th>
              <th className="px-6 py-4">Gravidade</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {ncs.map(nc => (
              <tr key={nc.id} className="text-sm hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-200">{nc.id}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{nc.area}</p>
                </td>
                <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{nc.desc}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-slate-800 h-1.5 rounded-full">
                      <div 
                        className={`h-full rounded-full ${nc.impact > 7 ? 'bg-red-500' : nc.impact > 4 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${nc.impact * 10}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{nc.impact}/10</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${nc.gravity === 'Crítica' ? 'bg-red-500/20 text-red-500' : nc.gravity === 'Maior' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                    {nc.gravity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${nc.status === 'Encerrada' ? 'bg-emerald-500/10 text-emerald-500' : nc.status === 'Em tratamento' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                    {nc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(nc)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(nc.id)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && editingNC && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-white">Gerenciar Não Conformidade</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Tipo/Área</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                    value={editingNC.area}
                    onChange={e => setEditingNC({...editingNC, area: e.target.value})}
                  >
                    <option>Produção</option>
                    <option>TI</option>
                    <option>Logística</option>
                    <option>Fornecedor</option>
                    <option>Processo</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Status</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                    value={editingNC.status}
                    onChange={e => setEditingNC({...editingNC, status: e.target.value as any})}
                  >
                    <option value="Aberta">Aberta</option>
                    <option value="Em tratamento">Em tratamento</option>
                    <option value="Encerrada">Encerrada</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Descrição</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500 h-24"
                  value={editingNC.desc}
                  onChange={e => setEditingNC({...editingNC, desc: e.target.value})}
                  placeholder="Descreva o desvio identificado..."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Gravidade</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                    value={editingNC.gravity}
                    onChange={e => setEditingNC({...editingNC, gravity: e.target.value as any})}
                  >
                    <option>Crítica</option>
                    <option>Maior</option>
                    <option>Menor</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Prazo/Previsão</label>
                  <input 
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                    value={editingNC.dueDate}
                    onChange={e => setEditingNC({...editingNC, dueDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex justify-between">
                  Impacto Operacional <span>{editingNC.impact}/10</span>
                </label>
                <input 
                  type="range" min="1" max="10" 
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  value={editingNC.impact}
                  onChange={e => setEditingNC({...editingNC, impact: parseInt(e.target.value)})}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl font-bold transition-all shadow-lg shadow-cyan-500/20">
                  Salvar NC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}