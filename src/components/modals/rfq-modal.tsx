'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Upload, Trash2 } from 'lucide-react';
import { Modal, Button, Input, Select, Textarea, Checkbox } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { buyerTypes, budgetRanges, timelines, interestAreas } from '@/data/mock-data';

interface RFQFormData {
  // Step 1: Buyer Details
  buyerType: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  
  // Step 2: Requirements
  interests: string[];
  quantity: string;
  budgetRange: string;
  timeline: string;
  notes: string;
  file: File | null;
}

const initialFormData: RFQFormData = {
  buyerType: '',
  name: '',
  companyName: '',
  email: '',
  phone: '',
  country: '',
  interests: [],
  quantity: '',
  budgetRange: '',
  timeline: '',
  notes: '',
  file: null,
};

const countries = [
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'hk', label: 'Hong Kong' },
  { value: 'sg', label: 'Singapore' },
  { value: 'in', label: 'India' },
  { value: 'be', label: 'Belgium' },
  { value: 'it', label: 'Italy' },
  { value: 'other', label: 'Other' },
];

export function RFQModal() {
  const { activeModal, closeModal, rfqItems, clearRFQ, showToast } = useAppStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RFQFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof RFQFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isOpen = activeModal === 'rfq';

  const updateField = <K extends keyof RFQFormData>(field: K, value: RFQFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof RFQFormData, string>> = {};
    
    if (!formData.buyerType) newErrors.buyerType = 'Please select buyer type';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone/WhatsApp is required';
    if (!formData.country) newErrors.country = 'Please select country';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof RFQFormData, string>> = {};
    
    if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
    if (!formData.timeline) newErrors.timeline = 'Please select timeline';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    showToast("RFQ submitted — we'll reply within 24 hours", 'success');
    clearRFQ();
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setFormData(initialFormData);
      closeModal();
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setStep(1);
      setFormData(initialFormData);
      setErrors({});
      setIsSuccess(false);
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isSuccess ? undefined : "Request Quote"} size="lg">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="py-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-[var(--success)]/20 rounded-full flex items-center justify-center">
              <Check className="text-[var(--success)]" size={40} />
            </div>
            <h3 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-3">
              RFQ Submitted Successfully
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              We&apos;ll respond within 24 hours with a detailed quote.
            </p>
            <div className="p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] text-left max-w-sm mx-auto">
              <p className="text-sm text-[var(--text-muted)] mb-2">Summary:</p>
              <p className="text-sm text-[var(--text-secondary)]">
                <strong>{formData.name}</strong> • {formData.companyName || 'N/A'}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {formData.interests.join(', ')}
              </p>
              {rfqItems.length > 0 && (
                <p className="text-sm text-[var(--primary-gold)] mt-2">
                  + {rfqItems.length} items from catalog
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? -20 : 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress Bar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? 'bg-[var(--primary-gold)] text-[var(--background)]' : 'bg-[var(--surface-elevated)] text-[var(--text-muted)]'
                }`}>
                  1
                </div>
                <span className={`text-sm ${step >= 1 ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  Buyer Details
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-[var(--surface-elevated)]">
                <div 
                  className="h-full bg-[var(--primary-gold)] transition-all"
                  style={{ width: step >= 2 ? '100%' : '0%' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? 'bg-[var(--primary-gold)] text-[var(--background)]' : 'bg-[var(--surface-elevated)] text-[var(--text-muted)]'
                }`}>
                  2
                </div>
                <span className={`text-sm ${step >= 2 ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  Requirements
                </span>
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                {/* Buyer Type */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                    I am a... *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {buyerTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => updateField('buyerType', type.id)}
                        className={`
                          p-4 rounded-[var(--radius)] border text-center transition-all
                          ${formData.buyerType === type.id
                            ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]'
                            : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                          }
                        `}
                      >
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.buyerType && (
                    <p className="mt-2 text-sm text-[var(--error)]">{errors.buyerType}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                  />
                  <Input
                    label="Company Name"
                    placeholder="ABC Jewelers"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email *"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                  />
                  <Input
                    label="WhatsApp / Phone *"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    error={errors.phone}
                  />
                </div>

                <Select
                  label="Country *"
                  placeholder="Select your country"
                  options={countries}
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  error={errors.country}
                />

                {/* RFQ Items Preview */}
                {rfqItems.length > 0 && (
                  <div className="p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        Items from Catalog ({rfqItems.length})
                      </span>
                      <button
                        onClick={clearRFQ}
                        className="text-xs text-[var(--error)] hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {rfqItems.map((item) => (
                        <div key={item.diamond.id} className="flex items-center justify-between text-sm">
                          <span className="text-[var(--text-secondary)]">
                            {item.diamond.id} • {item.diamond.shape} • {item.diamond.carat}ct • {item.diamond.color}/{item.diamond.clarity}
                          </span>
                          <span className="text-[var(--text-muted)]">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} rightIcon={<ArrowRight size={18} />}>
                    Next: Requirements
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                    I&apos;m interested in... *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestAreas.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`
                          px-4 py-2 rounded-full border text-sm transition-all
                          ${formData.interests.includes(interest)
                            ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]'
                            : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                          }
                        `}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="mt-2 text-sm text-[var(--error)]">{errors.interests}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Estimated Quantity"
                    placeholder="e.g., 100 pieces"
                    value={formData.quantity}
                    onChange={(e) => updateField('quantity', e.target.value)}
                  />
                  <Select
                    label="Budget Range"
                    placeholder="Select range"
                    options={budgetRanges.map(b => ({ value: b, label: b }))}
                    value={formData.budgetRange}
                    onChange={(e) => updateField('budgetRange', e.target.value)}
                  />
                  <Select
                    label="Timeline *"
                    placeholder="When do you need it?"
                    options={timelines.map(t => ({ value: t, label: t }))}
                    value={formData.timeline}
                    onChange={(e) => updateField('timeline', e.target.value)}
                    error={errors.timeline}
                  />
                </div>

                <Textarea
                  label="Additional Notes"
                  placeholder="Any specific requirements, sizes, specifications, etc."
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                />

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Upload Requirements (optional)
                  </label>
                  <div className="border-2 border-dashed border-[var(--border)] rounded-[var(--radius)] p-6 text-center hover:border-[var(--text-muted)] transition-colors">
                    {formData.file ? (
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-sm text-[var(--text-secondary)]">{formData.file.name}</span>
                        <button
                          onClick={() => updateField('file', null)}
                          className="p-1 hover:text-[var(--error)] transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 10 * 1024 * 1024) {
                                showToast('File size must be less than 10MB', 'error');
                                return;
                              }
                              updateField('file', file);
                            }
                          }}
                        />
                        <Upload className="mx-auto text-[var(--text-muted)] mb-2" size={24} />
                        <p className="text-sm text-[var(--text-secondary)]">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          PDF, Excel, Word, Images (max 10MB)
                        </p>
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-[var(--border)]">
                  <Button variant="ghost" onClick={() => setStep(1)} leftIcon={<ArrowLeft size={18} />}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} isLoading={isSubmitting}>
                    Submit RFQ
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
