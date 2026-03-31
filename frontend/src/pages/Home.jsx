import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBarChart2, FiTrendingUp, FiTarget, FiCpu, FiFileText, FiPieChart } from 'react-icons/fi';

const Home = () => {
  return (
    <div>
      {/* Hero Section - Dark Navy */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20 tracking-wide">
                CFA LEVEL III CANDIDATE
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20 tracking-wide">
                FMVA CERTIFIED
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20 tracking-wide">
                IE BUSINESS SCHOOL - MIF
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20 tracking-wide">
                UNIVERSITY GOLD MEDALIST
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Divij Budhiraja
            </h1>
            <p className="text-xl md:text-2xl text-emerald-400 font-semibold mb-6">
              Investment Banking & Private Equity
            </p>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
              Combining rigorous financial analysis with quantitative engineering to deliver
              institutional-grade equity research, valuation models, and deal analysis.
              Currently at Santander Asset Management conducting comprehensive equity valuations.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/equity-research"
                className="bg-emerald-500 hover:bg-emerald-600 text-navy-900 px-7 py-3 rounded font-semibold transition-all flex items-center gap-2 text-sm"
              >
                View Research <FiArrowRight />
              </Link>
              <Link
                to="/about"
                className="border border-slate-600 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 px-7 py-3 rounded font-semibold transition-all flex items-center gap-2 text-sm"
              >
                Full Profile <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credential Bar */}
      <section className="bg-navy-800 border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-400">Santander AM</div>
              <p className="text-slate-400 text-sm mt-1">Current - Equity Valuation</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">CFA L3</div>
              <p className="text-slate-400 text-sm mt-1">L1 Top 10% Worldwide</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">Gold Medal</div>
              <p className="text-slate-400 text-sm mt-1">CS Valedictorian - VIT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories - What I Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-900 mb-3">Research & Analysis</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Institutional-quality work spanning equity research, deal analysis, sector coverage, and quantitative modeling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Equity Research & Valuation */}
            <div className="bg-white border border-slate-200 p-8 rounded-lg card-hover group">
              <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mb-5">
                <FiBarChart2 className="text-emerald-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-900">Equity Research & Valuation</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                Deep-dive equity coverage notes with integrated valuation models. Public and private company analysis across US, EMEA, and APAC regions.
              </p>
              <div className="space-y-2 mb-6">
                <Link to="/equity-research" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  Coverage Universe
                </Link>
                <Link to="/valuation-models" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  DCF, Comps & Precedent Models
                </Link>
                <Link to="/portfolio-analysis" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  Portfolio Construction
                </Link>
              </div>
              <Link to="/equity-research" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1 transition">
                Explore <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Deal & M&A */}
            <div className="bg-white border border-slate-200 p-8 rounded-lg card-hover group">
              <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mb-5">
                <FiTarget className="text-emerald-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-900">Deal & M&A Advisory</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                M&A case studies with accretion/dilution analysis, leveraged buyout models, and formal investment memoranda with deal rationale.
              </p>
              <div className="space-y-2 mb-6">
                <Link to="/mna-cases" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  M&A Case Studies
                </Link>
                <Link to="/lbo-models" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  LBO Models
                </Link>
                <Link to="/investment-memos" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  Investment Memos
                </Link>
              </div>
              <Link to="/mna-cases" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1 transition">
                Explore <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Sector Research */}
            <div className="bg-white border border-slate-200 p-8 rounded-lg card-hover group">
              <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mb-5">
                <FiPieChart className="text-emerald-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-900">Sector Research</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                Comprehensive sector deep dives with industry dynamics, competitive landscape mapping, and thematic research on structural market shifts.
              </p>
              <div className="space-y-2 mb-6">
                <Link to="/sector-analysis" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  Sector Deep Dives
                </Link>
                <Link to="/market-insights" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  Market Insights
                </Link>
                <Link to="/whitepapers" className="block text-sm text-slate-400 hover:text-emerald-600 transition">
                  White Papers & Reports
                </Link>
              </div>
              <Link to="/sector-analysis" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1 transition">
                Explore <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Edge - Differentiator */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Quantitative Analysis & Engineering
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                With a Gold Medal in Computer Science and professional experience building AI-powered platforms
                in Tokyo, I bring a technical edge as well that most finance candidates lack.
                My prior experiences empower me to think beyond and equips me with insightful perspective on how to transform traditional finance and deliver better results.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <FiCpu className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Algorithmic Trading & Backtesting</h4>
                    <p className="text-slate-400 text-sm">Systematic strategy development with quantitative validation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiTrendingUp className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Portfolio Optimization</h4>
                    <p className="text-slate-400 text-sm">Mean-variance optimization, risk parity, and factor models</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiFileText className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">ML in Finance</h4>
                    <p className="text-slate-400 text-sm">Predictive models, sentiment analysis, and anomaly detection</p>
                  </div>
                </div>
              </div>
              <Link
                to="/quantitative"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-navy-900 px-6 py-2.5 rounded font-semibold text-sm transition"
              >
                View Quantitative Work <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-navy-800 border border-navy-700 rounded-lg p-8">
              <div className="font-mono text-sm">
                <div className="text-slate-500 mb-2"># Portfolio Optimization Engine</div>
                <div className="text-emerald-400">import</div>
                <span className="text-slate-300"> numpy </span>
                <span className="text-emerald-400">as</span>
                <span className="text-slate-300"> np</span>
                <br />
                <div className="text-emerald-400">from</div>
                <span className="text-slate-300"> scipy.optimize </span>
                <span className="text-emerald-400">import</span>
                <span className="text-slate-300"> minimize</span>
                <br /><br />
                <div className="text-emerald-400">def</div>
                <span className="text-slate-300"> optimize_portfolio(returns, cov_matrix):</span>
                <br />
                <span className="text-slate-500 pl-4">"""Mean-variance optimization"""</span>
                <br />
                <span className="text-slate-300 pl-4">n = len(returns)</span>
                <br />
                <span className="text-slate-300 pl-4">weights = np.ones(n) / n</span>
                <br />
                <span className="text-slate-300 pl-4">constraints = {'{'}'type': 'eq',</span>
                <br />
                <span className="text-slate-300 pl-8">'fun': lambda w: np.sum(w) - 1{'}'}</span>
                <br />
                <span className="text-slate-300 pl-4">bounds = [(0, 1) </span>
                <span className="text-emerald-400">for</span>
                <span className="text-slate-300"> _ </span>
                <span className="text-emerald-400">in</span>
                <span className="text-slate-300"> range(n)]</span>
                <br /><br />
                <span className="text-slate-300 pl-4">result = minimize(</span>
                <br />
                <span className="text-slate-300 pl-8">portfolio_volatility,</span>
                <br />
                <span className="text-slate-300 pl-8">weights, args=(cov_matrix,),</span>
                <br />
                <span className="text-slate-300 pl-8">constraints=constraints,</span>
                <br />
                <span className="text-slate-300 pl-8">bounds=bounds</span>
                <br />
                <span className="text-slate-300 pl-4">)</span>
                <br />
                <span className="text-emerald-400 pl-4">return</span>
                <span className="text-slate-300"> result.x</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-900 mb-3">Interactive Tools</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Custom-built analytical tools combining financial expertise with software engineering
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-lg card-hover">
              <div className="flex items-center justify-between mb-4">
                <FiTrendingUp className="text-emerald-600 text-2xl" />
                <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded">Live</span>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Portfolio Optimizer</h3>
              <p className="text-slate-500 text-sm">AI-powered portfolio optimization using Modern Portfolio Theory</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg card-hover">
              <div className="flex items-center justify-between mb-4">
                <FiBarChart2 className="text-emerald-600 text-2xl" />
                <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded">Live</span>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Valuation Calculator</h3>
              <p className="text-slate-500 text-sm">Real-time DCF valuation with historical financial data</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg card-hover">
              <div className="flex items-center justify-between mb-4">
                <FiCpu className="text-emerald-600 text-2xl" />
                <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded">Beta</span>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">Correlation Matrix</h3>
              <p className="text-slate-500 text-sm">Dynamic cross-asset correlation analysis</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/tools" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm inline-flex items-center gap-1">
              View All Tools <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-navy-900 mb-1">30+</div>
              <p className="text-slate-500 text-sm">Companies Covered</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-navy-900 mb-1">6</div>
              <p className="text-slate-500 text-sm">Sectors Analyzed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-navy-900 mb-1">3</div>
              <p className="text-slate-500 text-sm">Regions (US, EMEA, APAC)</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-navy-900 mb-1">5</div>
              <p className="text-slate-500 text-sm">Languages Spoken</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
