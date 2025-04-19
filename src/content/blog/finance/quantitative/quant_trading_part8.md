---
title: [Part 8] Quantitative Trading: Advanced Market Making with Avellaneda-Stoikov
date: 2024-04-19
category: finance
subCategory: Quantitative Trading
excerpt: We dive deep into the Avellaneda-Stoikov model
---

Welcome to Part 8 of our quantitative trading series! In this installment, we dive deep into the **Avellaneda-Stoikov model**, a sophisticated framework for market making that optimizes bid and ask prices to balance profitability and risk. Market makers provide liquidity by quoting buy and sell prices, but they face challenges like **inventory risk**, where holding large positions can lead to losses if prices move unfavorably. This model uses advanced mathematical tools to address these issues, making it a cornerstone of high-frequency trading and liquidity provision.

This blog post provides a detailed exploration of ten key concepts, complete with mathematical formulations, intuitive explanations, practical examples, and illustrative descriptions to bring the theory to life. Whether you're a beginner or an experienced trader, this guide will help you understand how to apply these concepts in real-world trading scenarios.

## 1. Brownian Motion in Asset Pricing

### Definition and Role

Brownian motion, a continuous-time stochastic process, models the random fluctuations of asset prices driven by countless small, independent factors like market news or trader actions. In the Avellaneda-Stoikov model, asset prices follow a **Brownian motion** without drift, where the price increment is:
\[
dz_t = \sigma dw_t
\]

- \(\sigma\): Volatility (price variability)
- \(dw_t\): Increment of a standard Brownian motion (\(w_t \sim N(0, t)\))

This assumes prices move randomly but continuously, a foundation for pricing derivatives and simulating market dynamics.

### Applications

- **Price Simulation**: Generates realistic price paths for testing strategies.
- **Risk Modeling**: Estimates potential price swings for risk management.
- **Option Pricing**: Underpins models like Black-Scholes.

### Example

Consider a stock with \(\sigma = 0.02\) (2% daily volatility). Its price \(S_t\) evolves as \(dS_t = \sigma dw_t\). Over a day, the price might fluctuate randomly, e.g., from $100 to $101.50 or $98.75, depending on the random \(dw_t\).

### Illustration

A plot of \(S_t\) over time shows a jagged, random path, reflecting price volatility. Using Python’s Matplotlib and NumPy, you can simulate this by generating random increments and plotting the cumulative sum.

## 2. Poisson Process in Order Arrival

### Definition and Role

A Poisson process models the random, independent arrival of events, such as buy or sell orders in a market. In the Avellaneda-Stoikov model, buy (\(\lambda_b\)) and sell (\(\lambda_a\)) order rates depend exponentially on the bid (\(\Delta_b\)) and ask (\(\Delta_a\)) spreads:
\[
\lambda = A \cdot e^{-k \Delta}
\]

- \(A\): Base arrival rate
- \(k\): Sensitivity to spread
- \(\Delta\): Spread size

Smaller spreads increase order flow, while larger spreads reduce it, helping market makers control liquidity.

### Applications

- **Order Flow Prediction**: Estimates trade frequency for pricing strategies.
- **Market Making**: Sets spreads to balance order volume and profit.
- **High-Frequency Trading**: Models rapid order arrivals.

### Example

With \(A = 10\) orders per minute, \(k = 100\), and \(\Delta = 0.01\), the arrival rate is:
\[
\lambda = 10 \cdot e^{-100 \cdot 0.01} \approx 3.68 \text{ orders/min}
\]
If \(\Delta = 0.02\), then:
\[
\lambda = 10 \cdot e^{-2} \approx 1.35 \text{ orders/min}
\]
This shows how spread size influences trading activity.

### Illustration

A histogram of order arrivals over time, generated with Python’s SciPy, shows more frequent arrivals for smaller spreads, resembling a Poisson distribution.

## 3. Inventory Dynamics

### Definition and Role

The market maker’s inventory \(q_t\) is the net number of shares held, evolving based on incoming orders:
\[
dq_t = dN_b - dN_a
\]

- \(dN_b\): Buy order increments (Poisson process, rate \(\lambda_b\))
- \(dN_a\): Sell order increments (Poisson process, rate \(\lambda_a\))

The goal is to keep \(q_t\) near zero to minimize price movement risk.

### Applications

- **Risk Management**: Prevents large inventory imbalances.
- **Spread Adjustment**: Guides dynamic pricing to control \(q_t\).

### Example

Starting with \(q_0 = 0\), if 5 buy orders (\(dN_b = 5\)) and 3 sell orders (\(dN_a = 3\)) arrive:
\[
q_t = 0 + 5 - 3 = 2
\]
The market maker is now long 2 shares and may adjust spreads to encourage selling.

