import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MARKET_SHARE_DATA } from '../constants';
import { TrendingUp, Cpu, ShoppingCart, Target, History, Zap, AlertTriangle, ArrowUpRight, BarChart3 } from 'lucide-react';
import { DashboardData, ModoTransformacao } from '../types';

interface OverviewProps {
  data: DashboardData;
  isAfter: boolean;
  modo: ModoTransformacao;
  updateData?: (newData: Partial<DashboardData>) => void;
}

export default function Overview({ data, isAfter, modo, updateData }: OverviewProps) {
  const cards = useMemo(() => [
    { label: 'Participação de Mercado', value: data.marketShare, key: 'marketShare' as keyof DashboardData, target: '40%', icon: Target, color: modo === 'depois' ? 'text-cyan-400' : 'text-red-400', bg: modo === 'depois' ? 'bg-cyan-400/10' : 'bg-red-400/10' },
    { label: 'Eficiência OEE', value: data.oee, key: 'oee' as keyof DashboardData, target: '85%', icon: Zap, color: modo === 'depois' ? 'text-emerald-400' : 'text-orange-400', bg: modo === 'depois' ? 'bg-emerald-400/10' : 'bg-orange-400/10' },
    { label: 'Vendas Digitais', value: data.digitalSales, key: 'digitalSales' as keyof DashboardData, target: '25%', icon: ShoppingCart, color: modo === 'depois' ? 'text-purple-400' : 'text-red-500', bg: modo === 'depois' ? 'bg-purple-400/10' : 'bg-red-400/10' },
    { label: 'Maturidade DX', value: data.maturity, key: 'maturity' as keyof DashboardData, target: '5.0', icon: Cpu, color: modo === 'depois' ? 'text-blue-400' : 'text-slate-500', bg: modo === 'depois' ? 'bg-blue-400/10' : 'bg-slate-400/10', suffix: "/5" },
  ], [data, modo]);

  const dynamicChartData = useMemo(() => 
    modo === 'depois' 
      ? MARKET_SHARE_DATA.map((d, i) => i === MARKET_SHARE_DATA.length - 1 ? { ...d, value: data.marketShare } : d)
      : MARKET_SHARE_DATA.slice(0, 4).map(d => ({...d, value: d.value * 0.9}))
  , [modo, data.marketShare]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white mb-2">
            Transformação Digital Sabor & Herança
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            {modo === 'depois' 
              ? 'De uma tradição ágil para uma líder Foodtech: a consolidação da jornada de 18 meses.' 
              : 'O legado de silos: como a falta de digitalização estava erodindo 50 anos de história.'}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 p-8 rounded-[2.5rem] border shadow-2xl transition-all duration-700 ${modo === 'depois' ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
        <div className="space-y-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${modo === 'depois' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-red-500/20 text-red-400'}`}>
            <History className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">O Peso da Tradição</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Fundada em bases sólidas de qualidade artesanal, a Sabor & Herança dominou o mercado regional por décadas. No entanto, o sucesso do passado criou silos operacionais.
          </p>
        </div>
        <div className="space-y-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${modo === 'depois' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">A Crise da Agilidade</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Com a ascensão das Foodtechs, nossa fatia de mercado caiu. A falta de visibilidade em tempo real na fábrica (OEE de 65%) criou um abismo competitivo.
          </p>
        </div>
        <div className="space-y-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${modo === 'depois' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">O Futuro Guiado por Dados</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Hoje, sob a liderança do CDO Raphael Serafim, renascemos com 40,1% de participação e um ecossistema integrado por IA e IoT.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`bg-slate-900 border p-8 rounded-3xl relative overflow-hidden group transition-all duration-300 ${modo === 'depois' ? 'border-slate-800 hover:border-cyan-500/30' : 'border-red-500/20 hover:border-red-500/50'}`}>
              <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <Icon className={`w-7 h-7 ${card.color}`} />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{card.label}</p>
              <div className="flex items-baseline justify-between">
                <h3 className={`text-4xl font-black ${modo === 'antes' ? 'text-red-400' : 'text-white'}`}>{card.value}{card.suffix || "%"}</h3>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block font-bold">META</span>
                  <span className="text-xs text-slate-400 font-bold">{card.target}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-cyan-400" /> Evolução da Participação de Mercado
            </h4>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={modo === 'depois' ? "#38bdf8" : "#ef4444"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={modo === 'depois' ? "#38bdf8" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} isAnimationActive={false} />
                <Area type="monotone" dataKey="value" stroke={modo === 'depois' ? "#38bdf8" : "#ef4444"} strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center">
            <h4 className="text-xl font-bold text-white">Métricas de Transição</h4>
            <BarChart3 className="w-6 h-6 text-slate-600" />
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-950/50 text-[10px] uppercase text-slate-500 font-bold">
              <tr>
                <th className="px-8 py-4">Indicador</th>
                <th className="px-8 py-4 text-red-400">Silos</th>
                <th className="px-8 py-4 text-emerald-400">Digital</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { label: 'Eficiência Fábrica (OEE)', antes: '65%', atual: '84%', ganho: '+19%' },
                { label: 'NPS Global', antes: '6.2', atual: '8.4', gain: '+2.2' },
                { label: 'Lead Time Produção', antes: '12d', atual: '3d', gain: '-9d' },
              ].map((row, i) => (
                <tr key={i} className="text-sm hover:bg-slate-800/10">
                  <td className="px-8 py-6 font-bold text-slate-300">{row.label}</td>
                  <td className="px-8 py-6 text-slate-500">{row.antes}</td>
                  <td className="px-8 py-6 text-white font-black">{row.atual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}