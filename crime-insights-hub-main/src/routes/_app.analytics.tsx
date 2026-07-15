import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { apiService } from "../lib/api";

export const Route = createFileRoute("/_app/analytics")({
  component: Analytics,
});

const districts = [
  { d: "South", crimes: 12400 },
  { d: "North", crimes: 9800 },
  { d: "East", crimes: 11200 },
  { d: "West", crimes: 14100 },
  { d: "Central", crimes: 15600 },
];

const timeline = Array.from({ length: 24 }, (_, i) => ({
  h: `${i}:00`,
  crimes: Math.round(60 + 40 * Math.sin((i - 6) / 3) + (i > 18 ? 40 : 0) + Math.random() * 15),
}));

function ChartCard({ title, subtitle, children }: any) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-sm font-semibold">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      <div className="mt-3 h-64">{children}</div>
    </div>
  );
}

function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    apiService.getAnalytics().then(setAnalytics).catch(() => setAnalytics(null));
  }, []);

  const monthlyTrend = analytics?.monthly_trend ?? [];
  const yearlyTrend = analytics?.yearly_trend ?? [];
  const crimeCategories = analytics?.crime_categories ?? [];
  const statewise = analytics?.statewise ?? [];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Insights</div>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Crime Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Multi-dimensional charts across time, geography, and category.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Monthly Crimes" subtitle="Rolling 12 months">
          <ResponsiveContainer>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="crimes" stroke="#a78bfa" strokeWidth={2.5} fill="url(#a1)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Yearly Crimes" subtitle="Trend since 2019">
          <ResponsiveContainer>
            <LineChart data={yearlyTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="crimes" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4, fill: "#22d3ee" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Crime Types" subtitle="Category-wise share">
          <ResponsiveContainer>
            <RadialBarChart innerRadius="20%" outerRadius="90%" data={crimeCategories} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" background />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Crime Growth" subtitle="Actual vs projected">
          <ResponsiveContainer>
            <LineChart data={monthlyTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="crimes" stroke="#a78bfa" strokeWidth={2.5} />
              <Line type="monotone" dataKey="predicted" stroke="#22d3ee" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="District-wise Crimes (Tamil Nadu)" subtitle="Top jurisdictions">
          <ResponsiveContainer>
            <BarChart data={statewise}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="state" stroke="rgba(255,255,255,0.4)" fontSize={10} angle={-20} textAnchor="end" height={60} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Bar dataKey="crimes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="District-wise Crimes" subtitle="Selected metro">
          <ResponsiveContainer>
            <BarChart data={districts}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Bar dataKey="crimes" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2">
          <ChartCard title="Crime Timeline" subtitle="Hourly incident distribution (24h)">
            <ResponsiveContainer>
              <AreaChart data={timeline}>
                <defs>
                  <linearGradient id="tl" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="h" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="crimes" stroke="#ec4899" strokeWidth={2.5} fill="url(#tl)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
