import React from 'react';
import { FiFileText, FiDownload } from 'react-icons/fi';

const InvestmentMemos = () => {
  const memos = [
    {
      id: 1,
      title: 'Tech Infrastructure Opportunity',
      date: 'Jan 2026',
      pages: 25,
      recommendation: 'STRONG BUY',
      amount: '$250M',
    },
    {
      id: 2,
      title: 'Healthcare Services Platform',
      date: 'Dec 2025',
      pages: 18,
      recommendation: 'BUY',
      amount: '$150M',
    },
    {
      id: 3,
      title: 'Financial Services Consolidation',
      date: 'Nov 2025',
      pages: 22,
      recommendation: 'HOLD',
      amount: '$300M',
    },
    {
      id: 4,
      title: 'Consumer Discretionary Turnaround',
      date: 'Oct 2025',
      pages: 20,
      recommendation: 'BUY',
      amount: '$180M',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Investment Memos</h1>
          <p className="text-lg text-slate-400">
            Comprehensive investment memos with thesis, valuation, and recommendations
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="space-y-4 mb-16">
          {memos.map((memo) => (
            <div key={memo.id} className="bg-white border border-slate-200 p-6 rounded-lg hover:border-emerald-300 transition flex items-center justify-between">
              <div className="flex items-center gap-6 flex-1">
                <div className="bg-emerald-500/10 p-4 rounded">
                  <FiFileText className="text-emerald-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{memo.title}</h3>
                  <div className="flex gap-4 text-slate-500 text-sm mt-2">
                    <span>{memo.date}</span>
                    <span>{memo.pages} pages</span>
                    <span className="text-emerald-600">{memo.amount}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded text-sm font-semibold ${
                  memo.recommendation === 'STRONG BUY' ? 'bg-emerald-100 text-emerald-600' :
                  memo.recommendation === 'BUY' ? 'bg-green-500/30 text-green-300' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {memo.recommendation}
                </span>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 p-2 rounded transition">
                  <FiDownload />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Investment Memo Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-emerald-600 mb-3">Executive Summary</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>• Investment thesis</li>
                <li>• Key assumptions</li>
                <li>• Expected returns</li>
                <li>• Risk factors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-600 mb-3">Financial Analysis</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>• Historical financials</li>
                <li>• Valuation models</li>
                <li>• Sensitivity analysis</li>
                <li>• Scenario planning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-600 mb-3">Recommendation</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>• Investment decision</li>
                <li>• Deal structure</li>
                <li>• Terms & conditions</li>
                <li>• Next steps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentMemos;
