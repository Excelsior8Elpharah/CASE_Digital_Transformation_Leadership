
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  LayoutDashboard, HelpCircle, ChevronRight, Target, RefreshCcw, Calendar, Cpu, 
  BarChart3, ShieldAlert, Users, Menu, FileCheck, ClipboardList, Lightbulb, 
  Briefcase, TrendingUp, Bot, Leaf, RotateCcw, LayoutList, Palette, X, Check
} from 'lucide-react';
import { Section, DashboardData, ModoTransformacao } from './types';
import { INITIAL_BEFORE_DATA, INITIAL_AFTER_DATA } from './constants';

import Overview from './sections/Overview';
import FiveWTwoH from './sections/FiveWTwoH';
import Ishikawa from './sections/Ishikawa';
import SWOT from './sections/SWOT';
import PDCA from './sections/PDCA';
import Roadmap from './sections/Roadmap';
import TechArch from './sections/TechArch';
import KPIs from './sections/KPIs';
import Risks from './sections/Risks';
import Governance from './sections/Governance';
import ComplianceISO from './sections/ComplianceISO';
import QualityNCs from './sections/QualityNCs';
import LessonsPDCA from './sections/LessonsPDCA';
import Portfolio from './sections/Portfolio';
import MaturityDX from './sections/MaturityDX';
import ChatIA from './sections/ChatIA';
import EthicsESG from './sections/EthicsESG';
import KanbanPDCA from './sections/KanbanPDCA';

