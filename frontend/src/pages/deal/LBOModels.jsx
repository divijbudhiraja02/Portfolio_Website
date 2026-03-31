import React, { useState } from 'react';
import { FiBarChart2, FiDownload, FiTrendingUp, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { lbo } from '../../data/workRegistry';
import WorkModal from '../../components/WorkModal';

const LBOModels = () => {
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FiTrendingUp className="text-emerald-400" size={28} />
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
              Private Equity
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">LBO Models</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Leveraged buyout models with full debt schedules, returns waterfall, and IRR sensitivity
            analysis — built to institutional private equity standards.
          </p>
          {lbo.length > 0 && (
            <div className="flex gap-6 mt-8">
              <div>
                <p className="text-3xl font-bold text-emerald-400">{lbo.length}</p>
                <p className="text-slate-400 text-sm mt-1">LBO Model{lbo.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {lbo.length === 0 ? (
          <ComingSoon />
        ) : (
          <div className="space-y-8 mb-12">
            {lbo.map((item) => (
              <LBOCard
                key={item.id}
                item={item}
                onOpenModel={() => setModal({ item, defaultTab: 'model' })}
                onOpenDeck={() => setModal({ item, defaultTab: 'deck' })}
              />
            ))}
          </div>
        )}

        {/* ── LBO Model Architecture ── */}
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">LBO Model Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Transaction Structure',
                items: ['Sources & uses of funds', 'Entry multiple & assumptions', 'Management rollover analysis', 'Transaction fee schedule'],
              },
              {
                title: 'Debt Schedule',
                items: ['Senior / sub / mezz tranches', 'PIK & cash interest build', 'Mandatory & optional repayments', 'Covenant headroom analysis'],
              },
              {
                title: 'Operating Model',
                items: ['Revenue & EBITDA projections', 'Working capital movements', 'Capex & D&A assumptions', 'Cash flow waterfall'],
              },
              {
                title: 'Returns Analysis',
                items: ['IRR & MoIC at exit', 'Entry / exit multiple sensitivity', 'Management incentive plan (MIP)', 'Co-investor return splits'],
              },
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

/* ─────────────────────────────────────────────
   LBO Card — full-width, detail-rich layout
───────────────────────────────────────────── */
const LBOCard = ({ item, onOpenModel, onOpenDeck }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all duration-200">

      {/* ── Header ── */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                LBO Analysis
              </span>
              {item.exchange && (
                <span className="text-xs text-slate-400">{item.exchange}</span>
              )}
              {item.vintage && (
                <span className="text-xs text-slate-400">{item.vintage}</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{item.company}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{item.sector}{item.region ? ` · ${item.region}` : ''}</p>
          </div>

          {/* Returns highlight */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">{item.irr}</p>
              <p className="text-xs text-slate-400 mt-0.5">IRR (Base)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">{item.moic}</p>
              <p className="text-xs text-slate-400 mt-0.5">MoIC</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Metrics Grid ── */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {[
            { label: 'Entry EV', value: item.entryEv },
            { label: 'Entry EBITDA', value: item.entryEbitda },
            { label: 'Entry Multiple', value: item.entryMultiple },
            { label: 'Leverage', value: item.leverage },
            { label: 'Holding Period', value: item.holdingPeriod },
            { label: 'Offer Premium', value: item.offerPremium },
          ].filter((m) => m.value).map((m) => (
            <div key={m.label} className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-0.5">{m.label}</p>
              <p className="text-sm font-bold text-slate-800 leading-snug">{m.value}</p>
            </div>
          ))}
        </div>

        {/* ── Thesis ── */}
        {item.thesis && (
          <p className="text-sm text-slate-600 leading-relaxed mb-5">{item.thesis}</p>
        )}

        {/* ── Highlights ── */}
        {item.highlights?.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* ── Expandable: Scenarios + Debt ── */}
        {(item.scenarios || item.debtStructure) && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition mb-4"
            >
              {expanded ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
              {expanded ? 'Hide' : 'Show'} Scenario Analysis & Debt Structure
            </button>

            {expanded && (
              <div className="space-y-5 mb-5">
                {/* Scenarios table */}
                {item.scenarios?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      Return Scenarios
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Scenario</th>
                            <th className="text-right py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Exit Multiple</th>
                            <th className="text-right py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">EBITDA CAGR</th>
                            <th className="text-right py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">IRR</th>
                            <th className="text-right py-2 pl-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">MoIC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.scenarios.map((s) => (
                            <tr
                              key={s.label}
                              className={`border-b border-slate-100 ${s.isBase ? 'bg-emerald-50' : ''}`}
                            >
                              <td className="py-2.5 pr-4 font-medium text-slate-800">
                                {s.isBase && <span className="text-emerald-500 mr-1.5">★</span>}
                                {s.label}
                              </td>
                              <td className="py-2.5 px-4 text-right text-slate-600">{s.exitMult}</td>
                              <td className="py-2.5 px-4 text-right text-slate-600">{s.cagr}</td>
                              <td className={`py-2.5 px-4 text-right font-semibold ${s.isBase ? 'text-emerald-600' : 'text-slate-700'}`}>{s.irr}</td>
                              <td className={`py-2.5 pl-4 text-right font-semibold ${s.isBase ? 'text-emerald-600' : 'text-slate-700'}`}>{s.moic}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Debt structure */}
                {item.debtStructure && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Debt Structure
                    </h4>
                    <p className="text-sm text-slate-700">{item.debtStructure}</p>
                    {item.equityCheck && (
                      <p className="text-sm text-slate-700 mt-1">Equity Check: {item.equityCheck}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* What's Different */}
        {item.whatsDifferent && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 mb-5">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span>⚡</span> What's Different
            </p>
            <p className="text-sm text-emerald-900 leading-relaxed">{item.whatsDifferent}</p>
          </div>
        )}

        {/* ── Action Buttons ── */}
        <div className="flex gap-3 flex-wrap">
          {item.files?.model && (
            <>
              <button
                onClick={onOpenModel}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition"
              >
                <FiBarChart2 size={15} /> View Model
              </button>
              <a
                href={item.files.model}
                download
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition"
              >
                <FiDownload size={15} /> Download Model
              </a>
            </>
          )}
          {item.files?.pitchDeck && (
            <>
              <button
                onClick={onOpenDeck}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition"
              >
                <FiBarChart2 size={15} /> View Pitch Deck
              </button>
              <a
                href={item.files.pitchDeck}
                download
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition"
              >
                <FiDownload size={15} /> Download Deck
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ComingSoon = () => (
  <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-xl mb-8">
    <FiTrendingUp className="mx-auto text-slate-300 mb-4" size={40} />
    <h3 className="text-xl font-semibold text-slate-500 mb-2">LBO Models Coming Soon</h3>
    <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
      Add LBO entries to{' '}
      <code className="bg-slate-100 px-1 rounded">src/data/workRegistry.js</code>
      {' '}and copy your model files to{' '}
      <code className="bg-slate-100 px-1 rounded">public/work/lbo/</code>
    </p>
  </div>
);

export default LBOModels;
