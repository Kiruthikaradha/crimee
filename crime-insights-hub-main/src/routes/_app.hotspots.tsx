import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrainCircuit, ShieldAlert, Sparkles, TrendingUp, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import { apiService } from "../lib/api";

export const Route = createFileRoute("/_app/hotspots")({
  component: Hotspots,
});

function Meter({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, oklch(from ${color} l c h / 0.5))` }}
        />
      </div>
    </div>
  );
}

const priorityColor = {
  critical: "var(--color-risk-critical)",
  high: "var(--color-risk-high)",
  medium: "var(--color-risk-med)",
  low: "var(--color-risk-low)",
} as const;

function Hotspots() {
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    apiService.getHotspots().then((data) => {
      setHotspots(data);
      if (data[0]) setSelectedId(data[0].id);
    }).catch(() => setHotspots([]));
  }, []);

  const riskColor = (value: string) => ({ low: "var(--color-risk-low)", medium: "var(--color-risk-med)", high: "var(--color-risk-high)", critical: "var(--color-risk-critical)" }[value] ?? "var(--color-risk-med)");
  const weeklyForecast = [{ day: "Mon", risk: 62 }, { day: "Tue", risk: 58 }, { day: "Wed", risk: 64 }, { day: "Thu", risk: 71 }, { day: "Fri", risk: 84 }, { day: "Sat", risk: 92 }, { day: "Sun", risk: 79 }];
  const selected = hotspots.find((h) => h.id === selectedId) ?? hotspots[0];

  if (!selected) {
    return <div className="text-sm text-muted-foreground">Loading hotspot predictions…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Predictive Layer</div>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Hotspot Prediction</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Model-scored areas with explainable risk drivers and prevention playbooks.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        {/* List */}
        <div className="space-y-3">
          {hotspots.map((h) => {
            const active = h.id === selectedId;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedId(h.id)}
                className={`glass w-full rounded-2xl p-4 text-left transition ${
                  active ? "ring-2 ring-[color:var(--primary)]" : "hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{h.area}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{h.type}</div>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                    style={{ background: `${riskColor(h.severity)}22`, color: riskColor(h.severity) }}
                  >
                    {h.severity}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Risk</div>
                    <div className="font-bold">{h.risk}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Conf.</div>
                    <div className="font-bold">{h.confidence}%</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-300">
                    <TrendingUp className="h-3 w-3" /> {h.trend}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <motion.div key={selected.id} layout className="space-y-4">
          <div className="glass relative overflow-hidden rounded-2xl p-6">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[image:var(--gradient-primary)] opacity-15 blur-3xl" />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">Selected hotspot</div>
                <div className="mt-1 text-2xl font-black tracking-tight">{selected.area}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {selected.type} · {selected.lat.toFixed(3)}, {selected.lng.toFixed(3)}
                </div>
              </div>
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase"
                style={{ background: `${riskColor(selected.severity)}22`, color: riskColor(selected.severity) }}
              >
                <ShieldAlert className="h-3 w-3" /> {selected.severity} severity
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Meter value={selected.risk} label="Risk score" color={riskColor(selected.severity)} />
              <Meter value={selected.confidence} label="Confidence" color="#22d3ee" />
            </div>
          </div>

          {/* AI Explanation */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BrainCircuit className="h-4 w-4 text-primary" />
              AI Explanation
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Why the model flagged this location, in plain language.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {selected.explanation.map((e, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Feature Importance (SHAP)
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selected.features} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={11} domain={[0, 0.4]} />
                    <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} width={140} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                    <Bar dataKey="weight" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Weekly Forecast</div>
                <div className="text-xs text-muted-foreground">Model-projected risk for the coming week</div>
              </div>
              <div className="text-xs text-muted-foreground">Monthly & yearly available →</div>
            </div>
            <div className="mt-3 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyForecast}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="risk" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 4, fill: "#a78bfa" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Zap className="h-4 w-4 text-primary" /> AI Prevention Advisor
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Actionable steps ranked by projected impact.</p>
            <ul className="mt-4 space-y-2">
              {selected.recommendations.map((r, i) => {
                const c = priorityColor[r.priority as keyof typeof priorityColor];
                return (
                  <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-black/20 px-3 py-2.5">
                    <span className="text-sm">{r.text}</span>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                      style={{ background: `${c}22`, color: c }}
                    >
                      {r.priority}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
