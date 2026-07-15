export type Risk = "low" | "medium" | "high" | "critical";

export interface CrimePoint {
  id: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  type: string;
  count: number;
  risk: Risk;
}

export const kpis = [
  { label: "Total Crimes Analyzed", value: 148391, delta: "+3.8%", tone: "up" },
  { label: "Crime Growth (YoY)", value: 5.6, suffix: "%", delta: "-0.8%", tone: "down" },
  { label: "Resolution Rate", value: 68.2, suffix: "%", delta: "+4.2%", tone: "up" },
  { label: "High-Risk Areas", value: 48, delta: "-3", tone: "down" },
  { label: "Predicted Hotspots", value: 18, delta: "+2", tone: "up" },
  { label: "Active Alerts", value: 8, delta: "+1", tone: "up" },
] as const;

export const monthlyTrend = [
  { month: "Jan", crimes: 12240, predicted: 12100 },
  { month: "Feb", crimes: 11100, predicted: 11600 },
  { month: "Mar", crimes: 12850, predicted: 12500 },
  { month: "Apr", crimes: 13030, predicted: 13200 },
  { month: "May", crimes: 14450, predicted: 14100 },
  { month: "Jun", crimes: 15100, predicted: 14800 },
  { month: "Jul", crimes: 15400, predicted: 15000 },
  { month: "Aug", crimes: 14980, predicted: 15200 },
  { month: "Sep", crimes: 13800, predicted: 14100 },
  { month: "Oct", crimes: 12100, predicted: 12400 },
  { month: "Nov", crimes: 11500, predicted: 11800 },
  { month: "Dec", crimes: 12800, predicted: 12500 },
];

export const yearlyTrend = [
  { year: "2019", crimes: 140000 },
  { year: "2020", crimes: 142000 },
  { year: "2021", crimes: 148000 },
  { year: "2022", crimes: 151000 },
  { year: "2023", crimes: 154000 },
  { year: "2024", crimes: 158000 },
];

export const crimeCategories = [
  { name: "Theft", value: 34, color: "#8b5cf6" },
  { name: "Assault", value: 22, color: "#6366f1" },
  { name: "Burglary", value: 14, color: "#22d3ee" },
  { name: "Fraud", value: 12, color: "#f59e0b" },
  { name: "Vandalism", value: 10, color: "#ec4899" },
  { name: "Other", value: 8, color: "#94a3b8" },
];

export const statewise = [
  { state: "Chennai", crimes: 42100 },
  { state: "Coimbatore", crimes: 38200 },
  { state: "Madurai", crimes: 31400 },
  { state: "Trichy", crimes: 29800 },
  { state: "Salem", crimes: 27600 },
  { state: "Tirunelveli", crimes: 24300 },
  { state: "Vellore", crimes: 21500 },
  { state: "Thoothukudi", crimes: 18700 },
];

export const recentAlerts = [
  { id: 1, area: "T. Nagar, Chennai", type: "Theft cluster detected", time: "3 min ago", risk: "high" as Risk },
  { id: 2, area: "Gandhipuram, Coimbatore", type: "Predicted hotspot upgrade", time: "18 min ago", risk: "critical" as Risk },
  { id: 3, area: "Tallakulam, Madurai", type: "Unusual pattern anomaly", time: "42 min ago", risk: "medium" as Risk },
  { id: 4, area: "Adyar, Chennai", type: "Burglary attempt series", time: "1 hr ago", risk: "high" as Risk },
  { id: 5, area: "Cantonment, Trichy", type: "Assault frequency rising", time: "2 hr ago", risk: "medium" as Risk },
];

