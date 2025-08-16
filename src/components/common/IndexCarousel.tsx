// React import not required with modern JSX runtime

export interface IndexTickerItem {
  name: string;
  symbol?: string;
  price: number;
  change: number; // absolute change
  changePct?: number; // percent change, e.g. 0.23 for +0.23%
  unit?: string; // e.g. '%'
}

interface IndexCarouselProps {
  title?: string;
  items: IndexTickerItem[];
  heightClass?: string;
  durationSec?: number;
  direction?: 'ltr' | 'rtl';
}

export function IndexCarousel({
  title = 'Markets at a glance',
  items: baseItems,
  heightClass = 'h-16',
  durationSec = 45,
  direction = 'ltr'
}: IndexCarouselProps) {
  const items = [...baseItems, ...baseItems];

  const formatPrice = (value: number, unit?: string) => {
    const formatted = value >= 1000 ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value.toFixed(2);
    return unit ? `${formatted}${unit}` : formatted;
  };

  const formatChange = (value: number) => {
    const sign = value > 0 ? '+' : value < 0 ? '' : '';
    return `${sign}${value.toFixed(2)}`;
  };

  const formatPct = (value?: number) => {
    if (value === undefined || value === null) return '';
    const sign = value > 0 ? '+' : value < 0 ? '' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div className="w-full">
      <style>
        {`
          @keyframes index-marquee {
            from { transform: translate3d(0,0,0); }
            to   { transform: translate3d(-50%,0,0); }
          }

          .index-marquee-viewport {
            overflow: hidden;
            position: relative;
            -webkit-mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
                    mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
            background: white;
          }

          .index-marquee-track {
            display: inline-flex;
            gap: 0px;
            min-width: max-content;
            will-change: transform;
            animation: index-marquee var(--index-marquee-duration, 45s) linear infinite;
          }

          .index-item {
            width: auto; /* size to content */
            flex-shrink: 0; /* never allow items to shrink, preserves spacing */
          }
          /* Remove fixed widths to allow content to define cell size */

          @media (prefers-reduced-motion: reduce) {
            .index-marquee-track { animation: none; }
          }
        `}
      </style>

      <div className="text-center mb-2">
        <p className="text-xs text-gray-600">{title}</p>
      </div>

      <div
        className="index-marquee-viewport border border-gray-200"
        style={{ ['--index-marquee-duration' as any]: `${durationSec}s` }}
      >
        <div
          className="index-marquee-track"
          style={{ animationDirection: direction === 'rtl' ? 'reverse' : 'normal' }}
        >
          {items.map((it, idx) => {
            const isEndOfCopy = (idx + 1) % baseItems.length === 0;
            const isUp = it.change > 0;
            const isDown = it.change < 0;
            const trendColor = isUp ? 'text-emerald-700' : isDown ? 'text-rose-700' : 'text-gray-700';
            const trendBg = isUp ? 'bg-emerald-50 border-emerald-200' : isDown ? 'bg-rose-50 border-rose-200' : 'bg-gray-50 border-gray-200';
            const caret = isUp ? '▲' : isDown ? '▼' : '';
            return (
              <div
                key={`${it.name}-${idx}`}
                className={`index-item ${heightClass} flex items-center justify-between gap-4 px-6 border-gray-100 whitespace-nowrap ${isEndOfCopy ? '' : 'border-r'}`}
              >
                <div className="pr-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] sm:text-sm font-semibold text-gray-900 uppercase">{it.symbol ?? it.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[13px] sm:text-sm tabular-nums text-gray-900">{formatPrice(it.price, it.unit)}</span>
                  <span className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] border px-2 py-0.5 rounded ${trendColor} ${trendBg}`}>
                    {caret && <span aria-hidden>{caret}</span>}
                    <span className="tabular-nums">{formatChange(it.change)}</span>
                    {it.changePct !== undefined && (
                      <span className="tabular-nums">({formatPct(it.changePct)})</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


