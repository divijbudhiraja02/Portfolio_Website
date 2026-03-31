import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-slate-400 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-400">Divij Budhiraja</h3>
            <p className="text-sm leading-relaxed">
              MiF Candidate at IE Business School. CFA Level III Candidate.
              Specializing in Investment Banking & Private Equity.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-slate-300 uppercase tracking-wider">Research</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/equity-research" className="hover:text-emerald-400 transition">Equity Research</Link></li>
              <li><Link to="/valuation-models" className="hover:text-emerald-400 transition">Valuation Models</Link></li>
              <li><Link to="/sector-analysis" className="hover:text-emerald-400 transition">Sector Analysis</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-slate-300 uppercase tracking-wider">Deal Work</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mna-cases" className="hover:text-emerald-400 transition">M&A Cases</Link></li>
              <li><Link to="/lbo-models" className="hover:text-emerald-400 transition">LBO Models</Link></li>
              <li><Link to="/investment-memos" className="hover:text-emerald-400 transition">Investment Memos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-slate-300 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:divij.budhiraja@student.ie.edu" className="hover:text-emerald-400 transition">
                  divij.budhiraja@student.ie.edu
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/divijbudhiraja14/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                  LinkedIn
                </a>
              </li>
              <li className="text-slate-500">Madrid, Spain</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 Divij Budhiraja. All rights reserved.</p>
          <p className="mt-2 md:mt-0">IE Business School | CFA Institute | CFI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
