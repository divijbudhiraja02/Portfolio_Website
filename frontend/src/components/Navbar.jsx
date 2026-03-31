import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-navy-950/20'
        : 'bg-navy-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-wide text-emerald-400">
              DIVIJ BUDHIRAJA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                isActive('/') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              Home
            </Link>

            {/* Equity Research — direct link */}
            <Link
              to="/equity-research"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                isActive('/equity-research') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              Equity Research
            </Link>

            {/* Portfolio Analysis — standalone */}
            <Link
              to="/portfolio-analysis"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                isActive('/portfolio-analysis') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              Portfolio
            </Link>

            {/* M&A Dropdown */}
            <div className="relative group">
              <button className={`transition px-3 py-2 text-sm font-medium rounded flex items-center gap-1 ${
                ['/mna-cases', '/investment-memos'].includes(location.pathname) ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
              }`}>
                M&A
                <FiChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-0 w-52 bg-navy-800 border border-navy-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link to="/mna-cases" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-emerald-400 hover:bg-navy-700/50">
                  M&A Case Studies
                </Link>
              </div>
            </div>

            {/* LBO — direct link */}
            <Link
              to="/lbo-models"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                isActive('/lbo-models') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              LBO
            </Link>

            {/* Sector Research Dropdown */}
            <div className="relative group">
              <button className="text-slate-300 hover:text-emerald-400 transition px-3 py-2 text-sm font-medium rounded flex items-center gap-1">
                Sector Research
                <FiChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-0 w-52 bg-navy-800 border border-navy-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link to="/sector-analysis" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-emerald-400 hover:bg-navy-700/50">
                  Sector Deep Dives
                </Link>
              </div>
            </div>

            {/* Quantitative */}
            <Link
              to="/quantitative"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                isActive('/quantitative') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              Quantitative
            </Link>

            <Link
              to="/about"
              className="ml-2 px-4 py-1.5 text-sm font-medium rounded border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 transition"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-300 hover:text-emerald-400 transition"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-navy-700 mt-2 pt-4">
            <Link to="/" className="block text-slate-300 py-2 px-3 hover:text-emerald-400 rounded">
              Home
            </Link>

            <Link to="/equity-research" className="block text-slate-300 py-2 px-3 hover:text-emerald-400 rounded">
              Equity Research
            </Link>

            <Link to="/portfolio-analysis" className="block text-slate-300 py-2 px-3 hover:text-emerald-400 rounded">
              Portfolio
            </Link>

            <button
              onClick={() => toggleDropdown('mna')}
              className="w-full text-left text-slate-300 py-2 px-3 hover:text-emerald-400 rounded flex items-center justify-between"
            >
              M&A
              <FiChevronDown size={16} className={`transition-transform ${activeDropdown === 'mna' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'mna' && (
              <div className="pl-6 space-y-1">
                <Link to="/mna-cases" className="block text-slate-400 py-2 hover:text-emerald-400 text-sm">
                  M&A Case Studies
                </Link>
              </div>
            )}

            <Link to="/lbo-models" className="block text-slate-300 py-2 px-3 hover:text-emerald-400 rounded">
              LBO
            </Link>

            <button
              onClick={() => toggleDropdown('research')}
              className="w-full text-left text-slate-300 py-2 px-3 hover:text-emerald-400 rounded flex items-center justify-between"
            >
              Sector Research
              <FiChevronDown size={16} className={`transition-transform ${activeDropdown === 'research' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'research' && (
              <div className="pl-6 space-y-1">
                <Link to="/sector-analysis" className="block text-slate-400 py-2 hover:text-emerald-400 text-sm">
                  Sector Deep Dives
                </Link>
              </div>
            )}

            <Link to="/quantitative" className="block text-slate-300 py-2 px-3 hover:text-emerald-400 rounded">
              Quantitative
            </Link>

            <Link to="/about" className="block text-slate-300 py-2 px-3 hover:text-emerald-400 rounded">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
