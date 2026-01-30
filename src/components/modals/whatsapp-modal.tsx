'use client';

import { useState } from 'react';
import { Copy, ExternalLink, Check, MessageCircle } from 'lucide-react';
import { Modal, Button, Input, Select } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { companyInfo } from '@/data/mock-data';

const countries = [
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'hk', label: 'Hong Kong' },
  { value: 'sg', label: 'Singapore' },
  { value: 'in', label: 'India' },
  { value: 'other', label: 'Other' },
];

export function WhatsAppModal() {
  const { activeModal, closeModal, showToast } = useAppStore();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [requirement, setRequirement] = useState('');
  const [copied, setCopied] = useState(false);

  const isOpen = activeModal === 'whatsapp';

  const message = `Hi, I'm interested in diamond supply.${city ? ` City: ${city}` : ''}${country ? ` Country: ${countries.find(c => c.value === country)?.label || country}` : ''}${requirement ? ` Requirement: ${requirement}` : ''}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    showToast('Message copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${companyInfo.whatsapp.replace(/\+/g, '')}?text=${encodedMessage}`, '_blank');
  };

  const handleClose = () => {
    setCity('');
    setCountry('');
    setRequirement('');
    setCopied(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="WhatsApp Inquiry" size="md">
      <div className="space-y-6">
        {/* WhatsApp Icon */}
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-[#25D366]/20 rounded-full flex items-center justify-center">
            <MessageCircle className="text-[#25D366]" size={32} />
          </div>
        </div>

        <p className="text-center text-[var(--text-secondary)]">
          Fill in your details below to start a WhatsApp conversation with our team.
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            label="City"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Select
            label="Country"
            placeholder="Select your country"
            options={countries}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            label="Brief Requirement"
            placeholder="e.g., Round diamonds 0.5-1ct, VVS clarity"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          />
        </div>

        {/* Message Preview */}
        <div className="p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] mb-2">Message Preview:</p>
          <p className="text-sm text-[var(--text-secondary)]">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCopy}
            leftIcon={copied ? <Check size={18} /> : <Copy size={18} />}
          >
            {copied ? 'Copied!' : 'Copy Message'}
          </Button>
          <Button
            variant="primary"
            className="flex-1 !bg-[#25D366] hover:!bg-[#128C7E]"
            onClick={handleOpenWhatsApp}
            rightIcon={<ExternalLink size={18} />}
          >
            Open WhatsApp
          </Button>
        </div>

        {/* Response Time */}
        <p className="text-center text-xs text-[var(--text-muted)]">
          Typical response time: 30 minutes during business hours
        </p>
      </div>
    </Modal>
  );
}
