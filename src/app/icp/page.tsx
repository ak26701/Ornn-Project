"use client";

import { useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const personas = [
  {
    id: "hyperscaler", name: "AI Hyperscalers", color: "#3b82f6",
    examples: ["OpenAI","Anthropic","Mistral","Cohere","xAI"],
    tagline: "Training runs worth hundreds of millions — one price spike destroys a budget",
    buyerTitle: "CFO / VP Infrastructure",
    painPoints: ["Training run costs swing ±40% with spot pricing","Can't lock in cost of 6-month model training campaigns","CapEx commitments require compute price certainty","Board needs predictable COGS on AI development"],
    triggers: ["Recent fundraise (Series B+)","Announced large model training initiative","Public complaint about compute costs","New CFO / finance hire"],
    channels: ["Executive outbound (CEO/CFO)","a16z portfolio introduction","Conference (NeurIPS, MLSys)"],
    radarData: [{metric:"Spend Volume",score:95},{metric:"Price Sensitivity",score:90},{metric:"Hedge Appetite",score:85},{metric:"Decision Speed",score:55},{metric:"Sophistication",score:95}],
    score: 94, dealSize: "$300K–$2M/yr", timeToClose: "3–6 months",
  },
  {
    id: "enterprise", name: "Enterprise AI Teams", color: "#06b6d4",
    examples: ["JPMorgan AI","Microsoft Azure AI","Google DeepMind","Meta AI","Salesforce AI"],
    tagline: "Finance teams demand budget predictability — wildly volatile compute costs are a problem",
    buyerTitle: "Head of AI / Director of ML Platform",
    painPoints: ["Annual budgeting impossible with ±34% compute volatility","Procurement cycles can't adapt to spot market dynamics","Cloud bills are the #1 uncontrolled cost line","Regulatory pressure for cost predictability in finance/healthcare"],
    triggers: ["Annual budget planning cycle (Q3–Q4)","Cloud cost overrun vs. plan","New AI budget approval","IT/procurement digital transformation initiative"],
    channels: ["SDR outbound via LinkedIn","Content marketing (CFO/CTO audience)","Partner co-sell (cloud resellers)"],
    radarData: [{metric:"Spend Volume",score:70},{metric:"Price Sensitivity",score:80},{metric:"Hedge Appetite",score:65},{metric:"Decision Speed",score:40},{metric:"Sophistication",score:75}],
    score: 71, dealSize: "$75K–$400K/yr", timeToClose: "4–9 months",
  },
  {
    id: "cloud", name: "GPU Cloud Providers", color: "#10b981",
    examples: ["CoreWeave","Lambda Labs","Vast.ai","RunPod","Crusoe Energy"],
    tagline: "They're sitting on $500M+ of GPU inventory — and the value depreciates every month",
    buyerTitle: "CEO / CRO / Head of Finance",
    painPoints: ["H100s depreciate 30–40% annually — no instrument to hedge this","Signed long-term contracts at high spot prices; market drops = losses","Difficulty securing debt financing without stable revenue proof","Can't presell capacity at guaranteed prices without hedging exposure"],
    triggers: ["Recent large GPU purchase / expansion","Debt financing round","Public pricing pressure from AWS/GCP","New CFO with finance background"],
    channels: ["Direct founder outreach","GPU finance conference circuit","Lender introductions"],
    radarData: [{metric:"Spend Volume",score:80},{metric:"Price Sensitivity",score:95},{metric:"Hedge Appetite",score:90},{metric:"Decision Speed",score:75},{metric:"Sophistication",score:70}],
    score: 82, dealSize: "$200K–$1.5M/yr", timeToClose: "2–5 months",
  },
  {
    id: "finserv", name: "Financial Institutions", color: "#f59e0b",
    examples: ["Citadel","Two Sigma","Point72","Goldman Sachs","JPMorgan Quant"],
    tagline: "Hedge funds that trade commodities are looking for the next uncorrelated alpha — compute is it",
    buyerTitle: "Head of Commodities / CIO / Desk Lead",
    painPoints: ["Limited exposure to AI infrastructure as an asset class","GPU-backed loans need mark-to-market pricing (no benchmark exists today)","Looking for uncorrelated macro commodity exposure","Regulatory demand for transparent asset pricing in AI-backed deals"],
    triggers: ["Existing commodities desk looking for new product","Financed a GPU cloud company","LPs asking for AI infrastructure exposure","Regulatory guidance on AI asset pricing"],
    channels: ["Conference (FIA, Futures Industry)","Prime brokerage introductions","Regulatory / policy events"],
    radarData: [{metric:"Spend Volume",score:60},{metric:"Price Sensitivity",score:50},{metric:"Hedge Appetite",score:70},{metric:"Decision Speed",score:45},{metric:"Sophistication",score:95}],
    score: 64, dealSize: "$100K–$800K/yr", timeToClose: "6–12 months",
  },
];

export default function ICPProfiles() {
  const [active, setActive] = useState(0);
  const persona = personas[active];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>ICP Profiles</h1>
        <p className="text-sm" style={{ color: "#6b7280" }}>4 buyer personas for Ornn · Ranked by GTM priority score</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {personas.map((p, i) => (
          <button key={p.id} onClick={() => setActive(i)} className="card p-4 text-left transition-all"
            style={{ border: active===i?`1px solid ${p.color}`:'1px solid #374151', background: active===i?`rgba(${p.id==="hyperscaler"?"59,130,246":p.id==="enterprise"?"6,182,212":p.id==="cloud"?"16,185,129":"245,158,11"},0.06)`:'#111827' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="text-xs font-bold" style={{ color: p.color }}>{p.score}</span>
            </div>
            <p className="text-xs font-semibold mb-1" style={{ color: "#e8eaf0" }}>{p.name}</p>
            <p className="text-xs" style={{ color: "#6b7280" }}>{p.dealSize}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-6 col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: "#e8eaf0" }}>{persona.name}</h2>
              <p className="text-sm italic" style={{ color: "#9ca3af" }}>&ldquo;{persona.tagline}&rdquo;</p>
            </div>
            <div className="text-sm font-black px-3 py-1 rounded-lg"
              style={{ background: `rgba(${persona.id==="hyperscaler"?"59,130,246":persona.id==="enterprise"?"6,182,212":persona.id==="cloud"?"16,185,129":"245,158,11"},0.15)`, color: persona.color }}>
              {persona.score}/100
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[{label:"Buyer Title",value:persona.buyerTitle},{label:"Deal Size",value:persona.dealSize},{label:"Time to Close",value:persona.timeToClose}].map((m) => (
              <div key={m.label} className="card-2 p-3">
                <p className="text-xs mb-1" style={{ color: "#6b7280" }}>{m.label}</p>
                <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>{m.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#6b7280" }}>Pain Points</p>
              <div className="space-y-2">
                {persona.painPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#ef4444" }} />
                    <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#6b7280" }}>Buying Triggers</p>
              <div className="space-y-2">
                {persona.triggers.map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#10b981" }} />
                    <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#6b7280" }}>Channels</p>
            <div className="flex flex-wrap gap-2">
              {persona.channels.map((c) => (
                <span key={c} className="text-xs px-2 py-1 rounded" style={{ background: "#1f2937", color: "#9ca3af" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <p className="text-xs font-semibold mb-1" style={{ color: "#e8eaf0" }}>Fit Score Radar</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={persona.radarData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#6b7280", fontSize: 9 }} />
                <Radar name="Score" dataKey="score" stroke={persona.color} fill={persona.color} fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold mb-3" style={{ color: "#e8eaf0" }}>Example Targets</p>
            <div className="space-y-2">
              {persona.examples.map((ex) => (
                <div key={ex} className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: "#1f2937" }}>
                  <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" style={{ background: persona.color, color: "#fff" }}>{ex[0]}</div>
                  <span className="text-xs" style={{ color: "#e8eaf0" }}>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
