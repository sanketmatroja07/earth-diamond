'use client';

import { companyInfo } from '@/data/mock-data';

export default function TermsPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-8">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-[var(--text-secondary)]">
              Last updated: January 2026
            </p>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-[var(--text-secondary)]">
                By accessing and using the {companyInfo.name} website and services, you agree to be 
                bound by these Terms and Conditions. If you do not agree with any part of these terms, 
                you should not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                2. Business-to-Business Services
              </h2>
              <p className="text-[var(--text-secondary)]">
                Our services are primarily designed for B2B transactions with jewelry retailers, 
                wholesalers, manufacturers, and brands. Individual consumer purchases may be subject 
                to additional terms and minimum order requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                3. Product Information
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                We strive to provide accurate product information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                <li>Diamond specifications (carat, color, clarity, cut)</li>
                <li>Certification details (GIA, IGI)</li>
                <li>Pricing (subject to change)</li>
                <li>Availability status</li>
              </ul>
              <p className="text-[var(--text-secondary)] mt-4">
                All specifications are approximate and may vary slightly. Final specifications will 
                be confirmed in the formal quotation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                4. Pricing and Payment
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                <li>All prices displayed are indicative and subject to confirmation</li>
                <li>Final pricing will be provided in formal quotations</li>
                <li>Payment terms are agreed upon separately for each transaction</li>
                <li>Prices may fluctuate based on market conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                5. Orders and Delivery
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                <li>Orders are confirmed only upon receipt of signed quotation and payment</li>
                <li>Lead times are estimates and may vary based on availability</li>
                <li>All shipments are fully insured</li>
                <li>Delivery terms are specified in individual quotations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                6. Returns and Cancellations
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                Our return policy for B2B transactions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                <li>Returns accepted within 7 days of delivery for stock items</li>
                <li>Custom orders are non-refundable</li>
                <li>Items must be in original condition with all documentation</li>
                <li>Return shipping costs are the buyer&apos;s responsibility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                7. Certification and Quality
              </h2>
              <p className="text-[var(--text-secondary)]">
                All diamonds are graded according to GIA or IGI standards. Certification documents 
                are provided with applicable orders. We guarantee the authenticity and accuracy of 
                all certifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                8. Compliance
              </h2>
              <p className="text-[var(--text-secondary)]">
                {companyInfo.name} is fully compliant with the Kimberley Process Certification Scheme 
                and all applicable international trade regulations. We maintain complete chain of custody 
                documentation for all diamonds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                9. Intellectual Property
              </h2>
              <p className="text-[var(--text-secondary)]">
                All content on this website, including text, images, logos, and designs, is the 
                property of {companyInfo.name} and is protected by intellectual property laws. 
                Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-[var(--text-secondary)]">
                To the maximum extent permitted by law, {companyInfo.name} shall not be liable for 
                any indirect, incidental, special, or consequential damages arising from the use of 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                11. Governing Law
              </h2>
              <p className="text-[var(--text-secondary)]">
                These terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                12. Contact
              </h2>
              <p className="text-[var(--text-secondary)]">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <p className="text-[var(--text-secondary)] mt-4">
                Email: {companyInfo.email}<br />
                Phone: {companyInfo.phone}<br />
                Address: {companyInfo.address}
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
