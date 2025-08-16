import { useEffect, useMemo, useState } from 'react';
import { Deal, initialDeals } from '../data/deals';

export type SortBy = 'date' | 'value';

function extractDomain(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}

export function formatCurrencyShort(value?: number): string {
  if (value == null) return 'Undisclosed';
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (abs >= 1_000_000_000_000) return `${sign}$${(abs / 1_000_000_000_000).toFixed(1)}T`;
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate async load; replace with real fetch later
    let active = true;
    setLoading(true);
    const id = setTimeout(() => {
      if (!active) return;
      try {
        setDeals(initialDeals);
        setError(null);
      } catch (e) {
        setError('Failed to load deals');
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(id);
    };
  }, []);

  const sectors = useMemo(() => {
    const s = new Set<string>();
    for (const d of deals) s.add(d.sector);
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [deals]);

  const allBanks = useMemo(() => {
    const s = new Set<string>();
    for (const d of deals) {
      (d.target_advisors ?? []).forEach((b) => s.add(b));
      (d.bidder_advisors ?? []).forEach((b) => s.add(b));
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [deals]);

  return {
    deals,
    dealsLoading: loading,
    dealsError: error,
    sectors,
    allBanks,
    extractDomain,
  } as const;
}


