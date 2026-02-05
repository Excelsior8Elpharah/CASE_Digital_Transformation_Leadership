
import { RiskItem, RoadmapItem, ISOStatus, NonConformity, ProjectItem, ESGKPI, DashboardData, KanbanState } from './types';

// --- DADOS GERAIS ---
export const INITIAL_BEFORE_DATA: DashboardData = {
  marketShare: 34.5,
  oee: 65,
  nps: 6.2,
  risks: 8,
  maturity: 1.2,
  digitalSales: 5,
  digitalProcesses: 10
};

export const INITIAL_AFTER_DATA: DashboardData = {
  marketShare: 40.1,
  oee: 84.5,
  nps: 8.4,
  risks: 3,
  maturity: 4.2,
  digitalSales: 22.5,
  digitalProcesses: 65
};

// --- KANBAN ---
export const KANBAN_INITIAL: KanbanState = {
  planejar: [
    { id: 'c1', title: 'AI Audit Setup', description: 'Levantamento de requisitos para auditoria de IA.', dueDate: '2023-01-15', priority: 'high' },
    { id: 'c2', title: 'PDCA Training', description: 'Workshop inicial com gestores sobre PDCA.', dueDate: '2023-01-20', priority: 'medium' },
  ],
  executar: [
    { id: 'c5', title: 'TechStack Deploy', description: 'Implementação da nova arquitetura AWS.', dueDate: '2024-05-10', priority: 'high' },
    { id: 'c6', title: 'Market Analysis', description: 'Análise trimestral de market share.', dueDate: '2024-05-15', priority: 'medium' }
  ],
  verificar: [
    { id: 'c7', title: 'OEE 84% Test', description: 'Validação da eficiência na Linha A.', dueDate: '2024-04-30', priority: 'high' },
    { id: 'c8', title: 'NPS Survey', description: 'Coleta de feedbacks do novo E-commerce.', dueDate: '2024-05-01', priority: 'medium' }
  ],
  agir: [
    { id: 'c9', title: 'Scale DX Success', description: 'Rollout do modelo digital para Planta MG.', dueDate: '2024-06-01', priority: 'high' },
    { id: 'c10', title: 'Next Phase Planning', description: 'Planejamento da Fase 3 de Transformação.', dueDate: '2024-06-15', priority: 'medium' }
  ]
};

// --- PORTFÓLIO ---
export const PORTFOLIO_BEFORE: ProjectItem[] = [
  { id: 1, name: 'Manutenção Legada', type: 'Sistemas', phase: 'Planejamento', cost: 'R$ 800k', benefit: 'Sobrevivência', roi: '15%', sponsor: 'Diretoria' },
  { id: 2, name: 'Backup Manual', type: 'Segurança', phase: 'Ideia', cost: 'R$ 100k', benefit: 'Redução Risco', roi: '5%', sponsor: 'TI' },
];

export const PORTFOLIO_AFTER: ProjectItem[] = [
  { id: 1, name: 'E-commerce B2B 2.0', type: 'Vendas', phase: 'Execução', cost: 'R$ 450k', benefit: 'Aumento 15% Venda Direta', roi: '180%', sponsor: 'Raphael Serafim (CDO)' },
  { id: 2, name: 'IoT Predição Manutenção', type: 'Indústria', phase: 'Planejamento', cost: 'R$ 200k', benefit: 'Redução 20% Paradas', roi: '220%', sponsor: 'Raphael Serafim (CDO)' },
  { id: 3, name: 'Digital Twin Receitas', type: 'Dados', phase: 'Execução', cost: 'R$ 300k', benefit: 'Otimização P&D', roi: '350%', sponsor: 'Raphael Serafim (CDO)' },
];

// --- ISO ---
export const ISO_BEFORE: ISOStatus[] = [
  { id: '9001', name: 'ISO 9001', adherence: 45, status: 'Parcial', requirements: [{label: 'Processos Mapeados', done: false}] },
  { id: '27001', name: 'ISO 27001', adherence: 15, status: 'Em implantação', requirements: [{label: 'Gestão Acessos', done: false}] },
];

export const ISO_AFTER: ISOStatus[] = [
  { id: '9001', name: 'ISO 9001 - Qualidade', adherence: 92, status: 'Consolidado', requirements: [{label: 'Processos Mapeados', done: true}, {label: 'Auditoria Interna', done: true}] },
  { id: '27001', name: 'ISO 27001 - Segurança', adherence: 88, status: 'Consolidado', requirements: [{label: 'Gestão Acessos', done: true}, {label: 'Criptografia', done: true}] },
  { id: '14001', name: 'ISO 14001 - Ambiental', adherence: 82, status: 'Consolidado', requirements: [{label: 'Resíduos', done: true}, {label: 'Energia', done: true}] },
];

