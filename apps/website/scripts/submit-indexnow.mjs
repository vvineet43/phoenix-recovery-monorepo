#!/usr/bin/env node
/**
 * Submits all sitemap URLs for thenextools.com to IndexNow (Bing, Yandex, Seznam, Naver, Yep).
 * Usage:
 *   npm run indexnow
 *   node scripts/submit-indexnow.mjs https://thenextools.com/image-compressor
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INDEXNOW_HOST = 'thenextools.com';
const INDEXNOW_KEY = '45afb9452f561055130cfd130a88907d';
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BASE_URL = `https://${INDEXNOW_HOST}`;

function verifyLocalKeyFile() {
  const localKeyPath = path.resolve(__dirname, '..', 'public', `${INDEXNOW_KEY}.txt`);
  const content = fs.readFileSync(localKeyPath, 'utf8').trim();
  if (content !== INDEXNOW_KEY) {
    throw new Error(`Local key file ${localKeyPath} does not match INDEXNOW_KEY`);
  }
}

async function fetchLiveSitemapUrls() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`, {
    headers: { Accept: 'application/xml,text/xml' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${BASE_URL}/sitemap.xml (HTTP ${res.status})`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>(https:\/\/thenextools\.com[^<]*)<\/loc>/g)].map(
    (m) => m[1]
  );
  return Array.from(new Set(matches));
}

async function main() {
  verifyLocalKeyFile();

  // Verify the key file is live on production before submitting
  const keyRes = await fetch(INDEXNOW_KEY_LOCATION);
  const keyText = keyRes.ok ? (await keyRes.text()).trim() : '';
  if (!keyRes.ok || keyText !== INDEXNOW_KEY) {
    console.error(
      `IndexNow key verification failed at ${INDEXNOW_KEY_LOCATION} (status=${keyRes.status}). Deploy public/${INDEXNOW_KEY}.txt first.`
    );
    process.exit(1);
  }

  const cliUrls = process.argv.slice(2).filter((u) => u.startsWith(`https://${INDEXNOW_HOST}`));
  const urlList = cliUrls.length > 0 ? cliUrls : await fetchLiveSitemapUrls();

  if (urlList.length === 0) {
    console.error('No URLs found to submit to IndexNow.');
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URLs to ${INDEXNOW_ENDPOINT}...`);

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    }),
  });

  const body = await res.text().catch(() => '');
  console.log(`IndexNow response: HTTP ${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`);
  if (res.status !== 200 && res.status !== 202) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
