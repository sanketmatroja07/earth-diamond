'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Shield, Truck, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Modal, Button, Badge, Input, Textarea, Select } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { Diamond } from '@/data/mock-data';

const countries = [
  { value: 'ae', label: 'UAE' },
  { value: 'us', label: 'USA' },
  { value: 'uk', label: 'UK' },
  { value: 'de', label: 'Germany' },
  { value: 'hk', label: 'Hong Kong' },
  { value: 'other', label: 'Other' },
];

export function ProductDetailModal() {
  const { activeModal, modalData, closeModal, addToRFQ, addToCompare, showToast, openModal, compareItems } = useAppStore();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  const isOpen = activeModal === 'product-detail';
  const diamond = modalData as Diamond | null;

  if (!diamond) return null;

  // Multiple views of the same diamond image
  const images = [diamond.image, diamond.image, diamond.image];

  const handleAddToRFQ = () => {
    addToRFQ(diamond, quantity);
    showToast(`${diamond.id} added to RFQ (${quantity} pcs)`, 'success');
  };

  const handleQuickRFQ = () => {
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    addToRFQ(diamond, quantity);
    showToast('Quick RFQ submitted!', 'success');
    closeModal();
    openModal('rfq');
  };

  const handleAddToCompare = () => {
    if (compareItems.length >= 4) {
      showToast('Maximum 4 items for comparison', 'warning');
      return;
    }
    if (compareItems.find(d => d.id === diamond.id)) {
      showToast('Already in comparison', 'info');
      return;
    }
    addToCompare(diamond);
    showToast('Added to comparison', 'success');
  };

  const handleClose = () => {
    setQuantity(1);
    setNotes('');
    setCountry('');
    setEmail('');
    setPhone('');
    setCurrentImage(0);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" showCloseButton={false}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square bg-[#f8f8f8] rounded-[var(--radius)] overflow-hidden mb-4">
            {/* Main Image */}
            <Image
              src={images[currentImage]}
              alt={`${diamond.shape} ${diamond.carat}ct Diamond`}
              fill
              className="object-cover"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 justify-center">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`
                  relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors
                  ${currentImage === idx 
                    ? 'border-[var(--primary-gold)]' 
                    : 'border-[var(--border)] hover:border-[var(--text-muted)]'
                  }
                `}
              >
                <Image
                  src={img}
                  alt={`View ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={diamond.availability === 'In Stock' ? 'success' : 'warning'}>
                {diamond.availability}
              </Badge>
              <Badge variant="gold">{diamond.certType} Certified</Badge>
            </div>
            <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-1">
              {diamond.id}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {diamond.shape} • {diamond.carat}ct • {diamond.color} • {diamond.clarity} • {diamond.cut}
            </p>
          </div>

          {/* Price */}
          <div className="p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] border border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)] mb-1">Price Range</p>
            <p className="text-2xl font-semibold text-[var(--primary-gold)]">
              ${diamond.priceMin.toLocaleString()} – ${diamond.priceMax.toLocaleString()}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Final price based on exact specifications
            </p>
          </div>

          {/* Specs Table */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Shape', value: diamond.shape },
              { label: 'Carat', value: diamond.carat.toFixed(2) },
              { label: 'Color', value: diamond.color },
              { label: 'Clarity', value: diamond.clarity },
              { label: 'Cut', value: diamond.cut },
              { label: 'Certificate', value: diamond.certType },
            ].map((spec) => (
              <div key={spec.label} className="flex justify-between py-2 border-b border-[var(--border)]">
                <span className="text-sm text-[var(--text-muted)]">{spec.label}</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Shield size={16} className="text-[var(--success)]" />
              <span>Ethically Sourced</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Truck size={16} className="text-[var(--secondary-blue)]" />
              <span>Insured Shipping</span>
            </div>
          </div>

          {/* Quick RFQ Form */}
          <div className="p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] border border-[var(--border)] space-y-4">
            <h4 className="font-medium text-[var(--text-primary)]">Quick Quote Request</h4>
            
            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-secondary)]">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded border border-[var(--border)] hover:border-[var(--text-muted)]"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded border border-[var(--border)] hover:border-[var(--text-muted)]"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                placeholder="Delivery Country"
                options={countries}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Input
                placeholder="Email *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Input
              placeholder="WhatsApp / Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Textarea
              placeholder="Additional notes or specifications..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleAddToRFQ}>
                Add to RFQ List
              </Button>
              <Button className="flex-1" onClick={handleQuickRFQ}>
                Submit Quote Request
              </Button>
            </div>
          </div>

          {/* Compare Button */}
          <Button variant="ghost" className="w-full" onClick={handleAddToCompare}>
            Add to Compare
          </Button>

          {/* Certificate Link */}
          {diamond.certNumber && (
            <button
              onClick={() => {
                closeModal();
                openModal('certificate', {
                  id: 1,
                  name: `${diamond.certType} Certificate`,
                  type: diamond.certType,
                  image: '',
                  downloadUrl: ''
                });
              }}
              className="text-sm text-[var(--secondary-blue)] hover:underline"
            >
              View Certificate ({diamond.certNumber})
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
