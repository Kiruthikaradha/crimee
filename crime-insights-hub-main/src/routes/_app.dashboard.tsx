import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldAlert,
  Flame,
  Activity,
  Users,
  MapPin,
  Bell,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "../components/app/StatCard";
import { ExplainabilityPanel } from "../components/app/ExplainabilityPanel";
import { ForecastPanel } from "../components/app/ForecastPanel";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { apiService } from "../lib/api";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const icons = [ShieldAlert, TrendingUp, Activity, Users, Flame, Bell];

function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [explanation, setExplanation] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);

  useEffect(() => {
    apiService.login({ username: "admin", password: "admin123" }).catch(() => null).then(() => {
      apiService.getDashboard().then(setDashboard).catch(() => setDashboard(null));
      apiService.explainPrediction({
        latitude: 19.114,
        longitude: 72.867,
        hour: 22,
        day: 6,
        month: 7,
        season: "summer",
        population_density: 23000,
        previous_crime_count: 12,
        crime_category: "Theft",
      }).then(setExplanation).catch(() => setExplanation(null));
      apiService.getForecast({ horizon: "next_week", location: "Mumbai" }).then(setForecast).catch(() => setForecast(null));
    });
  }, []);

  const kpis = dashboard?.kpis ?? [];
  const monthlyTrend = dashboard?.monthly_trend ?? [];
  const crimeCategories = dashboard?.crime_categories ?? [];
  const statewise = dashboard?.statewise ?? [];
  const recentAlerts = dashboard?.alerts ?? [];

  const riskColor = (r: string) => ({
    low: "var(--color-risk-low)",
    medium: "var(--color-risk-med)",
    high: "var(--color-risk-high)",
    critical: "var(--color-risk-critical)",
  }[r] ?? "var(--color-risk-med)");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Command Center</div>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Operations Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live crime intelligence, predictions, and alerts across all jurisdictions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass rounded-xl px-3 py-2 text-xs text-muted-foreground">
            Last sync <span className="text-foreground">2 min ago</span>
          </div>
          <Link to="/heatmap" className="rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-glow)]">
            View heatmap
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k, i) => {
          const Icon = icons[i];
          return (
            <StatCard
              key={k.label}
              label={k.label}
              value={k.value}
              suffix={"suffix" in k ? (k as any).suffix : undefined}
              delta={k.delta}
              tone={k.tone as any}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>

      {/* Trend + Categories */}
      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div layout className="glass col-span-2 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Monthly Crime Trend</div>
              <div className="text-xs text-muted-foreground">Actual vs predicted (last 12 months)</div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#a78bfa]" /> Actual</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#22d3ee]" /> Predicted</span>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gb" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="crimes" stroke="#a78bfa" strokeWidth={2.5} fill="url(#ga)" />
                <Area type="monotone" dataKey="predicted" stroke="#22d3ee" strokeWidth={2} fill="url(#gb)" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="glass rounded-2xl p-5">
          <div className="text-sm font-semibold">Crime Distribution</div>
          <div className="text-xs text-muted-foreground">By category</div>
          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={crimeCategories} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                  {crimeCategories.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {crimeCategories.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                <span className="flex-1 truncate text-muted-foreground">{c.name}</span>
                <span className="font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* States + Alerts + AI Insight */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass col-span-2 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">District-wise Crimes</div>
              <div className="text-xs text-muted-foreground">Top districts in Tamil Nadu this year</div>
            </div>
          </div>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statewise} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis type="category" dataKey="state" stroke="rgba(255,255,255,0.4)" fontSize={11} width={100} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Bar dataKey="crimes" fill="url(#gbar)" radius={[0, 8, 8, 0]} />
                <defs>
                  <linearGradient id="gbar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {/* AI Insight */}
          <div className="glass relative overflow-hidden rounded-2xl p-5">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[image:var(--gradient-primary)] opacity-20 blur-2xl" />
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <BrainCircuit className="h-4 w-4" /> AI Insight
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              Weekend evening thefts in <b>Andheri East</b> are up <b>38%</b>. Model attributes 53% of risk to commercial density and time-of-day.
            </p>
            <Link to="/hotspots" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              Open hotspot detail <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Recent alerts */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Recent Alerts</div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="space-y-3">
              {recentAlerts.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: riskColor(a.risk) }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{a.type}</div>
                    <div className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {a.area} · {a.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <ExplainabilityPanel explanation={explanation} />
        <ForecastPanel forecast={forecast} />
      </div>

      {/* Map preview */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <div className="text-sm font-semibold">Live Hotspot Map</div>
            <div className="text-xs text-muted-foreground">Real-time predicted risk overlays</div>
          </div>
          <Link to="/heatmap" className="rounded-xl border border-border px-3 py-1.5 text-xs hover:bg-white/5">
            Open full map →
          </Link>
        </div>
        <div className="relative h-64 border-t border-border/60">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
          {[
            { x: "20%", y: "60%", s: 40, c: "var(--color-risk-critical)" },
            { x: "50%", y: "40%", s: 55, c: "var(--color-risk-high)" },
            { x: "70%", y: "70%", s: 30, c: "var(--color-risk-med)" },
            { x: "80%", y: "30%", s: 25, c: "var(--color-risk-low)" },
            { x: "35%", y: "75%", s: 20, c: "var(--color-risk-high)" },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ left: b.x, top: b.y, width: b.s, height: b.s, background: b.c, filter: "blur(14px)", opacity: 0.7 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