### Illustration

A line plot of \(q_t\) over time shows fluctuations as orders arrive, ideally oscillating around zero. Python simulations can visualize this dynamic.

### Table: Inventory Scenarios

| Initial Inventory | Buy Orders | Sell Orders | Final Inventory | Action           |
| ----------------- | ---------- | ----------- | --------------- | ---------------- |
| 0                 | 5          | 3           | +2 (Long)       | Widen ask spread |
| 0                 | 2          | 6           | -4 (Short)      | Widen bid spread |
| 0                 | 4          | 4           | 0 (Neutral)     | Maintain spreads |

## 4. Cash Account

### Definition and Role

The cash account \(x_t\) tracks the market maker’s cash flow from transactions:
\[
dx_t = p_a \cdot dN_a - p_b \cdot dN_b
\]

- \(p_a\): Ask price
- \(p_b\): Bid price
- \(dN_a\), \(dN_b\): Sell and buy order increments

This reflects the financial impact of trading activity.

### Applications

- **Profit Tracking**: Monitors cash inflows and outflows.
- **P&L Calculation**: Combines with inventory value for total wealth.

### Example

With 3 buy orders at \(p_b = 50\) and 2 sell orders at \(p_a = 51\):
\[
x_t = 51 \cdot 2 - 50 \cdot 3 = 102 - 150 = -48
\]
The negative cash flow indicates a net outflow, offset by inventory value.

### Illustration

A plot of \(x_t\) over time shows cash fluctuations, often negative initially due to buying but recovering with sales. Matplotlib can generate this.

## 5. Utility Function

### Definition and Role

The utility function quantifies the market maker’s preferences, balancing profit and risk. The Avellaneda-Stoikov model uses an exponential utility:
\[
U(y_t) = -e^{-\gamma y_t}
\]

- \(y_t = x_t + q_t \cdot S_t\): Total wealth (cash + inventory value)
- \(\gamma\): Risk aversion parameter

This encourages maximizing wealth while penalizing large risks.

### Applications

- **Optimization**: Guides spread settings to maximize expected utility.
- **Risk Aversion**: Reflects preference for stable profits.

### Example

With \(\gamma = 0.1\), \(y_t = 1000\), utility is:
\[
U(1000) = -e^{-0.1 \cdot 1000} = -e^{-100} \approx -2.7 \times 10^{-44}
\]
Higher \(y_t\) increases utility, but the exponential form limits risk-taking.

### Illustration

A plot of \(U(y_t)\) versus \(y_t\) shows a steep curve, indicating diminishing returns for higher wealth, reflecting risk aversion.

## 6. Hamilton-Jacobi-Bellman (HJB) Equation

### Definition and Role

The HJB equation is a second-order nonlinear partial differential equation (PDE) used to find the optimal control policy:
\[
\sup\_{\Delta_b, \Delta_a} \left[ \text{terms involving } u, \lambda_b, \lambda_a, \sigma \right] = 0
\]
Here, \(u(q_t, t)\) is the value function, representing the maximum expected utility.

### Applications

- **Optimal Spreads**: Solves for \(\Delta_b\) and \(\Delta_a\).
- **Dynamic Control**: Adapts strategy to changing market conditions.

### Example

Solving the HJB equation numerically yields optimal spreads that balance order flow and inventory risk, implemented in tools like Python’s SciPy.

### Illustration

A surface plot of \(u(q_t, t)\) versus \(q_t\) and \(t\) shows how value changes with inventory and time, guiding strategy.

## 7. Control Variables

### Definition and Role

The control variables are the bid spread \(\Delta_b\) and ask spread \(\Delta_a\), which the market maker adjusts to optimize utility.

### Applications

- **Inventory Management**: Skew spreads to reduce \(q_t\).
- **Profit Optimization**: Set spreads to maximize order flow profits.

### Example

If \(q_t = 5\) (long), reduce \(\Delta_b\) to attract buy orders and increase \(\Delta_a\) to deter sell orders, rebalancing inventory.

### Illustration

A plot of \(\Delta_b\) and \(\Delta_a\) over time shows dynamic adjustments, often asymmetric based on \(q_t\).

## 8. Optimal Spreads

### Definition and Role

The optimal spreads are derived from the HJB equation. For the Avellaneda-Stoikov model, the bid and ask spreads are:
\[
\Delta_b = \frac{1}{\gamma} \ln \left( 1 + \frac{\gamma}{k} \right)
\]
\[
\Delta_a = \Delta_b
\]
The total bid-ask spread is:
\[
\text{spread} = \Delta_a + \Delta_b = \frac{2}{\gamma} \ln \left( 1 + \frac{\gamma}{k} \right)
\]
Note: In finite-horizon cases, an additional term \(\gamma \sigma^2 (T - t)\) may apply, but the above is for infinite horizon or simplified scenarios.

