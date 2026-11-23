export const INDEXNOW_HOST = 'thenextools.com';
export const INDEXNOW_KEY = '45afb9452f561055130cfd130a88907d';
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

const MAX_URLS_PER_BATCH = 10000;

export async function submitToIndexNow(urls) {
  const uniqueUrls = Array.from(
    new Set(
      (urls || [])
        .map((u) => (typeof u === 'string' ? u.trim() : ''))
        .filter((u) => u.startsWith(`https://${INDEXNOW_HOST}/`) || u === `https://${INDEXNOW_HOST}`)
    )
  );

  if (uniqueUrls.length === 0) {
    return { submitted: 0, batches: [] };
  }

  const batches = [];
  for (let i = 0; i < uniqueUrls.length; i += MAX_URLS_PER_BATCH) {
    const chunk = uniqueUrls.slice(i, i + MAX_URLS_PER_BATCH);
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: chunk,
      }),
    });

    const bodyText = await res.text().catch(() => '');
    batches.push({
      count: chunk.length,
      status: res.status,
      ok: res.status === 200 || res.status === 202,
      body: bodyText.slice(0, 300),
    });
  }

  return {
    submitted: uniqueUrls.length,
    ok: batches.every((b) => b.ok),
    batches,
  };
}
