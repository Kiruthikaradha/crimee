import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: Forgot,
});

function Forgot() {
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
        <h1 className="text-2xl font-black tracking-tight">Reset your password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your work email and we'll send a secure reset link.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-3">
          <input
            type="email"
            required
            placeholder="officer@department.gov"
            className="w-full rounded-xl border border-border bg-black/20 px-3 py-2.5 text-sm outline-none"
          />
          <button className="w-full rounded-xl bg-[image:var(--gradient-primary)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:opacity-95">
            Send reset link
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
