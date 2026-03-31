import React, { useState } from 'react';
import { FiX, FiDownload, FiFileText, FiBarChart2, FiExternalLink } from 'react-icons/fi';
import ExcelViewer from './ExcelViewer';

/**
 * WorkModal — full-screen overlay showing a company's financial model and/or pitch deck.
 *
 * Props:
 *  item        – entry from workRegistry (equityResearch, mna, or lbo)
 *  onClose     – function to close the modal
 *  defaultTab  – 'model' | 'deck' (default: 'model')
 */
const WorkModal = ({ item, onClose, defaultTab = 'model' }) => {
  const hasModel = !!item.files?.model;
  const hasDeck = !!item.files?.pitchDeck;
  const initialTab = defaultTab === 'deck' && hasDeck ? 'deck' : hasModel ? 'model' : 'deck';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Determine if we're running on localhost (PPTX Office Online won't work locally)
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const deployedBase = 'https://yoursite.com'; // Update when deployed

  const buildOfficeViewerUrl = (relPath) => {
    const fullUrl = `${deployedBase}${relPath}`;
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullUrl)}`;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const title = item.company || item.title;
  const subtitle = item.ticker
    ? `${item.ticker} · ${item.exchange}`
    : item.dealType || '';

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-emerald-600 font-medium mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {/* Download buttons */}
            {hasModel && (
              <a
                href={item.files.model}
                download
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                <FiDownload size={14} /> Model
              </a>
            )}
            {hasDeck && (
              <a
                href={item.files.pitchDeck}
                download
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                <FiDownload size={14} /> Pitch Deck
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-500"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* ── Tabs ── */}
        {hasModel && hasDeck && (
          <div className="flex gap-1 px-6 pt-3 flex-shrink-0">
            <button
              onClick={() => setActiveTab('model')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition ${
                activeTab === 'model'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <FiBarChart2 size={15} /> Financial Model
            </button>
            <button
              onClick={() => setActiveTab('deck')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition ${
                activeTab === 'deck'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <FiFileText size={15} /> Pitch Deck
            </button>
          </div>
        )}

        {/* ── Content ── */}
        <div className="flex-1 overflow-hidden px-6 pb-6 pt-2">

          {/* Financial Model — Excel viewer */}
          {activeTab === 'model' && hasModel && (
            <div className="h-full border border-slate-200 rounded-lg overflow-hidden p-3 bg-slate-50">
              <ExcelViewer fileUrl={item.files.model} />
            </div>
          )}

          {/* Pitch Deck — PDF embeds natively; PPTX uses Office Online */}
          {activeTab === 'deck' && hasDeck && (() => {
            const isPdf = item.files.pitchDeck.toLowerCase().endsWith('.pdf');
            if (isPdf) {
              return (
                <div className="h-full border border-slate-200 rounded-lg overflow-hidden">
                  <iframe
                    src={item.files.pitchDeck}
                    className="w-full h-full"
                    title={`${title} Pitch Deck`}
                  />
                </div>
              );
            }
            return (
              <div className="h-full flex flex-col">
                {isLocal ? (
                  <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg gap-5">
                    <div className="text-center max-w-sm">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiFileText size={28} className="text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        Pitch Deck Preview
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Inline deck preview is available when the site is deployed. Download the file
                        to view it now, or deploy to Vercel/Netlify to enable live previews.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={item.files.pitchDeck}
                        download
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        <FiDownload size={15} /> Download Pitch Deck
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={buildOfficeViewerUrl(item.files.pitchDeck)}
                    className="w-full h-full rounded-lg border border-slate-200"
                    frameBorder="0"
                    title={`${title} Pitch Deck`}
                    allowFullScreen
                  />
                )}
              </div>
            );
          })()}

          {/* Supplementary PDF viewer */}
          {activeTab === 'model' && !hasModel && hasDeck && (
            <div className="h-full border border-slate-200 rounded-lg overflow-hidden">
              <iframe
                src={item.files.pitchDeck}
                className="w-full h-full"
                title={`${title} document`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
