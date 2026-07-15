import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  explanation: any;
}

export function ExplainabilityPanel({ explanation }: Props) {
  const features = explanation?.feature_importance ?? [];
  const reasons = explanation?.reasons ?? [];
  const recommendations = explanation?.recommendations ?? [];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Explainable AI</div>
          <div className="text-xs text-muted-foreground">Why this hotspot was scored this way</div>
        </div>
        <Badge className="bg-[image:var(--gradient-primary)] text-white">
          {explanation?.risk_label ?? 'Moderate'}
        </Badge>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary">Risk score</div>
              <div className="mt-2 text-4xl font-black">{explanation?.risk_score ?? 0}%</div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Confidence</div>
              <div className="text-lg font-semibold text-foreground">{explanation?.confidence ?? 0}%</div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Risk Meter</span>
                <span>{explanation?.risk_score ?? 0}%</span>
              </div>
              <Progress value={explanation?.risk_score ?? 0} className="h-2" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Confidence Meter</span>
                <span>{explanation?.confidence ?? 0}%</span>
              </div>
              <Progress value={explanation?.confidence ?? 0} className="h-2" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold">AI Explanation Panel</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{explanation?.explanation ?? 'Our model is evaluating repeated incidents, commercial density, and time-based surges.'}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="text-sm font-semibold">Feature Importance</div>
          <div className="mt-3 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={features}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Bar dataKey="weight" fill="url(#feature-gradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="feature-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="text-sm font-semibold">Top contributing features</div>
          <ul className="mt-3 space-y-2 text-sm">
            {reasons.map((reason: string) => (
              <li key={reason} className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-[image:var(--gradient-primary)]" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="text-sm font-semibold">Recommendations</div>
          <ul className="mt-3 space-y-2 text-sm">
            {recommendations.map((item: string) => (
              <li key={item} className="rounded-xl border border-border/50 bg-white/5 px-3 py-2 text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
