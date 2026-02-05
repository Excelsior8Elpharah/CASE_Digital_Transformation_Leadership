import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Activity, Cpu, Users, Target, TrendingDown, TrendingUp } from 'lucide-react';
import { ModoTransformacao } from '../types';

interface KPIsProps {
  modo: ModoTransformacao;
}

export default function KPIs({ modo }: KPIsProps) {
  const isAfter = modo === 'depois';
  
  const groups = [
    { name: 'Operação', icon: Activity, color: isAfter ? 'text-emerald-400' : 'text-red-500', kpis: [
      { label: 'OEE Produção', val: isAfter ? '84%' : '65%', gain: isAfter ? '+19%' : '-5%' },
      { label: 'Retrabalho', val: isAfter ? '1.8%' : '8.4%', gain: isAfter ? '-6.6%' : '+2%' }
    ]},
    { name: 'Digital', icon: Cpu, color: isAfter ? 'text-cyan-400' : 'text-orange-500', kpis: [
      { label: 'Maturidade DX', val: isAfter ? '4.2/5' : '1.2/5', gain: isAfter ? '+3.0' : '-0.2' },
      { label: 'Uso Cloud', val: isAfter ? '92%' : '5%', gain: isAfter ? '+87%' : '0%' }
    ]},
    { name: 'Clientes', icon: Target, color: isAfter ? 'text-purple-400' : 'text-red-400', kpis: [
      { label: 'NPS Global', val: isAfter ? '8.4' : '6.2', gain: isAfter ? '+2.2' : '-1.5' },
      { label: 'Conversão', val: isAfter ? '4.8%' : '1.1%', gain: isAfter ? '+3.7%' : '-0.5%' }
    ]},
    { name: 'Mercado', icon: Users, color: isAfter ? 'text-orange-400' : 'text-slate-500', kpis: [
      { label: 'Market Share', val: isAfter ? '40.1%' : '34.5%', gain: isAfter ? '+5.6%' : '-2.1%' },
      { label: 'Vendas Digitais', val: isAfter ? '22%' : '2%', gain: isAfter ? '+20%' : '-1%' }
    ]}
  ];

  const chartData = isAfter 
    ? [{ name: 'M1', v: 20 }, { name: 'M6', v: 45 }, { name: 'M12', v: 68 }, { name: 'M18', v: 84 }]
    : [{ name: 'M1', v: 15 }, { name: 'M6', v: 12 }, { name: 'M12', v: 8 }, { name: 'M18', v: 5 }];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-4">
        <h2 className={`text-2xl font-bold ${isAfter ? 'text-white' : 'text-red-400'}`}>
          Painel de Performance Estratégica
        </h2>
        <p className="text-slate-400 mt-1">Comparativo de performance: Cenário Legado vs Futuro Digital.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {groups.map((group, i) => {
           const GroupIcon = group.icon;
           return (
             <div key={i} className={`bg-slate-900 border ${isAfter ? 'border-slate-800' : 'border-red-900/30'} rounded-3xl p-6`}>
                <div className="flex items-center gap-3 mb-6">
                   <GroupIcon className={`w-5 h-5 ${group.color}`} />
                   <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{group.name}</h4>
                </div>
                <div className="space-y-5">
                   {group.kpis.map((kpi, j) => (
                     <div key={j} className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{kpi.label}</p>
                          <p className="text-2xl font-black text-white">{kpi.val}</p>
                        </div>
                        <div className={`text-[10px] font-black flex items-center gap-1 ${kpi.gain.startsWith('+') ? 'text-emerald-400' : 'text-red-500'}`}>
                           {kpi.gain.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                           {kpi.gain}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           );
         })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest flex items-center justify-between">
            <span>Progressão OEE vs Tempo</span>
            <span className={`text-[10px] px-2 py-1 rounded ${isAfter ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
              Cenário: {isAfter ? 'Otimizado' : 'Degradação'}
            </span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} isAnimationActive={false} />
                <Bar dataKey="v" fill={isAfter ? "#10b981" : "#ef4444"} radius={[4, 4, 0, 0]} isAnimationActive={isAfter} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={`border ${isAfter ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'} rounded-3xl p-8 flex flex-col justify-center`}>
           <h4 className="text-sm font-bold text-slate-300 mb-4 uppercase">Status Geral Confiabilidade</h4>
           <div className="space-y-4 text-center">
              <div className={`text-5xl font-black ${isAfter ? 'text-emerald-400' : 'text-red-500'}`}>
                {isAfter ? '92%' : '41%'}
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold tracking-widest">
                {isAfter ? 'Nível Classe Mundial' : 'Alto Risco Operacional'}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}