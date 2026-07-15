import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ForecastPoint {
  date: string;
  predicted: number;
  lower: number;
  upper: number;
  confidence: number;
}

interface Props {
  forecast: any;
}

export function ForecastPanel({ forecast }: Props) {
  const rows = forecast?.forecast ?? [];
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Forecasting</div>
          <div className="text-xs text-muted-foreground">XGBoost / Prophet driven outlook</div>
        </div>
        <Badge className="bg-[image:var(--gradient-primary)] text-white">{forecast?.horizon ?? 'tomorrow'}</Badge>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="text-sm font-semibold">Crime Trend</div>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Prediction Accuracy</span>
              <span className="font-semibold text-foreground">{Math.round((forecast?.summary?.accuracy ?? 0) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Confidence Interval</span>
              <span className="font-semibold text-foreground">±{Math.round((forecast?.summary?.confidence ?? 0) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Trend</span>
              <span className="font-semibold text-foreground">{forecast?.summary?.trend ?? 'stable'}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="text-sm font-semibold">Prediction Table</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Pred.</TableHead>
                <TableHead>CI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row: ForecastPoint) => (
                <TableRow key={row.date}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.predicted}</TableCell>
                  <TableCell>{row.lower}-{row.upper}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
