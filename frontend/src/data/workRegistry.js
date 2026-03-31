/**
 * WORK REGISTRY — Single source of truth for all financial work on the site.
 *
 * HOW TO ADD NEW WORK:
 * 1. Copy your files into: frontend/public/work/[category]/[company-id]/
 *      e.g. model.xlsx, pitch_deck.pptx
 * 2. Add an entry to the relevant array below (equityResearch, mna, lbo).
 * 3. Save this file — the website automatically picks it up.
 *
 * FILE PATHS: All paths are relative to the /public folder.
 *   ✅  '/work/equity-research/europe/business-services/intertek/model.xlsx'
 */

// ─────────────────────────────────────────────
//  EQUITY RESEARCH
// ─────────────────────────────────────────────
export const equityResearch = [
  {
    id: 'intertek',
    company: 'Intertek Group PLC',
    ticker: 'ITRK',
    exchange: 'LSE',
    region: 'Europe',
    sector: 'Business Services',
    // ⚠️ UPDATE these values with your model's output
    rating: 'BUY',
    targetPrice: '£52.00',
    currentPrice: '£44.20',
    upside: '+17.6%',
    date: 'Mar 2026',
    modelTypes: ['DCF', 'Comps', 'Sum-of-Parts'],
    whatsDifferent: 'Rather than a single blended DCF, I built a full Sum-of-Parts model decomposing Intertek across its three segments — Assurance, Testing, and Certification — each assigned a distinct terminal growth rate and WACC reflecting different risk profiles. The SOTP reveals that the high-margin Assurance division is systematically undervalued by consensus, which values all segments at a single blended multiple. I also quantified ESG compliance tailwinds as an explicit revenue driver rather than a qualitative footnote.',
    thesis:
      'Intertek is a global leader in quality assurance, testing, and certification services, operating across 100+ countries. With a resilient, asset-light model and defensive earnings, the business generates strong free cash flow. Our DCF implies material upside driven by margin expansion in high-value Assurance and B2B Consumer verticals.',
    highlights: [
      'Asset-light business model with ~20% EBIT margins and high cash conversion',
      'Structural tailwinds from global supply chain complexity and ESG compliance demands',
      'Strong dividend track record with consistent growth; 2.8% yield',
    ],
    keyMetrics: {
      'EV/EBITDA': '14.2x',
      'P/E': '18.5x',
      'ROIC': '28%+',
      'Div. Yield': '2.8%',
    },
    files: {
      model: 'work/equity-research/europe/business-services/intertek/model.xlsx',
      pitchDeck: 'work/equity-research/europe/business-services/intertek/pitch_deck.pdf',
    },
  },
  {
    id: 'hermes',
    company: 'Hermès International S.A.',
    ticker: 'RMS',
    exchange: 'Euronext Paris',
    region: 'Europe',
    sector: 'Consumer Goods',
    // ⚠️ UPDATE these values with your model's output
    rating: 'HOLD',
    targetPrice: '€2,050',
    currentPrice: '€1,920',
    upside: '+6.8%',
    date: 'Mar 2026',
    modelTypes: ['DCF', 'Luxury Comps', 'Brand Premium Analysis'],
    whatsDifferent: "Standard luxury DCFs apply a single growth rate and miss Hermès's fundamental pricing dynamic. I built a brand premium decomposition model that separates intrinsic earnings value from the intangible scarcity premium embedded in the stock price — isolating what the market is paying purely for the Birkin/Kelly brand optionality. I then stress-tested the model against a normalisation scenario where total-loss rates revert and discretionary spend contracts, producing a range of fair values rather than a single point estimate.",
    thesis:
      'Hermès is the world\'s premier ultra-luxury house with exceptional pricing power and near-zero promotional activity. While the brand quality is unmatched, current valuation at a premium to peers limits near-term upside. We remain constructive long-term on the scarcity model but see limited risk-reward at current levels.',
    highlights: [
      'Iconic Birkin and Kelly bags operate on controlled scarcity — pricing unconstrained',
      'Exceptional EBIT margins of 40%+ — highest in the luxury sector',
      'Family-controlled ownership (Hermès family ~67%) aligns long-term incentives',
    ],
    keyMetrics: {
      'EV/EBITDA': '42.1x',
      'P/E': '55.3x',
      'EBIT Margin': '42%',
      'Revenue Growth': '+14% YoY',
    },
    files: {
      model: 'work/equity-research/europe/consumer-goods/hermes/model.xlsx',
      pitchDeck: 'work/equity-research/europe/consumer-goods/hermes/pitch_deck.pdf',
    },
  },
  {
    id: 'loreal',
    company: "L'Oréal S.A.",
    ticker: 'OR',
    exchange: 'Euronext Paris',
    region: 'Europe',
    sector: 'Consumer Staples',
    // ⚠️ UPDATE these values with your model's output
    rating: 'BUY',
    targetPrice: '€410.00',
    currentPrice: '€360.00',
    upside: '+13.9%',
    date: 'Mar 2026',
    modelTypes: ['DCF', 'SOTP', 'Comps'],
    whatsDifferent: "Most L'Oréal models treat the company as one entity. I built a four-division SOTP (L'Oréal Luxe, Consumer Products, Dermatological Beauty, Professional Products) applying division-specific multiples and growth curves calibrated to each segment's TAM penetration rate. The Dermatological Beauty division — growing at 20%+ — is implicitly valued at a discount in consensus because it is buried inside a blended multiple. My SOTP surfaces this mismatch and quantifies the standalone value if the division were to be spun off.",
    thesis:
      "L'Oréal is the world's largest beauty company, with an unrivalled portfolio of mass, luxury, and dermatological brands. Premiumisation of the global beauty market, underpenetrated emerging market exposure (especially India and Southeast Asia), and strong dermatological/skincare growth underpin our positive outlook.",
    highlights: [
      'Dermatological Beauty (+CeraVe, La Roche-Posay) driving fastest organic growth at 20%+',
      'Emerging markets represent 44% of sales — structural long-term growth driver',
      'Strong free cash flow and consistent dividend growth (~25 years of uninterrupted increases)',
    ],
    keyMetrics: {
      'EV/EBITDA': '22.4x',
      'P/E': '28.7x',
      'EBIT Margin': '19.8%',
      'Revenue Growth': '+8% YoY',
    },
    files: {
      model: 'work/equity-research/europe/consumer-staples/loreal/model.xlsx',
      pitchDeck: 'work/equity-research/europe/consumer-staples/loreal/pitch_deck.pdf',
    },
  },
  {
    id: 'copart',
    company: 'Copart, Inc.',
    ticker: 'CPRT',
    exchange: 'NASDAQ',
    region: 'United States',
    sector: 'Industrials',
    rating: 'BUY',
    targetPrice: '$36.36',
    currentPrice: '$32.43',
    upside: '+12.1%',
    date: 'Mar 2026',
    modelTypes: ['DCF', 'Trading Comps', 'Football Field'],
    whatsDifferent: "The core insight most sell-side models miss: Copart's earnings are a function of total-loss rates, not just revenue growth. I built a total-loss rate sensitivity model that maps EV adoption curves (EVs have 25–40% higher repair costs vs ICE) to incremental salvage volume, generating a bottom-up volume forecast rather than relying on top-down revenue comps. I also ran a marketplace flywheel analysis quantifying how incremental buyer registrations translate to higher seller recovery rates — a non-linear compounding effect that a static DCF fails to capture.",
    thesis:
      'Copart commands ~40% U.S. salvage vehicle auction market share — nearly 3x the nearest competitor — underpinned by its proprietary VB2® online platform which creates a self-reinforcing two-sided marketplace flywheel. Rising vehicle complexity (EVs, ADAS) is structurally increasing total-loss rates, while the company compounds at industry-leading 41%+ EBITDA margins with a net-cash balance sheet ($4.8B cash, $0.1B debt) and ~67% NOPAT-to-FCF conversion.',
    highlights: [
      '~40% U.S. salvage market share with 170+ countries of registered VB2® buyers — structurally widening moat',
      'Net cash of $4.8B and zero financial leverage; 18.8% ROE and ~67% FCF conversion',
      'Rising EV total-loss rates (repair costs 25–40% higher than ICE) driving secular volume tailwind',
      'International operations <20% of revenue — significant untapped runway in UK, Germany, Brazil, UAE',
    ],
    keyMetrics: {
      'EV/EBITDA': '13.6x',
      'EBITDA Margin': '41.2%',
      'FCF Conversion': '~67%',
      'Net Cash': '$4.8B',
    },
    files: {
      model: 'work/equity-research/us/industrials/copart/model.xlsx',
      pitchDeck: 'work/equity-research/us/industrials/copart/pitch_deck.pdf',
    },
  },
  {
    id: 'duolingo',
    company: 'Duolingo Inc.',
    ticker: 'DUOL',
    exchange: 'NASDAQ',
    region: 'United States',
    sector: 'Technology',
    // ⚠️ UPDATE these values with your model's output
    rating: 'BUY',
    targetPrice: '$280.00',
    currentPrice: '$230.00',
    upside: '+21.7%',
    date: 'Mar 2026',
    modelTypes: ['DCF', 'SaaS Comps', 'Cohort Analysis'],
    whatsDifferent: "Instead of modelling Duolingo as a simple revenue CAGR story, I built a cohort-based LTV/CAC model segmenting users by acquisition year and monetisation pathway (free → Duolingo Plus → Duolingo Max). This approach reveals that AI-powered features (Explain My Answer, Roleplay) are compressing the free-to-paid conversion timeline from ~18 months to ~9 months for recent cohorts — a structural improvement in unit economics that a top-down DCF would smooth away. The model also stress-tests DAU retention curves under a scenario where AI competitors narrow the engagement gap.",
    thesis:
      'Duolingo is the dominant global language learning platform, with 88M+ daily active users and a highly scalable subscription model. Its AI-first product roadmap — including Duolingo Max (GPT-4 powered) — is driving rapid monetisation of its massive free user base. Path to profitability is increasingly visible as subscription mix grows.',
    highlights: [
      'DAU growth accelerating: +54% YoY; paid subscribers growing faster than total DAUs',
      'AI features (Explain My Answer, Roleplay) driving paid conversion and reducing churn',
      'Significant white space in adjacent verticals: Duolingo Math, Music expanding TAM',
    ],
    keyMetrics: {
      'EV/Revenue': '14.2x',
      'EV/EBITDA': '89x',
      'Subscriber Growth': '+48% YoY',
      'DAUs': '88M+',
    },
    files: {
      model: 'work/equity-research/us/technology/duolingo/model.xlsx',
      pitchDeck: 'work/equity-research/us/technology/duolingo/pitch_deck.pdf',
      supplementary: 'work/equity-research/us/technology/duolingo/Q3_2025.pdf',
    },
  },
];

