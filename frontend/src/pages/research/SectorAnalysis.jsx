import React, { useState } from 'react';
import { FiDownload, FiChevronDown, FiChevronUp, FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

/* ── Q1 2026 sector data (source: US Equity Sector Outlook Q1 2026) ── */
const QUARTERLY_REPORTS = [
  {
    quarter: 'Q1 2026',
    date: 'March 24, 2026',
    file: '/work/sector-outlook/q1-2026/US_Sector_Outlook_Q1_2026.pdf',
    marketContext: {
      sp500Pe: '20.3x',
      epsGrowth: '+12.5%',
      consecutiveQuarters: '6th',
      description: 'S&P 500 fwd P/E above 5-yr avg (20.0x) and 10-yr avg (18.9x). Sixth consecutive quarter of double-digit EPS growth. Key themes: AI infrastructure broadening, market rotation to value, K-shaped consumer bifurcation.',
    },
    sectors: [
      {
        name: 'Information Technology',
        rating: 'POSITIVE',
        fwdPE: '27.0x',
        epsGrowth: '+44.8%',
        revGrowth: '+27.3%',
        spWeight: '35%',
        ytd: '-3.6%',
        ytdPositive: false,
        drivers: [
          'AI infrastructure spending reaching $500B+ in hyperscaler capex',
          'Semiconductors leading with 95% YoY earnings growth in Q1',
          'Broadening AI adoption to enterprise applications beyond mega-caps',
        ],
        risks: [
          'Valuation reset amid rotation to value; P/E-to-growth at 1.0x',
          'Concentration risk — top 10 holdings represent 40% of S&P 500',
        ],
        outlook: 'Technology remains the S&P 500\'s earnings growth engine. Constructive view with emphasis on AI infrastructure enablers and enterprise software names with visible monetisation paths.',
      },
      {
        name: 'Healthcare',
        rating: 'POSITIVE',
        fwdPE: '17.5x',
        epsGrowth: '+12.9%',
        revGrowth: '+6.8%',
        spWeight: '11%',
        ytd: '+2.1%',
        ytdPositive: true,
        drivers: [
          'Compelling valuations relative to historical averages',
          'AI-driven operational efficiencies reducing costs 15–20%',
          'M&A activity accelerating under favourable regulatory environment',
        ],
        risks: [
          'OBBBA legislation creating Medicaid funding uncertainty',
          'Drug pricing pressures from 340B programme expansion',
        ],
        outlook: 'Attractive entry point for defensive exposure with growth characteristics. Policy headwinds largely cleared; favour pharma with strong pipelines and healthcare services leveraging AI for margin expansion.',
      },
      {
        name: 'Financials',
        rating: 'NEUTRAL',
        fwdPE: '14.2x',
        epsGrowth: '+14.4%',
        revGrowth: '+4.8%',
        spWeight: '13%',
        ytd: '-6.0%',
        ytdPositive: false,
        drivers: [
          'Yield curve steepening supporting net interest margins',
          'Regulatory relief anticipated under current administration',
          'Strong capital positions enabling shareholder returns',
        ],
        risks: [
          'Credit quality deterioration — CRE exposure in regional banks',
          'XLF down 13.3% from January highs; death cross approaching',
        ],
        outlook: 'Mixed picture — 14.4% EPS growth priced against macro and credit risk. Favour money centre banks with diversified revenue over regional banks with concentrated CRE exposure.',
      },
      {
        name: 'Energy',
        rating: 'NEGATIVE',
        fwdPE: '11.2x',
        epsGrowth: '-5.4%',
        revGrowth: '-0.6%',
        spWeight: '4%',
        ytd: '+25.0%',
        ytdPositive: true,
        drivers: [
          'Strait of Hormuz tensions pushing Brent above $94/bbl',
          'Natural gas emerging as AI data centre power solution',
          'LNG export expansion creating structural demand',
        ],
        risks: [
          'Earnings declining 5.4% YoY despite elevated spot prices',
          'Breakeven costs of $55–60/bbl limiting production growth',
        ],
        outlook: 'Binary geopolitical risk makes fundamental analysis challenging. Better risk-adjusted opportunities in natural gas and oilfield services positioned for AI-driven power demand. Cautious on upstream oil.',
      },
      {
        name: 'Consumer Discretionary',
        rating: 'NEUTRAL',
        fwdPE: '24.8x',
        epsGrowth: '+8.2%',
        revGrowth: '+5.4%',
        spWeight: '10%',
        ytd: '-5.3%',
        ytdPositive: false,
        drivers: [
          'Lower interest rates potentially reviving housing and durables',
          'Off-price and discount retailers gaining market share',
          'Agentic AI commerce reducing impulsive spending volatility',
        ],
        risks: [
          'K-shaped bifurcation — lower-income cohorts losing spending power',
          'Tariff-reflective pricing pressuring margins 200–300bps',
        ],
        outlook: 'Structural headwinds from K-shaped recovery. Sector trades at 24.8x — highest among cyclicals. Favour TJX, COST, WMT over discretionary-heavy names; cautious on home improvement.',
      },
      {
        name: 'Industrials',
        rating: 'POSITIVE',
        fwdPE: '22.5x',
        epsGrowth: '+15.2%',
        revGrowth: '+7.1%',
        spWeight: '9%',
        ytd: '+4.2%',
        ytdPositive: true,
        drivers: [
          'AI data centre buildout driving power equipment demand',
          'Defence spending trajectory higher; OBBBA $130B+ manufacturing incentives',
          'Reshoring and supply chain diversification supporting domestic capacity',
        ],
        risks: [
          'Trade uncertainty cited by 70.6% of manufacturers as top challenge',
          'Global industrial output growth slowing to 1.9% from 2.7%',
        ],
        outlook: 'Continued momentum from 2025\'s +18.5% returns. Manufacturer optimism at 75.3% — above historical average for first time since 2023. Favour power equipment, defence contractors, automation/robotics.',
      },
    ],
  },
];

/* ── helpers ── */
const ratingConfig = {
  POSITIVE: {
    pill: 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30',
    icon: <FiTrendingUp size={13} />,
  },
  NEUTRAL: {
    pill: 'bg-slate-200 text-slate-600 border border-slate-300',
    icon: <FiMinus size={13} />,
  },
  NEGATIVE: {
    pill: 'bg-red-500/15 text-red-500 border border-red-400/30',
    icon: <FiTrendingDown size={13} />,
  },
};

/* ── Sector cue card ── */
const SectorCard = ({ sector }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = ratingConfig[sector.rating];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 leading-tight pr-2">{sector.name}</h3>
          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${cfg.pill}`}>
            {cfg.icon} {sector.rating}
          </span>
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Fwd P/E', value: sector.fwdPE },
            { label: 'EPS Gr.', value: sector.epsGrowth, color: sector.epsGrowth.startsWith('+') ? 'text-emerald-600' : 'text-red-500' },
            { label: 'Rev Gr.', value: sector.revGrowth, color: sector.revGrowth.startsWith('+') ? 'text-emerald-600' : 'text-red-500' },
            { label: 'YTD', value: sector.ytd, color: sector.ytdPositive ? 'text-emerald-600' : 'text-red-500' },
          ].map((m) => (
            <div key={m.label} className="bg-slate-50 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-400 mb-0.5">{m.label}</p>
              <p className={`text-xs font-bold ${m.color || 'text-slate-700'}`}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* S&P weight pill */}
        <p className="text-xs text-slate-400 mb-3">
          S&P 500 Weight: <span className="font-semibold text-slate-600">{sector.spWeight}</span>
        </p>

        {/* Key drivers */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Drivers</p>
          <ul className="space-y-1">
            {sector.drivers.map((d, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Key risks */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Risks</p>
          <ul className="space-y-1">
            {sector.risks.map((r, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Outlook (expandable) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-slate-700 transition pt-2 border-t border-slate-100"
        >
          <span className="font-medium">Investment Outlook</span>
          {expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>
        {expanded && (
          <p className="text-xs text-slate-600 leading-relaxed mt-2 pt-1">{sector.outlook}</p>
        )}
      </div>
    </div>
  );
};

/* ── Quarterly report banner ── */
const QuarterlyBanner = ({ report }) => (
  <div className="bg-navy-800 border border-navy-700 rounded-xl p-6 mb-8">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold tracking-widest text-white uppercase">Quarterly Sector Outlook</span>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded">Latest</span>
        </div>
        <h3 className="text-white font-bold text-lg">US Equity Sector Outlook — {report.quarter}</h3>
        <p className="text-slate-400 text-sm mt-0.5">{report.date} · 6 Sectors Covered · S&P 500</p>
      </div>
      <a
        href={report.file}
        download
        className="flex items-center gap-2 px-5 py-2.5 bg-white text-navy-900 rounded-lg text-sm font-semibold hover:bg-slate-100 transition flex-shrink-0"
      >
        <FiDownload size={15} /> Download Full Report
      </a>
    </div>

    {/* Market context strip */}
    <div className="mt-5 pt-5 border-t border-navy-700">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Market Context</p>
      <div className="flex flex-wrap gap-4 mb-3">
        {[
          { label: 'S&P 500 Fwd P/E', value: report.marketContext.sp500Pe },
          { label: 'Q1 EPS Growth Est.', value: report.marketContext.epsGrowth },
          { label: 'Consecutive Quarters of 10%+ EPS Growth', value: report.marketContext.consecutiveQuarters },
        ].map((s) => (
          <div key={s.label} className="bg-navy-900/60 rounded-lg px-4 py-2">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="text-base font-bold text-white mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{report.marketContext.description}</p>
    </div>
  </div>
);

/* ── Page ── */
const SectorAnalysis = () => {
  const latest = QUARTERLY_REPORTS[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-gold-400 uppercase mb-3">Research</p>
            <h1 className="text-4xl font-bold text-white mb-4">Sector Deep Dives</h1>
            <p className="text-lg text-slate-400">
              Quarterly US equity sector outlook — valuation, earnings estimates, thematic drivers, and positioning.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Report banner */}
        <QuarterlyBanner report={latest} />

        {/* Sector label */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {latest.quarter} Sector Breakdown
          </h2>
          <div className="flex items-center gap-3 text-xs">
            {['POSITIVE', 'NEUTRAL', 'NEGATIVE'].map((r) => (
              <span key={r} className={`flex items-center gap-1 px-2 py-1 rounded-full font-semibold ${ratingConfig[r].pill}`}>
                {ratingConfig[r].icon} {r}
              </span>
            ))}
          </div>
        </div>

        {/* Sector cue cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {latest.sectors.map((s) => (
            <SectorCard key={s.name} sector={s} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center border-t border-slate-100 pt-6">
          For informational purposes only. Not investment advice. Data sourced from FactSet, S&P Dow Jones Indices, Schwab Center for Financial Research as of March 2026.
          Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  );
};

export default SectorAnalysis;
