// React import not required with modern JSX runtime

interface LogoCarouselProps {
  title?: string;
  companies?: { name: string; logoSrc?: string }[];
  heightClass?: string; // allows size adjustments from callers
  durationSec?: number; // animation speed control
}

export function LogoCarousel({
  title = 'Trusted by top finance teams',
  companies = [
    { name: 'Goldman Sachs' },
    { name: 'Morgan Stanley' },
    { name: 'J.P. Morgan' },
    { name: 'Bank of America' },
    { name: 'Citigroup' },
    { name: 'Barclays' },
    { name: 'UBS' },
    { name: 'Deutsche Bank' },
    { name: 'Lazard' },
    { name: 'Evercore' },
    { name: 'Moelis & Company' },
    { name: 'Rothschild & Co' }
  ],
  heightClass = 'h-16',
  durationSec = 45
}: LogoCarouselProps) {
  // Render the sequence twice for a perfect wrap
  const items = [...companies, ...companies];

  return (
    <div className="w-full">
      <style>
        {`
          @keyframes logo-marquee {
            from { transform: translate3d(0,0,0); }
            to   { transform: translate3d(-50%,0,0); }
          }

          .logo-marquee-viewport {
            overflow: hidden;
            position: relative;
            /* optional: hide edges to guarantee no visible seam */
            -webkit-mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
                    mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
            background: white;
          }

          .logo-marquee-track {
            display: inline-flex;
            min-width: max-content;   /* exact intrinsic width; no 200% rounding errors */
            will-change: transform;
            animation: logo-marquee var(--marquee-duration, 30s) linear infinite;
          }

          /* fixed sizing avoids subpixel accumulation */
          .logo-item {
            width: 14rem; /* w-56 */
          }

          @media (prefers-reduced-motion: reduce) {
            .logo-marquee-track { animation: none; }
          }
        `}
      </style>

      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">{title}</p>
      </div>

      <div
        className="logo-marquee-viewport border border-gray-200"
        style={{ ['--marquee-duration' as any]: `${durationSec}s` }}
      >
        <div className="logo-marquee-track">
          {items.map((company, idx) => {
            // remove the right border on the last item of each copy to avoid a visible seam line
            const isEndOfCopy = (idx + 1) % companies.length === 0;
            return (
              <div
                key={`${company.name}-${idx}`}
                className={`logo-item ${heightClass} flex items-center justify-center px-6 border-gray-100 ${
                  isEndOfCopy ? '' : 'border-r'
                }`}
              >
                {company.logoSrc ? (
                  <img
                    src={company.logoSrc}
                    alt=""
                    aria-hidden="true"
                    className="max-h-8 object-contain grayscale opacity-80"
                    onError={(e) => {
                      // Hide broken image completely; no text fallback to keep symbols/logos-only
                      const t = e.currentTarget as HTMLImageElement;
                      t.style.display = 'none';
                    }}
                  />
                ) : (
                  // No fallback text; render nothing to keep carousel logos-only
                  <span aria-hidden="true" className="sr-only">{company.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
