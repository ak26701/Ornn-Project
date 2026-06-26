"use client";

import { useState } from "react";

const sequences = {
  hyperscaler: {
    label: "AI Hyperscalers", color: "#3b82f6", persona: "CFO / VP Infrastructure",
    steps: [
      { day: 1, channel: "Email", subject: "Locking in your H100 costs for the next 6 months",
        body: `Hi {First Name},\n\nSaw {Company} just announced {recent model/initiative} — that's a serious training run.\n\nThe H100 spot market is up 43% since January. For a training campaign at that scale, you're looking at ±$8M of unhedged compute exposure.\n\nWe built Ornn to solve this. We're the first regulated venue for cash-settled compute futures — you can lock in your $/GPU-hr cost 6 months out, the same way airlines lock in jet fuel.\n\nWorth a 20-min call to see if it maps to your Q3 training plans?\n\n{Your name}\nOrnn` },
      { day: 3, channel: "LinkedIn", subject: "LinkedIn connection + note",
        body: `Hi {First Name} — sent you a note about compute cost hedging at Ornn. Would love to connect and share how OpenAI-scale teams are thinking about this. {Your name}` },
      { day: 7, channel: "Email", subject: "The H100 basis trade (quick follow-up)",
        body: `Hi {First Name},\n\nQuick follow-up. One thing that may be relevant: our index shows H100 spot prices are currently trading at a 12% premium to 3-month forward estimates — that spread alone is the basis trade.\n\nCompanies that hedged in January locked in $2.82/hr. Spot is $4.10 today.\n\nHappy to walk through the math for {Company}'s compute profile. No pitch, just numbers.\n\n{Your name}` },
      { day: 14, channel: "Email", subject: "One last note + our index data",
        body: `Hi {First Name},\n\nI'll keep this short. Attaching our latest compute price index showing 6-month H100 volatility. If timing is off, I completely understand — happy to reconnect when {Company}'s next training cycle ramps up.\n\nEither way, worth bookmarking: the compute futures market is live and the spreads are widening.\n\nBest,\n{Your name}\n\nP.S. Happy to make an intro to our team if another exec is the right point of contact.` },
    ],
  },
  enterprise: {
    label: "Enterprise AI Teams", color: "#06b6d4", persona: "Head of AI / Director of ML Platform",
    steps: [
      { day: 1, channel: "Email", subject: "Your compute bill is probably your fastest-growing unplanned expense",
        body: `Hi {First Name},\n\nMost ML platform leads I talk to say the same thing: their cloud compute bill is the one line item that blows up the annual budget forecast.\n\nGPU spot prices moved ±34% last year. Most enterprise finance teams can't model that into an annual plan.\n\nWe built Ornn — a regulated exchange where you can buy compute price protection the same way you'd buy an interest rate swap. Lock in your $/GPU-hr for the year, reduce budget variance, keep procurement happy.\n\nWould a quick call make sense before your Q3 planning cycle?\n\n{Your name}\nOrnn` },
      { day: 5, channel: "Email", subject: "How JPMorgan-scale teams think about compute cost variance",
        body: `Hi {First Name},\n\nSharing a quick framework that resonates with enterprise AI leads:\n\n• Training budget: $4M planned → $5.4M actual (H100 spike in March)\n• Variance: $1.4M (35%) — hard to explain to a CFO\n• With Ornn hedge: $0.2M variance (locked at Jan price)\n\nThe math is simple. The instrument is new. Happy to walk through how it would apply to {Company}'s profile.\n\n{Your name}` },
      { day: 12, channel: "Email", subject: "Compute budgeting guide (no pitch)",
        body: `Hi {First Name},\n\nWrote a guide on GPU compute budget modeling for enterprise AI teams — covers variance analysis, hedging scenarios, and how to present cost predictability to your CFO.\n\nHappy to share + walk through the Ornn piece if relevant. No obligation.\n\n{Your name}` },
    ],
  },
  cloud: {
    label: "GPU Cloud Providers", color: "#10b981", persona: "CEO / CRO / Head of Finance",
    steps: [
      { day: 1, channel: "Email", subject: "H100 depreciation hedge — have you modeled this?",
        body: `Hi {First Name},\n\nCongrats on {recent GPU purchase / expansion}. Serious infrastructure build.\n\nOne thing I haven't seen GPU cloud companies price in publicly: H100s depreciate 30–40% annually. If you're holding $200M in GPU inventory, that's $60–80M of unhedged depreciation exposure.\n\nWe built Ornn so you can short compute futures against your GPU inventory — locking in today's price while you monetize the asset over 18 months.\n\nWorth 20 minutes to walk through the hedge math?\n\n{Your name}\nOrnn` },
      { day: 4, channel: "Email", subject: "How CoreWeave would use a compute futures position",
        body: `Hi {First Name},\n\nConcrete example: you sign a 12-month contract with a customer at $3.60/hr. H100 spot drops to $2.80 six months in (exactly what happened Feb '26).\n\nWithout a hedge: you're profitable on the contract but your next GPU purchase reprices lower — and lenders are marking your collateral down.\n\nWith an Ornn short: the basis between spot and your contract is locked. Your lender sees stable asset value. Your next debt round gets better terms.\n\nHappy to model this for {Company}'s specific position.\n\n{Your name}` },
      { day: 10, channel: "LinkedIn", subject: "LinkedIn follow-up",
        body: `{First Name} — following up on my email about compute futures. The GPU depreciation hedge is something I'd love to walk through in person if you're at GPU Tech Summit next month. {Your name} @ Ornn` },
      { day: 18, channel: "Email", subject: "Last note — debt financing angle",
        body: `Hi {First Name},\n\nOne more angle that may be timely: lenders are increasingly asking for mark-to-market GPU pricing before signing debt deals. Ornn's price index is becoming the benchmark they reference.\n\nIf you're raising debt against GPU inventory in the next 6 months, a relationship with Ornn could help the conversation.\n\nHappy to intro you to our team directly.\n\n{Your name}` },
    ],
  },
  finserv: {
    label: "Financial Institutions", color: "#f59e0b", persona: "Head of Commodities / CIO",
    steps: [
      { day: 1, channel: "Email", subject: "Compute: the new commodity desk opportunity",
        body: `Hi {First Name},\n\nQuick question: does your commodities desk have a view on GPU compute?\n\nIt has all the hallmarks of an early-stage commodity market: ±34% annual price volatility, a fragmented supply chain, no regulatory benchmark, and $80B+ of annual demand with structural tailwinds.\n\nOrnn is the first regulated, cash-settled futures exchange for GPU compute. We launched with a16z and are building the instruments the market needs.\n\nI'd love to share our index methodology and talk through how firms like yours are thinking about compute exposure.\n\n{Your name}\nOrnn` },
      { day: 6, channel: "Email", subject: "Compute vs. electricity: the analogy that's resonating",
        body: `Hi {First Name},\n\nThe comparison that resonates most with macro traders: compute is to AI what electricity was to the internet build-out in the 90s.\n\n• Non-storable (can't stockpile GPU-hours)\n• Location-specific pricing\n• Demand tied to structural technology adoption\n• Currently unhedgeable — we're changing that\n\nElectricity futures launched in 1996. $680B notional market today.\n\nHappy to share our market structure paper.\n\n{Your name}` },
      { day: 15, channel: "Email", subject: "FIA Chicago — are you attending?",
        body: `Hi {First Name},\n\nHeading to FIA Chicago next month. If you're attending, would love to connect in person and walk through our market structure.\n\nAlternatively, happy to put together a 2-page brief on the compute futures opportunity for your team.\n\n{Your name}` },
    ],
  },
};

