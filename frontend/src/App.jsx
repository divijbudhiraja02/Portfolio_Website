import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Equity Research & Valuation
import EquityResearch from './pages/investment/EquityResearch';
import ValuationModels from './pages/investment/ValuationModels';
import PortfolioAnalysis from './pages/investment/PortfolioAnalysis';

// Deal & M&A
import MANCases from './pages/deal/MANCases';
import LBOModels from './pages/deal/LBOModels';
import InvestmentMemos from './pages/deal/InvestmentMemos';

// Sector Research
import MarketInsights from './pages/research/MarketInsights';
import SectorAnalysis from './pages/research/SectorAnalysis';
import Whitepapers from './pages/research/Whitepapers';

// Quantitative & Tools
import QuantitativeAnalysis from './pages/QuantitativeAnalysis';
import Tools from './pages/Tools';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Equity Research & Valuation */}
            <Route path="/equity-research" element={<EquityResearch />} />
            <Route path="/valuation-models" element={<ValuationModels />} />
            <Route path="/portfolio-analysis" element={<PortfolioAnalysis />} />

            {/* Deal & M&A */}
            <Route path="/mna-cases" element={<MANCases />} />
            <Route path="/lbo-models" element={<LBOModels />} />
            <Route path="/investment-memos" element={<InvestmentMemos />} />

            {/* Sector Research */}
            <Route path="/market-insights" element={<MarketInsights />} />
            <Route path="/sector-analysis" element={<SectorAnalysis />} />
            <Route path="/whitepapers" element={<Whitepapers />} />

            {/* Quantitative & Tools */}
            <Route path="/quantitative" element={<QuantitativeAnalysis />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
