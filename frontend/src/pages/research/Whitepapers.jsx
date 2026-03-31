import React from 'react';
import { FiBook, FiDownload, FiCalendar } from 'react-icons/fi';

const Whitepapers = () => {
  const papers = [
    {
      id: 1,
      title: 'The Future of Fintech: Regulatory Framework & Opportunities',
      date: 'Jan 2026',
      pages: 35,
      abstract: 'Comprehensive analysis of evolving fintech regulations and investment opportunities across emerging market economies',
    },
    {
      id: 2,
      title: 'AI-Driven Portfolio Management: Algorithms vs Traditional Analysis',
      date: 'Dec 2025',
      pages: 28,
      abstract: 'Deep dive into machine learning applications in portfolio optimization and risk management',
    },
    {
      id: 3,
      title: 'ESG Investing: Performance Analysis & Future Trends',
      date: 'Nov 2025',
      pages: 32,
      abstract: 'Quantitative analysis of ESG factors on long-term investment returns and portfolio performance',
    },
    {
      id: 4,
      title: 'Cryptocurrency & Blockchain: Enterprise Adoption Thesis',
      date: 'Oct 2025',
      pages: 40,
      abstract: 'Strategic analysis of blockchain technology adoption in financial services and enterprise applications',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">White Papers</h1>
          <p className="text-lg text-slate-400">
            In-depth research papers on financial markets, technology, and investment strategies
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="space-y-6 mb-16">
          {papers.map((paper) => (
            <div key={paper.id} className="bg-white border border-slate-200 p-8 rounded-lg hover:border-emerald-300 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{paper.title}</h3>
                  <div className="flex items-center gap-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={14} /> {paper.date}
                    </div>
                    <span>{paper.pages} pages</span>
                  </div>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 p-3 rounded transition ml-4">
                  <FiDownload size={20} />
                </button>
              </div>
              <p className="text-slate-600">{paper.abstract}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiBook className="text-emerald-600" /> Research Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Macro Economics', count: 8 },
              { title: 'Technology & Innovation', count: 12 },
              { title: 'Market Structure', count: 6 },
              { title: 'Alternative Investments', count: 10 },
            ].map((topic) => (
              <div key={topic.title} className="bg-slate-100/50 p-4 rounded hover:bg-slate-200 transition">
                <h4 className="text-emerald-600 font-semibold mb-1">{topic.title}</h4>
                <p className="text-slate-500 text-sm">{topic.count} papers</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitepapers;
