'use client';

import { Phone, MessageCircle, FileText, Mail } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { companyInfo } from '@/data/mock-data';

export function MobileCTABar() {
  const { openModal } = useAppStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-[var(--border-light)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-inset-bottom">
      <div className="grid grid-cols-4 divide-x divide-[var(--border-light)]">
        {/* Call */}
        <a
          href={`tel:${companyInfo.phone}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[var(--text-secondary)] active:bg-[var(--background-cream)] transition-colors"
        >
          <Phone size={18} />
          <span className="text-[10px] font-medium">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-green-600 active:bg-green-50 transition-colors"
        >
          <MessageCircle size={18} />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${companyInfo.email}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[var(--text-secondary)] active:bg-[var(--background-cream)] transition-colors"
        >
          <Mail size={18} />
          <span className="text-[10px] font-medium">Email</span>
        </a>

        {/* Get Quote */}
        <button
          onClick={() => openModal('rfq')}
          className="flex flex-col items-center justify-center gap-1 py-3 bg-[var(--primary-gold)] text-white active:bg-[var(--primary-gold-hover)] transition-colors"
        >
          <FileText size={18} />
          <span className="text-[10px] font-medium">Quote</span>
        </button>
      </div>
    </div>
  );
}
