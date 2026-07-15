import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, FileText, Plus } from "lucide-react";
import { apiService } from "../lib/api";

export const Route = createFileRoute("/_app/reports")({
  component: Reports,
});

function Reports() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    apiService.getReports().then(setReports).catch(() => setReports([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Deliverables</div>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Generate and export analytical reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border border-border px-4 py-2 text-xs hover:bg-white/5">
            Export CSV
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-glow)]">
            <Plus className="h-3.5 w-3.5" /> Generate report
          </button>
        </div>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-white/[0.03] text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left">ID</th>
              <th className="px-5 py-3 text-left">Title</th>
              <th className="px-5 py-3 text-left">Author</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-left">Pages</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{r.id}</td>
                <td className="px-5 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> {r.title}
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{r.author}</td>
                <td className="px-5 py-4 text-muted-foreground">{r.date}</td>
                <td className="px-5 py-4 text-muted-foreground">{r.pages}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs">{r.status}</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-white/5">
                    <Download className="h-3 w-3" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { t: "Includes charts", d: "Trend, category, and geo analytics rendered as vector charts." },
          { t: "AI explanations", d: "Every prediction ships with SHAP-based feature attributions." },
          { t: "Recommendations", d: "Prevention playbooks with priority levels for dispatch." },
        ].map((c) => (
          <div key={c.t} className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold">{c.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
