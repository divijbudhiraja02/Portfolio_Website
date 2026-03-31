import React, { useState } from 'react';
import { FiBarChart2, FiDownload, FiFileText, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { equityResearch, mna } from '../../data/workRegistry';
import WorkModal from '../../components/WorkModal';

/**
 * Valuation Models page — shows every valuation model built (equity + M&A),
 * with model-type tags and direct "Open Model" button.
 */
const ValuationModels = () => {
  const [modal, setModal] = useState(null);

  // All items with models
  const equityWithModels = equityResearch.filter((e) => e.files?.model);
  const mnaWithModels = mna.filter((m) => m.files?.model);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FiBarChart2 className="text-emerald-400" size={28} />
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
              Financial Modelling
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Valuation Models</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            All valuation models built from scratch — viewable inline. Each covers DCF analysis,
            comparable multiples, and key assumptions. Download the Excel to dig into the detail.
          </p>
          <div className="flex gap-6 mt-8">
            <div>
              <p className="text-3xl font-bold text-emerald-400">{equityWithModels.length + mnaWithModels.length}</p>
              <p className="text-slate-400 text-sm mt-1">Models Built</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-400">
                {new Set([...equityWithModels, ...mnaWithModels].flatMap((e) => e.modelTypes || [])).size}
              </p>
              <p className="text-slate-400 text-sm mt-1">Model Types</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Equity Research Models ── */}
        <Section title="Equity Valuation" count={equityWithModels.length}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equityWithModels.map((item) => (
              <ModelCard
                key={item.id}
                item={item}
                type="equity"
                onOpen={() => setModal({ item, defaultTab: 'model' })}
              />
            ))}
          </div>
        </Section>

        {/* ── M&A Models ── */}
        {mnaWithModels.length > 0 && (
          <Section title="M&A Deal Models" count={mnaWithModels.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mnaWithModels.map((item) => (
                <ModelCard
                  key={item.id}
                  item={item}
                  type="mna"
                  onOpen={() => setModal({ item, defaultTab: 'model' })}
                />
              ))}
            </div>
          </Section>
        )}

        {/* ── What's in the models ── */}
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Model Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Income Statement', items: ['Revenue build-up by segment', '5–10 year explicit forecast', 'Margin analysis & drivers'] },
              { title: 'DCF Analysis', items: ['FCFF/FCFE projections', 'WACC from first principles', 'Sensitivity tables (WACC × Growth)'] },
              { title: 'Comparable Comps', items: ['EV/EBITDA, P/E, EV/Revenue', 'Peer set benchmarking', 'Implied valuation ranges'] },
              { title: 'Scenario Analysis', items: ['Base / Bull / Bear cases', 'Key assumption stress tests', 'Probability-weighted targets'] },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-3">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <WorkModal
          item={modal.item}
          defaultTab={modal.defaultTab}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

const Section = ({ title, count, children }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <span className="text-sm text-slate-400">{count} model{count !== 1 ? 's' : ''}</span>
    </div>
    {children}
  </div>
);

const ModelCard = ({ item, type, onOpen }) => {
  const [showThesis, setShowThesis] = useState(false);
  const isEquity = type === 'equity';

  return (
    <div className="bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all duration-200">
      <div className="p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEquity ? item.company : item.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {item.ticker && <span className="text-emerald-600 text-sm font-semibold">{item.ticker}</span>}
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {item.sector}
              </span>
              {item.region && (
                <span className="text-xs text-slate-400">{item.region}</span>
              )}
            </div>
          </div>
          {isEquity && item.rating && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              item.rating === 'BUY' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
              item.rating === 'SELL' ? 'bg-red-100 text-red-700 border border-red-200' :
              'bg-amber-100 text-amber-700 border border-amber-200'
            }`}>
              {item.rating}
            </span>
          )}
          {!isEquity && item.dealValue && (
            <span className="text-xl font-bold text-emerald-600">{item.dealValue}</span>
          )}
        </div>

        {/* Model type tags */}
        {item.modelTypes && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.modelTypes.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-slate-900 text-slate-200 text-xs rounded-md font-mono">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Equity metrics */}
        {isEquity && item.keyMetrics && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Object.entries(item.keyMetrics).slice(0, 4).map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-400 truncate">{k}</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        )}

        {/* M&A metrics */}
        {!isEquity && item.dealMetrics && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.entries(item.dealMetrics).map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-lg p-2">
                <p className="text-xs text-slate-400">{k}</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        )}

        {/* Expandable thesis */}
        <button
          onClick={() => setShowThesis(!showThesis)}
          className="w-full flex items-center justify-between text-sm text-slate-500 hover:text-slate-700 transition py-1"
        >
          <span>Investment thesis</span>
          {showThesis ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>
        {showThesis && (
          <p className="text-sm text-slate-600 leading-relaxed mt-2 pt-2 border-t border-slate-100">
            {item.thesis}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-5 flex gap-3">
        <button
          onClick={onOpen}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition"
        >
          <FiBarChart2 size={15} /> Open Model
        </button>
        <a
          href={item.files.model}
          download
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition"
        >
          <FiDownload size={15} /> Download
        </a>
        {item.files?.pitchDeck && (
          <a
            href={item.files.pitchDeck}
            download
            title="Download pitch deck"
            className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
          >
            <FiFileText size={15} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ValuationModels;