// --- ESG ---
export const ESG_BEFORE: ESGKPI[] = [
  { id: 'e', metric: 'Score Ambiental', current: 38, target: 80, iso: 'ISO14001', trend: 'down' },
  { id: 's', metric: 'Score Social', current: 42, target: 85, iso: 'ISO45001', trend: 'stable' },
  { id: 'g', metric: 'Score Governança', current: 31, target: 90, iso: 'ISO37001', trend: 'down' }
];

export const ESG_AFTER: ESGKPI[] = [
  { id: 'waste', metric: 'Resíduos Reciclados', current: 78, target: 85, iso: 'ISO14001', trend: 'up' },
  { id: 'carbon', metric: 'Emissões CO2', current: 124, target: 110, iso: 'ISO14001', trend: 'down' },
  { id: 'ethics', metric: 'Treinamentos Ética', current: 92, target: 95, iso: 'ISO37001', trend: 'up' }
];

// --- ROADMAP & OUTROS ---
export const MARKET_SHARE_DATA = [
  { month: 'M0', value: 15 },
  { month: 'M3', value: 16 },
  { month: 'M6', value: 17.5 },
  { month: 'M9', value: 19 },
  { month: 'M12', value: 21 },
  { month: 'M15', value: 22.5 },
  { month: 'M18', value: 24 },
];

export const RISKS_EXTENDED: RiskItem[] = [
  { id: 1, risk: 'Atraso Crítico no ERP Cloud', category: 'Digital/TI', probability: 3, impact: 5, kri: 'Dias de atraso vs Milestone', mitigation: 'Squad de contingência e suporte SAP Gold.', responsible: 'CTO André', status: 'Em mitigação' },
  { id: 2, risk: 'Fuga de Talentos Tech', category: 'Pessoas', probability: 4, impact: 4, kri: '% Turnover em TI', mitigation: 'Plano de Stock Options e Home Office.', responsible: 'RH Fernanda', status: 'Aberto' },
  { id: 3, risk: 'Vazamento de Dados (LGPD)', category: 'Compliance', probability: 2, impact: 5, kri: 'Tentativas de Invasão/mês', mitigation: 'Auditoria externa e Pen-tests trimestrais.', responsible: 'DPO / CTO', status: 'Em mitigação' },
  { id: 4, risk: 'Resistência na Linha de Produção', category: 'Operacional', probability: 4, impact: 3, kri: '% Adessão IoT', mitigation: 'Treinamento gamificado e bônus digital.', responsible: 'Operações Carla', status: 'Aberto' },
];

export const PROJECTS_PORTFOLIO: ProjectItem[] = PORTFOLIO_AFTER;

export const ROADMAP_ITEMS: RoadmapItem[] = [
  { id: 1, task: 'Diagnóstico Completo', startMonth: 1, duration: 2, status: 'concluido', description: 'Mapeamento de gaps técnicos e culturais.' },
  { id: 2, task: 'MVP E-commerce', startMonth: 3, duration: 4, status: 'em-andamento', description: 'Lançamento da loja virtual básica para B2B.' },
  { id: 3, task: 'ERP Cloud Implementation', startMonth: 5, duration: 10, status: 'em-andamento', description: 'Migração do legado para SAP S/4HANA Cloud.' },
  { id: 4, task: 'IoT na Produção', startMonth: 8, duration: 6, status: 'planejado', description: 'Sensores e monitoramento em tempo real nas linhas.' },
  { id: 5, task: 'App Cliente / Fidelidade', startMonth: 10, duration: 5, status: 'planejado', description: 'Aplicativo mobile com assinatura e gamificação.' },
  { id: 6, task: 'Cultura Ágil & Treinamento', startMonth: 2, duration: 16, status: 'em-andamento', description: 'Jornada contínua de capacitação digital.' },
  { id: 7, task: 'Data Analytics / BI', startMonth: 12, duration: 6, status: 'planejado', description: 'Centralização de dados para tomada de decisão.' },
];

export const ACADEMIC_SOURCES = [
  { name: 'McKinsey 2023', url: 'https://mckinsey.com/digital-transformation', topic: 'DX Maturity' },
  { name: 'MIT Sloan', url: 'https://sloanreview.mit.edu/digital-transformation', topic: 'Culture DX' },
  { name: 'BCG Gamma', url: 'https://bcg.com/ai-transformation', topic: 'AI Governance' }
];
