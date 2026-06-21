import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const cleanEmail = email?.toLowerCase()?.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return NextResponse.json(
          { message: 'Valid email is required' },
          { status: 400 }
      );
    }

    // check duplicate (FIXED: maybeSingle instead of single)
    const { data: existing, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', cleanEmail)
        .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
      return NextResponse.json(
          { message: 'Already on waitlist' },
          { status: 409 }
      );
    }

    const { error: insertError } = await supabase
        .from('waitlist')
        .insert({ email: cleanEmail });

    if (insertError) throw insertError;

    console.log('NEW WAITLIST USER:', cleanEmail);

    return NextResponse.json(
        { message: 'Successfully joined waitlist', email: cleanEmail },
        { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
        { message: 'Failed to join waitlist' },
        { status: 500 }
    );
  }
}