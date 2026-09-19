import { CompanyInfo, ServiceItem, SpecialOffer, BlockMaterial } from './types';

export const COMPANY_INFO: CompanyInfo = {
  name: 'BLOCO FORTE',
  tagline: 'Tecnologia que constrói conforto e segurança',
  phone: '(11) 94497-4868',
  phoneRaw: '5511944974868',
  email: 'vendas@blocoforte.com.br',
  hours: 'Seg - Sex: 07:00 às 17:30',
  address: 'O bloco que faz a diferença na sua obra!',
  deliveryCoverage: 'Entrega: consultar valor.',
  emergencyService: 'Pagamento: consultar condições.',
  experienceYears: 12,
  completedProjects: 5200,
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'entrega',
    title: 'Entrega Especializada',
    description: 'Caminhão munk, sem quebras.',
    iconName: 'delivery',
    startingPrice: 'Consultar valor',
  },
  {
    id: 'qualidade',
    title: 'Qualidade e Segurança',
    description: 'Em cada detalhe da sua obra.',
    iconName: 'structural',
    startingPrice: 'Garantida',
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-eps',
    title: 'BLOCO DE CONCRETO COM EPS 100x50x15cm',
    price: 'R$ 89,00 / un',
    originalPrice: '',
    note: '*100 unidades = R$ 8.900,00',
    code: 'EPS100',
    iconName: 'structural',
  },
];

export const BLOCO_FORTE_EPS_DETAILS = {
  brand: 'BLOCO FORTE',
  tagline: 'TECNOLOGIA QUE CONSTRÓI CONFORTO E SEGURANÇA',
  slogan: 'O bloco que faz a diferença na sua obra!',
  productTitle: 'BLOCO DE CONCRETO COM EPS',
  productSubtitle: 'Mais conforto, praticidade e economia para sua obra!',
  badge: 'Leve, resistente e de alta qualidade!',
  dimensions: '100 x 50 x 15 cm',
  dimensionsLabel: 'Tamanho: 100 x 50 x 15 cm',
  benefits: [
    {
      id: 'leve',
      title: 'LEVE',
      description: 'Facilita o transporte e a execução.',
      icon: 'feather',
    },
    {
      id: 'termico',
      title: 'CONFORTO TÉRMICO',
      description: 'Mantém o ambiente mais agradável.',
      icon: 'thermometer',
    },
    {
      id: 'acustico',
      title: 'CONFORTO ACÚSTICO',
      description: 'Reduz ruídos.',
      icon: 'volume',
    },
    {
      id: 'resistente',
      title: 'RESISTENTE',
      description: 'Mais segurança para sua obra.',
      icon: 'shield',
    },
  ],
  pricingTable: [
    { quantity: '1 unidade', value: 'R$ 89,00' },
    { quantity: '100 unidades', value: 'R$ 8.900,00' },
  ],
  rendimento: {
    title: 'RENDIMENTO',
    highlight: '100 BLOCOS = APROXIMADAMENTE 50 m²',
    subtext: 'DE PAREDE PRONTA, JÁ COM REBOCO.',
  },
  conditions: {
    delivery: 'Entrega: consultar valor.',
    payment: 'Pagamento: consultar condições.',
    guarantee: 'Qualidade e segurança em cada detalhe.',
    footerSlogan: 'Invista em qualidade!',
  },
};

export const PLUMBING_MATERIALS: BlockMaterial[] = [
  {
    id: 'bloco-concreto-eps',
    name: 'Bloco de Concreto com EPS',
    category: 'Termoacústico',
    dimensions: '100 x 50 x 15 cm',
    resistance: 'Alta Resistência',
    description: 'O bloco que faz a diferença na sua obra! Mais conforto, praticidade e economia.',
    price: 'R$ 89,00',
    originalPrice: '',
    badge: 'BLOCO FORTE',
    rating: 5.0,
    reviewsCount: 312,
    imageUrl: '',
    altText: 'Bloco de concreto com EPS',
    stockStatus: 'Pronta Entrega',
  },
  {
    id: 'bloco-estrutural-14-1',
    name: 'Bloco de Concreto Estrutural (Modelo 1)',
    category: 'Alvenaria',
    dimensions: '14 x 19 x 39 cm',
    resistance: 'fck ≥ 8.0 MPa',
    description: 'Resistente e seguro para fundações e muros.',
    price: 'R$ 4,35',
    originalPrice: '',
    badge: 'PADRÃO',
    rating: 4.9,
    reviewsCount: 248,
    imageUrl: '',
    altText: 'Bloco Estrutural',
    stockStatus: 'Pronta Entrega',
  },
  {
    id: 'bloco-estrutural-14-2',
    name: 'Bloco de Concreto Estrutural (Modelo 2)',
    category: 'Alvenaria',
    dimensions: '14 x 19 x 39 cm',
    resistance: 'fck ≥ 8.0 MPa',
    description: 'Resistente e seguro para fundações e muros.',
    price: 'R$ 4,35',
    originalPrice: '',
    badge: 'PADRÃO',
    rating: 4.9,
    reviewsCount: 248,
    imageUrl: '',
    altText: 'Bloco Estrutural',
    stockStatus: 'Pronta Entrega',
  },
  {
    id: 'bloco-estrutural-14-3',
    name: 'Bloco de Concreto Estrutural (Modelo 3)',
    category: 'Alvenaria',
    dimensions: '14 x 19 x 39 cm',
    resistance: 'fck ≥ 8.0 MPa',
    description: 'Resistente e seguro para fundações e muros.',
    price: 'R$ 4,35',
    originalPrice: '',
    badge: 'PADRÃO',
    rating: 4.9,
    reviewsCount: 248,
    imageUrl: '',
    altText: 'Bloco Estrutural',
    stockStatus: 'Pronta Entrega',
  },
  {
    id: 'bloco-estrutural-14-4',
    name: 'Bloco de Concreto Estrutural (Modelo 4)',
    category: 'Alvenaria',
    dimensions: '14 x 19 x 39 cm',
    resistance: 'fck ≥ 8.0 MPa',
    description: 'Resistente e seguro para fundações e muros.',
    price: 'R$ 4,35',
    originalPrice: '',
    badge: 'PADRÃO',
    rating: 4.9,
    reviewsCount: 248,
    imageUrl: '',
    altText: 'Bloco Estrutural',
    stockStatus: 'Pronta Entrega',
  },
  {
    id: 'bloco-estrutural-14-5',
    name: 'Bloco de Concreto Estrutural (Modelo 5)',
    category: 'Alvenaria',
    dimensions: '14 x 19 x 39 cm',
    resistance: 'fck ≥ 8.0 MPa',
    description: 'Resistente e seguro para fundações e muros.',
    price: 'R$ 4,35',
    originalPrice: '',
    badge: 'PADRÃO',
    rating: 4.9,
    reviewsCount: 248,
    imageUrl: '',
    altText: 'Bloco Estrutural',
    stockStatus: 'Pronta Entrega',
  }
];

export const WELCOME_POINTS = [
  { title: 'Leve e Prático', desc: 'Facilita transporte e execução' },
  { title: 'Conforto Térmico', desc: 'Mantém o ambiente mais agradável' },
  { title: 'Conforto Acústico', desc: 'Reduz ruídos indesejados' },
  { title: 'Resistente', desc: 'Mais segurança para sua obra' },
];

export const NAV_LINKS = [
  { name: 'Início', href: '#home', current: true },
  { name: 'A Fábrica', href: '#about' },
  { name: 'Catálogo', href: '#materiais' },
  { name: 'Cotação', href: '#contact' },
];
