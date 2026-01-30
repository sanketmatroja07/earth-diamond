'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Award, 
  CheckCircle, 
  FileCheck, 
  Lock, 
  Package,
  Download,
  Eye,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { certificates, companyInfo } from '@/data/mock-data';

const qaScoreCards = [
  { label: 'QA Checkpoints', value: '12', description: 'stages per stone' },
  { label: 'Matching Consistency', value: '99.5%', description: 'color/clarity accuracy' },
  { label: 'Return Rate', value: '<0.3%', description: 'industry-low returns' },
  { label: 'Compliance', value: '100%', description: 'no active flags' },
];

const packagingStandards = [
  {
    title: 'Individual Stone Packaging',
    description: 'Each stone is individually packaged in secure diamond parcels with tamper-evident seals.',
    features: ['Tamper-evident seals', 'Shock absorption', 'Humidity control']
  },
  {
    title: 'Bulk Lot Packaging',
    description: 'Bulk orders are sorted, labeled, and packed in secured containers with detailed inventory lists.',
    features: ['Sorted by specs', 'Detailed manifest', 'Insurance documentation']
  },
  {
    title: 'Export-Ready Packing',
    description: 'All shipments include complete documentation for smooth customs clearance.',
    features: ['Customs documentation', 'Certificate copies', 'Insurance coverage']
  }
];

const exportDocuments = [
  'Commercial Invoice',
  'Packing List',
  'Certificate of Origin',
  'Kimberley Process Certificate',
  'Insurance Certificate',
  'Customs Declaration'
];

export default function QualityPage() {
  const { openModal, showToast } = useAppStore();

  const handleDownloadCompliancePack = () => {
    showToast('Opening compliance pack request...', 'info');
    openModal('brochure');
  };

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--surface-elevated)_0%,_var(--background)_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[var(--primary-gold)] font-medium mb-4">Quality & Compliance</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
              Certified Quality. Ethical Standards.
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Multi-stage quality assurance, international certifications, and full compliance 
              with ethical sourcing standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Dashboard */}
      <section className="py-12 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {qaScoreCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <p className="text-3xl lg:text-4xl font-bold text-[var(--primary-gold)] mb-2">
                    {card.value}
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{card.label}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{card.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Library */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Industry-recognized certifications ensuring quality and ethical standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[var(--primary-gold)]/10 rounded-[var(--radius-sm)] flex items-center justify-center flex-shrink-0">
                      <Award className="text-[var(--primary-gold)]" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[var(--text-primary)]">{cert.name}</h3>
                        <Badge variant="success" size="sm">Verified</Badge>
                      </div>
                      <p className="text-sm text-[var(--primary-gold)]">{cert.type}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">
                    {cert.description}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openModal('certificate', cert)}
                      leftIcon={<Eye size={14} />}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => showToast('Certificate downloaded', 'success')}
                      leftIcon={<Download size={14} />}
                    >
                      Download
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Sourcing */}
      <section className="py-20 lg:py-28 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Shield className="text-[var(--primary-gold)] mb-6" size={48} />
              <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
                Ethical Sourcing Commitment
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                We maintain complete transparency in our supply chain with full Kimberley Process 
                compliance and documented chain of custody.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Full Kimberley Process Certification Scheme compliance',
                  'Documented chain of custody from rough to polished',
                  'Regular third-party audits and verification',
                  'Responsible Jewellery Council (RJC) standards adherence',
                  'Conflict-free diamond guarantee',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-[var(--success)] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>

              <Button onClick={handleDownloadCompliancePack}>
                Request Compliance Pack
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'KP Certified', desc: 'Kimberley Process compliant' },
                { icon: FileCheck, title: 'Chain of Custody', desc: 'Full documentation' },
                { icon: Award, title: 'RJC Member', desc: 'Responsible practices' },
                { icon: Lock, title: 'Verified Sources', desc: 'Audited suppliers' },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-5">
                    <item.icon className="text-[var(--primary-gold)] mb-3" size={28} />
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h4>
                    <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packaging & Security */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Packaging & Security
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Secure packaging standards ensuring your diamonds arrive safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {packagingStandards.map((standard, idx) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <Package className="text-[var(--primary-gold)] mb-4" size={32} />
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {standard.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {standard.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {standard.features.map((feature, fidx) => (
                      <Badge key={fidx} variant="default" size="sm">{feature}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Export Documentation Checklist */}
          <Card className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  Export Documentation Checklist
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  All export shipments include the following documents
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Template pack downloaded', 'success')}
                leftIcon={<Download size={16} />}
              >
                Download Templates
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {exportDocuments.map((doc, idx) => (
                <div 
                  key={doc}
                  className="flex items-center gap-3 p-3 bg-[var(--surface-elevated)] rounded-[var(--radius-sm)]"
                >
                  <CheckCircle className="text-[var(--success)]" size={18} />
                  <span className="text-sm text-[var(--text-secondary)]">{doc}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
            Need Compliance Documentation?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Request our complete compliance pack including all certifications and policies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={handleDownloadCompliancePack} size="lg">
              Request Compliance Pack
            </Button>
            <Button variant="outline" onClick={() => openModal('rfq')} size="lg">
              Contact Quality Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
