import React from 'react';
import { FiCode, FiTrendingUp, FiBarChart2, FiCalendar, FiCpu, FiShield } from 'react-icons/fi';

const Tools = () => {
  const tools = [
    {
      id: 1,
      title: 'Portfolio Optimizer',
      description: 'AI-powered portfolio optimization using Modern Portfolio Theory and machine learning algorithms',
      category: 'Analytics',
      status: 'Live',
      icon: FiTrendingUp,
    },
    {
      id: 2,
      title: 'Valuation Calculator',
      description: 'Real-time DCF valuation model with historical financial data integration',
      category: 'Valuation',
      status: 'Live',
      icon: FiBarChart2,
    },
    {
      id: 3,
      title: 'Market Correlation Matrix',
      description: 'Dynamic correlation analysis across asset classes and sectors',
      category: 'Analytics',
      status: 'Beta',
      icon: FiBarChart2,
    },
    {
      id: 4,
      title: 'Trading Algorithm Backtester',
      description: 'Algorithm backtesting platform with technical indicators and strategy optimization',
      category: 'Trading',
      status: 'Development',
      icon: FiCode,
    },
    {
      id: 5,
      title: 'Earnings Calendar & Sentiment',
      description: 'Real-time earnings calendar with news sentiment analysis and impact prediction',
      category: 'Research',
      status: 'Beta',
      icon: FiCalendar,
    },
    {
      id: 6,
      title: 'Relative Value Screener',
      description: 'Multi-factor screening tool for identifying undervalued securities',
      category: 'Screening',
      status: 'Live',
      icon: FiCode,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Investment Tools</h1>
          <p className="text-slate-400 max-w-2xl">
            Custom-built analytical tools combining financial expertise with software engineering.
            Interactive systems for portfolio management, valuation, and algorithmic analysis.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.id} className="bg-white border border-slate-200 p-6 rounded-lg card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
                    <Icon className="text-emerald-400" />
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                    tool.status === 'Live' ? 'bg-green-100 text-green-700' :
                    tool.status === 'Beta' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {tool.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-emerald-600 transition">{tool.title}</h3>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs rounded">
                    {tool.category}
                  </span>
                  <button className="text-emerald-600 hover:text-emerald-700 transition font-semibold text-sm">
                    Launch &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div className="bg-navy-900 p-10 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <FiCpu className="text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-emerald-400 mb-1">Smart Anomaly Detector</h3>
                <p className="text-slate-400 text-sm">ML-powered detection of market anomalies and arbitrage opportunities</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiShield className="text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-emerald-400 mb-1">Risk Analytics Dashboard</h3>
                <p className="text-slate-400 text-sm">Real-time portfolio risk metrics and stress testing simulations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiBarChart2 className="text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-emerald-400 mb-1">Quant Strategy Labs</h3>
                <p className="text-slate-400 text-sm">Build and deploy custom quantitative trading strategies</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiCode className="text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-emerald-400 mb-1">API Integration Hub</h3>
                <p className="text-slate-400 text-sm">Connect to brokers, data providers, and trading platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