export const crimePoints: CrimePoint[] = [
  { id: "1", lat: 13.0827, lng: 80.2707, city: "Chennai", state: "Tamil Nadu", type: "Burglary", count: 412, risk: "critical" },
  { id: "2", lat: 11.0168, lng: 76.9558, city: "Coimbatore", state: "Tamil Nadu", type: "Theft", count: 388, risk: "critical" },
  { id: "3", lat: 9.9252, lng: 78.1198, city: "Madurai", state: "Tamil Nadu", type: "Assault", count: 265, risk: "high" },
  { id: "4", lat: 10.7905, lng: 78.7047, city: "Trichy", state: "Tamil Nadu", type: "Fraud", count: 231, risk: "high" },
  { id: "5", lat: 11.6643, lng: 78.1460, city: "Salem", state: "Tamil Nadu", type: "Theft", count: 198, risk: "high" },
  { id: "6", lat: 8.7139, lng: 77.7567, city: "Tirunelveli", state: "Tamil Nadu", type: "Vandalism", count: 142, risk: "medium" },
  { id: "7", lat: 12.9165, lng: 79.1325, city: "Vellore", state: "Tamil Nadu", type: "Theft", count: 156, risk: "medium" },
  { id: "8", lat: 8.7139, lng: 78.1348, city: "Thoothukudi", state: "Tamil Nadu", type: "Assault", count: 128, risk: "medium" },
  { id: "9", lat: 10.7870, lng: 79.1378, city: "Thanjavur", state: "Tamil Nadu", type: "Fraud", count: 174, risk: "medium" },
  { id: "10", lat: 11.3410, lng: 77.7172, city: "Erode", state: "Tamil Nadu", type: "Burglary", count: 96, risk: "low" },
  { id: "11", lat: 10.3673, lng: 77.9806, city: "Dindigul", state: "Tamil Nadu", type: "Theft", count: 82, risk: "low" },
  { id: "12", lat: 11.1085, lng: 77.3411, city: "Tiruppur", state: "Tamil Nadu", type: "Assault", count: 138, risk: "medium" },
];

