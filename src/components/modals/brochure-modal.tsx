'use client';

import { useState } from 'react';
import { Download, FileText, Check } from 'lucide-react';
import { Modal, Button, Input, Checkbox } from '@/components/ui';
import { useAppStore } from '@/store/app-store';

export function BrochureModal() {
  const { activeModal, closeModal, showToast } = useAppStore();
  const [email, setEmail] = useState('');
  const [subscribeUpdates, setSubscribeUpdates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isOpen = activeModal === 'brochure';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    showToast('Brochure downloaded successfully!', 'success');

    // Simulate download
    setTimeout(() => {
      // In production, this would trigger actual file download
      const link = document.createElement('a');
      link.href = '/brochure/company-brochure.pdf';
      link.download = 'Prismatic-Diamonds-Brochure.pdf';
      // link.click(); // Uncomment in production
    }, 500);

    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setEmail('');
    setSubscribeUpdates(true);
    setError('');
    setIsSuccess(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Download Company Brochure" size="sm">
      {isSuccess ? (
        <div className="py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--success)]/20 rounded-full flex items-center justify-center">
            <Check className="text-[var(--success)]" size={32} />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
            Download Started
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Your brochure is being downloaded.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brochure Preview */}
          <div className="flex items-center gap-4 p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] border border-[var(--border)]">
            <div className="w-12 h-12 bg-[var(--primary-gold)]/10 rounded-[var(--radius-sm)] flex items-center justify-center">
              <FileText className="text-[var(--primary-gold)]" size={24} />
            </div>
            <div>
              <p className="font-medium text-[var(--text-primary)]">Company Brochure</p>
              <p className="text-sm text-[var(--text-muted)]">PDF • 4.2 MB</p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            Enter your email to download our comprehensive company brochure with capabilities, certifications, and product catalog overview.
          </p>

          <Input
            label="Email Address *"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            error={error}
          />

          <Checkbox
            label="Send me catalog updates and market insights"
            checked={subscribeUpdates}
            onChange={(e) => setSubscribeUpdates(e.target.checked)}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            leftIcon={<Download size={18} />}
          >
            Download Brochure
          </Button>

          <p className="text-xs text-center text-[var(--text-muted)]">
            We respect your privacy. No spam, ever.
          </p>
        </form>
      )}
    </Modal>
  );
}
