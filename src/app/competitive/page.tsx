"use client";

import { useState } from "react";

const competitors = [
  { id:"ornn", name:"Ornn", category:"Compute Futures Exchange", type:"us", position:{x:70,y:20}, funding:"$33M (a16z)", founded:"2025", description:"First regulated, cash-settled futures exchange for GPU compute. CFTC-compliant venue with standardized contracts.", strengths:["First mover in regulated compute futures","a16z + institutional backing","CFTC-compliant venue","Cash-settled (no physical delivery complexity)"], weaknesses:["Early liquidity (chicken-and-egg)","Unproven market category","Small team (6 people)","No brand recognition yet"], moat:"Regulatory approval + first-mover index ownership", color:"#3b82f6", size:"large" },
  { id:"cme", name:"CME Group", category:"Traditional Futures Exchange", type:"incumbent", position:{x:20,y:30}, funding:"Public ($75B market cap)", founded:"1898", description:"World's largest futures exchange. Could launch compute futures but hasn't — lacks AI-native expertise and speed.", strengths:["Massive liquidity","Regulatory trust","Global distribution","Established clearing"], weaknesses:["Slow to innovate","Not AI-native","Bureaucratic","Won't prioritize small emerging markets"], moat:"Legacy liquidity & relationships", color:"#6b7280", size:"xlarge" },
  { id:"ice", name:"Intercontinental Exchange", category:"Traditional Futures Exchange", type:"incumbent", position:{x:15,y:55}, funding:"Public ($68B market cap)", founded:"2000", description:"Major futures exchange (owns NYSE). Similar profile to CME — large incumbent unlikely to prioritize compute.", strengths:["Diversified exchange operator","Strong clearing infrastructure","Global reach"], weaknesses:["Same bureaucratic limitations as CME","No AI expertise"], moat:"Scale and distribution", color:"#6b7280", size:"xlarge" },
  { id:"coreweave", name:"CoreWeave", category:"GPU Cloud (indirect)", type:"adjacent", position:{x:55,y:65}, funding:"$23B valuation (IPO)", founded:"2017", description:"Largest GPU cloud provider. A potential partner AND a customer — they'd benefit from Ornn's hedging products.", strengths:["Massive GPU inventory","Enterprise relationships","IPO credibility"], weaknesses:["Not a financial product company","Would need Ornn to hedge their own risk"], moat:"Physical infrastructure at scale", color:"#10b981", size:"large" },
  { id:"vast", name:"Vast.ai", category:"GPU Marketplace (adjacent)", type:"adjacent", position:{x:75,y:60}, funding:"$50M+", founded:"2018", description:"Peer-to-peer GPU rental marketplace. Spot market only — no futures or hedging. Potential index data partner.", strengths:["Price discovery","Large GPU inventory network","Developer community"], weaknesses:["Consumer-grade focus","No financial products","Unregulated"], moat:"Network effects in spot GPU marketplace", color:"#10b981", size:"medium" },
  { id:"voltaire", name:"Voltaire", category:"Compute OTC (early)", type:"competitor", position:{x:50,y:30}, funding:"Seed (undisclosed)", founded:"2024", description:"OTC compute derivatives — unregulated bilateral contracts. Less standardized than Ornn, no central clearing.", strengths:["Earlier to market in OTC","Flexible structures"], weaknesses:["No regulatory status","OTC = counterparty risk","No index / benchmark"], moat:"Early customer relationships", color:"#f59e0b", size:"small" },
  { id:"sfox", name:"SFOX / B2C2", category:"Crypto OTC (analog)", type:"analog", position:{x:30,y:70}, funding:"$23M+", founded:"2014", description:"OTC desks for crypto — provide a precedent for how OTC commodity trading evolves into regulated venues.", strengths:["Proven model in adjacent market","Institutional relationships"], weaknesses:["Crypto-specific","Not compute"], moat:"Crypto trading relationships", color:"#9b59b6", size:"small" },
];

const battleCards = [
  { competitor:"CME / ICE (if they enter)", ourAdvantage:["We move at startup speed — CME took 3 years to launch Bitcoin futures","AI-native product design; they'd build a commodity contract with no AI expertise","We own the index: OCPI becomes the industry standard before CME builds theirs","First-mover customer relationships are sticky in exchange markets"], theirAttack:"We have more liquidity, more credibility, more clearing infrastructure", ourResponse:"Liquidity comes from market makers, not exchange size. We're actively recruiting the same firms that seed new CME products. By the time CME launches, we'll have 18 months of index data and contracts they'd have to delist." },
  { competitor:"Voltaire (OTC compute derivatives)", ourAdvantage:["We're regulated; OTC creates counterparty risk that sophisticated buyers avoid","Standardized contracts enable secondary market trading — OTC can't do this","CFTC compliance is a requirement for many institutional participants","Our index = neutral benchmark; theirs is proprietary and unverifiable"], theirAttack:"We're more flexible and already have customer relationships", ourResponse:"OTC works until it doesn't. The 2008 credit crisis was an OTC credit derivatives market. Regulated venues with central clearing exist to solve exactly this counterparty risk. As the market matures, customers will migrate from OTC to exchanges." },
  { competitor:"CoreWeave / Vast.ai (if they add financial products)", ourAdvantage:["They have regulatory conflicts of interest as both supplier and exchange operator","CFTC won't grant exchange status to a biased infrastructure company","We're Switzerland — neutral index, neutral venue","A hyperscaler hedging on CoreWeave's exchange is like buying oil insurance from Saudi Aramco"], theirAttack:"We have the data, the infrastructure, and the customer relationships", ourResponse:"Their data is exactly why they can't run a fair market. Index neutrality and exchange independence are foundational. Spot markets need neutral price discovery — that's the whole point." },
];

