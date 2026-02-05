import React, { useState, useEffect } from 'react';
import { ISO_BEFORE, ISO_AFTER } from '../constants';
import { ShieldCheck, CheckCircle2, AlertTriangle, ShieldAlert, Pencil, Save, Info, FileText, ChevronDown } from 'lucide-react';
import { ModoTransformacao, ISOStatus } from '../types';

interface ComplianceISOProps {
  modo: ModoTransformacao;
}

const ISO_DESCRIPTIONS: Record<string, string> = {
  '9001': 'ISO 9001:2015 - Gestão da Qualidade. Aplicadas Cláusulas 4 (Contexto), 5 (Liderança), 6 (Planejamento), 7 (Apoio), 8 (Operação), 9 (Avaliação de Desempenho) e 10 (Melhoria). Foco no ciclo PDCA e na satisfação do cliente através de processos robustos.',
  '27001': 'ISO/IEC 27001:2022 - Segurança da Informação. Aplicadas Cláusulas 4-10 e Anexo A (Controles de Segurança). Foco em Confidencialidade, Integridade e Disponibilidade de dados na nuvem, mitigando riscos de ataques e vazamentos.',
  '14001': 'ISO 14001:2015 - Gestão Ambiental. Aplicadas Cláusulas 6.1 (Ações para Riscos e Oportunidades), 8.1 (Planejamento e Controle Operacional) e 9.1 (Monitoramento). Foco em redução de pegada de carbono e gestão de resíduos.',
  '45001': 'ISO 45001:2018 - Saúde e Segurança Ocupacional. Aplicadas Cláusulas 5.4 (Consulta e Participação dos Trabalhadores) e 8.1.2 (Eliminar Perigos e Reduzir Riscos de SSO). Garante um ambiente de trabalho seguro e produtivo.'
};

export default function ComplianceISO({ modo }: ComplianceISOProps) {
  const isAfter = modo === 'depois';
  const initialData = isAfter ? ISO_AFTER : ISO_BEFORE;
  
  const [isoList, setIsoList] = useState<ISOStatus[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [activeIsoId, setActiveIsoId] = useState<string>('9001');

  useEffect(() => {
    setIsoList(isAfter ? ISO_AFTER : ISO_BEFORE);
  }, [isAfter]);

  const handleEdit = (iso: ISOStatus) => {
    setEditingId(iso.id);
    setEditValue(iso.adherence);
  };

  const handleSave = (id: string) => {
    setIsoList(prev => prev.map(iso => 
      iso.id === id ? { ...iso, adherence: editValue } : iso
    ));
    setEditingId(null);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className={`text-2xl font-bold ${isAfter ? 'text-white' : 'text-red-400'}`}>
          Conformidade Normativa (ISO Status)
        </h2>
        <p className="text-slate-400 mt-1">Monitoramento de requisitos e auditorias regulatórias por cláusula.</p>
      </div>

      <div className={`storytelling p-6 rounded-2xl border shadow-xl transition-all duration-500 ${isAfter ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
        <h3 className={`text-xl font-bold mb-2 ${isAfter ? 'text-cyan-300' : 'text-red-400'}`}>
          {isAfter ? '🛡️ Gestão de Conformidade Total' : '⚠️ Crise de Auditoria'}
        </h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          {isAfter 
            ? 'Nosso framework GRC atual garante conformidade automatizada, mapeando processos digitais diretamente às cláusulas normativas das certificações internacionais.'
            : 'A falta de controles digitais resultou em não-conformidades críticas (Cláusulas 7 e 8) na última auditoria preliminar, ameaçando a operação legal.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isoList.map(iso => (
          <div 
            key={iso.id} 
            onClick={() => setActiveIsoId(iso.id)}
            className={`
              bg-slate-900 border cursor-pointer transition-all duration-300 rounded-3xl p-6 relative group overflow-hidden flex flex-col
              ${activeIsoId === iso.id ? 'border-primary ring-1 ring-primary' : isAfter ? 'border-slate-800 hover:border-slate-700' : 'border-red-900/20'}
            `}
          >
            <div className={`absolute top-0 right-0 w-16 h-16 -mr-4 -mt-4 opacity-10 transition-transform group-hover:scale-125`}>
               {isAfter ? <ShieldCheck className="w-full h-full text-emerald-400" /> : <ShieldAlert className="w-full h-full text-red-500" />}
            </div>
            
            <div className="mb-6 flex-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-lg text-white">{iso.name}</h4>
                <div className={`p-1.5 rounded-lg transition-colors ${activeIsoId === iso.id ? 'bg-primary text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                  <Info className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-end justify-between mt-4">
                <div className="flex items-end gap-2">
                  {editingId === iso.id ? (
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <input 
                        type="number" 
                        min="0" max="100" 
                        className="w-16 bg-slate-950 border border-cyan-500 rounded px-2 py-1 text-white text-xl font-bold outline-none"
                        value={editValue}
                        onChange={e => setEditValue(Number(e.target.value))}
                        autoFocus
                      />
                      <button onClick={() => handleSave(iso.id)} className="p-1 bg-emerald-500 text-slate-950 rounded hover:bg-emerald-400">
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2 group/edit">
                      <span className={`text-3xl font-bold ${isAfter ? 'text-emerald-400' : 'text-red-500'}`}>{iso.adherence}%</span>
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(iso); }} className="opacity-0 group-hover/edit:opacity-100 p-1 text-slate-500 hover:text-white transition-opacity">
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-tighter">Conformidade</span>
              </div>
              
              <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
                 <div className={`h-full ${isAfter ? 'bg-emerald-500' : 'bg-red-500'} transition-all duration-1000`} style={{ width: `${iso.adherence}%` }}></div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Requisitos:</p>
              {iso.requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  {req.done ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <AlertTriangle className="w-3 h-3 text-red-500" />}
                  <span className={req.done ? 'text-slate-400' : 'text-red-400'}>{req.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in slide-in-from-top-4">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Explorador de Requisitos Normativos</h3>
            <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Base de Conhecimento Estratégico</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 space-y-2">
             <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Normas Disponíveis</p>
             {Object.keys(ISO_DESCRIPTIONS).map(id => (
               <button 
                key={id}
                onClick={() => setActiveIsoId(id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeIsoId === id ? 'bg-primary text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
               >
                 <span>ISO {id}</span>
                 {activeIsoId === id && <ChevronDown className="w-4 h-4" />}
               </button>
             ))}
          </div>

          <div className="lg:col-span-3 bg-slate-900/50 rounded-3xl p-8 border border-slate-800/50 min-h-[200px] flex flex-col justify-center">
             <div key={activeIsoId} className="animate-in fade-in duration-500">
                <h4 className="text-primary font-black text-lg mb-4 uppercase flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Detalhamento Técnico: ISO {activeIsoId}
                </h4>
                <p className="text-slate-200 leading-relaxed text-base italic border-l-4 border-primary/30 pl-6 py-2">
                  {ISO_DESCRIPTIONS[activeIsoId]}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Auditoria Válida até 2025</span>
                  <span className="flex items-center gap-2 uppercase">Status: {isoList.find(i => i.id === activeIsoId)?.status || 'Em Processo'}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}