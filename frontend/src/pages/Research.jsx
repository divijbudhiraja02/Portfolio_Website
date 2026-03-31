import React, { useState, useEffect } from 'react';
import { FiDownload, FiCalendar } from 'react-icons/fi';

const Research = () => {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch research papers from backend
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/research');
      if (response.ok) {
        const data = await response.json();
        setResearch(data);
      }
    } catch (error) {
      console.log('Using sample data');
      setSampleData();
    } finally {
      setLoading(false);
    }
  };

  const setSampleData = () => {
    setResearch([
      {
        id: 1,
        title: 'Technology Sector Deep Dive: AI Revolution',
        sector: 'Technology',
        date: '2026-01-15',
        summary: 'Comprehensive analysis of AI impact on tech stocks and investment opportunities.',
        rating: 'BUY',
      },
      {
        id: 2,
        title: 'Healthcare Innovation & Pharma Growth',
        sector: 'Healthcare',
        date: '2026-01-10',
        summary: 'Exploring emerging biotech companies and pharmaceutical growth catalysts.',
        rating: 'HOLD',
      },
      {
        id: 3,
        title: 'Financial Services in Digital Economy',
        sector: 'Financials',
        date: '2026-01-05',
        summary: 'Analysis of fintech disruption and traditional banking adaptation.',
        rating: 'BUY',
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Equity Research</h1>
        <p className="text-slate-600 mb-12">
          Detailed analysis and investment recommendations across various sectors
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading research papers...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {research.map((paper) => (
              <div key={paper.id} className="bg-white border border-slate-200 rounded-lg hover:border-emerald-300 transition p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">{paper.title}</h2>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-600 rounded-full text-sm font-semibold">
                        {paper.sector}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar /> {new Date(paper.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-lg font-bold text-slate-900 ${
                    paper.rating === 'BUY' ? 'bg-emerald-500' : 
                    paper.rating === 'SELL' ? 'bg-red-500' : 
                    'bg-amber-500'
                  }`}>
                    {paper.rating}
                  </span>
                </div>
                <p className="text-slate-600 mb-6">{paper.summary}</p>
                <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-2 rounded-lg transition">
                  <FiDownload /> Download Report
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
