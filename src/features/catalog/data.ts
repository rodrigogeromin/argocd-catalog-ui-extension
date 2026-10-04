export interface CatalogCategory {readonly id: string; readonly label: string}
export interface CatalogService {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly summary: string;
  readonly description: string;
  readonly url: string;
  readonly icon: string;
  readonly tag: string;
}

export const categories: readonly CatalogCategory[] = [
  {id: 'all', label: 'Todos os serviços'},
  {id: 'delivery', label: 'Entrega contínua'},
  {id: 'automation', label: 'Automação'},
  {id: 'observability', label: 'Observabilidade'},
  {id: 'security', label: 'Segurança'},
];

export const services: readonly CatalogService[] = [
  {
    id: 'rollouts', name: 'Argo Rollouts', category: 'delivery',
    summary: 'Entregas progressivas com canary, blue-green e análise automatizada.',
    description: 'Estenda o fluxo GitOps com estratégias de rollout progressivo. Acompanhe etapas, análise e promoção de versões junto das aplicações gerenciadas pelo Argo CD.',
    url: 'https://argoproj.github.io/rollouts/', icon: '↗', tag: 'Progressive delivery',
  },
  {
    id: 'workflows', name: 'Argo Workflows', category: 'automation',
    summary: 'Execute pipelines e tarefas em contêineres diretamente no Kubernetes.',
    description: 'Orquestre workflows como recursos Kubernetes e conecte tarefas de build, processamento e operações ao ciclo de vida das suas aplicações.',
    url: 'https://argoproj.github.io/workflows/', icon: '⌘', tag: 'Workflow engine',
  },
  {
    id: 'events', name: 'Argo Events', category: 'automation',
    summary: 'Acione workflows e operações a partir de eventos do cluster.',
    description: 'Conecte fontes de eventos a sensores e gatilhos para automatizar respostas dentro do ecossistema Kubernetes.',
    url: 'https://argoproj.github.io/events/', icon: 'ϟ', tag: 'Event automation',
  },
  {
    id: 'prometheus', name: 'Prometheus', category: 'observability',
    summary: 'Consulte métricas e sinais de saúde dos serviços implantados.',
    description: 'Integre métricas de aplicações e infraestrutura ao processo de entrega e use consultas PromQL para investigar o estado dos serviços.',
    url: 'https://prometheus.io/docs/introduction/overview/', icon: '◉', tag: 'Metrics',
  },
  {
    id: 'kyverno', name: 'Kyverno', category: 'security',
    summary: 'Aplique políticas e valide recursos Kubernetes como código.',
    description: 'Verifique e aplique políticas sobre os manifests gerenciados. Use validação e mutação para manter padrões de segurança no cluster.',
    url: 'https://kyverno.io/docs/', icon: '⬡', tag: 'Policy management',
  },
  {
    id: 'external-secrets', name: 'External Secrets Operator', category: 'security',
    summary: 'Sincronize segredos de provedores externos para o Kubernetes.',
    description: 'Referencie segredos armazenados em provedores externos sem manter seus valores nos repositórios GitOps.',
    url: 'https://external-secrets.io/latest/', icon: '⌑', tag: 'Secrets management',
  },
];

export const categoryLabel = (id: string): string => categories.find(category => category.id === id)?.label ?? 'Serviços';
