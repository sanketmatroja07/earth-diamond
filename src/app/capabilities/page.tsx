'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Diamond, 
  Gem, 
  Package, 
  Settings, 
  Warehouse,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Store,
  Crown,
  Building
} from 'lucide-react';
import { Button, Card, Accordion } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { capabilities, companyInfo, buyerTypes } from '@/data/mock-data';

const iconMap: Record<string, typeof Diamond> = {
  cutting: Gem,
  matching: Diamond,
  calibrated: Package,
  custom: Settings,
  wholesale: Warehouse,
};

const buyerIconMap: Record<string, typeof Diamond> = {
  jeweler: Gem,
  wholesaler: Warehouse,
  retailChain: Store,
  brand: Crown,
  manufacturer: Building,
};

const buyerRecommendations: Record<string, { orderTypes: string[]; leadTime: string; moq: string }> = {
  jeweler: {
    orderTypes: ['Single stones', 'Matched pairs', 'Small calibrated lots'],
    leadTime: '5-10 days',
    moq: '5 stones or $2,000 value'
  },
  wholesaler: {
    orderTypes: ['Bulk parcels', 'Mixed lots', 'Regular supply programs'],
    leadTime: '7-14 days',
    moq: '50 stones or $10,000 value'
  },
  retailChain: {
    orderTypes: ['Standardized inventory', 'Calibrated sets', 'Seasonal programs'],
    leadTime: '10-21 days',
    moq: '100 stones or $25,000 value'
  },
  brand: {
    orderTypes: ['Custom specifications', 'Exclusive programs', 'White-label'],
    leadTime: '14-28 days',
    moq: 'Custom based on program'
  },
  manufacturer: {
    orderTypes: ['Melee parcels', 'Production runs', 'Calibrated sets'],
    leadTime: '7-14 days',
    moq: '100 stones or $15,000 value'
  },
};

const processSteps = [
  { step: 1, title: 'Requirement Intake', description: 'Submit your specifications via RFQ form, WhatsApp, or direct call.' },
  { step: 2, title: 'Production Planning', description: 'Our team creates a production plan matching your timeline and quality needs.' },
  { step: 3, title: 'Manufacturing', description: 'Precision cutting and polishing by our expert craftsmen.' },
  { step: 4, title: 'QA & Grading', description: 'Multi-point quality checks and optional GIA/IGI certification.' },
  { step: 5, title: 'Packing & Export', description: 'Secure packaging and complete export documentation.' },
  { step: 6, title: 'Post-Delivery Support', description: 'Ongoing support for returns, recuts, and future orders.' },
];

export default function CapabilitiesPage() {
  const { openModal } = useAppStore();
  const [selectedBuyerType, setSelectedBuyerType] = useState<string | null>(null);

  const accordionItems = capabilities.map(cap => ({
    id: cap.id,
    title: cap.title,
    content: (
      <div className="space-y-4">
        <p className="text-[var(--text-secondary)]">{cap.description}</p>
        <ul className="space-y-2">
          {cap.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="text-[var(--success)] flex-shrink-0 mt-0.5" size={16} />
              <span className="text-sm text-[var(--text-secondary)]">{detail}</span>
            </li>
          ))}
        </ul>
        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] mb-2">Sample Deliverables:</p>
          <div className="flex flex-wrap gap-2">
            {cap.deliverables.map((del, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-[var(--surface-elevated)] rounded-full text-xs text-[var(--text-secondary)]"
              >
                {del}
              </span>
            ))}
          </div>
        </div>
        <Button 
          size="sm" 
          onClick={() => openModal('rfq')}
          className="mt-4"
        >
          Request Quote for This
        </Button>
      </div>
    )
  }));

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] via-white to-[#f5f0eb]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[var(--primary-gold)] font-medium mb-4">Manufacturing Capabilities</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
              Full-Service Diamond Manufacturing
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              From precision cutting to bulk wholesale programs, we deliver consistent quality 
              at scale for B2B buyers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-12 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Monthly Capacity', value: companyInfo.stats.monthlyCapacity, suffix: 'stones' },
              { label: 'Avg Turnaround', value: companyInfo.stats.avgTurnaround, suffix: '' },
              { label: 'Matching Accuracy', value: '99.5%', suffix: '' },
              { label: 'QA Checkpoints', value: '12', suffix: 'stages' },
            ].map((kpi, idx) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-bold text-[var(--primary-gold)]">
                  {kpi.value}
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  {kpi.label} {kpi.suffix && <span className="text-[var(--text-secondary)]">({kpi.suffix})</span>}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Services with Images */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Comprehensive manufacturing services for every requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover className="h-full overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-[var(--font-heading)] text-white">
                      {cap.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[var(--text-secondary)] mb-4">{cap.description}</p>
                    <ul className="space-y-2 mb-4">
                      {cap.details.slice(0, 3).map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="text-[var(--success)] flex-shrink-0 mt-0.5" size={14} />
                          <span className="text-xs text-[var(--text-secondary)]">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openModal('rfq')}
                      className="w-full"
                    >
                      Request Quote
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 lg:py-28 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Our Process
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              A streamlined process from inquiry to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-[var(--border)] opacity-50">
                    {step.step}
                  </div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-[var(--primary-gold)]/10 rounded-full flex items-center justify-center mb-4">
                      <span className="text-sm font-bold text-[var(--primary-gold)]">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Fit Widget */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Find Your Fit
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Select your buyer type to see recommended order types and lead times.
            </p>
          </div>

          {/* Buyer Type Selection */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {buyerTypes.map((type) => {
              const Icon = buyerIconMap[type.id] || Building;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedBuyerType(type.id)}
                  className={`
                    p-6 rounded-[var(--radius)] border transition-all text-center
                    ${selectedBuyerType === type.id
                      ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/10'
                      : 'border-[var(--border)] hover:border-[var(--text-muted)] bg-[var(--surface)]'
                    }
                  `}
                >
                  <Icon 
                    className={`mx-auto mb-3 ${selectedBuyerType === type.id ? 'text-[var(--primary-gold)]' : 'text-[var(--text-muted)]'}`} 
                    size={32} 
                  />
                  <span className={`font-medium ${selectedBuyerType === type.id ? 'text-[var(--primary-gold)]' : 'text-[var(--text-secondary)]'}`}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Recommendations Display */}
          {selectedBuyerType && buyerRecommendations[selectedBuyerType] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-2">Recommended Order Types</p>
                    <ul className="space-y-1">
                      {buyerRecommendations[selectedBuyerType]?.orderTypes?.map((type, idx) => (
                        <li key={idx} className="text-sm text-[var(--text-secondary)]">• {type}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-2">Typical Lead Time</p>
                    <p className="text-2xl font-bold text-[var(--primary-gold)]">
                      {buyerRecommendations[selectedBuyerType]?.leadTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-2">Minimum Order</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {buyerRecommendations[selectedBuyerType]?.moq}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--border)] flex justify-end">
                  <Button onClick={() => openModal('rfq')}>
                    Get a Quote
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[var(--surface)] to-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
            Have Specific Requirements?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Our team can create a custom solution for your unique needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => openModal('rfq')} size="lg">
              Submit Requirements
            </Button>
            <Button variant="outline" onClick={() => openModal('whatsapp')} size="lg">
              Discuss on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
