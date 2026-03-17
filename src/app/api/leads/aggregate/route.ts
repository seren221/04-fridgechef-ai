import { NextResponse } from 'next/server';

// Mock implementation of aggregated leads
// In production, this would query Supabase with `GROUP BY project_id`
export async function GET() {
  const aggregatedData = {
    "total_leads": 1243,
    "projects": [
      {
        "id": "dream-interpreter",
        "leads": 850,
        "conversion_rate": "12.5%",
        "status": "PROFITABLE"
      },
      {
        "id": "market-scanner",
        "leads": 320,
        "conversion_rate": "8.2%",
        "status": "GROWING"
      },
      {
        "id": "unknown",
        "leads": 73,
        "conversion_rate": "1.1%",
        "status": "AT_RISK"
      }
    ]
  };

  return NextResponse.json(aggregatedData);
}
