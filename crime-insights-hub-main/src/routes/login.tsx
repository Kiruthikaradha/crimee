import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [role, setRole] = useState("officer");
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="glass-strong relative w-full max-w-md rounded-3xl p-8">
        <Link to="/" className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div className="text-sm font-bold">CrimeVision <span className="gradient-text">AI</span></div>
        </Link>
        <h1 className="text-2xl font-black tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to your intelligence console.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-black/20 px-3 py-2.5">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input required type="email" defaultValue="officer@crimevision.ai" className="w-full bg-transparent text-sm outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-black/20 px-3 py-2.5">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input required type="password" defaultValue="demopassword" className="w-full bg-transparent text-sm outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Role</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {[
                { k: "admin", l: "Admin" },
                { k: "officer", l: "Officer" },
                { k: "analyst", l: "Analyst" },
              ].map((r) => (
                <button
                  key={r.k}
                  type="button"
                  onClick={() => setRole(r.k)}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                    role === r.k
                      ? "border-transparent bg-[image:var(--gradient-primary)] text-white shadow-[var(--shadow-glow)]"
                      : "border-border bg-black/20 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="accent-[color:var(--primary)]" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:opacity-95"
          >
            Sign in <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
