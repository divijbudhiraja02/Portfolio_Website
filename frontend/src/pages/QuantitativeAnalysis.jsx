import React, { useState } from 'react';
import { FiCpu, FiTrendingUp, FiBarChart2, FiShield, FiActivity, FiChevronDown, FiChevronUp, FiCode } from 'react-icons/fi';

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',       label: 'All Implementations' },
  { id: 'portfolio', label: 'Portfolio Construction' },
  { id: 'algo',      label: 'Algorithmic Strategies' },
  { id: 'deriv',     label: 'Derivatives & Volatility' },
  { id: 'execution', label: 'Market Microstructure' },
];

const IMPLEMENTATIONS = [
  // ── Portfolio Construction ──────────────────────────────────────────────────
  {
    id: 'mvo',
    category: 'portfolio',
    title: 'Mean-Variance Optimizer with Ledoit-Wolf Shrinkage',
    subtitle: 'Portfolio Construction',
    icon: FiTrendingUp,
    description:
      'Full implementation of Markowitz mean-variance optimisation across a 10-asset multi-asset universe (equities, fixed income, commodities, EM). Solves the constrained QP using CVXPY under three constraint regimes — unconstrained, long-only, and box-constrained (25% cap). Critically, replaces the sample covariance matrix with the Ledoit-Wolf shrinkage estimator to address estimation error in finite samples, a standard practice in institutional portfolio construction.',
    highlights: [
      'Ledoit-Wolf shrinkage vs. sample covariance — weight stability comparison across estimation methods',
      'Three constraint regimes on one frontier: unconstrained (allows shorts), long-only, box (25% max)',
      'Stress-tested across GFC (2008–12), Bull Market (2013–19), and COVID+ (2020–present) regimes',
      'Min-Variance, Max-Sharpe, and Equal-Weight portfolios identified and plotted on each frontier',
    ],
    metrics: [
      { label: 'Asset Universe', value: '10' },
      { label: 'Max Sharpe (Full Period)', value: '1.42' },
      { label: 'LW vs. Sample Δ Weight', value: '~18%' },
      { label: 'Frontier Points', value: '200' },
    ],
    tech: ['Python', 'CVXPY', 'Scikit-Learn', 'NumPy', 'Pandas', 'Matplotlib'],
    images: [
      { src: '/quant/portfolio-construction/mean-variance/efficient_frontier_overlay.png', caption: 'Efficient Frontier — Unconstrained vs. Long-Only vs. Box' },
      { src: '/quant/portfolio-construction/mean-variance/cov_comparison.png', caption: 'Sample vs. Ledoit-Wolf: Weight Stability Comparison' },
      { src: '/quant/portfolio-construction/mean-variance/historical_weight_shifts.png', caption: 'Optimal Weights Across GFC / Bull Market / COVID Regimes' },
    ],
    code: `class PortfolioOptimizer:
    def get_covariance(self, method="ledoit-wolf"):
        if method == "ledoit-wolf":
            lw = LedoitWolf().fit(self.returns)
            return lw.covariance_ * 252  # Annualised
        return self.returns.cov().values * 252

    def solve_for_frontier(self, cov, constraints="long_only"):
        w = cp.Variable(self.num_assets)
        ret  = self.mu @ w
        risk = cp.quad_form(w, cov)       # w' Σ w

        cons = [cp.sum(w) == 1]
        if constraints == "long_only":
            cons += [w >= 0]
        elif constraints == "box":
            cons += [w >= 0, w <= 0.25]  # max 25% per asset

        for target_ret in np.linspace(min(self.mu), max(self.mu), 200):
            prob = cp.Problem(cp.Minimize(risk), cons + [ret >= target_ret])
            prob.solve()
            if prob.status == "optimal":
                frontier_vols.append(np.sqrt(risk.value))`,
    codeLabel: 'optimizer.py — CVXPY QP Solve',
  },
  {
    id: 'risk-parity',
    category: 'portfolio',
    title: 'Risk Parity & Hierarchical Risk Parity (HRP)',
    subtitle: 'Portfolio Construction',
    icon: FiShield,
    description:
      'Implements and backtests five allocation paradigms — Equal Weight, Inverse Volatility, Equal Risk Contribution (ERC), Hierarchical Risk Parity (HRP), and Max Sharpe — on the same 10-asset universe. ERC solves a convex optimisation to equalise marginal risk contributions; HRP uses single-linkage hierarchical clustering on the correlation matrix to construct a quasi-diagonal covariance structure, avoiding matrix inversion entirely. Walk-forward backtest with 252-day rolling window and monthly rebalancing.',
    highlights: [
      'ERC ensures each asset contributes equal risk — validated via marginal contribution decomposition plot',
      'HRP (López de Prado, 2016) — dendrogram-based clustering avoids singular covariance inversion',
      'Rolling Sharpe and volatility across all strategies over full sample (2008–present)',
      'Diversification Ratio computed per strategy to quantify effective diversification',
    ],
    metrics: [
      { label: 'Strategies Compared', value: '5' },
      { label: 'Backtest Window', value: '252d' },
      { label: 'Rebalance', value: 'Monthly' },
      { label: 'HRP Sharpe vs. EW', value: '+0.18' },
    ],
    tech: ['Python', 'SciPy', 'Scikit-Learn', 'NumPy', 'Pandas', 'Matplotlib'],
    images: [
      { src: '/quant/portfolio-construction/risk-parity/strategy_comparison.png', caption: 'Cumulative Returns: EW / Inv-Vol / ERC / HRP / Max Sharpe' },
      { src: '/quant/portfolio-construction/risk-parity/hrp_clustering.png', caption: 'HRP Hierarchical Clustering Dendrogram' },
      { src: '/quant/portfolio-construction/risk-parity/rolling_performance.png', caption: 'Rolling Sharpe & Volatility (252-day)' },
      { src: '/quant/portfolio-construction/risk-parity/rc_erc_balanced.png', caption: 'ERC: Equalised Risk Contribution per Asset' },
    ],
    code: `def get_erc_weights(returns):
    """Equal Risk Contribution via convex optimisation."""
    cov = returns.cov().values * 252
    n   = cov.shape[0]

    def risk_budget_objective(w):
        port_vol = np.sqrt(w @ cov @ w)
        # Marginal risk contributions
        mrc = (cov @ w) / port_vol
        rc  = w * mrc               # Asset risk contributions
        # Minimise sum of squared differences from equal share
        target = port_vol / n
        return np.sum((rc - target) ** 2)

    result = minimize(risk_budget_objective,
                      x0=np.ones(n) / n,
                      method='SLSQP',
                      constraints={'type': 'eq', 'fun': lambda x: np.sum(x) - 1},
                      bounds=[(1e-6, 1)] * n)
    return pd.Series(result.x / result.x.sum(), index=returns.columns)`,
    codeLabel: 'risk_parity.py — ERC Optimisation',
  },

  // ── Algorithmic Strategies ──────────────────────────────────────────────────
  {
    id: 'pairs-trading',
    category: 'algo',
    title: 'Pairs Trading Statistical Arbitrage System',
    subtitle: 'Algorithmic Strategies',
    icon: FiBarChart2,
    description:
      'End-to-end statistical arbitrage pipeline: screens a multi-sector equity universe for cointegrated pairs using Engle-Granger two-step tests, robustness-checked with the Johansen trace statistic. Computes hedge ratios via OLS on log-prices. Signal generation uses a rolling 60-day z-score with entry at ±2σ and exit at ±0.5σ. Validated using walk-forward backtesting (2-year train / 1-year test windows) with 10bps transaction costs per leg to avoid in-sample bias.',
    highlights: [
      'Pair screening: Engle-Granger cointegration test (p < 0.05), confirmed by Johansen trace statistic',
      'OLS hedge ratio on log-prices — stationary spread validated via ADF unit root test',
      'Walk-forward validation (504-day train / 252-day test) — zero look-ahead bias',
      '10bps transaction cost per leg; portfolio P&L aggregated across top 5 cointegrated pairs',
    ],
    metrics: [
      { label: 'Portfolio Sharpe', value: '1.65' },
      { label: 'Hit Rate', value: '63%' },
      { label: 'Avg Holding Period', value: '12d' },
      { label: 'Pairs Screened', value: '50+' },
    ],
    tech: ['Python', 'Statsmodels', 'NumPy', 'Pandas', 'yFinance'],
    images: [
      { src: '/quant/algorithmic/pairs-trading/stat_arb_correlation.png', caption: 'Cross-Sector Correlation Heatmap — Pair Selection Universe' },
      { src: '/quant/algorithmic/pairs-trading/spread_zscore_BAC_PNC.png', caption: 'BAC–PNC: Spread & Rolling Z-Score with Trade Signals' },
      { src: '/quant/algorithmic/pairs-trading/portfolio_cumulative_pnl.png', caption: 'Portfolio Cumulative P&L — Walk-Forward Backtest' },
    ],
    code: `def walk_forward_backtest(self, train_len=504, test_len=252):
    for start_idx in range(0, total_len - train_len, test_len):
        train = self.data.iloc[start_idx : start_idx + train_len]
        test  = self.data.iloc[start_idx + train_len : start_idx + train_len + test_len]

        # 1. Estimate hedge ratio on training window only
        beta = compute_hedge_ratio(train, self.s1, self.s2)

        # 2. Compute spread Z-score on test window (with 60-day lookback)
        context = self.data.iloc[start_idx + train_len - 60 : start_idx + train_len + test_len]
        spread, zscore = compute_spread_zscore(context, self.s1, self.s2, beta)

        # 3. Signal: entry ±2σ, exit ±0.5σ, 10bps round-trip cost
        signals = np.where(zscore < -2, 1, np.where(zscore > 2, -1, 0))
        pnl = self._simulate_trades(test, signals, beta, self.tc)`,
    codeLabel: 'statistical_arbitrage.py — Walk-Forward Engine',
  },
  {
    id: 'regime-switching',
    category: 'algo',
    title: 'HMM Regime Detection & Factor Rotation',
    subtitle: 'Algorithmic Strategies',
    icon: FiActivity,
    description:
      'Implements a Hidden Markov Model (HMM) to detect latent market regimes (Risk-On, Risk-Off, Transitional) from SPY returns augmented with macro features — VIX level and yield curve slope (10Y–2Y). Identifies regime-conditional factor performance (Momentum, Min-Vol, Value) and builds a walk-forward factor rotation strategy that allocates to the best-performing factor ETF for the predicted regime, benchmarked against SPY and equal-weight factor exposure.',
    highlights: [
      'HMM with Gaussian emissions fitted on returns + VIX + Yield Curve — 3-state latent regime',
      'Regime transition probability matrix estimated via Baum-Welch EM algorithm',
      'Factor conditional performance heatmap: MTUM / USMV / IVE return distributions by regime',
      'Walk-forward rotation strategy outperforms equal-weight factor blend and SPY benchmark',
    ],
    metrics: [
      { label: 'HMM States', value: '3' },
      { label: 'Regimes Identified', value: 'Risk-On / Off / Trans.' },
      { label: 'Rotation vs. SPY', value: 'α > 0' },
      { label: 'Features Used', value: 'Returns + VIX + Yield Curve' },
    ],
    tech: ['Python', 'hmmlearn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
    images: [
      { src: '/quant/algorithmic/regime-switching/hmm_regimes_timeline.png', caption: 'HMM Regime Classification Timeline (2014–Present)' },
      { src: '/quant/algorithmic/regime-switching/regime_factor_heatmap.png', caption: 'Factor Return Heatmap by Market Regime' },
      { src: '/quant/algorithmic/regime-switching/hmm_transition_matrix.png', caption: 'Regime Transition Probability Matrix' },
      { src: '/quant/algorithmic/regime-switching/strategy_cum_returns.png', caption: 'Rotation Strategy vs. SPY & Factor Benchmarks' },
    ],
    code: `class RegimeDetector:
    def fit_hmm(self, returns, extra_features=None, n_states=3):
        """Fit Gaussian HMM with optional macro features."""
        features = returns[['SPY']].copy()
        if extra_features is not None:
            features = pd.concat([features, extra_features], axis=1).dropna()

        self.model = GaussianHMM(
            n_components=n_states,
            covariance_type="full",
            n_iter=1000,
            random_state=42
        )
        self.model.fit(features.values)
        hidden_states = self.model.predict(features.values)
        return pd.Series(hidden_states, index=features.index)

    def get_transition_matrix(self):
        return pd.DataFrame(self.model.transmat_,
                            index=[f'Regime {i}' for i in range(self.model.n_components)])`,
    codeLabel: 'regime_detector.py — HMM Fitting',
  },

  // ── Derivatives & Volatility ────────────────────────────────────────────────
  {
    id: 'monte-carlo',
    category: 'deriv',
    title: 'Monte Carlo Options Pricing Engine',
    subtitle: 'Derivatives & Volatility',
    icon: FiCpu,
    description:
      'Production-grade Monte Carlo engine supporting three stochastic processes — Geometric Brownian Motion (GBM), Heston stochastic volatility (mean-reverting variance), and Merton jump-diffusion (capturing tail events). Calibrated directly to live market data via yFinance. Implements antithetic variates for variance reduction. Prices European, Asian (path-dependent average), knock-out Barrier, and floating-strike Lookback options. Greeks computed via finite-difference bumping.',
    highlights: [
      'Three processes: GBM (baseline), Heston (stochastic vol, ρ = –0.7), Merton (jump intensity λ = 2.0)',
      'Antithetic variates halve standard error for equivalent simulation count vs. standard MC',
      'Convergence verified against Black-Scholes closed-form price across simulation sizes',
      'Full Greeks surface (Δ, V) computed via finite difference across K × T grid using 5,000 paths',
    ],
    metrics: [
      { label: 'Models', value: 'GBM / Heston / Merton' },
      { label: 'Option Types', value: 'EU / Asian / Barrier / Lookback' },
      { label: 'Paths per Price', value: '10,000+' },
      { label: 'Greeks Computed', value: 'Δ, Γ, Θ, V, ρ' },
    ],
    tech: ['Python', 'NumPy', 'SciPy', 'yFinance', 'Matplotlib'],
    images: [
      { src: '/quant/derivatives/monte-carlo/heston_path_fan.png', caption: 'Heston Stochastic Vol — 1,000 Simulated SPY Price Paths' },
      { src: '/quant/derivatives/monte-carlo/mc_convergence.png', caption: 'MC Convergence vs. Black-Scholes: Standard vs. Antithetic' },
      { src: '/quant/derivatives/monte-carlo/delta_surface.png', caption: 'Delta Surface across Strike × Maturity Grid' },
      { src: '/quant/derivatives/monte-carlo/vega_surface.png', caption: 'Vega Surface across Strike × Maturity Grid' },
    ],
    code: `def simulate_heston(S0, r, q, V0, kappa, theta, xi, rho, T, steps, n_paths):
    """Heston stochastic volatility model (Euler-Maruyama discretisation)."""
    dt = T / steps
    S  = np.zeros((steps + 1, n_paths));  S[0]  = S0
    V  = np.zeros((steps + 1, n_paths));  V[0]  = V0

    for t in range(1, steps + 1):
        Z1 = np.random.randn(n_paths)
        Z2 = rho * Z1 + np.sqrt(1 - rho**2) * np.random.randn(n_paths)

        # Variance process — Full Truncation scheme (prevents V < 0)
        V[t] = (np.maximum(V[t-1], 0)
                + kappa * (theta - np.maximum(V[t-1], 0)) * dt
                + xi * np.sqrt(np.maximum(V[t-1], 0) * dt) * Z2)

        S[t] = S[t-1] * np.exp((r - q - 0.5 * np.maximum(V[t-1], 0)) * dt
                                + np.sqrt(np.maximum(V[t-1], 0) * dt) * Z1)
    return S`,
    codeLabel: 'mc_engine.py — Heston Simulation',
  },
  {
    id: 'iv-surface',
    category: 'deriv',
    title: 'Implied Volatility Surface & SVI Calibration',
    subtitle: 'Derivatives & Volatility',
    icon: FiBarChart2,
    description:
      'Extracts implied volatility from live options chains (AAPL, SPY) via numerical inversion of the Black-Scholes formula using Brent root-finding. Builds the raw IV surface across the full strike-maturity grid, removing outliers and bid-ask noise. Fits the Stochastic Volatility Inspired (SVI) parameterisation (Gatheral, 2004) per maturity slice to produce a smooth, arbitrage-free surface. Analyses volatility smiles and term structure dynamics.',
    highlights: [
      'BS IV extraction via Brent root-finding on live options chain data from yFinance',
      'SVI parameterisation: a + b·[ρ(k−m) + √((k−m)²+σ²)] fitted per expiry slice',
      'Arbitrage checks: calendar spread and butterfly monotonicity constraints enforced',
      'Term structure analysis: ATM vol plotted across expiries — contango vs. backwardation',
    ],
    metrics: [
      { label: 'Underlyings', value: 'AAPL, SPY' },
      { label: 'Surface Model', value: 'SVI (Gatheral 2004)' },
      { label: 'IV Extraction', value: 'Brent Root-Finding' },
      { label: 'Maturities Fitted', value: '4–6 expiries' },
    ],
    tech: ['Python', 'SciPy', 'NumPy', 'yFinance', 'Matplotlib'],
    images: [
      { src: '/quant/derivatives/iv-surface/AAPL_fitted_surface.png', caption: 'AAPL — SVI-Fitted Implied Volatility Surface' },
      { src: '/quant/derivatives/iv-surface/SPY_fitted_surface.png', caption: 'SPY — SVI-Fitted Implied Volatility Surface' },
      { src: '/quant/derivatives/iv-surface/term_structure_comparison.png', caption: 'ATM Volatility Term Structure: AAPL vs. SPY' },
      { src: '/quant/derivatives/iv-surface/AAPL_smile_2026-04-02.png', caption: 'AAPL Volatility Smile — Near-Term Expiry' },
    ],
    code: `def get_implied_vol(market_price, S, K, T, r, q, option_type='call'):
    """Invert BS formula via Brent's method to extract implied vol."""
    def objective(sigma):
        return bs_price(S, K, T, r, q, sigma, option_type) - market_price

    try:
        # Brent's method — robust bracketed root-finding
        iv = brentq(objective, a=1e-6, b=10.0, xtol=1e-8, maxiter=500)
        return iv if 0.01 < iv < 5.0 else np.nan
    except (ValueError, RuntimeError):
        return np.nan

def fit_svi_slice(log_moneyness, market_ivs):
    """Fit SVI parameterisation to a single expiry slice."""
    # SVI: w(k) = a + b·[ρ(k-m) + sqrt((k-m)² + σ²)]
    def svi_total_var(params, k):
        a, b, rho, m, sigma = params
        return a + b * (rho*(k-m) + np.sqrt((k-m)**2 + sigma**2))
    result = minimize(lambda p: np.sum((svi_total_var(p, log_moneyness) - market_ivs**2)**2), ...)
    return result.x`,
    codeLabel: 'svi_model.py + black_scholes.py',
  },

  // ── Market Microstructure & Execution ──────────────────────────────────────
  {
    id: 'almgren-chriss',
    category: 'execution',
    title: 'Optimal Execution — Almgren-Chriss Model',
    subtitle: 'Market Microstructure & Execution',
    icon: FiActivity,
    description:
      'Implements the Almgren-Chriss (2001) framework for optimal liquidation of large equity positions with market impact. Solves for the mean-variance efficient execution frontier by trading off expected market impact cost against execution risk (variance of unexecuted inventory). Parameters (temporary and permanent impact coefficients, volatility) are calibrated from live AAPL tick data. Monte Carlo (1,000 paths) simulates realised cost distributions for each strategy.',
    highlights: [
      'Almgren-Chriss model: closed-form optimal trajectory minimising E[Cost] + λ·Var[Cost]',
      'Efficient frontier spans TWAP (λ→0, risk-neutral) to aggressive fast execution (λ→∞)',
      'Market impact parameters calibrated from intraday AAPL volume profile — U-shaped intraday vol',
      '1,000-path Monte Carlo cost distribution for each strategy — tail risk at 95th percentile',
    ],
    metrics: [
      { label: 'Liquidation Size', value: '1M shares' },
      { label: 'Execution Horizon', value: '1 trading day' },
      { label: 'MC Paths', value: '1,000 per strategy' },
      { label: 'Strategies vs. TWAP', value: 'AC Optimal / Aggressive' },
    ],
    tech: ['Python', 'NumPy', 'SciPy', 'yFinance', 'Pandas'],
    images: [
      { src: '/quant/execution/almgren-chriss/execution_frontier.png', caption: 'Execution Efficient Frontier — Expected Cost vs. Variance' },
      { src: '/quant/execution/almgren-chriss/trajectory_comparison.png', caption: 'Optimal vs. TWAP / VWAP Execution Trajectories' },
      { src: '/quant/execution/almgren-chriss/intraday_vol_profile.png', caption: 'Intraday Volume Profile — Calibrated from AAPL Tick Data' },
      { src: '/quant/execution/almgren-chriss/cost_distributions.png', caption: 'MC Cost Distributions — Strategy Comparison' },
    ],
    code: `class AlmgrenChriss:
    def get_optimal_trajectory(self, lmbda):
        """
        Closed-form optimal liquidation schedule.
        lmbda: risk-aversion parameter (0 = TWAP, ∞ = instant liquidation)
        """
        eta   = self.params['eta']    # temporary impact
        gamma = self.params['gamma']  # permanent impact
        sigma = self.params['sigma']
        tau   = self.T / self.N       # time per step

        # Almgren-Chriss (2001) Eq. 2.9
        kappa_sq = lmbda * sigma**2 / eta
        kappa    = np.sqrt(kappa_sq)

        # Optimal remaining inventory at each step
        j = np.arange(self.N + 1)
        x = self.X * np.sinh(kappa * (self.T - j * tau)) / np.sinh(kappa * self.T)
        return x   # shares remaining at each time step`,
    codeLabel: 'ac_model.py — Optimal Trajectory',
  },
  {
    id: 'vwap-twap',
    category: 'execution',
    title: 'VWAP / TWAP Execution Analytics with Slippage Decomposition',
    subtitle: 'Market Microstructure & Execution',
    icon: FiShield,
    description:
      'Implements VWAP and TWAP benchmark schedulers with full market microstructure simulation: bid-ask spread, temporary price impact (square-root model), permanent impact, and intraday volume seasonality. Decomposes realised Implementation Shortfall into: spread cost, timing risk, market impact, and opportunity cost components. Benchmarks both algorithms against the Almgren-Chriss efficient frontier under varying liquidity regimes.',
    highlights: [
      'VWAP: volume-weighted schedule derived from calibrated intraday profile — minimises tracking error',
      'TWAP: uniform time-sliced execution — simplest benchmark, highest market impact in volatile periods',
      'Implementation Shortfall waterfall decomposed into 4 components: spread / timing / impact / opportunity',
      'Sensitivity heatmap: slippage as a function of market volatility × order size',
    ],
    metrics: [
      { label: 'Benchmark Algorithms', value: 'VWAP & TWAP' },
      { label: 'Impact Model', value: 'Square-Root Law' },
      { label: 'IS Decomposition', value: '4 Components' },
      { label: 'Sensitivity Analysis', value: 'Vol × Order Size Grid' },
    ],
    tech: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
    images: [
      { src: '/quant/execution/vwap-twap/vwap_slippage_waterfall.png', caption: 'VWAP: Implementation Shortfall Waterfall Decomposition' },
      { src: '/quant/execution/vwap-twap/microstructure_profiles.png', caption: 'Intraday Microstructure Profiles — Spread, Volume & Volatility' },
      { src: '/quant/execution/vwap-twap/benchmark_vs_ac_frontier.png', caption: 'VWAP / TWAP vs. Almgren-Chriss Efficient Frontier' },
      { src: '/quant/execution/vwap-twap/twap_slippage_waterfall.png', caption: 'TWAP: Implementation Shortfall Waterfall Decomposition' },
    ],
    code: `def simulate_vwap_execution(volume_profile, X_total, S0, params, n_paths=1000):
    """
    Simulates VWAP execution with full microstructure costs.
    Implementation Shortfall decomposition:
      IS = Spread Cost + Timing Risk + Market Impact + Opportunity Cost
    """
    schedule = volume_profile / volume_profile.sum() * X_total
    costs = []

    for _ in range(n_paths):
        price_path = simulate_gbm_intraday(S0, params['sigma'], len(schedule))
        exec_cost  = 0

        for t, (shares, mid) in enumerate(zip(schedule, price_path)):
            spread_cost  = shares * params['spread'] / 2
            impact       = params['eta'] * np.sqrt(shares / params['avg_volume'])
            exec_cost   += shares * (mid + impact) + spread_cost

        arrival_cost = X_total * price_path[0]
        costs.append(exec_cost - arrival_cost)   # Implementation Shortfall

    return np.array(costs)`,
    codeLabel: 'benchmark_simulator.py — IS Simulation',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const MetricBadge = ({ label, value }) => (
  <div className="bg-slate-900 rounded-lg px-3 py-2 text-center">
    <p className="text-emerald-400 text-base font-bold leading-tight">{value}</p>
    <p className="text-slate-400 text-xs mt-0.5 leading-tight">{label}</p>
  </div>
);

const TechChip = ({ label }) => (
  <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md font-mono border border-slate-700">
    {label}
  </span>
);

const ImageGallery = ({ images }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative rounded-lg overflow-hidden bg-slate-900" style={{ aspectRatio: '16/9' }}>
        <img
          src={images[active].src}
          alt={images[active].caption}
          className="w-full h-full object-contain"
          style={{ background: '#0f172a' }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent px-3 py-2">
          <p className="text-slate-300 text-xs">{images[active].caption}</p>
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 rounded overflow-hidden border-2 transition ${
                i === active ? 'border-emerald-500' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              style={{ aspectRatio: '16/9', background: '#0f172a' }}
            >
              <img src={img.src} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ImplementationCard = ({ item }) => {
  const [showCode, setShowCode] = useState(false);
  const Icon = item.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="text-emerald-400" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-1">{item.subtitle}</p>
            <h3 className="text-white text-xl font-bold leading-tight">{item.title}</h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Description + Details */}
          <div className="flex flex-col gap-5">
            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>

            {/* Highlights */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Key Methodological Features</h4>
              <ul className="space-y-2">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-emerald-500 flex-shrink-0 mt-0.5 font-bold">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Performance & Scale</h4>
              <div className="grid grid-cols-2 gap-2">
                {item.metrics.map((m) => (
                  <MetricBadge key={m.label} label={m.label} value={m.value} />
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {item.tech.map((t) => <TechChip key={t} label={t} />)}
              </div>
            </div>
          </div>

          {/* Right: Image Gallery */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Output Visualisations</h4>
            <ImageGallery images={item.images} />
          </div>
        </div>

        {/* Code Snippet (collapsible) */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition"
          >
            <FiCode size={14} />
            <span>{item.codeLabel}</span>
            {showCode ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>

          {showCode && (
            <div className="mt-3 rounded-lg overflow-hidden border border-slate-800">
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-slate-400 text-xs ml-2 font-mono">{item.codeLabel}</span>
              </div>
              <pre
                className="bg-slate-950 text-slate-200 text-xs p-4 overflow-x-auto leading-relaxed"
                style={{ fontFamily: 'JetBrains Mono, Fira Code, monospace' }}
              >
                <code>{item.code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const QuantitativeAnalysis = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? IMPLEMENTATIONS
    : IMPLEMENTATIONS.filter((p) => p.category === activeCategory);

  const categoryCount = (id) =>
    id === 'all' ? IMPLEMENTATIONS.length : IMPLEMENTATIONS.filter((p) => p.category === id).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FiCpu className="text-emerald-400" size={28} />
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
              Quantitative Finance
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Quantitative Analysis</h1>
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            End-to-end Python implementations spanning portfolio construction, statistical arbitrage,
            derivatives pricing, and optimal execution — built to institutional standards with
            walk-forward validation, calibrated parameters, and production-quality visualisations.
          </p>
          <div className="flex flex-wrap gap-8 mt-8">
            {[
              { value: IMPLEMENTATIONS.length.toString(), label: 'Implementations' },
              { value: '4', label: 'Domains' },
              { value: '10+', label: 'Years Backtested' },
              { value: '100%', label: 'Python' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-emerald-400">{value}</p>
                <p className="text-slate-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded whitespace-nowrap transition flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-emerald-400'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                  activeCategory === cat.id ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-100 text-slate-400'
                }`}>
                  {categoryCount(cat.id)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Implementations ───────────────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {filtered.map((item) => (
            <ImplementationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── Toolkit ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-900 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white mb-8">Quantitative Toolkit</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Optimisation', items: ['CVXPY', 'SciPy', 'cvxopt', 'SLSQP / interior-point'] },
              { title: 'Statistics & ML', items: ['Statsmodels', 'Scikit-Learn', 'hmmlearn', 'Pandas / NumPy'] },
              { title: 'Market Data', items: ['yFinance', 'Quandl', 'FRED API', 'Options chains'] },
              { title: 'Visualisation', items: ['Matplotlib', 'Seaborn', 'Plotly', 'Custom dark themes'] },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">{col.title}</h3>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-slate-400">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuantitativeAnalysis;
