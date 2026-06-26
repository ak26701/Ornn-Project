"use client";

import Link from "next/link";
import {
  AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const kpiData = [
  { label: "GPU Compute Market (2026)", value: "$82B", delta: "+38% YoY", up: true },
  { label: "Addressable Futures Volume", value: "$28B", delta: "Est. notional", up: true },
  { label: "Compute Price Volatility", value: "±34%", delta: "12-mo avg swing", up: false },
  { label: "Enterprise AI Cos. (ICP)", value: "1,200+", delta: "US addressable", up: true },
];

const computeTrend = [
  { month: "Jan '25", h100: 2.80, a100: 1.65 },
  { month: "Mar '25", h100: 3.10, a100: 1.72 },
  { month: "May '25", h100: 2.95, a100: 1.60 },
  { month: "Jul '25", h100: 3.40, a100: 1.88 },
  { month: "Sep '25", h100: 3.85, a100: 2.05 },
  { month: "Nov '25", h100: 3.20, a100: 1.78 },
  { month: "Jan '26", h100: 3.55, a100: 1.92 },
  { month: "Mar '26", h100: 4.10, a100: 2.15 },
  { month: "May '26", h100: 3.80, a100: 2.00 },
];

const pipelineSegments = [
  { segment: "AI Hyperscalers", count: 14, avgDeal: "$420K", priority: "Critical", color: "#3b82f6", motion: "Enterprise outbound + exec referral" },
  { segment: "Enterprise AI Teams", count: 87, avgDeal: "$95K", priority: "High", color: "#06b6d4", motion: "Content-led + SDR outbound" },
  { segment: "GPU Cloud Providers", count: 32, avgDeal: "$280K", priority: "High", color: "#10b981", motion: "Partnership + co-sell" },
  { segment: "Financial Institutions", count: 45, avgDeal: "$180K", priority: "Medium", color: "#f59e0b", motion: "BD + conference circuit" },
];

const milestones = [
  { done: true, label: "Market sizing & TAM analysis" },
  { done: true, label: "ICP framework + 4 buyer personas" },
  { done: true, label: "Competitive landscape mapped" },
  { done: true, label: "Compute price index prototype" },
  { done: true, label: "Outreach sequences (3 per persona)" },
  { done: false, label: "Pilot outreach to 10 AI hyperscalers" },
  { done: false, label: "Partnership pipeline: CoreWeave, Vast.ai" },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 text-xs" style={{ minWidth: 160 }}>
      <p className="font-medium mb-2" style={{ color: "#9ca3af" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">${p.value.toFixed(2)}/hr</span>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>
              GTM Intelligence Dashboard
            </h1>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              Compute futures market analysis · Built for Ornn by Arhan Khan
            </p>
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded-full font-medium"
            style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)" }}
          >
            $33M Series A · a16z-backed
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="card p-5 glow-blue">
            <p className="text-xs mb-3" style={{ color: "#6b7280" }}>{kpi.label}</p>
            <p className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>{kpi.value}</p>
            <p className="text-xs font-medium" style={{ color: kpi.up ? "#10b981" : "#f59e0b" }}>
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>Compute Spot Price Index</p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>H100 vs A100 · $/hr · Ornn benchmark</p>
            </div>
            <span className="text-xs px-2 py-1 rounded" style={{ background: "#1f2937", color: "#9ca3af" }}>
              18-month view
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={computeTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="h100grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="a100grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="h100" name="H100" stroke="#3b82f6" fill="url(#h100grad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="a100" name="A100" stroke="#06b6d4" fill="url(#a100grad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[{ color: "#3b82f6", label: "H100 8x" }, { color: "#06b6d4", label: "A100 8x" }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded" style={{ background: l.color }} />
                <span className="text-xs" style={{ color: "#6b7280" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>GTM Milestones</p>
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                  style={{
                    background: m.done ? "rgba(16,185,129,0.15)" : "#1f2937",
                    border: `1px solid ${m.done ? "#10b981" : "#374151"}`,
                    color: m.done ? "#10b981" : "#374151",
                  }}
                >
                  {m.done ? "✓" : ""}
                </div>
                <span className="text-xs leading-relaxed" style={{ color: m.done ? "#e8eaf0" : "#6b7280" }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>Target Pipeline by Segment</p>
          <Link href="/icp" className="text-xs" style={{ color: "#3b82f6" }}>View ICP profiles →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid #374151" }}>
                {["Segment", "Target Accounts", "Avg. Contract Value", "Priority", "GTM Motion"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-6 font-medium" style={{ color: "#6b7280" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pipelineSegments.map((row) => (
                <tr key={row.segment} style={{ borderBottom: "1px solid #1f2937" }}>
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: row.color }} />
                      <span style={{ color: "#e8eaf0" }}>{row.segment}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6" style={{ color: "#9ca3af" }}>{row.count}</td>
                  <td className="py-3 pr-6 font-semibold" style={{ color: "#e8eaf0" }}>{row.avgDeal}</td>
                  <td className="py-3 pr-6">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: row.priority === "Critical" ? "rgba(239,68,68,0.15)" : row.priority === "High" ? "rgba(59,130,246,0.15)" : "rgba(245,158,11,0.15)",
                        color: row.priority === "Critical" ? "#ef4444" : row.priority === "High" ? "#3b82f6" : "#f59e0b",
                      }}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td className="py-3 pr-6" style={{ color: "#6b7280" }}>{row.motion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { href: "/market", title: "Market Sizing", desc: "TAM/SAM/SOM breakdown for compute derivatives", tag: "$250B TAM" },
          { href: "/outreach", title: "Outreach Engine", desc: "Personalized email sequences per buyer persona", tag: "12 templates" },
          { href: "/competitive", title: "Competitive Map", desc: "Landscape analysis & Ornn's positioning", tag: "First mover" },
        ].map((card) => (
          <Link key={card.href} href={card.href} className="card p-5 block transition-all" style={{ borderColor: "#374151" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>{card.title}</p>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#1f2937", color: "#6b7280" }}>{card.tag}</span>
            </div>
            <p className="text-xs" style={{ color: "#6b7280" }}>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
