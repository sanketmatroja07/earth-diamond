'use client';

import { useState } from 'react';
import { ZoomIn, ZoomOut, Download, X } from 'lucide-react';
import { Modal, Button } from '@/components/ui';
import { useAppStore } from '@/store/app-store';

interface CertificateData {
  id: number;
  name: string;
  type: string;
  image: string;
  downloadUrl: string;
}

export function CertificateModal() {
  const { activeModal, modalData, closeModal, showToast } = useAppStore();
  const [zoom, setZoom] = useState(1);

  const isOpen = activeModal === 'certificate';
  const certificate = modalData as CertificateData | null;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    // In production, trigger actual download
    showToast('Certificate downloaded', 'success');
  };

  const handleClose = () => {
    setZoom(1);
    closeModal();
  };

  if (!certificate) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" showCloseButton={false}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
          <div>
            <h3 className="text-lg font-medium text-[var(--text-primary)]">{certificate.name}</h3>
            <p className="text-sm text-[var(--text-muted)]">{certificate.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5}>
              <ZoomOut size={18} />
            </Button>
            <span className="text-sm text-[var(--text-muted)] w-16 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoom >= 3}>
              <ZoomIn size={18} />
            </Button>
            <div className="w-px h-6 bg-[var(--border)] mx-2" />
            <Button variant="outline" size="sm" onClick={handleDownload} leftIcon={<Download size={16} />}>
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Certificate Viewer */}
        <div className="flex-1 overflow-auto mt-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] min-h-[400px]">
          <div 
            className="flex items-center justify-center p-8 transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {/* Placeholder for certificate image/PDF */}
            <div className="w-full max-w-2xl aspect-[8.5/11] bg-white rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-[var(--primary-gold)]/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--primary-gold)]">
                    {certificate.type.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{certificate.name}</h4>
                <p className="text-gray-600">{certificate.type}</p>
                <p className="text-sm text-gray-400 mt-4">Certificate Preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] text-center">
            This certificate is verified and valid. Contact us for authentication requests.
          </p>
        </div>
      </div>
    </Modal>
  );
}
