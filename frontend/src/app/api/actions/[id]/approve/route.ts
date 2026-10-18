import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    success: true,
    action_id: id,
    status: "DISPATCHED",
    timestamp: new Date().toISOString(),
    message: `Action ${id} successfully approved and executed.`
  });
}
