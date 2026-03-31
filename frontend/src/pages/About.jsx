import React from 'react';
import { FiAward, FiBook, FiBriefcase, FiGlobe, FiCode, FiTrendingUp, FiMail, FiLinkedin } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20">
                  CFA L3 CANDIDATE
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20">
                  FMVA CERTIFIED
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20">
                  GOLD MEDALIST
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2 text-white">Divij Budhiraja</h1>
              <p className="text-xl text-emerald-400 font-semibold mb-4">Investment Banking & Private Equity</p>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
                Master's in Finance candidate at IE Business School with IB & PE specialization. CFA Level II cleared
                (Level I Top 10% worldwide). Computer Science graduate honored with University Gold Medal.
                Professional experience spans equity valuation at Santander Asset Management, financial modeling
                at PGP Group (Blackstone subsidiary), and AI product development in Tokyo.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:divij.budhiraja@student.ie.edu"
                   className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-navy-900 px-5 py-2.5 rounded font-semibold text-sm transition">
                  <FiMail size={16} /> Get in Touch
                </a>
                <a href="https://www.linkedin.com/in/divijbudhiraja14/" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 border border-slate-600 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 px-5 py-2.5 rounded font-semibold text-sm transition">
                  <FiLinkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-2">
            <FiBriefcase className="text-emerald-600" /> Professional Experience
          </h2>
          <div className="space-y-8">
            <div className="border-l-2 border-emerald-500 pl-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-bold text-navy-900">Santander Asset Management</h3>
                <span className="text-sm text-slate-400">Madrid, Spain</span>
              </div>
              <p className="text-emerald-600 font-semibold text-sm mb-2">Student Valuation Partner | Jan 2026 - Jul 2026</p>
              <ul className="text-slate-600 text-sm space-y-1.5 leading-relaxed">
                <li>Conducting comprehensive equity valuation of CAF S.A. (&#8364;3B+ Spanish rail manufacturer) with integrated scenario and sensitivity analysis</li>
                <li>Analyzing three core business segments - rail solutions, buses, and financing - to isolate segment-level value drivers</li>
                <li>Synthesizing findings into formal investment memorandum with price targets and buy/hold/sell recommendation</li>
              </ul>
            </div>

            <div className="border-l-2 border-emerald-500 pl-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-bold text-navy-900">PGP Group (Blackstone Subsidiary)</h3>
                <span className="text-sm text-slate-400">Surat, India</span>
              </div>
              <p className="text-emerald-600 font-semibold text-sm mb-2">Finance Intern | Apr 2025 - Aug 2025</p>
              <ul className="text-slate-600 text-sm space-y-1.5 leading-relaxed">
                <li>Built detailed financial forecasts reducing resource allocation discrepancies by 85%</li>
                <li>Enhanced financial models for forecasting and scenario analysis, increasing predictive accuracy by 13.4%</li>
                <li>Delivered financial insights to cross-functional teams driving strategic budget adjustments</li>
              </ul>
            </div>

            <div className="border-l-2 border-slate-300 pl-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-bold text-navy-900">Human Group</h3>
                <span className="text-sm text-slate-400">Tokyo, Japan</span>
              </div>
              <p className="text-emerald-600 font-semibold text-sm mb-2">Software Engineer | Oct 2023 - Mar 2025</p>
              <ul className="text-slate-600 text-sm space-y-1.5 leading-relaxed">
                <li>Built AI-powered platform cutting costs by $600+/patient via 27.2% workload and 71.3% diagnostic time reductions</li>
                <li>Orchestrated 4+ international teams across Asia and North America</li>
                <li>Featured in National Japanese Press (Jan 2025) and AI Summit'24, Saudi Arabia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-2">
            <FiBook className="text-emerald-600" /> Education & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-navy-900 mb-1">IE Business School</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-2">Master in Finance | Expected Jul 2026</p>
              <ul className="text-slate-500 text-sm space-y-1">
                <li>Specialization: Investment Banking & Private Equity</li>
                <li>Equity Research Team Lead at IE Investment Club</li>
                <li>Member at IE M&A Club</li>
                <li>Coursework: FA&A, Financial Modelling, AI & ML in Finance, Valuation</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-navy-900 mb-1">CFA Institute</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-2">Level III Candidate | Expected Oct 2026</p>
              <ul className="text-slate-500 text-sm space-y-1">
                <li>Level I passed on first attempt - Top 10% worldwide (Jul 2024)</li>
                <li>Level II cleared in Oct 2025</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-navy-900 mb-1">Vellore Institute of Technology</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-2">B.Tech Computer Science | Jul 2023</p>
              <ul className="text-slate-500 text-sm space-y-1">
                <li>Graduated Valedictorian - University Gold Medal</li>
                <li>Ranked Top 10 university in India</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-navy-900 mb-1">CFI - Corporate Finance Institute</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-2">FMVA Certified</p>
              <ul className="text-slate-500 text-sm space-y-1">
                <li>Financial Modeling & Valuation Analyst</li>
                <li>3-Statement Modeling, DCF, Comps, Operational Modeling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-2">
            <FiCode className="text-emerald-600" /> Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <FiTrendingUp className="text-emerald-600" /> Finance
              </h3>
              <div className="flex flex-wrap gap-2">
                {['DCF Valuation', 'Comps Analysis', 'LBO Modeling', '3-Statement Models', 'Operational Modeling', 'FactSet', 'Bloomberg'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-navy-50 text-navy-700 text-xs rounded-full border border-navy-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <FiCode className="text-emerald-600" /> Programming
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'R', 'MATLAB', 'SQL', 'Generative AI'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-navy-50 text-navy-700 text-xs rounded-full border border-navy-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <FiGlobe className="text-emerald-600" /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Hindi (Native)', 'English (Fluent)', 'Japanese (Business)', 'French (Basic)', 'Spanish (Learning)'].map(lang => (
                  <span key={lang} className="px-3 py-1 bg-navy-50 text-navy-700 text-xs rounded-full border border-navy-100">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notable */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <FiAward className="text-emerald-400" /> Notable
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-navy-800 border border-navy-700 p-6 rounded-lg">
              <h4 className="font-bold text-emerald-400 mb-2">Blockchain Startup</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built MVP for tokenized platform providing retail investor exposure to early-stage startups via SPV structuring and smart contracts.
              </p>
            </div>
            <div className="bg-navy-800 border border-navy-700 p-6 rounded-lg">
              <h4 className="font-bold text-emerald-400 mb-2">Asia Book of Records</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Honored in Jan 2020 for poster exhibition on sustainable living, presented to 100K+ attendees.
              </p>
            </div>
            <div className="bg-navy-800 border border-navy-700 p-6 rounded-lg">
              <h4 className="font-bold text-emerald-400 mb-2">Community Impact</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Volunteered in 30+ education-focused events, mentoring underprivileged students from 2021 to 2023.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