export const predictedHotspots = [
  {
    id: "h1",
    area: "T. Nagar, Chennai",
    lat: 13.0418,
    lng: 80.2341,
    risk: 92,
    confidence: 88,
    trend: "+38%",
    type: "Theft & Snatching",
    severity: "critical" as Risk,
    explanation: [
      "Crime has increased by 38% over the last six months.",
      "Most incidents occur during evening hours (7pm–11pm).",
      "High commercial shopping activity attracts opportunistic theft.",
      "Previous hotspot history strongly contributes to the prediction.",
      "Population density in T. Nagar shopping corridor increases crime probability.",
      "Weekend crime frequency is significantly higher than weekdays.",
    ],
    features: [
      { name: "Historical Frequency", weight: 0.31 },
      { name: "Time of Day", weight: 0.22 },
      { name: "Commercial Density", weight: 0.18 },
      { name: "Population Density", weight: 0.14 },
      { name: "Weekend Effect", weight: 0.09 },
      { name: "Weather Factor", weight: 0.06 },
    ],
    recommendations: [
      { text: "Increase police patrol frequency (evening shifts)", priority: "critical" },
      { text: "Install 6 additional CCTV cameras at hotspot corners", priority: "high" },
      { text: "Improve street lighting on side roads", priority: "high" },
      { text: "Deploy rapid response team within 3km radius", priority: "medium" },
      { text: "Run public awareness campaign for local shops", priority: "medium" },
    ],
  },
  {
    id: "h2",
    area: "Gandhipuram, Coimbatore",
    lat: 11.0202,
    lng: 76.9696,
    risk: 88,
    confidence: 85,
    trend: "+24%",
    type: "Pickpocketing & Burglary",
    severity: "high" as Risk,
    explanation: [
      "Commuter footfall correlates with a 24% uptick in reported theft.",
      "Bus stand exits show recurring pickpocketing clusters.",
      "Weekend evenings dominate incident timing.",
      "Repeat offender activity detected from historical arrests.",
    ],
    features: [
      { name: "Transit Footfall", weight: 0.28 },
      { name: "Transit Proximity", weight: 0.24 },
      { name: "Historical Frequency", weight: 0.2 },
      { name: "Weekend Effect", weight: 0.15 },
      { name: "Repeat Offenders", weight: 0.13 },
    ],
    recommendations: [
      { text: "Deploy plain-clothes officers near bus stand gates", priority: "critical" },
      { text: "Add passenger awareness signage", priority: "high" },
      { text: "Coordinate with transit security for shared alerts", priority: "high" },
    ],
  },
  {
    id: "h3",
    area: "Tallakulam, Madurai",
    lat: 9.9390,
    lng: 78.1350,
    risk: 76,
    confidence: 81,
    trend: "+15%",
    type: "Vehicle Theft",
    severity: "high" as Risk,
    explanation: [
      "Late-night vehicle theft has grown 15% over 3 months.",
      "Unlit parking zones near commercial outlets are primary sites.",
      "Weekday incidents cluster between 1am–4am.",
    ],
    features: [
      { name: "Commercial Density", weight: 0.26 },
      { name: "Parking Illumination", weight: 0.22 },
      { name: "Late-Night Activity", weight: 0.2 },
      { name: "Historical Frequency", weight: 0.18 },
      { name: "Access Roads", weight: 0.14 },
    ],
    recommendations: [
      { text: "Add lighting to 4 identified parking pockets", priority: "high" },
      { text: "Nightly patrols between 1am–4am", priority: "high" },
      { text: "Partner with local merchants for CCTV sharing", priority: "medium" },
    ],
  },
  {
    id: "h4",
    area: "Cantonment, Trichy",
    lat: 10.7950,
    lng: 78.6900,
    risk: 71,
    confidence: 78,
    trend: "+11%",
    type: "Shop Burglary",
    severity: "medium" as Risk,
    explanation: [
      "Retail burglaries rose 11% during the festive quarter.",
      "Predawn incidents dominate the pattern.",
      "Alarm-system adoption is below city average in this zone.",
    ],
    features: [
      { name: "Retail Density", weight: 0.3 },
      { name: "Alarm Coverage", weight: 0.24 },
      { name: "Predawn Activity", weight: 0.2 },
      { name: "Historical Frequency", weight: 0.16 },
      { name: "Escape Routes", weight: 0.1 },
    ],
    recommendations: [
      { text: "Subsidize alarm systems for small retailers", priority: "high" },
      { text: "Predawn patrol sweeps in the retail corridor", priority: "high" },
      { text: "CCTV audit across the market strip", priority: "medium" },
    ],
  },
];

export const weeklyForecast = [
  { day: "Mon", risk: 62 },
  { day: "Tue", risk: 58 },
  { day: "Wed", risk: 64 },
  { day: "Thu", risk: 71 },
  { day: "Fri", risk: 84 },
  { day: "Sat", risk: 92 },
  { day: "Sun", risk: 79 },
];

export const reports = [
  { id: "R-2041", title: "Q4 Chennai Metro Crime Overview", date: "2025-12-08", author: "Analyst K. Rao", pages: 42, status: "Finalized" },
  { id: "R-2040", title: "Hotspot Prediction — Coimbatore Zone 2", date: "2025-12-01", author: "Officer S. Iyer", pages: 18, status: "Reviewed" },
  { id: "R-2039", title: "Weekend Assault Study — Madurai KK Nagar", date: "2025-11-22", author: "Analyst P. Mehta", pages: 26, status: "Finalized" },
  { id: "R-2038", title: "Explainable AI — Model v3.2 (TN)", date: "2025-11-14", author: "ML Team", pages: 33, status: "Internal" },
  { id: "R-2037", title: "Trichy Fraud Case Cluster Analysis", date: "2025-11-02", author: "Officer A. Khan", pages: 12, status: "Reviewed" },
];

export const riskColor = (r: Risk) =>
  ({
    low: "var(--color-risk-low)",
    medium: "var(--color-risk-med)",
    high: "var(--color-risk-high)",
    critical: "var(--color-risk-critical)",
  })[r];
