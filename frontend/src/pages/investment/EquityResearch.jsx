import React, { useState, useMemo } from 'react';
import { FiGlobe, FiBarChart2, FiFileText, FiDownload, FiTrendingUp, FiFilter } from 'react-icons/fi';
import { equityResearch } from '../../data/workRegistry';
import WorkModal from '../../components/WorkModal';

const REGIONS = ['All', 'Europe', 'United States'];

const RATING_STYLE = {
  BUY:  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  HOLD: 'bg-amber-100 text-amber-700 border border-amber-200',
  SELL: 'bg-red-100 text-red-700 border border-red-200',
};

const EquityResearch = () => {
  const [regionFilter, setRegionFilter] = useState('All');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [modal, setModal] = useState(null); // { item, defaultTab }

  // Derive available sectors from data
  const sectors = useMemo(() => {
    const set = new Set(equityResearch.map((e) => e.sector));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return equityResearch.filter((e) => {
      const regionMatch = regionFilter === 'All' || e.region === regionFilter;
      const sectorMatch = sectorFilter === 'All' || e.sector === sectorFilter;
      return regionMatch && sectorMatch;
    });
  }, [regionFilter, sectorFilter]);

  // Group by region for display
  const grouped = useMemo(() => {
    return filtered.reduce((acc, item) => {
      (acc[item.region] = acc[item.region] || []).push(item);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FiTrendingUp className="text-emerald-400" size={28} />
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
              Equity Research
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Fundamental Analysis
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Institutional-grade equity research across Europe and the United States — complete with
            DCF models, comparable company analysis, and investment pitch decks.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">{equityResearch.length}</p>
              <p className="text-slate-400 text-sm mt-1">Companies Covered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">
                {new Set(equityResearch.map((e) => e.region)).size}
              </p>
              <p className="text-slate-400 text-sm mt-1">Regions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">
                {new Set(equityResearch.map((e) => e.sector)).size}
              </p>
              <p className="text-slate-400 text-sm mt-1">Sectors</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-6 mb-10 pb-6 border-b border-slate-100">
          {/* Region */}
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2 flex items-center gap-1">
              <FiGlobe size={12} /> Region
            </p>
            <div className="flex gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    regionFilter === r
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          {/* Sector */}
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2 flex items-center gap-1">
              <FiFilter size={12} /> Sector
            </p>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSectorFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    sectorFilter === s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Research Cards grouped by region ── */}
        {Object.entries(grouped).map(([region, items]) => (
          <div key={region} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-slate-900">{region}</h2>
              <span className="text-sm text-slate-500">{items.length} compan{items.length === 1 ? 'y' : 'ies'}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {items.map((item) => (
                <ResearchCard
                  key={item.id}
                  item={item}
                  onViewModel={() => setModal({ item, defaultTab: 'model' })}
                  onViewDeck={() => setModal({ item, defaultTab: 'deck' })}
                />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No research matches the selected filters.
          </div>
        )}

        {/* ── Methodology ── */}
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Research Methodology</h2>
            <p className="text-slate-500 text-sm mt-1">
              Each analysis is built from scratch — not templated. The goal is to find a genuine
              analytical edge, not replicate what consensus already prices in.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Beyond the Standard DCF',
                body: 'Where applicable, I replace single-entity DCFs with SOTP models, cohort-based unit economics, or segment-level forecasts — each with its own growth rate, margin profile, and WACC. This surfaces hidden value that a blended multiple obscures.',
              },
              {
                title: 'Identifying the Real Driver',
                body: 'Every model is anchored on the one variable that matters most — whether that is total-loss rates (Copart), brand scarcity premium (Hermès), or AI-feature monetisation (Duolingo). The sensitivity analysis is built around that variable, not generic WACC vs. TGR tables.',
              },
              {
                title: 'Structured Investment Thesis',
                body: 'Each name pairs the model with a pitch deck that articulates the thesis, quantified catalysts, and the specific scenario in which the thesis breaks — so a recruiter or PM can evaluate the quality of thinking, not just the output.',
              },
            ].map((m) => (
              <div key={m.title}>
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-2">
                  {m.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{m.body}</p>
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

/* ── Research Card ── */
const ResearchCard = ({ item, onViewModel, onViewDeck }) => {
  const [expanded, setExpanded] = useState(false);
  const hasModel = !!item.files?.model;
  const hasDeck = !!item.files?.pitchDeck;

  return (
    <div className="bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.company}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-emerald-600 text-sm font-semibold">{item.ticker}</span>
              {item.exchange && (
                <span className="text-xs text-slate-400">{item.exchange}</span>
              )}
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {item.sector}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${RATING_STYLE[item.rating] || RATING_STYLE.HOLD}`}>
            {item.rating}
          </span>
        </div>

        {/* Price target row */}
        <div className="flex items-center gap-6 py-3 border-y border-slate-100 my-3">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Target Price</p>
            <p className="text-xl font-bold text-slate-900">{item.targetPrice}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Upside</p>
            <p className="text-xl font-bold text-emerald-600">{item.upside}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-slate-400 mb-0.5">Date</p>
            <p className="text-sm font-medium text-slate-600">{item.date}</p>
          </div>
        </div>

        {/* Key metrics */}
        {item.keyMetrics && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Object.entries(item.keyMetrics).map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-400 truncate">{k}</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        )}

        {/* Thesis preview / expand */}
        <p className={`text-sm text-slate-600 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
          {item.thesis}
        </p>
        {item.thesis.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-emerald-600 hover:underline mt-1"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Highlights (only when expanded) */}
        {expanded && item.highlights && (
          <ul className="mt-4 space-y-2">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">▸</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* What's Different — always visible, anchors the card */}
        {item.whatsDifferent && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span>⚡</span> What's Different
            </p>
            <p className="text-sm text-emerald-900 leading-relaxed">{item.whatsDifferent}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-5 flex gap-3">
        {hasModel && (
          <button
            onClick={onViewModel}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition"
          >
            <FiBarChart2 size={15} /> View Model
          </button>
        )}
        {hasDeck && (
          <button
            onClick={onViewDeck}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-lg transition"
          >
            <FiFileText size={15} /> Pitch Deck
          </button>
        )}
        {hasModel && (
          <a
            href={item.files.model}
            download
            className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
            title="Download model"
          >
            <FiDownload size={15} />
          </a>
        )}
      </div>
    </div>
  );
};

export default EquityResearch;
