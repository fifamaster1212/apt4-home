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
    title: 'APT4 Ventures leads Series A in TechCorp AI',
    date: '2025-08-12',
    value_usd: 15000000,
    sector: 'AI',
    industry: 'Machine Learning',
    country: 'United States',
    target_name: 'TechCorp AI',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['TechAdvisors Inc'],
    bidder_advisors: ['APT4 Ventures'],
    source_url: 'https://www.techcrunch.com/apt4-ventures-techcorp-ai-series-a'
  },
  {
    id: 'd2',
    title: 'APT4 Ventures invests in DataFlow Systems',
    date: '2025-08-09',
    value_usd: 8000000,
    sector: 'Data Analytics',
    industry: 'Enterprise Software',
    country: 'United States',
    target_name: 'DataFlow Systems',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['DataAdvisors LLC'],
    bidder_advisors: ['APT4 Ventures']
  },
  {
    id: 'd3',
    title: 'APT4 Ventures leads CloudVault Series B',
    date: '2025-08-06',
    value_usd: 25000000,
    sector: 'Cloud Computing',
    industry: 'Infrastructure',
    country: 'United States',
    target_name: 'CloudVault',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['CloudAdvisors Inc'],
    bidder_advisors: ['APT4 Ventures'],
    source_url: 'https://www.bloomberg.com/news/articles/cloudvault-series-b'
  },
  {
    id: 'd4',
    title: 'APT4 Ventures invests in HealthTech Solutions',
    date: '2025-08-01',
    value_usd: 12000000,
    sector: 'Healthcare',
    industry: 'Medical Technology',
    country: 'United States',
    target_name: 'HealthTech Solutions',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['HealthAdvisors LLC'],
    bidder_advisors: ['APT4 Ventures']
  },
  {
    id: 'd5',
    title: 'APT4 Ventures leads FinTech Innovations Seed',
    date: '2025-07-28',
    value_usd: 5000000,
    sector: 'FinTech',
    industry: 'Financial Services',
    country: 'United States',
    target_name: 'FinTech Innovations',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['FinAdvisors Inc'],
    bidder_advisors: ['APT4 Ventures']
  },
  {
    id: 'd6',
    title: 'APT4 Ventures invests in GreenEnergy Corp',
    date: '2025-07-20',
    value_usd: 18000000,
    sector: 'CleanTech',
    industry: 'Renewable Energy',
    country: 'United States',
    target_name: 'GreenEnergy Corp',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['GreenAdvisors LLC'],
    bidder_advisors: ['APT4 Ventures']
  },
  {
    id: 'd7',
    title: 'APT4 Ventures leads CyberShield Series A',
    date: '2025-07-18',
    value_usd: 20000000,
    sector: 'Cybersecurity',
    industry: 'Security Software',
    country: 'United States',
    target_name: 'CyberShield',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['SecurityAdvisors Inc'],
    bidder_advisors: ['APT4 Ventures']
  },
  {
    id: 'd8',
    title: 'APT4 Ventures invests in QuantumLeap',
    date: '2025-07-11',
    value_usd: 10000000,
    sector: 'Quantum Computing',
    industry: 'Advanced Technology',
    country: 'United States',
    target_name: 'QuantumLeap',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['QuantumAdvisors LLC'],
    bidder_advisors: ['APT4 Ventures']
  },
  {
    id: 'd9',
    title: 'APT4 Ventures leads AutoDrive Series B',
    date: '2025-07-05',
    value_usd: 35000000,
    sector: 'Autonomous Vehicles',
    industry: 'Transportation',
    country: 'United States',
    target_name: 'AutoDrive',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['AutoAdvisors Inc'],
    bidder_advisors: ['APT4 Ventures']
  },
  {
    id: 'd10',
    title: 'APT4 Ventures invests in BlockChain Pro',
    date: '2025-06-30',
    value_usd: 15000000,
    sector: 'Blockchain',
    industry: 'Financial Technology',
    country: 'United States',
    target_name: 'BlockChain Pro',
    bidder_name: 'APT4 Ventures',
    target_advisors: ['BlockchainAdvisors LLC'],
    bidder_advisors: ['APT4 Ventures'],
    source_url: 'https://www.coindesk.com/apt4-ventures-blockchain-pro-investment'
  }
];


