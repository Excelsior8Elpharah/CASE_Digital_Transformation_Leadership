
export type Section = 
  | 'overview' 
  | 'chat-ia'
  | '5w2h' 
  | 'ishikawa' 
  | 'swot' 
  | 'pdca' 
  | 'kanban'
  | 'roadmap' 
  | 'tech' 
  | 'kpis' 
  | 'risks' 
  | 'governance'
  | 'compliance'
  | 'quality'
  | 'lessons'
  | 'portfolio'
  | 'maturity-dx'
  | 'ethics-esg';

export type ModoTransformacao = 'antes' | 'depois';

export interface DashboardData {
  marketShare: number;
  oee: number;
  nps: number;
  risks: number;
  maturity: number;
  digitalSales: number;
  digitalProcesses: number;
}

export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface KanbanState {
  planejar: KanbanCard[];
  executar: KanbanCard[];
  verificar: KanbanCard[];
  agir: KanbanCard[];
}

export interface KPI {
  label: string;
  value: string | number;
  target: string | number;
  suffix?: string;
  color: string;
  category: 'Operação' | 'Digital' | 'Cliente' | 'Pessoas';
}

export interface RiskItem {
  id: number;
  risk: string;
  category: 'Operacional' | 'Digital/TI' | 'Mercado' | 'Pessoas' | 'Compliance';
  probability: number; // 1-5
  impact: number; // 1-5
  kri: string;
  mitigation: string;
  responsible: string;
  status: 'Aberto' | 'Em mitigação' | 'Encerrado';
}

export interface ISOStatus {
  id: string;
  name: string;
  adherence: number;
  status: 'Em implantação' | 'Parcial' | 'Consolidado';
  requirements: { label: string; done: boolean }[];
}

export interface NonConformity {
  id: string;
  area: string;
  description: string;
  norm: string;
  gravity: 'Crítica' | 'Maior' | 'Menor';
  responsible: string;
  status: 'Aberta' | 'Em tratamento' | 'Encerrada';
}

export interface ProjectItem {
  id: number;
  name: string;
  type: string;
  phase: 'Ideia' | 'Planejamento' | 'Execução' | 'Concluído';
  cost: string;
  benefit: string;
  roi: string;
  sponsor: string;
}

export interface RoadmapItem {
  id: number;
  task: string;
  startMonth: number;
  duration: number;
  status: 'concluido' | 'em-andamento' | 'planejado';
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface MLResponse {
  prediction: number;
  equation: string;
  r2: number;
  interpretation: string;
  code: string;
}

export interface ESGKPI {
  id: string;
  metric: string;
  current: number;
  target: number;
  iso: string;
  trend: 'up' | 'down' | 'stable';
}
