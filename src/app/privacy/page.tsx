'use client';

import { companyInfo } from '@/data/mock-data';

export default function PrivacyPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-[var(--text-secondary)]">
              Last updated: January 2026
            </p>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                1. Information We Collect
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                {companyInfo.name} collects information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                <li>Contact information (name, email, phone number, company name)</li>
                <li>Business information (buyer type, country, requirements)</li>
                <li>Communication preferences</li>
                <li>Inquiry and order details</li>
                <li>Files and documents you upload</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                <li>Respond to your inquiries and provide quotes</li>
                <li>Process and fulfill your orders</li>
                <li>Send you relevant product information and updates</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                3. Information Sharing
              </h2>
              <p className="text-[var(--text-secondary)]">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)] mt-4">
                <li>Process your orders (shipping partners, payment processors)</li>
                <li>Comply with legal requirements</li>
                <li>Protect our rights and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                4. Data Security
              </h2>
              <p className="text-[var(--text-secondary)]">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no 
                method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                5. Your Rights
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                6. Cookies
              </h2>
              <p className="text-[var(--text-secondary)]">
                Our website uses cookies to enhance your browsing experience. You can control 
                cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                7. Contact Us
              </h2>
              <p className="text-[var(--text-secondary)]">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-[var(--text-secondary)] mt-4">
                Email: {companyInfo.email}<br />
                Phone: {companyInfo.phone}<br />
                Address: {companyInfo.address}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                8. Updates to This Policy
              </h2>
              <p className="text-[var(--text-secondary)]">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
