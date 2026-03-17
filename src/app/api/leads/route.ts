import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Only create client if env vars are present to avoid build errors
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export async function POST(request: Request) {
  try {
    const { email, projectId, slug, referralDomain, metadata } = await request.json();

    if (!email || !projectId) {
      return NextResponse.json(
        { error: 'Email and Project ID are required' },
        { status: 400 }
      );
    }

    // Fallback to Mock Mode if Supabase is not configured
    if (!supabase) {
      console.warn('[Mock Mode] Supabase not configured. Lead captured in logs only:', { email, projectId });
      return NextResponse.json({ success: true, mode: 'mock' });
    }

    // Insert into global_leads table
    // Note: 'global_leads' is a conceptual unified table.
    // In practice, we might use the existing 'leads' table but enforce project_id.
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email,
          project_id: projectId,
          metadata: {
            slug,
            referral_domain: referralDomain,
            ...metadata
          }
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
