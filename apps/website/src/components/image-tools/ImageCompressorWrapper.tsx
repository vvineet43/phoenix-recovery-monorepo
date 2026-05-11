'use client';
import dynamic from 'next/dynamic';

const ImageCompressorApp = dynamic(
  () => import('./ImageCompressorApp').then(m => ({ default: m.ImageCompressorApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading tool…</div> }
);

export default function ImageCompressorWrapper() {
  return <ImageCompressorApp />;
}
