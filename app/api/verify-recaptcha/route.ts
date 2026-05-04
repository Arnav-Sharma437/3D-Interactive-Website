import { NextResponse } from 'next/server';

/** Google reCAPTCHA v3 verify — score ≥ minScore passes */
const MIN_SCORE = 0.4;

export async function POST(request: Request) {
  let token: string | undefined;
  try {
    const body = await request.json();
    token = body.token;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ success: true, skipped: true });
    }
    return NextResponse.json({ success: false, error: 'reCAPTCHA not configured on server' }, { status: 503 });
  }

  if (!token) {
    return NextResponse.json({ success: false, error: 'Missing token' }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = (await res.json()) as {
    success: boolean;
    score?: number;
    action?: string;
    'error-codes'?: string[];
  };

  if (!data.success) {
    return NextResponse.json(
      { success: false, error: data['error-codes']?.join(', ') || 'Verify failed' },
      { status: 400 }
    );
  }

  if (typeof data.score === 'number' && data.score < MIN_SCORE) {
    return NextResponse.json({ success: false, error: 'Security check failed — try again' }, { status: 403 });
  }

  return NextResponse.json({ success: true, score: data.score });
}
