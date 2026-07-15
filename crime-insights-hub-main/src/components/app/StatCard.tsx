import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) =>
    latest.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals }),
  );
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);
  return <motion.span>{display}</motion.span>;
}

export function StatCard({
  label,
  value,
  suffix,
  delta,
  tone,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  delta?: string;
  tone?: "up" | "down";
  icon?: React.ReactNode;
}) {
  const isUp = tone === "up";
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass relative overflow-hidden rounded-2xl p-5"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[image:var(--gradient-primary)] opacity-10 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 text-3xl font-bold tracking-tight">
            <AnimatedNumber value={value} decimals={suffix === "%" ? 1 : 0} />
            {suffix && <span className="ml-0.5 text-xl text-muted-foreground">{suffix}</span>}
          </div>
        </div>
        {icon && (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
            {icon}
          </div>
        )}
      </div>
      {delta && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
              isUp
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-rose-500/15 text-rose-300"
            }`}
          >
            {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}
    </motion.div>
  );
}
