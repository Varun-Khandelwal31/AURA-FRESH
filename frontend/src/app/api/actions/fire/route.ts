import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const crateId = body.crate_id || "AF-CRATE-0481";
  
  return NextResponse.json({
    success: true,
    crate_id: crateId,
    action_type: body.action_type || "ESL_MARKDOWN",
    custom_markdown_price: body.custom_markdown_price || 56.0,
    status: "FIRED",
    esl_sync: "CONFIRMED",
    whatsapp_blast: "QUEUED_28_CUSTOMERS",
    timestamp: new Date().toISOString()
  });
}
