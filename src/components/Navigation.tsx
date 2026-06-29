"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/market", label: "Market Sizing" },
  { href: "/compute-index", label: "Compute Index" },
  { href: "/icp", label: "ICP Profiles" },
  { href: "/outreach", label: "Outreach Engine" },
  { href: "/competitive", label: "Competitive Map" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: "rgba(10,14,26,0.95)", borderColor: "#374151", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          >
            O
          </div>
          <span className="font-semibold text-sm tracking-tight" style={{ color: "#e8eaf0" }}>
            Ornn GTM Suite
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                  color: active ? "#e8eaf0" : "#9ca3af",
                  background: active ? "#1f2937" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
          >
            Live
          </span>
        </div>
      </div>
    </nav>
  );
}
