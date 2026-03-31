import React, { useState } from 'react';
import {
  FiDownload, FiEye, FiTrendingUp, FiShield, FiGlobe, FiX,
} from 'react-icons/fi';
import ExcelViewer from '../../components/ExcelViewer';

const PORTFOLIOS = [
  {
    id: 'global-quality-compounder',
    name: 'Global Quality Compounder Portfolio',
    tagline: 'Long-only, high-conviction equity portfolio',
    strategy:
      'A concentrated, fundamentals-driven long-only equity portfolio targeting businesses with durable competitive advantages, high returns on invested capital (ROIC > 20%), and predictable free cash flow generation. Holdings are sourced from global developed markets with an emphasis on pricing power, recurring revenue streams, and management capital allocation track records.',
    keyFeatures: [
      'Stock screening on ROIC, FCF yield, gross margin stability, and revenue CAGR',
      'Bottom-up DCF and reverse DCF valuation for each position',
      'Qualitative moat assessment: brand, switching costs, network effects, cost advantages',
      'Position sizing based on conviction tiers and margin-of-safety discount',
    ],
    metrics: [
      { label: 'Strategy', value: 'Quality Growth' },
      { label: 'Universe', value: 'Global Developed Markets' },
      { label: 'Approach', value: 'Long-Only, Concentrated' },
      { label: 'Time Horizon', value: '3–5 Year Hold' },
    ],
    performance: [
      { label: 'Sharpe Ratio', value: '0.65', positive: true },
      { label: 'Sortino Ratio', value: '1.01', positive: true },
      { label: 'Ann. Volatility', value: '18.4%', neutral: true },
      { label: 'Beta', value: '0.95', neutral: true },
      { label: 'CAPM Alpha', value: '+3.9%', positive: true },
      { label: 'Info. Ratio', value: '0.59', positive: true },
    ],
    perfNote: '60-month backtest · Jan 2020–Dec 2024',
    icon: <FiTrendingUp size={22} />,
    accentColor: 'from-emerald-600 to-teal-700',
    file: '/work/portfolio/global-quality-compounder/portfolio.xlsx',
  },
  {
    id: 'global-macro-thematic',
    name: 'Global Macro Thematic Portfolio',
    tagline: 'Multi-asset, top-down thematic allocation',
    strategy:
      'A top-down, macro-driven multi-asset portfolio constructed around structural investment themes — including AI infrastructure build-out, energy transition, deglobalisation, and emerging market middle-class consumption. Each thematic sleeve is sized based on macro conviction, thematic maturity, and risk-adjusted return expectations, with exposure implemented via individual equities and sector ETFs.',
    keyFeatures: [
      'Thematic identification using macro trend analysis and structural data (demographics, capex cycles, policy)',
      'Cross-asset correlation analysis to minimise thematic overlap and concentration risk',
      'Regime-adjusted positioning using yield curve, credit spreads, and VIX as regime signals',
      'Scenario analysis: base case, bull case, and tail-risk stress tests for each theme',
    ],
    metrics: [
      { label: 'Strategy', value: 'Macro Thematic' },
      { label: 'Universe', value: 'Global Multi-Asset' },
      { label: 'Approach', value: 'Top-Down Allocation' },
      { label: 'Time Horizon', value: '1–3 Year Themes' },
    ],
    performance: [
      { label: 'Ann. Return', value: '+25.9%', positive: true },
      { label: 'vs Benchmark', value: '+13.7%', positive: true },
      { label: 'Sharpe Ratio', value: '1.72', positive: true },
      { label: 'Max Drawdown', value: '-19.1%', negative: true },
      { label: 'Ann. Volatility', value: '13.1%', neutral: true },
      { label: 'Beta vs ACWI', value: '0.81', neutral: true },
    ],
    perfNote: '48-month backtest · Jan 2022–Dec 2025',
    icon: <FiGlobe size={22} />,
    accentColor: 'from-amber-500 to-amber-700',
    file: '/work/portfolio/global-macro/portfolio.xlsx',
  },
  {
    id: 'corporate-credit',
    name: 'Corporate Credit & High Yield Analysis',
    tagline: 'Fixed income credit selection and risk assessment',
    strategy:
      'A fundamental credit analysis framework applied to investment-grade and high-yield corporate bonds across cyclical and defensive sectors. The portfolio combines issuer-level credit research (leverage, interest coverage, liquidity, covenants) with relative value analysis across the capital structure and credit curve positioning based on macroeconomic stage and spread cycle dynamics.',
    keyFeatures: [
      'Issuer credit scoring: leverage ratios, EBITDA coverage, free cash flow conversion, and debt maturity profile',
      'Spread decomposition: benchmark, sector premium, issuer-specific, and liquidity components',
      'Capital structure analysis: seniority ranking, covenant protection, and recovery analysis',
      'Credit curve and duration positioning based on credit cycle and macro regime',
    ],
    metrics: [
      { label: 'Strategy', value: 'Credit Selection' },
      { label: 'Universe', value: 'IG & High Yield' },
      { label: 'Approach', value: 'Fundamental Credit' },
      { label: 'Time Horizon', value: '6–18 Month Horizon' },
    ],
    performance: [
      { label: 'Total Return (Q1)', value: '+2.00%', positive: true },
      { label: 'vs Benchmark', value: '+0.30%', positive: true },
      { label: 'Info. Ratio', value: '0.59', positive: true },
      { label: 'Hit Rate', value: '75%', positive: true },
      { label: 'Max Drawdown', value: '-2.5%', negative: true },
      { label: 'Carry Return', value: '+1.30%', positive: true },
    ],
    perfNote: 'Q1 2026 period · IG & HY Corporate Bonds',
    icon: <FiShield size={22} />,
    accentColor: 'from-blue-600 to-indigo-700',
    file: '/work/portfolio/corporate-credit/portfolio.xlsx',
  },
];

