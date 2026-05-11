'use client';
import dynamic from 'next/dynamic';

const ExifStripperApp = dynamic(
  () => import('./ExifStripperApp').then(m => ({ default: m.ExifStripperApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading tool…</div> }
);

export default function ExifStripperWrapper() {
  return <ExifStripperApp />;
}
