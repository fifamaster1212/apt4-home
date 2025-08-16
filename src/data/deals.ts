export type Deal = {
  id: string;
  title: string;
  date: string; // ISO date
  value_usd?: number; // undefined => undisclosed
  sector: string;
  industry?: string;
  country?: string;
  target_name: string;
  bidder_name: string;
  target_advisors?: string[];
  bidder_advisors?: string[];
  source_url?: string;
};

// Seed data for demo; replace with live feed when available
export const initialDeals: Deal[] = [
  {
    id: 'd1',
    title: 'Acquirer X acquires Target Y',
    date: '2025-08-12',
    value_usd: 3400000000,
    sector: 'FinTech',
    industry: 'Financial Services',
    country: 'United States',
    target_name: 'Target Y',
    bidder_name: 'Acquirer X',
    target_advisors: ['Evercore', 'Citigroup'],
    bidder_advisors: ['Goldman Sachs'],
    source_url: 'https://www.wsj.com/finance/mergers-acquisitions/fintech-deal-example'
  },
  {
    id: 'd2',
    title: 'Company A merges with Company B',
    date: '2025-08-09',
    value_usd: 820000000,
    sector: 'Industrials',
    industry: 'Manufacturing',
    country: 'Germany',
    target_name: 'Company B',
    bidder_name: 'Company A',
    target_advisors: ['Barclays'],
    bidder_advisors: ['UBS']
  },
  {
    id: 'd3',
    title: 'TechCo acquires AI Startup',
    date: '2025-08-06',
    value_usd: 1250000000,
    sector: 'Technology',
    industry: 'Software',
    country: 'United States',
    target_name: 'AI Startup',
    bidder_name: 'TechCo',
    target_advisors: ['Morgan Stanley'],
    bidder_advisors: ['J.P. Morgan'],
    source_url: 'https://www.bloomberg.com/news/articles/ai-startup-acquisition'
  },
  {
    id: 'd4',
    title: 'EnergyCorp sells assets to PowerHoldings',
    date: '2025-08-01',
    value_usd: 5600000000,
    sector: 'Energy',
    industry: 'Oil & Gas',
    country: 'Canada',
    target_name: 'EnergyCorp Upstream Assets',
    bidder_name: 'PowerHoldings',
    target_advisors: ['Lazard'],
    bidder_advisors: ['Evercore']
  },
  {
    id: 'd5',
    title: 'HealthCo acquires MedTech',
    date: '2025-07-28',
    value_usd: 2200000000,
    sector: 'Healthcare',
    industry: 'Medical Devices',
    country: 'United States',
    target_name: 'MedTech',
    bidder_name: 'HealthCo',
    target_advisors: ['Moelis & Company'],
    bidder_advisors: ['Bank of America']
  },
  {
    id: 'd6',
    title: 'RetailGroup acquires FashionBrand',
    date: '2025-07-20',
    value_usd: 450000000,
    sector: 'Consumer',
    industry: 'Retail',
    country: 'United Kingdom',
    target_name: 'FashionBrand',
    bidder_name: 'RetailGroup',
    target_advisors: ['Citi'],
    bidder_advisors: ['Barclays']
  },
  {
    id: 'd7',
    title: 'TelecomOne buys FiberNet',
    date: '2025-07-18',
    value_usd: 6800000000,
    sector: 'Telecom',
    industry: 'Communications',
    country: 'France',
    target_name: 'FiberNet',
    bidder_name: 'TelecomOne',
    target_advisors: ['Rothschild & Co'],
    bidder_advisors: ['Lazard']
  },
  {
    id: 'd8',
    title: 'AgriCorp acquires SeedTech',
    date: '2025-07-11',
    value_usd: 390000000,
    sector: 'Agriculture',
    industry: 'AgTech',
    country: 'Brazil',
    target_name: 'SeedTech',
    bidder_name: 'AgriCorp',
    target_advisors: ['J.P. Morgan'],
    bidder_advisors: ['UBS']
  },
  {
    id: 'd9',
    title: 'AutoMaker spins off EV Unit',
    date: '2025-07-05',
    // undisclosed value
    sector: 'Automotive',
    industry: 'EVs',
    country: 'United States',
    target_name: 'AutoMaker EV Unit',
    bidder_name: 'NewCo',
    target_advisors: ['Goldman Sachs'],
    bidder_advisors: ['Morgan Stanley']
  },
  {
    id: 'd10',
    title: 'BioPharma acquires GeneWorks',
    date: '2025-06-30',
    value_usd: 9800000000,
    sector: 'Healthcare',
    industry: 'Biotech',
    country: 'Switzerland',
    target_name: 'GeneWorks',
    bidder_name: 'BioPharma',
    target_advisors: ['Evercore'],
    bidder_advisors: ['Citi', 'UBS'],
    source_url: 'https://www.ft.com/content/biopharma-geneworks-deal'
  }
];


