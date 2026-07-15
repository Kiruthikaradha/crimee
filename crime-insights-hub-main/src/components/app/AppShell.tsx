import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Map,
  Flame,
  BrainCircuit,
  BarChart3,
  Route as RouteIcon,
  FileText,
  Settings,
  Search,
  Bell,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/heatmap", label: "Crime Heatmap", icon: Map },
  { to: "/hotspots", label: "Hotspot Prediction", icon: Flame },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/safe-route", label: "Safe Route", icon: RouteIcon },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full">
      <div className="grid min-h-screen w-full grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="glass sticky top-0 flex h-screen flex-col gap-2 border-r border-border/60 px-4 py-6">
          <Link to="/" className="mb-6 flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold tracking-tight">CrimeVision</div>
              <div className="truncate text-[11px] text-muted-foreground">AI Intelligence Suite</div>
            </div>
          </Link>

          <nav className="flex flex-1 flex-col gap-1">
            {nav.map((n) => {
              const active = pathname === n.to || pathname.startsWith(n.to + "/");
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-[image:var(--gradient-primary)] text-white shadow-[var(--shadow-glow)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="glass mt-2 rounded-2xl p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-white">
                SI
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold">S. Iyer</div>
                <div className="truncate text-[11px] text-muted-foreground">Police Officer</div>
              </div>
              <Link to="/" className="text-muted-foreground hover:text-foreground" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex min-w-0 flex-col">
          <header className="glass sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 px-6 py-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-black/20 px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                placeholder="Search areas, crimes, cases, reports…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden shrink-0 rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                ⌘K
              </kbd>
            </div>
            <button className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-black/20 hover:bg-white/5">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[color:var(--color-risk-critical)]" />
            </button>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-xs font-bold text-white">
              SI
            </div>
          </header>

          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-1 px-6 py-6"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
}
