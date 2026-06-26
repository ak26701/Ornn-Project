import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ornn GTM Intelligence Suite",
  description: "Go-to-Market strategy & intelligence platform for Ornn – the compute futures exchange.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ background: "#0a0e1a", minHeight: "100vh" }}>
        <Navigation />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
