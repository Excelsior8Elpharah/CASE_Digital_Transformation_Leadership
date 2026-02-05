
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DndContext, closestCenter, KeyboardSensor, PointerSensor, 
  useSensor, useSensors, DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, SortableContext, sortableKeyboardCoordinates, 
  verticalListSortingStrategy, useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { KanbanCard, KanbanState, ModoTransformacao } from '../types';
import { KANBAN_INITIAL } from '../constants';
import { Clock, AlertCircle, CheckCircle2, Pencil, Calendar, Save, X } from 'lucide-react';

interface SortableCardProps {
  card: KanbanCard;
  containerId: string;
  onEdit: (card: KanbanCard) => void;
  isAfter: boolean;
  // Added key to interface to satisfy TypeScript when used in JSX lists
  key?: string | number;
}

// Custom sortable card component for the Kanban board
function SortableCard({ card, containerId, onEdit, isAfter }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: card.id,
    data: { containerId }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className={`bg-slate-800/80 border ${isAfter ? 'border-emerald-500/30' : 'border-red-500/30'} p-4 rounded-xl mb-3 cursor-grab active:cursor-grabbing hover:border-cyan-500/30 transition-all shadow-lg group will-change-transform`}
    >
      <div className="flex justify-between items-start mb-2">
        <h5 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{card.title}</h5>
        <button 
          onPointerDown={(e) => e.stopPropagation()} 
          onClick={() => onEdit(card)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-500 hover:text-white"
        >
          <Pencil className="w-3 h-3" />
        </button>
      </div>
      <p className="text-xs text-slate-400 mb-4 line-clamp-2">{card.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-[10px] text-slate-500">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(card.dueDate).toLocaleDateString('pt-BR')}
        </div>
        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
          card.priority === 'high' ? 'bg-red-500/10 text-red-500' : 
          card.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
        }`}>
          {card.priority}
        </span>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  cards: KanbanCard[];
  id: string;
  color: string;
  icon: any;
  onEdit: (card: KanbanCard) => void;
  isAfter: boolean;
}

// Kanban column component representing a phase of the PDCA cycle
function KanbanColumn({ title, cards, id, color, icon: Icon, onEdit, isAfter }: KanbanColumnProps) {
  return (
    <div className={`flex-1 min-w-[300px] bg-slate-900/30 border ${isAfter ? 'border-slate-800/50' : 'border-red-900/20'} rounded-2xl flex flex-col h-[70vh] backdrop-blur-sm`}>
      <div className={`p-4 border-b border-slate-800/50 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${color} bg-opacity-20`}>
            <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
          </div>
          <h4 className={`text-xs font-black uppercase tracking-[0.2em] ${isAfter ? 'text-slate-400' : 'text-red-400'}`}>{title}</h4>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">
          {cards.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {cards.map(card => (
            <SortableCard key={card.id} card={card} containerId={id} onEdit={onEdit} isAfter={isAfter} />
          ))}
        </SortableContext>
        {cards.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-10 border-2 border-dashed border-slate-800 rounded-xl py-12">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Vazio</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KanbanPDCA({ modo }: { modo: ModoTransformacao }) {
  const [kanbanData, setKanbanData] = useState<KanbanState>(() => {
    const saved = localStorage.getItem('sabor_heranca_kanban_data');
    return saved ? JSON.parse(saved) : KANBAN_INITIAL;
  });
  
  const [editingCard, setEditingCard] = useState<KanbanCard | null>(null);

  useEffect(() => {
    localStorage.setItem('sabor_heranca_kanban_data', JSON.stringify(kanbanData));
  }, [kanbanData]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const isAfter = useMemo(() => modo === 'depois', [modo]);

  const displayData: KanbanState = useMemo(() => 
    isAfter ? kanbanData : {
      planejar: Object.values(kanbanData).flat(),
      executar: [],
      verificar: [],
      agir: []
    }
  , [isAfter, kanbanData]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (!isAfter) return;

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = active.data.current?.containerId as keyof KanbanState;
    const overContainer = (over.data.current?.containerId || over.id) as keyof KanbanState;

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const items = kanbanData[activeContainer];
      const oldIndex = items.findIndex(i => i.id === activeId);
      const newIndex = items.findIndex(i => i.id === overId);
      
      setKanbanData(prev => ({
        ...prev,
        [activeContainer]: arrayMove(items, oldIndex, newIndex)
      }));
    } else {
      setKanbanData(prev => {
        const activeItems = [...prev[activeContainer]];
        const overItems = [...prev[overContainer]];
        const activeIndex = activeItems.findIndex(i => i.id === activeId);
        const [movedItem] = activeItems.splice(activeIndex, 1);
        overItems.push(movedItem);
        
        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems
        };
      });
    }
  }, [isAfter, kanbanData]);

  const handleSaveEdit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    setKanbanData(prev => {
      const newState = { ...prev };
      for (const col in newState) {
        const colKey = col as keyof KanbanState;
        newState[colKey] = newState[colKey].map(c => 
          c.id === editingCard.id ? editingCard : c
        );
      }
      return newState;
    });
    setEditingCard(null);
  }, [editingCard]);

  const setEdit = useCallback((card: KanbanCard) => {
    setEditingCard(card);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-bold tracking-tight mb-2 ${isAfter ? 'text-white' : 'text-red-400'}`}>
            Kanban Executivo: Fluxo PDCA
          </h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Gestão visual do ciclo de vida das iniciativas digitais.
          </p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-xs font-bold border ${isAfter ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-red-500/30 bg-red-500/10 text-red-400'}`}>
          Modo Visual: {isAfter ? 'Ágil (Dinâmico)' : 'Silos (Travado)'}
        </div>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin">
          <KanbanColumn title="Planejar" id="planejar" cards={displayData.planejar} color="bg-blue-500" icon={Pencil} onEdit={setEdit} isAfter={isAfter} />
          <KanbanColumn title="Executar" id="executar" cards={displayData.executar} color="bg-cyan-500" icon={Clock} onEdit={setEdit} isAfter={isAfter} />
          <KanbanColumn title="Verificar" id="verificar" cards={displayData.verificar} color="bg-purple-500" icon={AlertCircle} onEdit={setEdit} isAfter={isAfter} />
          <KanbanColumn title="Agir" id="agir" cards={displayData.agir} color="bg-emerald-500" icon={CheckCircle2} onEdit={setEdit} isAfter={isAfter} />
        </div>
      </DndContext>

      {editingCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h4 className="text-xl font-bold text-white mb-6">Editar Iniciativa</h4>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Título</label>
                <input 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500"
                  value={editingCard.title}
                  onChange={e => setEditingCard({...editingCard, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Descrição</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500 h-24"
                  value={editingCard.description}
                  onChange={e => setEditingCard({...editingCard, description: e.target.value})}
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setEditingCard(null)} className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                  <X className="w-4 h-4" /> Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