/* ── Download note modal ── */
const DownloadNoteModal = ({ portfolio, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl p-8">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Viewing {portfolio.name}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-4 flex-shrink-0">
          <FiX size={20} />
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-amber-800 mb-1">Recommended: Download for Best Experience</p>
        <p className="text-sm text-amber-700">
          For accurate formatting, colour-coding, pivot tables, and interactive charts, please
          download the Excel file and open it in Microsoft Excel or Google Sheets. The browser
          viewer renders cell data but may not fully replicate conditional formatting or dynamic
          elements.
        </p>
      </div>

      <div className="flex gap-3">
        <a
          href={portfolio.file}
          download
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-navy-900 text-white rounded-lg font-medium hover:bg-navy-800 transition text-sm"
        >
          <FiDownload size={15} /> Download Excel
        </a>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

/* ── Excel viewer modal ── */
const ExcelModal = ({ portfolio, onClose }) => {
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={handleBackdrop}>
      <div className="bg-white rounded-xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{portfolio.name}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{portfolio.tagline}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 max-w-xs">
              For full formatting fidelity, please download and open in Excel.
            </div>
            <a
              href={portfolio.file}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
            >
              <FiDownload size={14} /> Download
            </a>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition">
              <FiX size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <ExcelViewer fileUrl={portfolio.file} />
        </div>
      </div>
    </div>
  );
};

/* ── Portfolio card ── */
const PortfolioCard = ({ portfolio }) => {
  const [showNote, setShowNote] = useState(false);
  const [showExcel, setShowExcel] = useState(false);

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300">
        {/* Card header */}
        <div className={`bg-gradient-to-r ${portfolio.accentColor} px-6 py-5`}>
          <div className="flex items-center gap-3 text-white mb-2">
            <span className="p-2 bg-white/20 rounded-lg">{portfolio.icon}</span>
            <span className="text-xs font-semibold tracking-widest uppercase opacity-80">
              {portfolio.metrics[0].value}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white leading-snug">{portfolio.name}</h3>
          <p className="text-sm text-white/75 mt-1">{portfolio.tagline}</p>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-600 text-sm leading-relaxed mb-5">{portfolio.strategy}</p>

          {/* Key features */}
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">
              Key Methodological Features
            </p>
            <ul className="space-y-2">
              {portfolio.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics pills */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {portfolio.metrics.map((m) => (
              <div key={m.label} className="bg-slate-50 rounded-lg px-3 py-2">
                <p className="text-xs text-slate-400 font-medium">{m.label}</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Performance metrics */}
          {portfolio.performance && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                  Performance Metrics
                </p>
                <span className="text-xs text-slate-400">{portfolio.perfNote}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {portfolio.performance.map((m) => (
                  <div key={m.label} className="bg-slate-50 rounded-lg px-2 py-2 text-center">
                    <p className="text-xs text-slate-400 mb-0.5">{m.label}</p>
                    <p className={`text-sm font-bold ${
                      m.positive ? 'text-emerald-600' :
                      m.negative ? 'text-red-500' :
                      'text-slate-700'
                    }`}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowExcel(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 text-white rounded-lg text-sm font-medium hover:bg-navy-800 transition"
            >
              <FiEye size={14} /> View Portfolio
            </button>
            <a
              href={portfolio.file}
              download
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
            >
              <FiDownload size={14} /> Download
            </a>
          </div>
        </div>
      </div>

      {showNote && <DownloadNoteModal portfolio={portfolio} onClose={() => setShowNote(false)} />}
      {showExcel && <ExcelModal portfolio={portfolio} onClose={() => setShowExcel(false)} />}
    </>
  );
};

/* ── Page ── */
const PortfolioAnalysis = () => (
  <div className="min-h-screen bg-white">
    {/* Hero */}
    <section className="bg-navy-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-gold-400 uppercase mb-3">
            Portfolio Construction
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">Portfolio Analysis</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Three distinct investment portfolios — each built on rigorous fundamental analysis,
            quantitative screening, and disciplined risk management. Spanning global equities,
            macro themes, and corporate credit.
          </p>
        </div>

        <div className="flex gap-8 mt-10 pt-8 border-t border-navy-700">
          {[
            { value: '3', label: 'Portfolios' },
            { value: 'Global', label: 'Market Coverage' },
            { value: 'Multi-Asset', label: 'Asset Classes' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Cards */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PORTFOLIOS.map((p) => (
          <PortfolioCard key={p.id} portfolio={p} />
        ))}
      </div>
    </section>
  </div>
);

export default PortfolioAnalysis;
