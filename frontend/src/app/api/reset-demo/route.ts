import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Demo environment state reset to baseline.",
    timestamp: new Date().toISOString()
  });
}