type CompetitorType = "us"|"incumbent"|"adjacent"|"competitor"|"analog";
const typeLabels: Record<CompetitorType,string> = { us:"Ornn", incumbent:"Incumbent Exchange", adjacent:"Adjacent Player", competitor:"Direct Competitor", analog:"Market Analog" };
const typeColors: Record<CompetitorType,string> = { us:"#3b82f6", incumbent:"#6b7280", adjacent:"#10b981", competitor:"#f59e0b", analog:"#9b59b6" };

export default function CompetitiveLandscape() {
  const [selected, setSelected] = useState("ornn");
  const [battleCard, setBattleCard] = useState(0);
  const company = competitors.find((c) => c.id === selected)!;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>Competitive Landscape</h1>
        <p className="text-sm" style={{ color: "#6b7280" }}>Market map, positioning analysis & battle cards for Ornn</p>
      </div>

      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>Market Positioning Map</p>
            <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>Regulatory compliance vs. compute-nativity · Click a company to explore</p>
          </div>
          <div className="flex gap-3">
            {(Object.entries(typeLabels) as [CompetitorType,string][]).map(([type, label]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: typeColors[type] }} />
                <span className="text-xs" style={{ color: "#6b7280" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-lg" style={{ height: 340, background: "#0a0e1a", border: "1px solid #1f2937" }}>
          <div className="absolute inset-0 flex items-center" style={{ pointerEvents: "none" }}><div className="w-full h-px" style={{ background: "#1f2937" }} /></div>
          <div className="absolute inset-0 flex justify-center" style={{ pointerEvents: "none" }}><div className="h-full w-px" style={{ background: "#1f2937" }} /></div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs" style={{ color: "#374151" }}>← Traditional · Compute-Native →</div>
          {competitors.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className="absolute flex flex-col items-center transition-all"
              style={{ left: `${c.position.x}%`, top: `${c.position.y}%`, transform: "translate(-50%, -50%)" }}>
              <div className="rounded-full flex items-center justify-center font-bold text-white transition-all"
                style={{ width: c.size==="xlarge"?48:c.size==="large"?36:c.size==="medium"?28:22, height: c.size==="xlarge"?48:c.size==="large"?36:c.size==="medium"?28:22, background: c.color, fontSize: c.size==="xlarge"?14:10, opacity: selected===c.id?1:0.7, boxShadow: selected===c.id?`0 0 16px ${c.color}80`:"none", border: selected===c.id?`2px solid ${c.color}`:'2px solid transparent' }}>
                {c.name[0]}
              </div>
              <span className="text-xs mt-1 font-medium whitespace-nowrap" style={{ color: selected===c.id?"#e8eaf0":"#6b7280", fontSize: 10 }}>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ background: company.color }} />
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: typeColors[company.type as CompetitorType]+"20", color: typeColors[company.type as CompetitorType] }}>{typeLabels[company.type as CompetitorType]}</span>
              </div>
              <h3 className="text-base font-bold" style={{ color: "#e8eaf0" }}>{company.name}</h3>
              <p className="text-xs" style={{ color: "#6b7280" }}>{company.category}</p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: "#6b7280" }}>Founded {company.founded}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: "#9ca3af" }}>{company.funding}</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "#9ca3af" }}>{company.description}</p>
          <div className="text-xs px-3 py-2 rounded" style={{ background: "#1f2937", color: "#6b7280" }}>
            <span className="font-semibold" style={{ color: "#9ca3af" }}>Moat: </span>{company.moat}
          </div>
        </div>

        <div className="card p-5">
          <p className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>SWOT</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:"Strengths", items:company.strengths, color:"#10b981", bg:"rgba(16,185,129,0.08)" },
              { label:"Weaknesses", items:company.weaknesses, color:"#ef4444", bg:"rgba(239,68,68,0.08)" },
            ].map((section) => (
              <div key={section.label} className="rounded-lg p-3" style={{ background: section.bg }}>
                <p className="text-xs font-semibold mb-2" style={{ color: section.color }}>{section.label}</p>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (<li key={i} className="text-xs leading-snug" style={{ color: "#9ca3af" }}>· {item}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <p className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>Battle Cards</p>
        <div className="flex gap-2 mb-5">
          {battleCards.map((bc, i) => (
            <button key={i} onClick={() => setBattleCard(i)} className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{ background: battleCard===i?"#1f2937":"transparent", color: battleCard===i?"#e8eaf0":"#6b7280", border: battleCard===i?"1px solid #374151":'1px solid transparent' }}>
              vs. {battleCards[i].competitor.split(" ")[0]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#10b981" }}>Our Advantages</p>
            <div className="space-y-2">
              {battleCards[battleCard].ourAdvantage.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#10b981" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#ef4444" }}>Their Attack</p>
              <div className="rounded-lg p-3 text-xs italic" style={{ background: "rgba(239,68,68,0.08)", color: "#9ca3af" }}>&ldquo;{battleCards[battleCard].theirAttack}&rdquo;</div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#3b82f6" }}>Our Response</p>
              <div className="rounded-lg p-3 text-xs leading-relaxed" style={{ background: "rgba(59,130,246,0.08)", color: "#9ca3af" }}>{battleCards[battleCard].ourResponse}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
