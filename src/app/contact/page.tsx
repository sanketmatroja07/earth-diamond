'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Send,
  Upload,
  CheckCircle,
  Trash2
} from 'lucide-react';
import { Button, Card, Input, Select, Textarea, Checkbox } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { companyInfo, buyerTypes, budgetRanges, timelines, interestAreas } from '@/data/mock-data';

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
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'other', label: 'Other' },
];

interface FormData {
  buyerType: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  interests: string[];
  quantity: string;
  budgetRange: string;
  timeline: string;
  notes: string;
  file: File | null;
}

const initialFormData: FormData = {
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

export default function ContactPage() {
  const { showToast, openModal } = useAppStore();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
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

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.buyerType) newErrors.buyerType = 'Please select buyer type';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.country) newErrors.country = 'Please select country';
    if (formData.interests.length === 0) newErrors.interests = 'Select at least one interest';
    if (!formData.timeline) newErrors.timeline = 'Please select timeline';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    showToast("RFQ submitted — we'll reply within 24 hours", 'success');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-[var(--success)]/20 rounded-full flex items-center justify-center">
            <CheckCircle className="text-[var(--success)]" size={40} />
          </div>
          <h1 className="text-3xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
            RFQ Submitted Successfully
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Thank you for your inquiry. Our team will review your requirements and respond within 24 hours.
          </p>
          <div className="p-4 bg-[var(--surface)] rounded-[var(--radius)] text-left mb-8">
            <p className="text-sm text-[var(--text-muted)] mb-2">Summary:</p>
            <p className="text-sm text-[var(--text-secondary)]">
              <strong>{formData.name}</strong> • {formData.companyName || 'N/A'}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {formData.interests.join(', ')}
            </p>
          </div>
          <Button onClick={() => setIsSuccess(false)}>
            Submit Another Request
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="bg-[var(--surface)] border-b border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-[var(--primary-gold)] font-medium mb-2">Contact Us</p>
            <h1 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Request a Quote
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Fill out the form below with your requirements and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <Card className="p-6 mb-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 text-[var(--text-secondary)] hover:text-[var(--primary-gold)] transition-colors"
                  >
                    <MapPin className="flex-shrink-0 mt-1" size={20} />
                    <span className="text-sm">{companyInfo.address}</span>
                  </a>

                  <a 
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--primary-gold)] transition-colors"
                  >
                    <Phone size={20} />
                    <span className="text-sm">{companyInfo.phone}</span>
                  </a>

                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--primary-gold)] transition-colors"
                  >
                    <Mail size={20} />
                    <span className="text-sm">{companyInfo.email}</span>
                  </a>

                  <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                    <Clock size={20} />
                    <div className="text-sm">
                      <p>Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                      <p className="text-[var(--text-muted)]">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* WhatsApp Quick Action */}
              <Card className="p-6 bg-[#25D366]/10 border-[#25D366]/30">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  Prefer WhatsApp?
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Get instant responses during business hours.
                </p>
                <Button 
                  variant="whatsapp" 
                  className="w-full"
                  onClick={() => openModal('whatsapp')}
                  leftIcon={<MessageCircle size={18} />}
                >
                  Chat on WhatsApp
                </Button>
              </Card>

              {/* Response Promise */}
              <div className="mt-6 p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  We respond within <span className="text-[var(--primary-gold)] font-medium">24 hours</span>
                </p>
              </div>
            </div>

            {/* RFQ Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
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

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                  {/* Requirements */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                    placeholder="Any specific requirements, sizes, specifications, quality preferences, etc."
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
                            type="button"
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

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    leftIcon={<Send size={18} />}
                  >
                    Send RFQ
                  </Button>

                  <p className="text-xs text-center text-[var(--text-muted)]">
                    By submitting, you agree to our privacy policy. We respond within 24 hours.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
