export interface IndexDatum {
  name: string;
  symbol?: string;
  price: number;
  change: number;
  changePct?: number;
  unit?: string;
}

// Static snapshot; can be replaced by live data later
export const headlineIndices: IndexDatum[] = [
  { name: 'S&P 500', symbol: 'SPX', price: 5512.55, change: 12.34, changePct: 0.22 },
  { name: 'NASDAQ', symbol: 'IXIC', price: 17988.21, change: -45.67, changePct: -0.25 },
  { name: 'Dow Jones', symbol: 'DJI', price: 39888.11, change: 88.12, changePct: 0.22 },
];

export const commodityIndices: IndexDatum[] = [
  { name: 'Gold', symbol: 'XAU', price: 2367.42, change: 5.21, changePct: 0.22 },
  { name: 'WTI Crude', symbol: 'WTI', price: 78.31, change: -0.41, changePct: -0.52 },
  { name: 'Brent Crude', symbol: 'BRENT', price: 82.14, change: 0.32, changePct: 0.39 },
  { name: 'Nat Gas', symbol: 'NG', price: 2.38, change: -0.06, changePct: -2.46 },
];

export const ratesAndBonds: IndexDatum[] = [
  { name: '10Y Treasury', symbol: 'US10Y', price: 4.27, change: -0.03, changePct: -0.70, unit: '%' },
  { name: '30Y Treasury', symbol: 'US30Y', price: 4.45, change: 0.01, changePct: 0.22, unit: '%' },
  { name: '2Y Treasury', symbol: 'US02Y', price: 4.69, change: -0.02, changePct: -0.42, unit: '%' },
];

export const techLeaders: IndexDatum[] = [
  { name: 'Apple', symbol: 'AAPL', price: 232.12, change: 1.23, changePct: 0.53 },
  { name: 'Microsoft', symbol: 'MSFT', price: 456.89, change: -2.18, changePct: -0.48 },
  { name: 'Meta', symbol: 'META', price: 524.77, change: 4.02, changePct: 0.77 },
  { name: 'NVIDIA', symbol: 'NVDA', price: 129.11, change: -1.45, changePct: -1.11 },
  { name: 'Amazon', symbol: 'AMZN', price: 197.20, change: 0.66, changePct: 0.34 },
];


