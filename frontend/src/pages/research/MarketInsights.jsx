import React from 'react';
import { FiTrendingUp, FiCalendar } from 'react-icons/fi';

const MarketInsights = () => {
  const insights = [
    {
      id: 1,
      title: 'Q1 2026 Market Outlook',
      category: 'Macro',
      date: 'Jan 2026',
      summary: 'Federal Reserve policy implications and interest rate trajectory analysis',
    },
    {
      id: 2,
      title: 'Tech Sector Rotation Analysis',
      category: 'Sector',
      date: 'Jan 2026',
      summary: 'Rotation from mega-cap to mid-cap technology opportunities',
    },
    {
      id: 3,
      title: 'Energy Transition Trends',
      category: 'Thematic',
      date: 'Dec 2025',
      summary: 'Long-term structural growth drivers in renewable energy',
    },
    {
      id: 4,
      title: 'China Economic Recovery',
      category: 'Geo',
      date: 'Dec 2025',
      summary: 'Post-stimulus phase analysis and investment implications',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Market Insights</h1>
          <p className="text-lg text-slate-400">
            Macro and micro analysis of current market dynamics and trends
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-white border border-slate-200 p-8 rounded-lg hover:border-emerald-300 transition group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition flex-1">{insight.title}</h3>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-600 text-xs font-semibold rounded">
                  {insight.category}
                </span>
              </div>
              <p className="text-slate-600 mb-6">{insight.summary}</p>
              <div className="flex items-center text-slate-500 text-sm">
                <FiCalendar size={16} className="mr-2" />
                {insight.date}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-emerald-600" /> Key Market Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-100/50 p-4 rounded">
              <div className="text-slate-500 text-sm mb-2">S&P 500 YTD</div>
              <div className="text-2xl font-bold text-emerald-600">+5.2%</div>
            </div>
            <div className="bg-slate-100/50 p-4 rounded">
              <div className="text-slate-500 text-sm mb-2">VIX Level</div>
              <div className="text-2xl font-bold text-red-400">18.5</div>
            </div>
            <div className="bg-slate-100/50 p-4 rounded">
              <div className="text-slate-500 text-sm mb-2">10Y Yield</div>
              <div className="text-2xl font-bold text-blue-400">4.25%</div>
            </div>
            <div className="bg-slate-100/50 p-4 rounded">
              <div className="text-slate-500 text-sm mb-2">USD Index</div>
              <div className="text-2xl font-bold text-amber-400">103.2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
