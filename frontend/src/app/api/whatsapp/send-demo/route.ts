import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    recipients_count: 34,
    status: "DELIVERED",
    deal_title: "Fresh Roma Tomatoes — 30% Off (₹56/kg)",
    timestamp: new Date().toISOString()
  });
}
