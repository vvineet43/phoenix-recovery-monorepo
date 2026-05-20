import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy | TheNexTools',
  description: 'Our refund policy for NexData Recovery Pro and other paid software. Learn how to request a refund and what is covered.',
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <>
      

      <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1>Refund Policy</h1>
          <p className="text-muted">Last Updated: May 20, 2026</p>
        </header>

        <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div>
            <h3>Overview</h3>
            <p>If NexData Recovery Pro isn&apos;t working properly on your system, you can request a full refund. We just ask that you meet the conditions below.</p>
          </div>

          <div>
            <h3>Refund Eligibility</h3>
            <p>To be eligible for a refund, <strong>all</strong> of the following conditions must be met:</p>
            <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              <li>The refund request is submitted <strong>within 10 days</strong> of the original purchase date.</li>
              <li>You provide clear evidence that the software is malfunctioning, such as a <strong>screenshot or screen recording</strong> showing the error or failure.</li>
              <li>The issue is a genuine software defect — not an inherent limitation of data recovery technology (see exclusions below).</li>
            </ol>
          </div>

          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>⚠️</span> What Is NOT Eligible for a Refund
            </h3>
            <p style={{ marginBottom: '1rem' }}>Recovery depends on the physical condition of your drive. These situations are <strong>not</strong> software bugs and are <strong>not</strong> covered by our refund policy:</p>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><strong>Overwritten data:</strong> When new data has been written to the same disk sectors after deletion, the original files are permanently destroyed. No software can recover overwritten data.</li>
              <li><strong>Physically damaged drives:</strong> If the storage device has physical damage (e.g., head crash, water damage, burned circuits), software-based recovery cannot access the media. This requires professional cleanroom services.</li>
              <li><strong>Heavily fragmented files:</strong> Large files (especially videos) that were stored in non-contiguous disk sectors may be partially recoverable but not fully playable. This is a fundamental limitation of file carving, not a bug.</li>
              <li><strong>Encrypted volumes without the key:</strong> If the original encryption password or recovery key is lost, the data cannot be decrypted by any tool.</li>
              <li><strong>SSD TRIM&apos;d data:</strong> Modern SSDs with TRIM enabled permanently erase deleted blocks at the hardware level. Once TRIM has run, the data is physically gone.</li>
              <li><strong>Unsupported file formats:</strong> NexData recovers files by matching known binary signatures. Proprietary or extremely rare formats may not be supported.</li>
              <li><strong>Partial or corrupted recovery results:</strong> Recovered files may not always be 100% intact. Partial recovery of some files from a damaged or overwritten disk is expected behavior, not a defect.</li>
            </ul>
          </div>

          <div>
            <h3>How to Request a Refund</h3>
            <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              <li>Send an email to <a href="mailto:support@xpensepal.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>support@xpensepal.com</a> with the subject line: <strong>&quot;Refund Request — NexData Recovery Pro&quot;</strong></li>
              <li>Include your <strong>order confirmation email</strong> or <strong>license key</strong> for verification.</li>
              <li>Attach a <strong>screenshot or screen recording</strong> clearly showing the issue you are experiencing.</li>
              <li>Briefly describe the problem and the steps you took before encountering it.</li>
            </ol>
          </div>

          <div>
            <h3>Processing Time</h3>
            <p>We aim to review all refund requests within <strong>3 business days</strong>. If approved, the refund will be processed to your original payment method within 5–10 business days depending on your bank or payment provider.</p>
          </div>

          <div>
            <h3>Important Notes</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              <li>Refund requests submitted <strong>after 10 days</strong> from the purchase date will not be honored.</li>
              <li>We strongly encourage you to use the <strong>Free Version</strong> first — it allows unlimited scanning and full file previews so you can verify your data is recoverable <em>before</em> purchasing a Pro license.</li>
              <li>Upon refund approval, your license key will be deactivated.</li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <p>For any questions about this policy, reach out to us at <a href="mailto:support@xpensepal.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>support@xpensepal.com</a>.</p>
          </div>

        </section>
      </main>
    </>
  );
}