### Applications

- **Pricing Strategy**: Sets competitive bid and ask prices.
- **Risk Control**: Adjusts spreads based on market conditions.

### Example

With \(\gamma = 0.1\), \(k = 1.5\):
\[
\Delta_b = \frac{1}{0.1} \ln \left( 1 + \frac{0.1}{1.5} \right) \approx 10 \cdot \ln(1.0667) \approx 0.645
\]
\[
\text{spread} = 2 \cdot 0.645 \approx 1.29
\]

### Illustration

A plot of spreads versus \(\gamma\) shows wider spreads for higher risk aversion, reflecting cautious pricing.

## 9. Performance Metrics

### Definition and Role

Performance metrics evaluate the strategy’s success:

- **Sharpe Ratio**: Risk-adjusted return.
- **Average Daily P&L**: Daily profit/loss.
- **Volatility**: P&L variability.
- **Inventory Control**: Measures how well \(q_t\) stays near zero.

### Applications

- **Strategy Evaluation**: Compares performance across scenarios.
- **Risk Assessment**: Identifies high-risk strategies.

### Example

A strategy with $200 daily P&L, $50 volatility, and Sharpe ratio of 1.5 indicates consistent profitability with moderate risk.

### Illustration

A histogram of P&L from 1000 simulations shows the distribution of outcomes, highlighting stability.

### Table: Performance Metrics

| Metric        | Value | Interpretation            |
| ------------- | ----- | ------------------------- |
| Avg Daily P&L | $200  | Consistent profit         |
| Volatility    | $50   | Moderate risk             |
| Sharpe Ratio  | 1.5   | Good risk-adjusted return |
| Max Inventory | ±10   | Effective control         |

## 10. Fundamental Market-Making Rules

### Definition and Role

Key rules include:

- **Volatility Response**: Increase spreads during high volatility or risk aversion.
- **Inventory Adjustment**: Widen ask spread for long inventory, bid spread for short.

### Applications

- **Practical Guidance**: Simplifies complex model outputs.
- **Robustness**: Ensures stability under shocks.

### Example

During a market shock (\(\sigma\) doubles), widen spreads from 1.29 to 2.0 to protect profits.

### Illustration

A table of spread adjustments versus inventory and volatility clarifies decision-making.

### Table: Spread Adjustments

| Condition       | Action                |
| --------------- | --------------------- |
| High Volatility | Widen both spreads    |
| Long Inventory  | Widen ask, narrow bid |
| Short Inventory | Widen bid, narrow ask |

## Detailed Avellaneda-Stoikov Model

### Assumptions

- **Price Dynamics**: \(dS_t = \sigma dw_t\) (Brownian motion, no drift).
- **Order Arrivals**: Poisson processes with \(\lambda_b = A e^{-k \Delta_b}\), \(\lambda_a = A e^{-k \Delta_a}\).
- **Objective**: Maximize \(E[U(y_T)] = E[-e^{-\gamma (x_T + q_T \cdot S_T)}]\).

### Key Formulas

- **Reservation Price**:
  \[
  p^\* = s + \frac{q_t \gamma \sigma^2 (T - t)}{2}
  \]
  Adjusts for inventory risk.
- **Optimal Spreads** (simplified, infinite horizon):
  \[
  \Delta_b = \Delta_a = \frac{1}{\gamma} \ln \left( 1 + \frac{\gamma}{k} \right)
  \]
  \[
  \text{spread} = \frac{2}{\gamma} \ln \left( 1 + \frac{\gamma}{k} \right)
  \]
- **Bid and Ask**:
  - Bid: \(p^\* - \Delta_b\)
  - Ask: \(p^\* + \Delta_a\)

### Simulation Example

Simulate with \(\gamma = 0.1\), \(\sigma = 0.02\), \(T = 1\), \(k = 1.5\), \(q_0 = 0\):

- At \(t = 0\), \(s = 100\), \(p^\* = 100\), \(\text{spread} \approx 1.29\).
- Bid = 99.355, Ask = 100.645.
- After 5 buy orders, \(q_t = 5\), updating \(p^\*\) and spreads dynamically.

### Illustrations

- **Price Path**: Random walk of \(S_t\).
- **Inventory**: \(q_t\) fluctuating around zero.
- **P&L**: Cumulative \(x_t + q_t \cdot S_t\).
- **Spreads**: Dynamic \(\Delta_b\), \(\Delta_a\) adjustments.

## Conclusion

The Avellaneda-Stoikov model offers a robust framework for market making, optimizing spreads to balance profit and risk. Its use of Brownian motion, Poisson processes, and stochastic control makes it ideal for high-frequency trading.
