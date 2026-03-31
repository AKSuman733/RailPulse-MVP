import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashboard.css";

const STATUS_META = {
  HEALTHY: {
    color: "#39c58d",
    soft: "rgba(57, 197, 141, 0.14)",
    accent: "#6ad7a6",
  },
  DEGRADED: {
    color: "#f7b733",
    soft: "rgba(247, 183, 51, 0.14)",
    accent: "#ffc85c",
  },
  CRITICAL: {
    color: "#eb5757",
    soft: "rgba(235, 87, 87, 0.14)",
    accent: "#ff7a7a",
  },
};

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_URL;

      const res = await axios.get(`${BASE_URL}/api/metrics`);
      //const res = await axios.get("http://localhost:5000/api/metrics");
      setData(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError("Unable to load live network metrics right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const banks = data.map((bank, index) => {
    const healthScore = normalizeScore(bank.healthScore);
    const successRate = clampValue(bank.successRate);
    const pendingRate = clampValue(bank.pendingRate);
    const avgLatency = Number(bank.avgLatency || 0);
    const status = STATUS_META[bank.status] ? bank.status : "CRITICAL";

    return {
      ...bank,
      id: `${bank.bank}-${index}`,
      healthScore,
      successRate,
      pendingRate,
      avgLatency,
      status,
      statusMeta: STATUS_META[status],
    };
  });

  const avgScore = banks.length
    ? Math.round(
        banks.reduce((sum, bank) => sum + bank.healthScore, 0) / banks.length
      )
    : 0;
  const avgLatency = banks.length
    ? Math.round(
        banks.reduce((sum, bank) => sum + bank.avgLatency, 0) / banks.length
      )
    : 0;
  const healthyCount = banks.filter((bank) => bank.status === "HEALTHY").length;
  const degradedCount = banks.filter((bank) => bank.status === "DEGRADED").length;
  const criticalCount = banks.filter((bank) => bank.status === "CRITICAL").length;

  const chartData = banks.map((bank) => ({
    bank: shortenName(bank.bank),
    success: Number(roundOne(bank.successRate)),
    pending: Number(roundOne(bank.pendingRate)),
  }));

  const distributionData = [
    { name: "Healthy", value: healthyCount, color: STATUS_META.HEALTHY.color },
    { name: "Degraded", value: degradedCount, color: STATUS_META.DEGRADED.color },
    { name: "Critical", value: criticalCount, color: STATUS_META.CRITICAL.color },
  ].filter((item) => item.value > 0);

  const latencyLeaders = [...banks]
    .sort((left, right) => left.avgLatency - right.avgLatency)
    .slice(0, 4);

  return (
    <div className="fintech-page">
      <div className="dashboard-topline">
        <div>
          <p className="dashboard-kicker">Operational Intelligence</p>
          <h3 className="dashboard-title">
            Live network health across partner institutions
          </h3>
        </div>

        <div className="dashboard-refresh-badge">
          <span className="uptime-dot" />
          Refreshing every 10 seconds
        </div>
      </div>

      <main id="dashboard" className="dashboard-grid">
        <section id="overview" className="panel kpi-grid">
          <article className="kpi-card">
            <p className="panel-label">Avg Score</p>
            <strong className="kpi-value healthy">{avgScore}</strong>
            <span className="panel-subtext">across all banks</span>
          </article>

          <article className="kpi-card">
            <p className="panel-label">Healthy</p>
            <strong className="kpi-value healthy">{healthyCount}</strong>
            <span className="panel-subtext">normal operations</span>
          </article>

          <article className="kpi-card">
            <p className="panel-label">Degraded</p>
            <strong className="kpi-value degraded">{degradedCount}</strong>
            <span className="panel-subtext">elevated issue</span>
          </article>

          <article className="kpi-card">
            <p className="panel-label">Critical</p>
            <strong className="kpi-value critical">{criticalCount}</strong>
            <span className="panel-subtext">needs attention</span>
          </article>

          <article className="kpi-card">
            <p className="panel-label">Avg Latency</p>
            <strong className="kpi-value healthy">{avgLatency}ms</strong>
            <span className="panel-subtext">mean response</span>
          </article>
        </section>

        <section className="panel chart-panel chart-panel-large">
          <div className="panel-heading">
            <h2>Success vs Pending Rates</h2>
            <p>Operational throughput by institution</p>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={310}>
              <BarChart data={chartData} barCategoryGap={18}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="bank"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#b6b2c6", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8d89a1", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    background: "#18171d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="success" fill="#38c48b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pending" fill="#f7b733" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel chart-panel">
          <div className="panel-heading">
            <h2>Status Distribution</h2>
            <p>How the network is behaving right now</p>
          </div>

          <div className="legend-row">
            <span className="legend-item">
              <i style={{ background: STATUS_META.HEALTHY.color }} />
              Healthy {healthyCount}
            </span>
            <span className="legend-item">
              <i style={{ background: STATUS_META.DEGRADED.color }} />
              Degraded {degradedCount}
            </span>
            <span className="legend-item">
              <i style={{ background: STATUS_META.CRITICAL.color }} />
              Critical {criticalCount}
            </span>
          </div>

          <div className="chart-wrap donut-wrap">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={distributionData}
                  innerRadius={66}
                  outerRadius={112}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="transparent"
                >
                  {distributionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#18171d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel latency-panel">
          <div className="panel-heading">
            <h2>Fastest Institutions</h2>
            <p>Lowest response times in the network</p>
          </div>

          <div className="latency-list">
            {latencyLeaders.map((bank) => (
              <div key={bank.id} className="latency-row">
                <span>{bank.bank}</span>
                <div className="latency-bar">
                  <div
                    className={`latency-bar-fill ${bank.status.toLowerCase()}`}
                    style={{
                      width: `${Math.max(18, 100 - Math.min(bank.avgLatency / 5, 82))}%`,
                    }}
                  />
                </div>
                <strong style={{ color: bank.statusMeta.color }}>
                  {bank.avgLatency} ms
                </strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel score-panel">
          <div className="panel-heading">
            <h2>Operational Signals</h2>
            <p>Combined view of health, pending pressure, and latency</p>
          </div>

          <div className="score-list">
            {banks.map((bank) => (
              <div key={bank.id} className="score-row">
                <div>
                  <p className="score-bank">{bank.bank}</p>
                  <p className="score-status" style={{ color: bank.statusMeta.color }}>
                    {bank.status}
                  </p>
                </div>

                <div className="score-track">
                  <div
                    className="score-track-fill"
                    style={{
                      width: `${bank.healthScore}%`,
                      background: `linear-gradient(90deg, ${bank.statusMeta.accent}, ${bank.statusMeta.color})`,
                    }}
                  />
                </div>

                <span className="score-meta">{roundOne(bank.pendingRate)}%</span>
                <span className="score-meta" style={{ color: bank.statusMeta.accent }}>
                  {bank.avgLatency} ms
                </span>
              </div>
            ))}
          </div>

          <p className="panel-footnote">
            Live data refreshes every 10 seconds from your metrics API.
          </p>
        </section>

        <section id="institutions" className="panel bank-table-panel">
          <div className="panel-heading">
            <h2>Bank Details</h2>
            <p>Institution-level health overview</p>
          </div>

          {error ? <div className="notice warning">{error}</div> : null}
          {loading ? <div className="notice">Loading live metrics...</div> : null}

          {!loading && !banks.length ? (
            <div className="notice">No bank metrics available.</div>
          ) : null}

          {!!banks.length && (
            <div className="bank-table">
              <div className="bank-table-header">
                <span>Bank</span>
                <span>Health Score</span>
                <span>Success %</span>
                <span>Pending %</span>
                <span>Latency</span>
                <span>Status</span>
              </div>

              {banks.map((bank) => (
                <div key={bank.id} className="bank-table-row">
                  <span className="bank-name">{bank.bank}</span>

                  <div
                    className="score-badge"
                    style={{
                      color: bank.statusMeta.color,
                      background: bank.statusMeta.soft,
                      boxShadow: `inset 0 0 0 1px ${bank.statusMeta.color}33`,
                    }}
                  >
                    {bank.healthScore}
                  </div>

                  <div className="metric-cell">
                    <strong className="success-text">{roundOne(bank.successRate)}%</strong>
                    <div className="mini-track">
                      <div
                        className="mini-track-fill healthy"
                        style={{ width: `${bank.successRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="metric-cell">
                    <strong className="pending-text">{roundOne(bank.pendingRate)}%</strong>
                    <div className="mini-track">
                      <div
                        className="mini-track-fill degraded"
                        style={{ width: `${bank.pendingRate}%` }}
                      />
                    </div>
                  </div>

                  <span className="latency-text" style={{ color: bank.statusMeta.accent }}>
                    {bank.avgLatency} ms
                  </span>

                  <span
                    className="status-pill"
                    style={{
                      color: bank.statusMeta.color,
                      background: bank.statusMeta.soft,
                    }}
                  >
                    {bank.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function normalizeScore(value) {
  const number = Number(value || 0);
  if (number <= 1) {
    return Math.round(number * 100);
  }
  return Math.round(number);
}

function clampValue(value) {
  return Math.max(0, Math.min(Number(value || 0), 100));
}

function roundOne(value) {
  return Number(value || 0).toFixed(1);
}

function shortenName(name) {
  if (!name) return "";
  if (name.length <= 8) return name;
  return name.split(" ")[0];
}