// ─────────────────────────────────────────────
//  M&A DEAL ADVISORY
// ─────────────────────────────────────────────
export const mna = [
  {
    id: 'hpe-juniper',
    title: 'Hewlett Packard Enterprise — Acquisition of Juniper Networks',
    acquirer: 'Hewlett Packard Enterprise Co. (NYSE: HPE)',
    target: 'Juniper Networks, Inc. (NYSE: JNPR)',
    dealType: 'All-Cash Strategic Acquisition',
    dealValue: '$13.7B',
    sector: 'Technology & Enterprise Networking',
    date: 'Jan 2024',
    status: 'Closed',
    offerPrice: '$40.00/share',
    premium: '32.4%',
    evEbitda: '14.4x',
    synergies: '~$500mm run-rate',
    synergyNpv: '$4.4B',
    newDebt: '$10.0B',
    pfRevenue: '$31.4B',
    pfEbitdaMarginPreSyn: '13.7%',
    pfEbitdaMarginRunRate: '15.1%',
    dealMetrics: {
      'Enterprise Value': '$13.7B',
      'EV/LTM EBITDA': '14.4x',
      'Premium to Close': '32.4%',
      'Run-Rate Synergies': '~$500mm',
    },
    highlights: [
      'Creates #2 enterprise networking player globally — combined revenue of ~$31.4B, full-stack IT infrastructure',
      "Juniper's Mist AI platform positions HPE at the forefront of AI-native networking — $60B+ TAM",
      '$500mm run-rate cost synergies across headcount, facilities, procurement, and G&A by Year 4',
      'PF EBITDA margin expands from 13.7% at close to 15.1% at full synergy run-rate; deleverages to ~4x by Year 3',
      'All-cash deal: $4.0B TLA (SOFR+125bps) + $3.0B 5-yr Senior Notes (~5.90%) + $3.0B 10-yr Senior Notes (~6.10%)',
    ],
    structure:
      'All-cash acquisition at $40.00/share (325.9mm fully diluted shares), totalling $13,036mm equity value. Financed via $3.2B existing HPE cash + $10.0B new debt. No financing condition — committed financing secured at signing. Break-up fee of $550mm (Juniper) / $750mm (HPE). All regulatory approvals (DOJ, EU, SAMR, CMA) cleared with no material remedies.',
    whatsDifferent: "Most M&A analyses stop at headline EPS accretion/dilution. I built a full PPA (Purchase Price Allocation) model that identifies and amortises $3.4B of acquired intangibles (customer relationships, developed technology, trade names) over their respective useful lives — showing precisely how $328mm of annual PPA amortisation drives the Year 1 dilution figure and phases out by Year 6. I also modelled a synergy NPV bridge that discounts the $501mm run-rate synergies back to present value at a risk-adjusted rate, arriving at a $4.4B synergy NPV — directly comparing it against the $3.4B premium paid to test whether HPE overpaid. The deal math works only if at least 65% of synergies are realised.",
    thesis:
      "HPE acquires Juniper to become a full-stack AI-native IT infrastructure provider, combining its compute/storage leadership with Juniper's best-in-class enterprise networking and Mist AI platform. The deal is initially dilutive (-57.4% EPS Year 1) due to $10.0B new debt and $328mm PPA amortisation, but narrows to -24.8% by Year 3 and turns accretive Year 4+ as $501mm run-rate synergies are fully realised. Strategic value rests on long-term AI networking leadership and FCF generation.",
    epsAccretion: [
      { year: 'Year 1', standalone: '$1.134', proForma: '$0.483', dilution: '(57.4%)' },
      { year: 'Year 2', standalone: '$1.224', proForma: '$0.706', dilution: '(42.4%)' },
      { year: 'Year 3', standalone: '$1.323', proForma: '$0.995', dilution: '(24.8%)' },
    ],
    files: {
      model: 'work/mna/hpe-juniper/model.xlsx',
      pitchDeck: 'work/mna/hpe-juniper/pitch_deck.pdf',
    },
  },
];

