'use client';

import { RFQModal } from './rfq-modal';
import { WhatsAppModal } from './whatsapp-modal';
import { BrochureModal } from './brochure-modal';
import { CertificateModal } from './certificate-modal';
import { CompareModal } from './compare-modal';
import { BookingModal } from './booking-modal';
import { ProductDetailModal } from './product-detail-modal';

export function Modals() {
  return (
    <>
      <RFQModal />
      <WhatsAppModal />
      <BrochureModal />
      <CertificateModal />
      <CompareModal />
      <BookingModal />
      <ProductDetailModal />
    </>
  );
}

// Alias for backwards compatibility
export { Modals as GlobalModals };

export { RFQModal, WhatsAppModal, BrochureModal, CertificateModal, CompareModal, BookingModal, ProductDetailModal };
