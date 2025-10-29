import React, { useState, useEffect } from 'react';

type InterviewFocus = 'TMT' | 'Healthcare' | 'Financial Services';

type MarketData = {
  index: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
};

type InterviewInsight = {
  id: string;
  focus: InterviewFocus;
  title: string;
  description: string;
  keyPoints: string[];
  marketData: MarketData[];
  timestamp: string;
};

interface MarketPulseProps {
  className?: string;
}

export function MarketPulse({ className = '' }: MarketPulseProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Interview-focused market insights
  const interviewInsights: InterviewInsight[] = [
    {
      id: '1',
      focus: 'TMT',
      title: 'Goldman Sachs TMT IB Superday',
      description: 'Tech sector showing strong momentum with AI driving valuations',
      keyPoints: [
        'AI/ML companies trading at 15-20x revenue multiples',
        'Cloud infrastructure spending up 23% YoY',
        'M&A activity: $156B in tech deals YTD'
      ],
      marketData: [
        { index: 'NASDAQ', price: '16,742.38', change: '+127.43', changePercent: '+0.77%', isPositive: true },
        { index: 'TSLA', price: '$248.50', change: '+$12.30', changePercent: '+5.21%', isPositive: true },
        { index: 'NVDA', price: '$875.28', change: '+$45.67', changePercent: '+5.51%', isPositive: true },
        { index: 'MSFT', price: '$378.85', change: '+$8.92', changePercent: '+2.41%', isPositive: true }
      ],
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      focus: 'Healthcare',
      title: 'Morgan Stanley Healthcare Phone',
      description: 'Biotech valuations recovering as FDA approvals accelerate',
      keyPoints: [
        'FDA approved 59 new drugs in 2023 (record high)',
        'Biotech IPO market showing signs of recovery',
        'Gene therapy deals averaging $2.1B in 2024'
      ],
      marketData: [
        { index: 'XBI', price: '$95.67', change: '+$3.21', changePercent: '+3.47%', isPositive: true },
        { index: 'JNJ', price: '$162.34', change: '+$1.45', changePercent: '+0.90%', isPositive: true },
        { index: 'PFE', price: '$28.45', change: '-$0.32', changePercent: '-1.11%', isPositive: false },
        { index: 'MRNA', price: '$89.12', change: '+$4.67', changePercent: '+5.53%', isPositive: true }
      ],
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      focus: 'Financial Services',
      title: 'JPMorgan FinTech Final Round',
      description: 'Regional banks stabilizing while fintech valuations normalize',
      keyPoints: [
        'Regional bank NIMs stabilizing at 3.2% average',
        'Fintech valuations down 40% from 2021 peaks',
        'Digital payments growing 15% annually'
      ],
      marketData: [
        { index: 'XLF', price: '$41.23', change: '+$0.45', changePercent: '+1.10%', isPositive: true },
        { index: 'JPM', price: '$195.67', change: '+$2.34', changePercent: '+1.21%', isPositive: true },
        { index: 'SQ', price: '$78.45', change: '-$1.23', changePercent: '-1.54%', isPositive: false },
        { index: 'COIN', price: '$156.78', change: '+$8.90', changePercent: '+6.02%', isPositive: true }
      ],
      timestamp: '6 hours ago'
    }
  ];

  useEffect(() => {
    // Set last updated time
    setLastUpdated(new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }));

    // Auto-rotate slides every 10 seconds
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % interviewInsights.length);
    }, 10000);

    // Simulate refreshing data every 45 seconds
    const refreshInterval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setLastUpdated(new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }));
      }, 1000);
    }, 45000);

    return () => {
      clearInterval(interval);
      clearInterval(refreshInterval);
    };
  }, [interviewInsights.length]);

  const currentInsight = interviewInsights[currentSlideIndex];

  const getFocusColor = (focus: InterviewFocus) => {
    switch (focus) {
      case 'TMT':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Healthcare':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Financial Services':
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className={`relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
      

      {/* Main content area */}
      <div className="p-4">
        {/* Interview-specific header */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {currentInsight.title}
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {currentInsight.description}
          </p>
        </div>

        {/* Key talking points */}
        <div className="mb-4">
          <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Key Talking Points
          </h5>
          <div className="space-y-2">
            {currentInsight.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-500" />
                <p className="text-xs text-gray-800 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Market data */}
        <div className="mb-4">
          <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Relevant Indices & Prices
          </h5>
          <div className="grid grid-cols-2 gap-2">
            {currentInsight.marketData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate">
                    {data.index}
                  </div>
                  <div className="text-xs text-gray-600">
                    {data.price}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {data.change}
                  </div>
                  <div className={`text-xs ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {data.changePercent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide navigation dots */}
        <div className="flex justify-center space-x-1.5">
          {interviewInsights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                index === currentSlideIndex 
                  ? 'bg-blue-400 border border-blue-300' 
                  : 'bg-gray-200 hover:bg-gray-300 border border-gray-100'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        
      </div>
    </div>
  );
}
