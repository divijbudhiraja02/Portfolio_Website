import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiCalendar, FiTarget } from 'react-icons/fi';

const InvestmentIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/investment-ideas');
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.log('Using sample data');
      setSampleData();
    } finally {
      setLoading(false);
    }
  };

  const setSampleData = () => {
    setIdeas([
      {
        id: 1,
        title: 'Renewable Energy Growth Thesis',
        thesis: 'Investing in solar and wind companies poised for 200% growth over 5 years due to government incentives.',
        targetReturn: '+25%',
        timeHorizon: '3-5 Years',
        riskLevel: 'Moderate',
        date: '2026-01-20',
      },
      {
        id: 2,
        title: 'Artificial Intelligence Infrastructure',
        thesis: 'Companies providing AI infrastructure and chips will see exponential demand growth.',
        targetReturn: '+40%',
        timeHorizon: '2-3 Years',
        riskLevel: 'High',
        date: '2026-01-18',
      },
      {
        id: 3,
        title: 'Cybersecurity Defense Sector',
        thesis: 'Rising cyber threats driving demand for enterprise cybersecurity solutions.',
        targetReturn: '+18%',
        timeHorizon: '2-4 Years',
        riskLevel: 'Low',
        date: '2026-01-15',
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Investment Ideas</h1>
        <p className="text-slate-600 mb-12">
          Conviction-driven investment themes with detailed thesis and analysis
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading investment ideas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea) => (
              <div key={idea.id} className="bg-white border border-slate-200 rounded-lg hover:border-emerald-300 transition p-8">
                <h2 className="text-xl font-bold mb-4 text-slate-900">{idea.title}</h2>
                <p className="text-slate-600 mb-6">{idea.thesis}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiTrendingUp className="text-emerald-600" />
                    <span className="text-emerald-600 font-bold text-lg">{idea.targetReturn}</span>
                  </div>
                  
                  <div>
                    <p className="text-slate-500 text-sm">Time Horizon</p>
                    <p className="font-semibold text-slate-600">{idea.timeHorizon}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-500 text-sm">Risk Level</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      idea.riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-600' :
                      idea.riskLevel === 'Moderate' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {idea.riskLevel}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-slate-500 text-sm pt-4 border-t border-slate-700">
                    <FiCalendar /> {new Date(idea.date).toLocaleDateString()}
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-slate-900 py-2 rounded-lg transition font-semibold">
                  View Full Analysis
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentIdeas;
