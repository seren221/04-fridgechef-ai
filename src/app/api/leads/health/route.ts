import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    return NextResponse.json({ status: "connected" });
  }

  return NextResponse.json({
    status: "mock",
    warning: "Supabase not configured. Leads will not be persisted."
  });
}
