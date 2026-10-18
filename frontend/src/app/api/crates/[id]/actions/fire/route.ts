import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  
  return NextResponse.json({
    success: true,
    crate_id: id,
    action_type: body.action_type || "ESL_MARKDOWN",
    custom_markdown_price: body.custom_markdown_price || 56.0,
    status: "FIRED",
    esl_sync: "CONFIRMED",
    whatsapp_blast: "QUEUED_28_CUSTOMERS",
    timestamp: new Date().toISOString()
  });
}
