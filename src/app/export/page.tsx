'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Truck, 
  Package, 
  FileText,
  Clock,
  Shield,
  CheckCircle,
  Download,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Button, Card, Badge, Select } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { exportRegions } from '@/data/mock-data';

const shippingMethods = [
  { name: 'DHL Express', logo: 'DHL', time: '2-4 days', insured: true },
  { name: 'FedEx Priority', logo: 'FedEx', time: '3-5 days', insured: true },
  { name: 'Brinks Secure', logo: 'Brinks', time: '5-7 days', insured: true },
  { name: 'Malca-Amit', logo: 'M-A', time: '4-6 days', insured: true },
];

const wholesaleTiers = [
  {
    name: 'Starter Wholesale',
    moq: '50 stones / $5,000',
    benefits: ['Standard pricing', 'Email support', 'Standard lead times'],
    highlight: false
  },
  {
    name: 'Growth Wholesale',
    moq: '200 stones / $25,000',
    benefits: ['5% volume discount', 'Priority support', 'Priority production', 'Quarterly reviews'],
    highlight: true
  },
  {
    name: 'Enterprise Supply',
    moq: '500+ stones / $100,000',
    benefits: ['Custom pricing', 'Dedicated account manager', 'Exclusive inventory access', 'Flexible payment terms'],
    highlight: false
  },
];

const countries = [
  { value: 'us', label: 'United States', region: 'North America' },
  { value: 'uk', label: 'United Kingdom', region: 'Europe' },
  { value: 'de', label: 'Germany', region: 'Europe' },
  { value: 'ae', label: 'UAE', region: 'Middle East' },
  { value: 'hk', label: 'Hong Kong', region: 'Asia Pacific' },
  { value: 'sg', label: 'Singapore', region: 'Asia Pacific' },
  { value: 'jp', label: 'Japan', region: 'Asia Pacific' },
  { value: 'au', label: 'Australia', region: 'Asia Pacific' },
];

const orderTypes = [
  { value: 'standard', label: 'Standard Order' },
  { value: 'bulk', label: 'Bulk Order (50+ pcs)' },
  { value: 'custom', label: 'Custom Specification' },
  { value: 'urgent', label: 'Urgent/Express' },
];

