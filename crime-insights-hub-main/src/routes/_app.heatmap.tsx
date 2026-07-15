import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Filter, MapPin } from "lucide-react";
import { apiService } from "../lib/api";

export const Route = createFileRoute("/_app/heatmap")({
  component: Heatmap,
});

function Heatmap() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [crimePoints, setCrimePoints] = useState<any[]>([]);
  const [state, setState] = useState("all");
  const [type, setType] = useState("all");
  const [risk, setRisk] = useState<"all" | string>("all");

  useEffect(() => {
    apiService.getHeatmap().then(setCrimePoints).catch(() => setCrimePoints([]));
  }, []);

  const riskColor = (r: string) => ({ low: "var(--color-risk-low)", medium: "var(--color-risk-med)", high: "var(--color-risk-high)", critical: "var(--color-risk-critical)" }[r] ?? "var(--color-risk-med)");
  const states = useMemo(() => Array.from(new Set(crimePoints.map((p) => p.state))), [crimePoints]);
  const types = useMemo(() => Array.from(new Set(crimePoints.map((p) => p.type))), [crimePoints]);
  const filtered = crimePoints.filter(
    (p) =>
      (state === "all" || p.state === state) &&
      (type === "all" || p.type === type) &&
      (risk === "all" || p.risk === risk),
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current) return;
      if (!mapRef.current) {
        mapRef.current = L.map(mapEl.current, { zoomControl: true, attributionControl: true }).setView([11.0, 78.5], 7);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
          maxZoom: 19,
        }).addTo(mapRef.current);
      }
      const map = mapRef.current;
      // clear existing markers
      map.eachLayer((l: any) => {
        if (l.options && l.options.pane === "markerPane") map.removeLayer(l);
      });
      filtered.forEach((p) => {
        const color = riskColor(p.risk);
        const outer = L.circle([p.lat, p.lng], {
          radius: Math.max(30000, p.count * 120),
          color,
          fillColor: color,
          fillOpacity: 0.18,
          weight: 1,
        }).addTo(map);
        const marker = L.circleMarker([p.lat, p.lng], {
          radius: 6 + Math.log2(p.count),
          color: "#fff",
          weight: 1.5,
          fillColor: color,
          fillOpacity: 0.95,
        }).addTo(map);
        marker.bindTooltip(`${p.city} — ${p.type}`, { direction: "top" });
        marker.bindPopup(
          `<div style="min-width:180px">
            <div style="font-weight:700;font-size:13px">${p.city}, ${p.state}</div>
            <div style="font-size:11px;opacity:.7;margin-top:2px">${p.type}</div>
            <div style="margin-top:6px;font-size:12px">Incidents: <b>${p.count}</b></div>
            <div style="margin-top:2px;font-size:12px">Risk: <b style="color:${color}">${p.risk.toUpperCase()}</b></div>
          </div>`,
        );
        void outer;
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Geospatial</div>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Crime Heatmap</h1>
          <p className="mt-1 text-sm text-muted-foreground">Interactive incident density and risk overlays.</p>
        </div>
        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs">
          <Filter className="h-4 w-4 text-primary" />
          <select value={state} onChange={(e) => setState(e.target.value)} className="bg-transparent outline-none">
            <option value="all">All districts</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="text-muted-foreground">·</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="bg-transparent outline-none">
            <option value="all">All types</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="text-muted-foreground">·</span>
          <select value={risk} onChange={(e) => setRisk(e.target.value as any)} className="bg-transparent outline-none">
            <option value="all">All risk</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <div ref={mapEl} className="h-[calc(100vh-260px)] min-h-[520px] w-full" />
      </div>

      <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3 text-xs">
        <div className="flex items-center gap-4">
          {(["low", "medium", "high", "critical"] as string[]).map((r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: riskColor(r) }} />
              <span className="capitalize text-muted-foreground">{r} risk</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3 w-3" /> Showing <b className="text-foreground">{filtered.length}</b> clusters
        </div>
      </div>
    </div>
  );
}
