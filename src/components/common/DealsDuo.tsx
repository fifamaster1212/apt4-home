import { useEffect, useMemo, useState } from 'react';
import { useDeals } from '../../hooks/useDeals';
import type { Deal } from '../../data/deals';

export function DealsDuo() {
  const { deals, dealsLoading, dealsError, extractDomain } = useDeals();

  const topTwo: Deal[] = useMemo(() => {
    const sorted = [...deals].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return sorted.slice(0, 2);
  }, [deals]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  useEffect(() => {
    if (topTwo.length > 0) setExpandedId(topTwo[0].id);
  }, [topTwo]);

  if (dealsLoading) return <div className="h-14 flex items-center justify-center text-xs text-gray-500">Loading deals…</div>;
  if (dealsError) return <div className="h-14 flex items-center justify-center text-xs text-red-600">Couldn’t load deals.</div>;
  if (topTwo.length === 0) return <div className="h-14 flex items-center justify-center text-xs text-gray-500">No recent deals.</div>;

  const toSlug = (input: string) =>
    input
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const deriveAction = (title: string): string => {
    const t = (title || '').toLowerCase();
    if (t.includes('merg')) return 'merges-with';
    if (t.includes('sell')) return 'sells-to';
    if (t.includes('spin')) return 'spins-off-to';
    if (t.includes('acquir') || t.includes('buy')) return 'buys';
    return 'buys';
  };

  const renderRow = (d: Deal) => {
    const isOpen = expandedId === d.id;
    const action = deriveAction(d.title);
    const dealPath = `/deals/${toSlug(d.bidder_name)}-${action}-${toSlug(d.target_name)}`;
    return (
      <div key={d.id} className={`border ${isOpen ? 'bg-blue-50/40 border-blue-200' : 'bg-white border-gray-200'} rounded transition-colors`}>
        <button
          className="w-full text-left p-3 sm:p-4"
          onClick={() => setExpandedId(d.id)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm sm:text-base font-semibold text-gray-900 truncate" title={d.title}>{d.title}</div>
              <div className="text-[11px] text-gray-600 truncate">{d.sector}</div>
              <div className="text-[11px] text-gray-500 font-mono truncate" title={dealPath} aria-label="Deal path (not clickable)">{dealPath}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-sm self-start">
              <span className="text-gray-600 whitespace-nowrap">
                {d.date ? new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
              </span>
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-sm">
            <div className="grid grid-cols-1 gap-4">
              {/* Target */}
              <div className="min-w-0">
                <div
                  className="truncate text-gray-900"
                  title={`Target: ${d.target_name}${(d.target_advisors && d.target_advisors.length > 0) ? ` — advised by ${d.target_advisors.join(', ')}` : ''}`}
                >
                  <span className="text-[11px] uppercase tracking-wide text-gray-600 mr-1">Target:</span>
                  <span className="font-medium">{d.target_name}</span>
                  {(d.target_advisors && d.target_advisors.length > 0) && (
                    <span className="text-gray-700"> — advised by {d.target_advisors.join(', ')}</span>
                  )}
                </div>
              </div>
              {/* Bidder */}
              <div className="min-w-0">
                <div
                  className="truncate text-gray-900"
                  title={`Bidder: ${d.bidder_name}${(d.bidder_advisors && d.bidder_advisors.length > 0) ? ` — advised by ${d.bidder_advisors.join(', ')}` : ''}`}
                >
                  <span className="text-[11px] uppercase tracking-wide text-gray-600 mr-1">Bidder:</span>
                  <span className="font-medium">{d.bidder_name}</span>
                  {(d.bidder_advisors && d.bidder_advisors.length > 0) && (
                    <span className="text-gray-700"> — advised by {d.bidder_advisors.join(', ')}</span>
                  )}
                </div>
              </div>
              {/* Key facts */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div className="col-span-2 mt-1">
                  <span className="text-gray-700 font-mono text-[12px]" title={dealPath} aria-label="Deal URL (not clickable)">{dealPath}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {topTwo.map((d) => renderRow(d))}
    </div>
  );
}


