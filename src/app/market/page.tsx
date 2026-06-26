"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell, PieChart, Pie,
} from "recharts";

const tamData = [
  { year: "2024", compute: 58, financialProducts: 0, derivatives: 0 },
  { year: "2025", compute: 82, financialProducts: 4, derivatives: 1.2 },
  { year: "2026", compute: 118, financialProducts: 12, derivatives: 4.8 },
  { year: "2027", compute: 162, financialProducts: 28, derivatives: 14 },
  { year: "2028", compute: 215, financialProducts: 55, derivatives: 32 },
  { year: "2029", compute: 271, financialProducts: 98, derivatives: 65 },
  { year: "2030", compute: 332, financialProducts: 155, derivatives: 110 },
];

const marketBreakdown = [
  { name: "H100/H200 Cluster Compute", value: 38, color: "#3b82f6" },
  { name: "A100/A10 Inference", value: 24, color: "#06b6d4" },
  { name: "Consumer GPU (RTX)", value: 18, color: "#10b981" },
  { name: "Specialized AI Chips", value: 12, color: "#f59e0b" },
  { name: "Legacy Data Center", value: 8, color: "#6b7280" },
];

const analogMarkets = [
  { market: "Oil Futures (Brent)", notional: "$2.1T", vol: "42%", started: "1983", note: "Commodity with physical delivery & spot volatility" },
  { market: "Electricity Futures", notional: "$680B", vol: "55%", started: "1996", note: "Non-storable, location-specific, highly volatile" },
  { market: "Carbon Credits", notional: "$850B", vol: "28%", started: "2005", note: "Regulatory + compliance driven demand" },
  { market: "GPU Compute (Ornn)", notional: "$28B†", vol: "34%", started: "2025", note: "First regulated venue · cash-settled · AI-driven" },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}

const StackTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 text-xs">
      <p className="font-medium mb-2" style={{ color: "#9ca3af" }}>{label}</p>
      {[...payload].reverse().map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-bold">${p.value}B</span></p>
      ))}
    </div>
  );
};

const PieTooltipContent = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 text-xs">
      <p style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
      <p className="font-bold" style={{ color: "#e8eaf0" }}>{payload[0].value}% of market</p>
    </div>
  );
};

export default function MarketSizing() {
  const [activeYear, setActiveYear] = useState(2);
  const yearRow = tamData[activeYear];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>Market Sizing</h1>
        <p className="text-sm" style={{ color: "#6b7280" }}>TAM / SAM / SOM analysis for compute derivatives · Based on 2026 market data</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "TAM", sublabel: "Total Addressable Market", value: "$250B+", by: "by 2030", desc: "Global GPU compute spend by AI companies, data centers, and cloud providers worldwide.", color: "#3b82f6" },
          { label: "SAM", sublabel: "Serviceable Addressable Market", value: "$80B", by: "by 2028", desc: "Companies spending >$1M/yr on compute with hedgeable, predictable demand profiles.", color: "#06b6d4" },
          { label: "SOM", sublabel: "Serviceable Obtainable Market", value: "$5–15B", by: "Year 1–3", desc: "Notional futures volume Ornn can realistically capture as the first regulated venue.", color: "#10b981" },
        ].map((item) => (
          <div key={item.label} className="card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-black" style={{ color: item.color }}>{item.label}</span>
              <span className="text-xs" style={{ color: "#6b7280" }}>{item.sublabel}</span>
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold" style={{ color: "#e8eaf0" }}>{item.value}</span>
              <span className="text-sm ml-2" style={{ color: "#6b7280" }}>{item.by}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-5 col-span-2">
          <p className="text-sm font-semibold mb-1" style={{ color: "#e8eaf0" }}>Market Growth Projection ($B)</p>
          <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Compute spend → derivatives layer → Ornn TAM</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={tamData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<StackTooltip />} />
              <Bar dataKey="compute" name="Compute Spend" stackId="a" fill="#1f2937" />
              <Bar dataKey="financialProducts" name="Financial Products" stackId="a" fill="#06b6d4" />
              <Bar dataKey="derivatives" name="Derivatives (Ornn TAM)" stackId="a" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[{color:"#1f2937",label:"Raw Compute Spend"},{color:"#06b6d4",label:"Financial Products Layer"},{color:"#3b82f6",label:"Derivatives (Ornn)"}].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-2.5 rounded-sm" style={{ background: l.color, border: l.color==="#1f2937"?"1px solid #374151":"none" }} />
                <span className="text-xs" style={{ color: "#6b7280" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>GPU Type Breakdown</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={marketBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {marketBreakdown.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
              </Pie>
              <Tooltip content={<PieTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {marketBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs" style={{ color: "#9ca3af" }}>{item.name}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#e8eaf0" }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5 mb-8">
        <p className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>Year-by-Year Projection Explorer</p>
        <div className="flex gap-2 mb-6">
          {tamData.map((row, i) => (
            <button key={row.year} onClick={() => setActiveYear(i)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{ background: activeYear===i?"#3b82f6":"#1f2937", color: activeYear===i?"#fff":"#6b7280" }}>
              {row.year}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Compute Market", value: `$${yearRow.compute}B`, color: "#6b7280" },
            { label: "Financial Products Layer", value: `$${yearRow.financialProducts}B`, color: "#06b6d4" },
            { label: "Derivatives Volume (Ornn)", value: `$${yearRow.derivatives}B`, color: "#3b82f6" },
          ].map((m) => (
            <div key={m.label} className="card-2 p-4">
              <p className="text-xs mb-2" style={{ color: "#6b7280" }}>{m.label}</p>
              <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-4">
          <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>Analog Market Comparisons</p>
          <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Precedent for compute derivatives: every volatile commodity eventually gets a futures market</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid #374151" }}>
                {["Market","Notional Volume","Avg. Volatility","First Trade","Ornn Parallel"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-8 font-medium" style={{ color: "#6b7280" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {analogMarkets.map((row, i) => (
                <tr key={row.market} style={{ borderBottom: "1px solid #1f2937", background: i===analogMarkets.length-1?"rgba(59,130,246,0.05)":"transparent" }}>
                  <td className="py-3 pr-8"><span style={{ color: i===analogMarkets.length-1?"#3b82f6":"#e8eaf0", fontWeight: i===analogMarkets.length-1?700:400 }}>{row.market}</span></td>
                  <td className="py-3 pr-8 font-semibold" style={{ color: "#10b981" }}>{row.notional}</td>
                  <td className="py-3 pr-8" style={{ color: "#f59e0b" }}>{row.vol}</td>
                  <td className="py-3 pr-8" style={{ color: "#9ca3af" }}>{row.started}</td>
                  <td className="py-3 pr-8" style={{ color: "#6b7280" }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: "#4b5563" }}>† Projected Year 1 notional futures volume target</p>
      </div>
    </div>
  );
}