type PersonaKey = keyof typeof sequences;
const channelColors: Record<string, string> = { Email: "#3b82f6", LinkedIn: "#06b6d4" };

export default function OutreachEngine() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("hyperscaler");
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const seq = sequences[activePersona];
  const step = seq.steps[activeStep];

  const handleCopy = () => {
    navigator.clipboard.writeText(step.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>Outreach Engine</h1>
        <p className="text-sm" style={{ color: "#6b7280" }}>Personalized sequences by buyer persona · {Object.values(sequences).reduce((a, s) => a + s.steps.length, 0)} templates across 4 ICPs</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(Object.entries(sequences) as [PersonaKey, typeof sequences[PersonaKey]][]).map(([key, s]) => (
          <button key={key} onClick={() => { setActivePersona(key); setActiveStep(0); }}
            className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
            style={{ background: activePersona===key?s.color:"#111827", color: activePersona===key?"#fff":"#9ca3af", border: activePersona===key?`1px solid ${s.color}`:'1px solid #374151' }}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>Sequence Steps</p>
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Buyer: {seq.persona}</p>
          </div>
          <div className="space-y-3">
            {seq.steps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)} className="w-full text-left p-3 rounded-lg transition-all"
                style={{ background: activeStep===i?`rgba(${activePersona==="hyperscaler"?"59,130,246":activePersona==="enterprise"?"6,182,212":activePersona==="cloud"?"16,185,129":"245,158,11"},0.1)`:"#1f2937", border: activeStep===i?`1px solid ${seq.color}`:'1px solid transparent' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: channelColors[s.channel]+"20", color: channelColors[s.channel] }}>{s.channel}</span>
                  <span className="text-xs" style={{ color: "#4b5563" }}>Day {s.day}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: activeStep===i?"#e8eaf0":"#9ca3af" }}>{s.subject}</p>
              </button>
            ))}
          </div>
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid #374151" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "#6b7280" }}>SEQUENCE STATS</p>
            <div className="space-y-2">
              {[
                { label: "Total touchpoints", value: seq.steps.length },
                { label: "Sequence length", value: `${seq.steps[seq.steps.length-1].day} days` },
                { label: "Channels", value: [...new Set(seq.steps.map(s => s.channel))].join(", ") },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between">
                  <span className="text-xs" style={{ color: "#6b7280" }}>{stat.label}</span>
                  <span className="text-xs font-medium" style={{ color: "#e8eaf0" }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: channelColors[step.channel]+"20", color: channelColors[step.channel] }}>{step.channel} · Day {step.day}</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#e8eaf0" }}>Subject: {step.subject}</p>
            </div>
            <button onClick={handleCopy} className="text-xs px-3 py-1.5 rounded font-medium transition-all"
              style={{ background: copied?"rgba(16,185,129,0.15)":"#1f2937", color: copied?"#10b981":"#9ca3af", border: `1px solid ${copied?"#10b981":"#374151"}` }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-lg p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap"
            style={{ background: "#0a0e1a", color: "#d1d5db", border: "1px solid #1f2937", minHeight: 320 }}>
            {step.body}
          </div>
          <div className="mt-4 flex items-start gap-3">
            <div className="flex-shrink-0 text-xs px-2 py-1 rounded" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Tip</div>
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
              {step.day===1 ? "Personalize {recent model/initiative} with a specific announcement or LinkedIn post from the prospect. Reference something real — it doubles reply rates." : step.channel==="LinkedIn" ? "Keep LinkedIn notes under 300 characters. Lead with the value prop, not the ask." : "Reference the previous touchpoint implicitly. Never say 'following up' — lead with new information or insight instead."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
