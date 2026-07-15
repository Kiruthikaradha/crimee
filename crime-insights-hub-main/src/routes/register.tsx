import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
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
        <h1 className="text-2xl font-black tracking-tight">Create an account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Request access to the intelligence console.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
          className="mt-6 space-y-3"
        >
          {[
            { l: "Full name", t: "text", p: "S. Iyer" },
            { l: "Department / Agency", t: "text", p: "Mumbai Police — Zone 4" },
            { l: "Work email", t: "email", p: "officer@department.gov" },
            { l: "Password", t: "password", p: "••••••••" },
          ].map((f) => (
            <div key={f.l}>
              <label className="text-xs font-medium text-muted-foreground">{f.l}</label>
              <input
                type={f.t}
                required
                placeholder={f.p}
                className="mt-1 w-full rounded-xl border border-border bg-black/20 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          ))}
          <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:opacity-95">
            Request access
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