export default function App() {
  const [activeTab, setActiveTab] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modo, setModo] = useState<ModoTransformacao>('depois');
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('theme_accent') || '#06b6d4'); 
  const [bgColor, setBgColor] = useState(() => localStorage.getItem('theme_bg') || '#020617');
  const [borderRadius, setBorderRadius] = useState(() => localStorage.getItem('theme_radius') || '1.5rem');
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('theme_font') || 'Inter, sans-serif');
  const [visualMode, setVisualMode] = useState(() => localStorage.getItem('theme_visual') || 'glow');

  const [dashboardData, setDashboardData] = useState<DashboardData>(() => {
    const saved = localStorage.getItem('sabor_heranca_data');
    return saved ? JSON.parse(saved) : INITIAL_AFTER_DATA;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', accentColor);
    root.style.setProperty('--primary-glow', `${accentColor}33`);
    root.style.setProperty('--bg-main', bgColor);
    root.style.setProperty('--ui-radius', borderRadius);
    root.style.setProperty('--font-main', fontFamily);
    
    localStorage.setItem('theme_accent', accentColor);
    localStorage.setItem('theme_bg', bgColor);
    localStorage.setItem('theme_radius', borderRadius);
    localStorage.setItem('theme_font', fontFamily);
    localStorage.setItem('theme_visual', visualMode);
  }, [accentColor, bgColor, borderRadius, fontFamily, visualMode]);

  useEffect(() => {
    const savedModo = localStorage.getItem('sabor_heranca_modo');
    if (savedModo) setModo(savedModo as ModoTransformacao);
  }, []);

  useEffect(() => {
    localStorage.setItem('sabor_heranca_modo', modo);
  }, [modo]);

  useEffect(() => {
    localStorage.setItem('sabor_heranca_data', JSON.stringify(dashboardData));
  }, [dashboardData]);

  const updateData = useCallback((newData: Partial<DashboardData>) => {
    setDashboardData(prev => ({ ...prev, ...newData }));
  }, []);

  const currentDisplayData = useMemo(() => 
    modo === 'antes' ? INITIAL_BEFORE_DATA : dashboardData
  , [modo, dashboardData]);

  const isAfter = modo === 'depois';

  const menuItems = useMemo(() => [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard, group: 'Principal' },
    { id: 'chat-ia', label: 'Chat IA Governança', icon: Bot, group: 'Principal' },
    { id: '5w2h', label: 'Análise 5W2H', icon: HelpCircle, group: 'Principal' },
    { id: 'ishikawa', label: 'Ishikawa', icon: ChevronRight, group: 'Principal' },
    { id: 'swot', label: 'Análise SWOT', icon: Target, group: 'Principal' },
    { id: 'pdca', label: 'Ciclo PDCA', icon: RefreshCcw, group: 'Principal' },
    { id: 'kanban', label: 'Kanban PDCA', icon: LayoutList, group: 'Execução' },
    { id: 'roadmap', label: 'Roadmap (Gantt)', icon: Calendar, group: 'Gestão' },
    { id: 'portfolio', label: 'Portfólio Digital', icon: Briefcase, group: 'Gestão' },
    { id: 'kpis', label: 'KPIs e Resultados', icon: BarChart3, group: 'Gestão' },
    { id: 'risks', label: 'Gestão de Riscos', icon: ShieldAlert, group: 'Governança' },
    { id: 'compliance', label: 'Conformidade & ISO', icon: FileCheck, group: 'Governança' },
    { id: 'quality', label: 'Qualidade & NCs', icon: ClipboardList, group: 'Governança' },
    { id: 'lessons', label: 'Lições & Melhoria', icon: Lightbulb, group: 'Governança' },
    { id: 'maturity-dx', label: 'Maturidade DX', icon: TrendingUp, group: 'Governança' },
    { id: 'ethics-esg', label: 'Ética & ESG', icon: Leaf, group: 'Governança' },
    { id: 'tech', label: 'Tecnologias', icon: Cpu, group: 'Sistema' },
    { id: 'governance', label: 'Organograma', icon: Users, group: 'Sistema' },
  ], []);

  const groups = useMemo(() => ['Principal', 'Execução', 'Gestão', 'Governança', 'Sistema'], []);

  const renderSection = () => {
    switch (activeTab) {
      case 'overview': 
        return <Overview data={currentDisplayData} isAfter={isAfter} modo={modo} updateData={isAfter ? updateData : undefined} />;
      case 'chat-ia': 
        return <ChatIA />;
      case '5w2h': 
        return <FiveWTwoH />;
      case 'ishikawa': 
        return <Ishikawa />;
      case 'swot': 
        return <SWOT />;
      case 'pdca': 
        return <PDCA />;
      case 'kanban': 
        return <KanbanPDCA modo={modo} />;
      case 'roadmap': 
        return <Roadmap />;
      case 'tech': 
        return <TechArch />;
      case 'kpis': 
        return <KPIs modo={modo} />;
      case 'risks': 
        return <Risks />;
      case 'governance': 
        return <Governance />;
      case 'compliance': 
        return <ComplianceISO modo={modo} />;
      case 'quality': 
        return <QualityNCs />;
      case 'lessons': 
        return <LessonsPDCA />;
      case 'portfolio': 
        return <Portfolio modo={modo} />;
      case 'maturity-dx': 
        return <MaturityDX modo={modo} />;
      case 'ethics-esg': 
        return <EthicsESG modo={modo} />;
      default: 
        return <Overview data={currentDisplayData} isAfter={isAfter} modo={modo} updateData={isAfter ? updateData : undefined} />;
    }
  };

  return (
    <div className="flex min-h-screen text-slate-100 overflow-hidden" style={{ fontFamily: 'var(--font-main)', backgroundColor: 'var(--bg-main)' }}>
      {(sidebarOpen || themePanelOpen) && (
        <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity" onClick={() => { setSidebarOpen(false); setThemePanelOpen(false); }} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-800/50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-primary/20">S&H</div>
            <div>
              <h1 className="text-lg font-bold leading-none">Sabor & Herança</h1>
              <p className="text-xs text-slate-400 mt-1">Gestão Profissional</p>
            </div>
          </div>
          <nav className="space-y-6">
            {groups.map(group => (
              <div key={group}>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-4">{group}</p>
                <div className="space-y-1">
                  {menuItems.filter(i => i.group === group).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button 
                        key={item.id} 
                        onClick={() => { setActiveTab(item.id as Section); setSidebarOpen(false); }} 
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-[calc(var(--ui-radius)*0.5)] transition-all duration-200 group ${activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'}`}
                      >
                        <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-primary' : 'text-slate-500'}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        <header className="h-20 flex items-center justify-between px-6 bg-black/10 border-b border-slate-800/50 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center space-x-6">
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-slate-100 lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex p-1 bg-black/20 rounded-xl border border-slate-800 shadow-inner">
              <button 
                onClick={() => setModo('antes')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${modo === 'antes' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Antes
              </button>
              <button 
                onClick={() => setModo('depois')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${modo === 'depois' ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Depois
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button onClick={() => setThemePanelOpen(true)} className="p-2.5 bg-slate-800/50 text-slate-300 hover:text-primary rounded-xl transition-all border border-slate-700/50">
               <Palette className="w-5 h-5" />
             </button>
             <div className="text-right hidden sm:block border-l border-slate-800/50 pl-4">
               <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Estado Atual</p>
               <p className={`text-sm font-black transition-colors ${modo === 'antes' ? 'text-red-400' : 'text-emerald-400'}`}>
                 {modo === 'antes' ? 'Silos' : 'Digital'}
               </p>
             </div>
          </div>
        </header>

        <div id="dashboard-content" className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8" style={{ background: `radial-gradient(ellipse at top, var(--primary-glow), var(--bg-main))` }}>
          {renderSection()}
        </div>

        <button onClick={() => setThemePanelOpen(true)} className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-primary text-slate-950 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all lg:hidden">
          <Palette className="w-6 h-6" />
        </button>

        <div className={`fixed inset-y-0 right-0 z-[60] w-80 bg-slate-900/95 border-l border-slate-800 backdrop-blur-xl transform transition-transform duration-500 ease-in-out p-8 flex flex-col ${themePanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-3">
               <Palette className="w-5 h-5 text-primary" />
               <h3 className="text-xl font-bold text-white">Visual</h3>
             </div>
             <button onClick={() => setThemePanelOpen(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white">
               <X className="w-6 h-6" />
             </button>
           </div>

           <div className="flex-1 overflow-y-auto space-y-8 pr-2">
             <section className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cor de Destaque</h4>
               <div className="grid grid-cols-5 gap-3">
                 {[
                   { color: '#06b6d4', label: 'Ciano' },
                   { color: '#10b981', label: 'Verde' },
                   { color: '#8b5cf6', label: 'Violeta' },
                   { color: '#f59e0b', label: 'Âmbar' },
                   { color: '#f43f5e', label: 'Rosa' }
                 ].map(item => (
                   <button 
                    key={item.color} 
                    onClick={() => setAccentColor(item.color)}
                    className={`aspect-square rounded-full flex items-center justify-center transition-all border-2 ${accentColor === item.color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: item.color }}
                   >
                     {accentColor === item.color && <Check className="w-4 h-4 text-slate-950" />}
                   </button>
                 ))}
               </div>
             </section>

             <section className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cor de Fundo</h4>
               <div className="grid grid-cols-5 gap-3">
                 {[
                   { color: '#020617', label: 'Slate' },
                   { color: '#050a1a', label: 'Midnight' },
                   { color: '#111111', label: 'Black' },
                   { color: '#0f172a', label: 'Navy' },
                   { color: '#1e293b', label: 'Charcoal' }
                 ].map(item => (
                   <button 
                    key={item.color} 
                    onClick={() => setBgColor(item.color)}
                    className={`aspect-square rounded-full flex items-center justify-center transition-all border-2 ${bgColor === item.color ? 'border-primary scale-110 shadow-lg' : 'border-white/10 hover:border-white/30'}`}
                    style={{ backgroundColor: item.color }}
                   >
                     {bgColor === item.color && <Check className="w-4 h-4 text-white" />}
                   </button>
                 ))}
               </div>
             </section>

             <section className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Formas (Bordas)</h4>
               <div className="space-y-2">
                 {[
                   { radius: '1.5rem', label: 'Moderno (Arredondado)' },
                   { radius: '0.5rem', label: 'Sóbrio (Suave)' },
                   { radius: '0px', label: 'Business (Reto)' }
                 ].map(item => (
                   <button 
                    key={item.radius} 
                    onClick={() => setBorderRadius(item.radius)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${borderRadius === item.radius ? 'bg-primary/10 border-primary text-primary' : 'bg-black/20 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                   >
                     {item.label}
                   </button>
                 ))}
               </div>
             </section>

             <section className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fontes</h4>
               <div className="space-y-2">
                 {[
                   { font: 'Inter, sans-serif', label: 'Inter (Sans)' },
                   { font: '"JetBrains Mono", monospace', label: 'Mono (Data)' },
                   { font: 'Merriweather, serif', label: 'Serif (Executivo)' }
                 ].map(item => (
                   <button 
                    key={item.font} 
                    onClick={() => setFontFamily(item.font)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${fontFamily === item.font ? 'bg-primary/10 border-primary text-primary' : 'bg-black/20 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    style={{ fontFamily: item.font }}
                   >
                     {item.label}
                   </button>
                 ))}
               </div>
             </section>

             <section className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Estilo</h4>
               <div className="grid grid-cols-2 gap-3">
                 <button 
                    onClick={() => setVisualMode('glow')}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all ${visualMode === 'glow' ? 'bg-primary/10 border-primary text-primary' : 'bg-black/20 border-slate-800 text-slate-500'}`}
                 >
                   Glow
                 </button>
                 <button 
                    onClick={() => setVisualMode('flat')}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all ${visualMode === 'flat' ? 'bg-primary/10 border-primary text-primary' : 'bg-black/20 border-slate-800 text-slate-500'}`}
                 >
                   Flat
                 </button>
               </div>
             </section>
           </div>

           <div className="pt-8 mt-auto border-t border-slate-800 text-center">
             <button onClick={() => { 
                setAccentColor('#06b6d4'); 
                setBgColor('#020617');
                setBorderRadius('1.5rem'); 
                setFontFamily('Inter, sans-serif');
                setVisualMode('glow');
              }} className="text-[10px] font-bold text-slate-600 hover:text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
               <RotateCcw className="w-3 h-3" /> Resetar Visual
             </button>
           </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${accentColor};
          --primary-glow: ${accentColor}33;
          --bg-main: ${bgColor};
          --ui-radius: ${borderRadius};
          --font-main: ${fontFamily};
        }

        .rounded-3xl { border-radius: var(--ui-radius) !important; }
        .rounded-2xl { border-radius: calc(var(--ui-radius) * 0.8) !important; }
        .rounded-xl { border-radius: calc(var(--ui-radius) * 0.5) !important; }
        
        .bg-primary { background-color: var(--primary) !important; }
        .text-primary { color: var(--primary) !important; }
        .border-primary { border-color: var(--primary) !important; }
        .bg-primary\\/10 { background-color: var(--primary-glow) !important; }

        ${visualMode === 'flat' ? `
          .shadow-xl, .shadow-2xl, .shadow-lg { box-shadow: none !important; }
          .backdrop-blur-md, .backdrop-blur-xl { backdrop-filter: none !important; background-color: rgba(0,0,0,0.4) !important; }
          .animate-pulse { animation: none !important; }
        ` : ''}

        .text-cyan-400, .text-cyan-300 { color: var(--primary) !important; }
        .bg-cyan-500, .bg-cyan-400 { background-color: var(--primary) !important; }
        .border-cyan-500, .border-cyan-400, .border-cyan-500\\/30 { border-color: var(--primary) !important; }
        .bg-cyan-500\\/10, .bg-cyan-900\\/50, .bg-cyan-950\\/20 { background-color: var(--primary-glow) !important; }
      `}} />
    </div>
  );
}
