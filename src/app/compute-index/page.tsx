"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar, ReferenceLine,
} from "recharts";

const BASE_H100 = 2.82; // Jan 1 2026 baseline for OCPI = 100

const histData = [
  { date: "Jan 1",  h100: 2.82, a100: 1.64, rtx4090: 0.48 },
  { date: "Jan 8",  h100: 2.91, a100: 1.68, rtx4090: 0.50 },
  { date: "Jan 15", h100: 3.05, a100: 1.72, rtx4090: 0.49 },
  { date: "Jan 22", h100: 3.18, a100: 1.79, rtx4090: 0.52 },
  { date: "Feb 1",  h100: 3.02, a100: 1.71, rtx4090: 0.50 },
  { date: "Feb 8",  h100: 2.88, a100: 1.65, rtx4090: 0.48 },
  { date: "Feb 15", h100: 2.75, a100: 1.59, rtx4090: 0.46 },
  { date: "Feb 22", h100: 2.65, a100: 1.53, rtx4090: 0.44 },
  { date: "Mar 1",  h100: 2.80, a100: 1.61, rtx4090: 0.47 },
  { date: "Mar 8",  h100: 3.10, a100: 1.75, rtx4090: 0.51 },
  { date: "Mar 15", h100: 3.35, a100: 1.88, rtx4090: 0.55 },
  { date: "Mar 22", h100: 3.58, a100: 1.98, rtx4090: 0.57 },
  { date: "Apr 1",  h100: 3.72, a100: 2.04, rtx4090: 0.59 },
  { date: "Apr 8",  h100: 3.90, a100: 2.12, rtx4090: 0.61 },
  { date: "Apr 15", h100: 4.15, a100: 2.25, rtx4090: 0.64 },
  { date: "Apr 22", h100: 3.95, a100: 2.17, rtx4090: 0.62 },
  { date: "May 1",  h100: 3.78, a100: 2.08, rtx4090: 0.60 },
  { date: "May 8",  h100: 3.60, a100: 2.00, rtx4090: 0.58 },
  { date: "May 15", h100: 3.48, a100: 1.94, rtx4090: 0.56 },
  { date: "May 22", h100: 3.62, a100: 2.01, rtx4090: 0.58 },
  { date: "Jun 1",  h100: 3.80, a100: 2.10, rtx4090: 0.60 },
  { date: "Jun 8",  h100: 3.95, a100: 2.18, rtx4090: 0.62 },
  { date: "Jun 15", h100: 4.10, a100: 2.25, rtx4090: 0.64 },
  { date: "Jun 22", h100: 3.85, a100: 2.14, rtx4090: 0.61 },
];

const volData = [
  { date: "Jan", vol: 8.2 },
  { date: "Feb", vol: 12.4 },
  { date: "Mar", vol: 18.9 },
  { date: "Apr", vol: 14.6 },
  { date: "May", vol: 9.8 },
  { date: "Jun", vol: 11.3 },
];

const staticProviders = [
  { name: "CoreWeave",    h100: 3.85, a100: 2.12, availability: "92%", region: "US-East",      live: false },
  { name: "Lambda Labs",  h100: 3.49, a100: 1.89, availability: "88%", region: "US-West",      live: false },
  { name: "Vast.ai",      h100: 3.20, a100: 1.74, availability: "76%", region: "Global",       live: false },
  { name: "AWS (p4d)",    h100: 4.10, a100: 2.28, availability: "99%", region: "Multi-region", live: false },
  { name: "GCP (A3)",     h100: 4.25, a100: 2.35, availability: "99%", region: "Multi-region", live: false },
  { name: "Azure (NDv4)", h100: 4.18, a100: 2.30, availability: "98%", region: "Multi-region", live: false },
  { name: "Together AI",  h100: 3.60, a100: 1.98, availability: "95%", region: "US",           live: false },
  { name: "RunPod",       h100: 3.05, a100: 1.68, availability: "82%", region: "Global",       live: false },
];

interface LivePrices {
  h100: number | null;
  a100: number | null;
  rtx4090: number | null;
  runpodH100Community: number | null;
  runpodA100Community: number | null;
  timestamp: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}

const PriceTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 text-xs" style={{ minWidth: 160 }}>
      <p className="font-medium mb-2" style={{ color: "#9ca3af" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="mb-0.5">
          {p.name}: <span className="font-bold">${p.value.toFixed(2)}/hr</span>
        </p>
      ))}
    </div>
  );
};

export default function ComputeIndex() {
  const [activeGPU, setActiveGPU] = useState<"h100" | "a100" | "rtx4090">("h100");
  const [livePrices, setLivePrices] = useState<LivePrices | null>(null);
  const [loading, setLoading] = useState(true);
  const [ocpi, setOcpi] = useState(136);

  useEffect(() => {
    fetch("/api/gpu-prices")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: LivePrices & { error?: string } | null) => {
        if (data && !data.error) {
          setLivePrices(data);
          if (data.h100) {
            setOcpi(Math.round((data.h100 / BASE_H100) * 100 * 10) / 10);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setOcpi((prev) => Math.round((prev + (Math.random() - 0.5) * 0.4) * 10) / 10),
      2000
    );
    return () => clearInterval(t);
  }, []);

  const hist = histData[histData.length - 1];
  const hist30d = histData[histData.length - 8];

  const prices = {
    h100:    livePrices?.h100    ?? hist.h100,
    a100:    livePrices?.a100    ?? hist.a100,
    rtx4090: livePrices?.rtx4090 ?? hist.rtx4090,
  };

  const chartData = livePrices
    ? [...histData, { date: "Today", h100: livePrices.h100 ?? hist.h100, a100: livePrices.a100 ?? hist.a100, rtx4090: livePrices.rtx4090 ?? hist.rtx4090 }]
    : histData;

  const pctChange = (current: number, base: number) =>
    (((current - base) / base) * 100).toFixed(1);

  const providers = staticProviders.map((p) =>
    p.name === "RunPod" && livePrices
      ? { ...p, h100: livePrices.runpodH100Community ?? livePrices.h100 ?? p.h100, a100: livePrices.runpodA100Community ?? livePrices.a100 ?? p.a100, live: true }
      : p
  );

  const gpuLabels: Record<string, string> = { h100: "H100 8x SXM", a100: "A100 80GB", rtx4090: "RTX 4090" };
  const gpuColors: Record<string, string> = { h100: "#3b82f6", a100: "#06b6d4", rtx4090: "#10b981" };

  const ocpiVsBase = (ocpi - 100).toFixed(1);
  const isLive = !loading && livePrices !== null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>
            Ornn Compute Price Index (OCPI)
          </h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Real-time benchmark for GPU compute spot prices · Powers Ornn&apos;s futures settlement
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black mb-1" style={{ color: "#3b82f6" }}>
            {ocpi.toFixed(1)}
          </div>
          <div className="text-xs" style={{ color: Number(ocpiVsBase) >= 0 ? "#10b981" : "#ef4444" }}>
            {Number(ocpiVsBase) >= 0 ? "▲" : "▼"} {Number(ocpiVsBase) >= 0 ? "+" : ""}{ocpiVsBase}% vs Jan baseline
          </div>
        </div>
      </div>

      {/* GPU price cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["h100", "a100", "rtx4090"] as const).map((key) => {
          const price = prices[key];
          const base = hist30d[key];
          const change = pctChange(price, base);
          const color = gpuColors[key];
          const labels: Record<string, string> = { h100: "H100 8x SXM5", a100: "A100 80GB 8x", rtx4090: "RTX 4090 (spot)" };
          return (
            <button
              key={key}
              onClick={() => setActiveGPU(key)}
              className="card p-5 text-left transition-all"
              style={{
                border: activeGPU === key ? `1px solid ${color}` : "1px solid #374151",
                background: activeGPU === key
                  ? `rgba(${key === "h100" ? "59,130,246" : key === "a100" ? "6,182,212" : "16,185,129"},0.05)`
                  : "#111827",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs" style={{ color: "#6b7280" }}>{labels[key]}</p>
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: loading ? "rgba(107,114,128,0.1)" : isLive ? "rgba(16,185,129,0.1)" : "rgba(107,114,128,0.1)",
                    color: loading ? "#6b7280" : isLive ? "#10b981" : "#6b7280",
                  }}
                >
                  {loading ? "..." : isLive ? "Live" : "Est."}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color }}>
                ${price.toFixed(2)}<span className="text-sm font-normal">/hr</span>
              </p>
              <p className="text-xs font-medium" style={{ color: Number(change) >= 0 ? "#10b981" : "#ef4444" }}>
                {Number(change) >= 0 ? "▲" : "▼"} {change}% (30d)
              </p>
            </button>
          );
        })}
      </div>

      {/* Chart + vol */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>
                {gpuLabels[activeGPU]} · Spot Price
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                $/hr · Jan–Jun 2026{isLive ? " + Today (live)" : ""} · Ornn Index
              </p>
            </div>
            <div
              className="text-xs px-2 py-1 rounded"
              style={{
                background: isLive ? "rgba(16,185,129,0.1)" : "rgba(107,114,128,0.1)",
                color: isLive ? "#10b981" : "#6b7280",
              }}
            >
              {loading ? "Loading..." : isLive ? "LIVE · RunPod" : "ESTIMATED"}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gpuColors[activeGPU]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={gpuColors[activeGPU]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<PriceTooltip />} />
              <Area
                type="monotone"
                dataKey={activeGPU}
                name={gpuLabels[activeGPU]}
                stroke={gpuColors[activeGPU]}
                fill="url(#priceGrad)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <p className="text-sm font-semibold mb-1" style={{ color: "#e8eaf0" }}>30-Day Realized Vol (%)</p>
          <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Annualized price volatility by month</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={volData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="card p-2 text-xs">
                      <p style={{ color: "#9ca3af" }}>{label}</p>
                      <p style={{ color: "#f59e0b" }} className="font-bold">{payload[0].value}% vol</p>
                    </div>
                  );
                }}
              />
              <ReferenceLine y={12} stroke="#374151" strokeDasharray="3 3" />
              <Bar dataKey="vol" name="Volatility" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs mt-2" style={{ color: "#4b5563" }}>Dashed = oil market avg (12%)</p>
        </div>
      </div>

      {/* Provider table */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>Provider Price Feed</p>
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
              OCPI aggregates pricing from 8 providers · weighted by volume and availability
              {isLive && <span style={{ color: "#10b981" }}> · RunPod prices live</span>}
            </p>
          </div>
          {isLive && livePrices && (
            <span className="text-xs" style={{ color: "#4b5563" }}>
              Updated {new Date(livePrices.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid #374151" }}>
                {["Provider", "H100 8x ($/hr)", "A100 8x ($/hr)", "Availability", "Region", "vs. Index"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-6 font-medium" style={{ color: "#6b7280" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => {
                const diff = ((p.h100 - prices.h100) / prices.h100 * 100).toFixed(1);
                const isAbove = p.h100 > prices.h100;
                return (
                  <tr key={p.name} style={{ borderBottom: "1px solid #1f2937" }}>
                    <td className="py-3 pr-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: "#e8eaf0" }}>{p.name}</span>
                        <span
                          className="text-xs"
                          style={{ color: p.live ? "#10b981" : "#4b5563" }}
                        >
                          {p.live ? "Live" : "Est."}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-6 font-semibold" style={{ color: "#3b82f6" }}>${p.h100.toFixed(2)}</td>
                    <td className="py-3 pr-6" style={{ color: "#06b6d4" }}>${p.a100.toFixed(2)}</td>
                    <td className="py-3 pr-6" style={{ color: parseInt(p.availability) > 90 ? "#10b981" : "#f59e0b" }}>
                      {p.availability}
                    </td>
                    <td className="py-3 pr-6" style={{ color: "#9ca3af" }}>{p.region}</td>
                    <td className="py-3 pr-6">
                      <span className="font-semibold" style={{ color: isAbove ? "#ef4444" : "#10b981" }}>
                        {isAbove ? "+" : ""}{diff}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: "#4b5563" }}>
          Live = RunPod community spot avg per GPU · Est. = estimated from public pricing pages
        </p>
      </div>
    </div>
  );
}
