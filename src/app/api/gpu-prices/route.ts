import { NextResponse } from "next/server";

const RUNPOD_GQL = "https://api.runpod.io/graphql";

const QUERY = `{
  gpuTypes {
    id
    displayName
    memoryInGb
    securePrice
    communityPrice
  }
}`;

interface GpuType {
  id: string;
  displayName: string;
  memoryInGb: number;
  securePrice: number | null;
  communityPrice: number | null;
}

function spotPrice(g: GpuType): number | null {
  return g.communityPrice ?? g.securePrice ?? null;
}

function avg(nums: number[]): number | null {
  const valid = nums.filter((n) => n > 0);
  if (!valid.length) return null;
  return Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 100) / 100;
}

export async function GET() {
  try {
    const res = await fetch(RUNPOD_GQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`RunPod responded ${res.status}`);

    const json = await res.json();
    const gpuTypes: GpuType[] = json?.data?.gpuTypes ?? [];

    const match = (pattern: RegExp) =>
      gpuTypes.filter((g) => pattern.test(g.id) || pattern.test(g.displayName));

    const h100Types = match(/h100/i);
    const a100Types = match(/a100/i);
    const rtx4090Types = match(/4090/i);

    const toSpot = (types: GpuType[]) =>
      types.map(spotPrice).filter((p): p is number => p !== null);

    return NextResponse.json({
      h100: avg(toSpot(h100Types)),
      a100: avg(toSpot(a100Types)),
      rtx4090: avg(toSpot(rtx4090Types)),
      runpodH100Secure: h100Types[0]?.securePrice ?? null,
      runpodH100Community: h100Types[0]?.communityPrice ?? null,
      runpodA100Community: a100Types[0]?.communityPrice ?? null,
      source: "runpod",
      timestamp: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: String(err), source: "error" },
      { status: 502 }
    );
  }
}