// ─────────────────────────────────────────────
//  LBO MODELS
// ─────────────────────────────────────────────
export const lbo = [
  {
    id: 'autostore',
    company: 'AutoStore Holdings Ltd.',
    ticker: 'AUTO',
    exchange: 'Oslo Børs',
    sector: 'Warehouse Automation',
    region: 'Europe',
    sponsor: 'Proprietary Analysis',
    vintage: 'Mar 2026',
    entryEv: 'NOK 43,311mm (~USD 4.3bn)',
    entryEbitda: 'NOK 2,078mm',
    entryMultiple: '20.8x EV/EBITDA',
    leverage: '5.5x Net Debt / EBITDA',
    exitMultiple: '18.0x (Base)',
    holdingPeriod: '5 years',
    irr: '19.2%',
    moic: '2.4x',
    equityCheck: 'NOK 34,360mm (75% of cap)',
    debtStructure: 'TLB NOK 8,313mm @ 7.41% + SSN NOK 3,117mm @ 8.00%',
    revenueCagr: '8.6%',
    ebitdaCagr: '5.7%',
    ebitdaMarginExit: '33.2%',
    offerPremium: '20.2%',
    whatsDifferent: "Rather than assuming a static exit multiple, I built a dynamic debt paydown waterfall that models TLB amortisation and optional repayments quarter-by-quarter, showing exactly when AutoStore crosses net-cash positive (Year 3) and how that inflection unlocks additional equity value. I also ran a two-dimensional sensitivity table across exit multiple vs. EBITDA CAGR rather than the standard single-axis analysis — surfacing 25 distinct return scenarios and colour-coding the IRR thresholds (≥20%, 15–20%, <15%) to give a clear picture of the deal's risk/reward distribution. The value creation bridge explicitly decomposes returns into EBITDA growth, debt paydown, and multiple contraction — a framework borrowed directly from PE return attribution.",
    thesis:
      'AutoStore commands 25%+ global market share in cube-based warehouse robotics — a patent-protected, asset-light technology with no direct equivalent. The business generates sustained 35%+ EBITDA margins, ~40% recurring revenue mix, and low maintenance CapEx (~1.5% of revenue). Our 5-year base case generates a 19.2% IRR driven primarily by aggressive debt paydown and EBITDA growth, with multiple exit pathways via strategic acquirer, secondary, or re-IPO.',
    highlights: [
      'Global market leader: 25%+ cube automation share, 1,000+ installed systems in 50+ countries',
      'Recurring revenue approaching 40% of mix — software, subscriptions, and after-market services',
      'Best-in-class 35%+ EBITDA margins; capital-light model with ~1.5% CapEx/revenue',
      'Net cash position anticipated by exit Year 3, unlocking significant value through debt paydown',
      'Multiple exit pathways: strategic acquirer (KION, Dematic, Honeywell), secondary, or re-IPO',
    ],
    scenarios: [
      { label: 'Downside', exitMult: '15.0x', cagr: '5.0%', irr: '12.0%', moic: '1.65x' },
      { label: 'Base Case', exitMult: '18.0x', cagr: '10.0%', irr: '19.2%', moic: '2.40x', isBase: true },
      { label: 'Upside', exitMult: '20.0x', cagr: '12.0%', irr: '25.0%', moic: '3.05x' },
      { label: 'Mgmt. Case', exitMult: '22.0x', cagr: '15.0%', irr: '32.0%', moic: '4.00x' },
    ],
    files: {
      model: 'work/lbo/autostore/model.xlsx',
      pitchDeck: 'work/lbo/autostore/pitch_deck.pdf',
    },
  },
];
