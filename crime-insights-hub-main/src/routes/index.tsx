import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  BrainCircuit,
  Map,
  Flame,
  BarChart3,
  Route as RouteIcon,
  FileText,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Cpu,
  Database,
  Layers,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: BarChart3, title: "Crime Analytics", desc: "Interactive dashboards over decades of historical crime data with drill-down by state, district and category." },
  { icon: Flame, title: "AI Hotspot Prediction", desc: "Gradient-boosted models predict emerging hotspots with risk and confidence scores." },
  { icon: Map, title: "Interactive Heatmaps", desc: "Full-page Leaflet heatmaps with clustering, filters, and multi-tier risk overlays." },
  { icon: BrainCircuit, title: "Explainable AI", desc: "SHAP-powered feature attributions explain every prediction in plain language." },
  { icon: RouteIcon, title: "Safe Route Analysis", desc: "Compute safest and fastest routes with per-segment crime risk scoring." },
  { icon: FileText, title: "Reports", desc: "Generate PDFs and CSVs with charts, hotspots, explanations, and recommendations." },
];

const stats = [
  { k: "284K+", v: "Crimes Analyzed" },
  { k: "94%", v: "Prediction Precision" },
  { k: "28", v: "States Covered" },
  { k: "42", v: "Live Hotspots" },
];

const steps = [
  { n: "01", t: "Ingest", d: "Import decades of crime records from CSVs, APIs, or your FastAPI backend." },
  { n: "02", t: "Model", d: "Train Scikit-learn, XGBoost and LightGBM models with feature engineering pipelines." },
  { n: "03", t: "Predict", d: "Score locations in real time and surface hotspots with confidence bands." },
  { n: "04", t: "Explain & Act", d: "SHAP explanations, prevention playbooks, and dispatch-ready recommendations." },
];

const tech = [
  { icon: Cpu, name: "Scikit-learn" },
  { icon: Cpu, name: "XGBoost" },
  { icon: Cpu, name: "LightGBM" },
  { icon: BrainCircuit, name: "SHAP" },
  { icon: Database, name: "PostgreSQL" },
  { icon: Layers, name: "FastAPI" },
  { icon: Activity, name: "React + TS" },
  { icon: Map, name: "Leaflet" },
];

function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div className="text-sm font-bold tracking-tight sm:text-base">
              CrimeVision <span className="gradient-text">AI</span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#tech" className="hover:text-foreground">Technology</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-white/5"
            >
              Sign in
            </Link>
            <Link
              to="/dashboard"
              className="hidden rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:opacity-95 sm:inline-flex"
            >
              Launch console
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Explainable predictive policing platform
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              AI-Powered <span className="gradient-text">Crime Pattern</span>
              <br /> Detection & Prediction
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              CrimeVision AI helps police, analysts and agencies turn raw crime data into
              predictive hotspots, explainable insights, and prevention playbooks — in one modern console.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:opacity-95"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="rounded-xl border border-border px-6 py-3 text-sm hover:bg-white/5"
              >
                Explore features
              </a>
            </div>
          </motion.div>

          {/* Animated dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-strong relative mx-auto mt-16 max-w-6xl rounded-3xl p-3"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-black/30">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <div className="ml-3 text-xs text-muted-foreground">crimevision.ai / console</div>
              </div>
              <div className="grid grid-cols-4 gap-3 p-4">
                {["Total Crimes", "Hotspots", "Resolution", "Alerts"].map((l, i) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="glass rounded-xl p-3"
                  >
                    <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
                    <div className="mt-1 text-lg font-bold">{["284K", "42", "62.4%", "17"][i]}</div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${[80, 55, 70, 30][i]}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.9 }}
                        className="h-full rounded-full bg-[image:var(--gradient-primary)]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-3 p-4 pt-0 md:grid-cols-3">
                <div className="glass col-span-2 h-52 rounded-xl p-4">
                  <div className="mb-2 text-xs text-muted-foreground">Monthly Crime Trend</div>
                  <svg viewBox="0 0 400 140" className="h-40 w-full">
                    <defs>
                      <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, delay: 0.6 }}
                      d="M0,110 C40,80 70,100 110,70 C160,35 200,90 250,55 C300,25 340,70 400,30"
                      fill="none"
                      stroke="#a78bfa"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0,110 C40,80 70,100 110,70 C160,35 200,90 250,55 C300,25 340,70 400,30 L400,140 L0,140 Z"
                      fill="url(#g)"
                    />
                  </svg>
                </div>
                <div className="glass h-52 rounded-xl p-4">
                  <div className="mb-2 text-xs text-muted-foreground">Top Hotspots</div>
                  <div className="space-y-2">
                    {["Andheri E", "Connaught Pl", "Koramangala", "T. Nagar"].map((n, i) => (
                      <div key={n} className="flex items-center gap-2 text-xs">
                        <span className="w-20 truncate text-muted-foreground">{n}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${[92, 88, 76, 71][i]}%` }}
                            transition={{ delay: 0.9 + i * 0.1, duration: 0.9 }}
                            className="h-full rounded-full bg-[image:var(--gradient-primary)]"
                          />
                        </div>
                        <span className="w-8 text-right font-semibold">{[92, 88, 76, 71][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="text-center">
              <div className="gradient-text text-3xl font-black sm:text-4xl">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Capabilities</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            A full intelligence stack for modern policing
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every layer — ingestion, modeling, explanation, and dispatch — designed to work together.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass group rounded-2xl p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4 text-lg font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border/60 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Workflow</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">How it works</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="glass rounded-2xl p-6">
                <div className="gradient-text text-4xl font-black">{s.n}</div>
                <div className="mt-3 font-semibold">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section id="tech" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Powered by</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Battle-tested technology</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tech.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.name} className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{t.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-primary)] opacity-20" />
          <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
            Turn every incident into intelligence.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Launch the console with mock data now, then wire your FastAPI + ML backend when ready.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:opacity-95"
          >
            Enter the console <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            © {new Date().getFullYear()} CrimeVision AI. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
