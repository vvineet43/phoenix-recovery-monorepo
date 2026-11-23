import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getSitemapEntries } from '@/lib/sitemap-entries';
import { submitToIndexNow } from '@/lib/indexnow';

function isAuthorized(request) {
  const expected = process.env.INDEXNOW_ADMIN_SECRET;
  if (!expected) return { ok: false, status: 503, error: 'INDEXNOW_ADMIN_SECRET is not configured' };

  const authHeader = request.headers.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const provided = bearer || request.headers.get('x-indexnow-secret') || '';

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, status: 401, error: 'Unauthorized' };
  }
  return { ok: true };
}

export async function POST(request) {
  const auth = isAuthorized(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    let urls = [];
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      if (Array.isArray(body?.urls) && body.urls.length > 0) {
        urls = body.urls;
      }
    }

    if (urls.length === 0) {
      urls = getSitemapEntries().map((entry) => entry.url);
    }

    const result = await submitToIndexNow(urls);
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'IndexNow submission failed' },
      { status: 500 }
    );
  }
}
