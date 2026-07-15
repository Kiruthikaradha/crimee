import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Route as RouteIcon, Shield, Zap, AlertTriangle } from "lucide-react";
import { apiService } from "../lib/api";

export const Route = createFileRoute("/_app/safe-route")({
  component: SafeRoute,
});

const fallbackRoutes = [
  {
    kind: "safest",
    label: "Safest Route",
    time: "34 min",
    distance: "12.4 km",
    risk: 22,
    color: "#22c55e",
    coords: [
      [13.0827, 80.2707],
      [13.0722, 80.2588],
      [13.0588, 80.2441],
      [13.0418, 80.2341],
    ],
  },
  {
    kind: "fastest",
    label: "Fastest Route",
    time: "26 min",
    distance: "10.8 km",
    risk: 58,
    color: "#f59e0b",
    coords: [
      [13.0827, 80.2707],
      [13.0650, 80.2600],
      [13.0520, 80.2500],
      [13.0418, 80.2341],
    ],
  },
  {
    kind: "avoid",
    label: "High Risk Corridor",
    time: "29 min",
    distance: "11.6 km",
    risk: 84,
    color: "#ef4444",
    coords: [
      [13.0827, 80.2707],
      [13.0800, 80.2900],
      [13.0600, 80.2800],
      [13.0418, 80.2341],
    ],
  },
];

function SafeRoute() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [from, setFrom] = useState("Chennai Central Station");
  const [to, setTo] = useState("T. Nagar");
  const [routes, setRoutes] = useState<any[]>(fallbackRoutes);

  useEffect(() => {
    apiService.getSafeRoute().then((data) => {
      const normalized = (data.routes ?? fallbackRoutes).map((route: any, index: number) => ({
        ...route,
        coords: route.coords ?? fallbackRoutes[index].coords,
      }));
      setRoutes(normalized);
    }).catch(() => setRoutes(fallbackRoutes));
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current) return;
      if (!mapRef.current) {
        mapRef.current = L.map(mapEl.current).setView([13.06, 80.25], 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
        }).addTo(mapRef.current);
      }
      const map = mapRef.current;
      map.eachLayer((l: any) => {
        if (l.options && (l.options.pane === "overlayPane" || l.options.pane === "markerPane")) map.removeLayer(l);
      });
      routes.forEach((r) => {
        L.polyline(r.coords as any, {
          color: r.color,
          weight: r.kind === "avoid" ? 4 : 5,
          opacity: 0.85,
          dashArray: r.kind === "avoid" ? "8 8" : undefined,
        }).addTo(map);
      });
      L.marker(routes[0].coords[0] as any).addTo(map).bindPopup("Source");
      L.marker(routes[0].coords[routes[0].coords.length - 1] as any).addTo(map).bindPopup("Destination");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Navigation</div>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Safe Route Finder</h1>
        <p className="mt-1 text-sm text-muted-foreground">Compare routes by crime-risk exposure.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        <div className="space-y-4">
          <div className="glass space-y-3 rounded-2xl p-5">
            <div>
              <label className="text-xs text-muted-foreground">Source</label>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-black/20 px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Destination</label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-black/20 px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <button className="w-full rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)]">
              Compute routes
            </button>
          </div>

          {routes.map((r) => {
            const Icon = r.kind === "safest" ? Shield : r.kind === "fastest" ? Zap : AlertTriangle;
            return (
              <div key={r.kind} className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `${r.color}22`, color: r.color }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{r.label}</div>
                    <div className="text-xs text-muted-foreground">{r.time} · {r.distance}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Crime risk</span>
                    <span className="font-bold" style={{ color: r.color }}>{r.risk}/100</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: `${r.risk}%`, background: r.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass overflow-hidden rounded-2xl">
          <div ref={mapEl} className="h-[calc(100vh-260px)] min-h-[520px] w-full" />
        </div>
      </div>
    </div>
  );
}
