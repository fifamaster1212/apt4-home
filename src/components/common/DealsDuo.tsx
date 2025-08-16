import { useEffect, useMemo, useState } from 'react';
import { useDeals, formatCurrencyShort } from '../../hooks/useDeals';
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

  const renderRow = (d: Deal) => {
    const isOpen = expandedId === d.id;
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
            </div>
            <div className="flex items-center gap-3 shrink-0 text-sm">
              <span className="inline-flex items-center px-2 py-0.5 border rounded bg-gray-50 text-gray-800">{formatCurrencyShort(d.value_usd)}</span>
              <span className="text-gray-600 whitespace-nowrap">
                {d.date ? new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
              </span>
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-sm">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Target */}
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wide text-gray-600">Target</div>
                <div className="mt-0.5 font-medium text-gray-900 truncate" title={d.target_name}>{d.target_name}</div>
                {(d.target_advisors && d.target_advisors.length > 0) && (
                  <div className="mt-0.5 text-gray-700 truncate" title={`Advised by ${d.target_advisors.join(', ')}`}>
                    Advised by {d.target_advisors.join(', ')}
                  </div>
                )}
              </div>
              {/* Bidder */}
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wide text-gray-600">Bidder</div>
                <div className="mt-0.5 font-medium text-gray-900 truncate" title={d.bidder_name}>{d.bidder_name}</div>
                {(d.bidder_advisors && d.bidder_advisors.length > 0) && (
                  <div className="mt-0.5 text-gray-700 truncate" title={`Advised by ${d.bidder_advisors.join(', ')}`}>
                    Advised by {d.bidder_advisors.join(', ')}
                  </div>
                )}
              </div>
              {/* Key facts */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-gray-600">Value</div>
                  <div className="font-medium text-gray-900">{formatCurrencyShort(d.value_usd)} USD</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-gray-600">Date</div>
                  <div className="font-medium text-gray-900">{d.date ? new Date(d.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}</div>
                </div>
                {d.source_url && (
                  <div className="col-span-2 mt-1">
                    <a href={d.source_url} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                      {extractDomain(d.source_url)} ↗
                    </a>
                  </div>
                )}
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


