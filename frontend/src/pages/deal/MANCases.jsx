import React, { useState } from 'react';
import { FiBriefcase, FiBarChart2, FiDownload, FiArrowRight, FiChevronDown, FiChevronUp, FiFileText } from 'react-icons/fi';
import { mna } from '../../data/workRegistry';
import WorkModal from '../../components/WorkModal';

const MANCases = () => {
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FiBriefcase className="text-emerald-400" size={28} />
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
              M&amp;A Deal Advisory
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">M&amp;A Case Studies</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            End-to-end mergers &amp; acquisitions analysis — deal rationale, synergy quantification,
            pro-forma modelling, and valuation frameworks.
          </p>
          <div className="flex gap-6 mt-8">
            <div>
              <p className="text-3xl font-bold text-emerald-400">{mna.length}</p>
              <p className="text-slate-400 text-sm mt-1">Deal{mna.length !== 1 ? 's' : ''} Analysed</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {mna.length === 0 ? (
          <ComingSoon />
        ) : (
          <div className="space-y-8">
            {mna.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onOpenModel={() => setModal({ item: deal, defaultTab: 'model' })}
                onOpenDeck={() => setModal({ item: deal, defaultTab: 'deck' })}
              />
            ))}
          </div>
        )}

        {/* ── Framework ── */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">M&amp;A Analysis Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Deal Rationale',
                items: [
                  'Strategic fit & competitive positioning',
                  'Synergy identification (revenue + cost)',
                  'Market share & geographic expansion',
                  'Build-vs-buy analysis',
                ],
              },
              {
                title: 'Valuation',
                items: [
                  'Standalone DCF of target',
                  'Acquisition premium analysis',
                  'LBO return analysis (for PE bids)',
                  'Precedent transactions benchmarking',
                ],
              },
              {
                title: 'Deal Structuring',
                items: [
                  'Sources & uses of funds',
                  'Pro-forma accretion / dilution',
                  'Post-deal leverage analysis',
                  'Synergy NPV & earn-out structuring',
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-3">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-400 flex-shrink-0 mt-0.5">▸</span>
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

/* ── Deal Card ── */
const DealCard = ({ deal, onOpenModel, onOpenDeck }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl hover:border-emerald-300 transition-all duration-200 overflow-hidden">

      {/* ── Header ── */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                deal.status === 'Closed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {deal.status}
              </span>
              <span className="text-xs text-slate-400">{deal.date}</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400">{deal.sector}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{deal.title}</h3>
          </div>

          {/* Deal value */}
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-600">{deal.dealValue}</p>
            <p className="text-xs text-slate-400 mt-0.5">{deal.dealType}</p>
          </div>
        </div>

        {/* Acquirer → Target */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="px-3 py-1.5 bg-slate-800 text-white text-sm font-semibold rounded-lg">
            {deal.acquirer}
          </div>
          <FiArrowRight className="text-slate-400 flex-shrink-0" size={18} />
          <div className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
            {deal.target}
          </div>
        </div>
      </div>

      {/* ── Key Metrics Grid ── */}
      {deal.dealMetrics && (
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(deal.dealMetrics).map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-0.5">{k}</p>
                <p className="text-base font-bold text-slate-800">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Highlights (always visible) ── */}
      {deal.highlights?.length > 0 && (
        <div className="px-6 py-4 border-b border-slate-100">
          <ul className="space-y-1.5">
            {deal.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Expandable: Thesis + Structure + EPS table ── */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 py-3 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition flex items-center justify-between"
        >
          <span>{expanded ? 'Hide' : 'Show'} full deal analysis</span>
          {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </button>

        {expanded && (
          <div className="px-6 pb-6 space-y-6 border-t border-slate-100 pt-5">

            {/* Thesis */}
            {deal.thesis && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Deal Thesis</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{deal.thesis}</p>
              </div>
            )}

            {/* Structure */}
            {deal.structure && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Deal Structure</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{deal.structure}</p>
              </div>
            )}

            {/* What's Different */}
            {deal.whatsDifferent && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span>⚡</span> What's Different
                </p>
                <p className="text-sm text-emerald-900 leading-relaxed">{deal.whatsDifferent}</p>
              </div>
            )}

            {/* EPS Accretion / Dilution table */}
            {deal.epsAccretion?.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  EPS Accretion / (Dilution)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Year</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Standalone EPS</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Pro Forma EPS</th>
                        <th className="text-right py-2 pl-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Dilution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deal.epsAccretion.map((row) => (
                        <tr key={row.year} className="border-b border-slate-100">
                          <td className="py-2.5 pr-4 font-medium text-slate-800">{row.year}</td>
                          <td className="py-2.5 px-4 text-right text-slate-600">{row.standalone}</td>
                          <td className="py-2.5 px-4 text-right text-slate-600">{row.proForma}</td>
                          <td className="py-2.5 pl-4 text-right font-semibold text-red-500">{row.dilution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-slate-400 mt-2">Full accretion expected Year 4+ at run-rate synergies</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Action Buttons ── */}
      <div className="px-6 py-4 border-t border-slate-100 flex gap-3 flex-wrap">
        {deal.files?.model && (
          <>
            <button
              onClick={onOpenModel}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition"
            >
              <FiBarChart2 size={14} /> View M&amp;A Model
            </button>
            <a
              href={deal.files.model}
              download
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition"
            >
              <FiDownload size={14} /> Download Model
            </a>
          </>
        )}
        {deal.files?.pitchDeck && (
          <>
            <button
              onClick={onOpenDeck}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition"
            >
              <FiFileText size={14} /> View Analysis
            </button>
            <a
              href={deal.files.pitchDeck}
              download
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition"
            >
              <FiDownload size={14} /> Download
            </a>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Coming Soon placeholder ── */
const ComingSoon = () => (
  <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-xl">
    <FiBriefcase className="mx-auto text-slate-300 mb-4" size={40} />
    <h3 className="text-xl font-semibold text-slate-500 mb-2">M&amp;A Cases Coming Soon</h3>
    <p className="text-slate-400 text-sm max-w-sm mx-auto">
      Add deal entries to <code className="bg-slate-100 px-1 rounded">src/data/workRegistry.js</code>{' '}
      and copy model files to <code className="bg-slate-100 px-1 rounded">public/work/mna/</code>
    </p>
  </div>
);

export default MANCases;