export default function ExportPage() {
  const { openModal, showToast } = useAppStore();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [estimatedDays, setEstimatedDays] = useState<string | null>(null);

  const calculateLeadTime = () => {
    if (!selectedCountry || !selectedOrderType) {
      showToast('Please select both country and order type', 'error');
      return;
    }

    const country = countries.find(c => c.value === selectedCountry);
    const region = exportRegions.find(r => r.region.toLowerCase().includes(country?.region.split(' ')[0].toLowerCase() || ''));
    
    let baseDays = region?.leadTime || '5-7 days';
    
    if (selectedOrderType === 'urgent') {
      baseDays = '3-5 days (Express)';
    } else if (selectedOrderType === 'custom') {
      baseDays = '14-21 days';
    } else if (selectedOrderType === 'bulk') {
      baseDays = '10-14 days';
    }

    setEstimatedDays(baseDays);
  };

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--surface-elevated)_0%,_var(--background)_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[var(--primary-gold)] font-medium mb-4">Import/Export & Logistics</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
              Global Diamond Trade Made Simple
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Export-ready documentation, insured shipping, and wholesale programs 
              designed for international B2B buyers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Export Regions Map */}
      <section className="py-20 lg:py-28 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Regions We Serve
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Established export channels to major diamond trading hubs worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {exportRegions.map((region, idx) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Globe className="text-[var(--primary-gold)] mb-2" size={24} />
                      <h3 className="font-semibold text-[var(--text-primary)]">{region.region}</h3>
                    </div>
                    <Badge variant="gold">{region.leadTime}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.map((country) => (
                      <span 
                        key={country}
                        className="px-2 py-1 bg-[var(--surface-elevated)] rounded text-xs text-[var(--text-secondary)]"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* World Map Placeholder */}
          <Card className="p-8 bg-[var(--surface-elevated)]">
            <div className="aspect-[2/1] flex items-center justify-center">
              <div className="text-center">
                <Globe className="mx-auto text-[var(--primary-gold)] mb-4" size={64} />
                <p className="text-[var(--text-muted)]">Serving 40+ countries across 5 continents</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Shipping Partners
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              All shipments are fully insured through our verified courier partners.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingMethods.map((method, idx) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[var(--surface-elevated)] rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-[var(--primary-gold)]">{method.logo}</span>
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">{method.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-2">{method.time}</p>
                  {method.insured && (
                    <Badge variant="success" size="sm">
                      <Shield size={12} className="mr-1" />
                      Insured
                    </Badge>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Time Calculator */}
      <section className="py-20 lg:py-28 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Calculator className="mx-auto text-[var(--primary-gold)] mb-4" size={40} />
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Lead Time Calculator
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Get an estimated delivery timeline for your order.
            </p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Select
                label="Destination Country"
                placeholder="Select country"
                options={countries}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              />
              <Select
                label="Order Type"
                placeholder="Select order type"
                options={orderTypes}
                value={selectedOrderType}
                onChange={(e) => setSelectedOrderType(e.target.value)}
              />
            </div>

            <Button onClick={calculateLeadTime} className="w-full mb-6">
              Calculate Lead Time
            </Button>

            {estimatedDays && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-[var(--surface-elevated)] rounded-[var(--radius)] text-center"
              >
                <Clock className="mx-auto text-[var(--primary-gold)] mb-3" size={32} />
                <p className="text-sm text-[var(--text-muted)] mb-1">Estimated Delivery Time</p>
                <p className="text-2xl font-bold text-[var(--primary-gold)]">{estimatedDays}</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  *Actual times may vary based on customs processing
                </p>
              </motion.div>
            )}
          </Card>
        </div>
      </section>

      {/* Documentation Checklist */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FileText className="text-[var(--primary-gold)] mb-6" size={48} />
              <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
                Export Documentation
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Complete documentation for smooth customs clearance. All paperwork is prepared 
                by our export compliance team.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Commercial Invoice',
                  'Packing List',
                  'Certificate of Origin',
                  'Kimberley Process Certificate (KPC)',
                  'Insurance Certificate',
                  'Customs Declaration Forms'
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-[var(--success)]" size={20} />
                    <span className="text-[var(--text-secondary)]">{doc}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => showToast('Template pack downloaded', 'success')}
                leftIcon={<Download size={18} />}
              >
                Download Template Pack
              </Button>
            </div>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                Documentation Checklist
              </h3>
              <div className="space-y-4">
                {[
                  { doc: 'Commercial Invoice', status: 'included' },
                  { doc: 'Packing List', status: 'included' },
                  { doc: 'Certificate (GIA/IGI)', status: 'if applicable' },
                  { doc: 'KP Certificate', status: 'included' },
                  { doc: 'Insurance', status: 'included' },
                  { doc: 'Customs Forms', status: 'included' },
                ].map((item) => (
                  <div 
                    key={item.doc}
                    className="flex items-center justify-between p-3 bg-[var(--surface-elevated)] rounded-[var(--radius-sm)]"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-[var(--success)]" size={18} />
                      <span className="text-sm text-[var(--text-secondary)]">{item.doc}</span>
                    </div>
                    <Badge 
                      variant={item.status === 'included' ? 'success' : 'default'} 
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Wholesale Programs */}
      <section className="py-20 lg:py-28 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Wholesale Programs
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Structured programs with tiered benefits for volume buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wholesaleTiers.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card 
                  className={`p-6 h-full flex flex-col ${
                    tier.highlight ? 'border-[var(--primary-gold)] ring-1 ring-[var(--primary-gold)]' : ''
                  }`}
                >
                  {tier.highlight && (
                    <Badge variant="gold" className="self-start mb-4">Most Popular</Badge>
                  )}
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    MOQ: {tier.moq}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="text-[var(--success)] flex-shrink-0 mt-0.5" size={16} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={tier.highlight ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => openModal('rfq')}
                  >
                    Get Program Quote
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
            Ready to Start Importing?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Our export team is ready to help with your first order.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => openModal('rfq')} size="lg">
              Request Export Quote
            </Button>
            <Button variant="outline" onClick={() => openModal('whatsapp')} size="lg">
              Contact Export Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
