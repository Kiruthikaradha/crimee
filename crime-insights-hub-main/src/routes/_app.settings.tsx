import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});

function Toggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/40 py-4 last:border-0">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-[image:var(--gradient-primary)]" : "bg-white/10"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Configuration</div>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage profile, notifications, and system integrations.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Profile">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-lg font-bold text-white">
              SI
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <input defaultValue="S. Iyer" className="w-full rounded-xl border border-border bg-black/20 px-3 py-2 text-sm outline-none" />
              <input defaultValue="officer@crimevision.ai" className="w-full rounded-xl border border-border bg-black/20 px-3 py-2 text-sm outline-none" />
            </div>
          </div>
        </Section>

        <Section title="Notifications">
          <Toggle label="Real-time alerts" desc="Push notifications for new critical hotspots." defaultOn />
          <Toggle label="Weekly digest" desc="Summary of hotspot changes every Monday." defaultOn />
          <Toggle label="Model retraining" desc="Notify when models are retrained or updated." />
        </Section>

        <Section title="API Configuration">
          <label className="text-xs text-muted-foreground">FastAPI base URL</label>
          <input defaultValue="https://api.crimevision.ai/v1" className="mt-1 w-full rounded-xl border border-border bg-black/20 px-3 py-2 text-sm font-mono outline-none" />
          <label className="mt-3 block text-xs text-muted-foreground">API key</label>
          <input defaultValue="sk-••••••••••••••••••••" type="password" className="mt-1 w-full rounded-xl border border-border bg-black/20 px-3 py-2 text-sm font-mono outline-none" />
          <div className="mt-3 flex gap-2">
            <button className="rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-glow)]">
              Test connection
            </button>
            <button className="rounded-xl border border-border px-4 py-2 text-xs hover:bg-white/5">Rotate key</button>
          </div>
        </Section>

        <Section title="Model Status">
          {[
            { name: "XGBoost — Hotspot Classifier", v: "v3.2.1", status: "Online", acc: "94.2%" },
            { name: "LightGBM — Risk Regressor", v: "v2.8.0", status: "Online", acc: "91.7%" },
            { name: "Scikit-learn — Anomaly Detector", v: "v1.4.0", status: "Idle", acc: "88.4%" },
            { name: "SHAP Explainer", v: "v0.44", status: "Online", acc: "—" },
          ].map((m) => (
            <div key={m.name} className="flex items-center justify-between gap-3 border-b border-border/40 py-3 last:border-0">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.v} · Accuracy {m.acc}</div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  m.status === "Online" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
                }`}
              >
                {m.status}
              </span>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}
