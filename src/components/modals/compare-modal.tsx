'use client';

import { X, Trash2, Diamond as DiamondIcon } from 'lucide-react';
import { Modal, Button, Badge } from '@/components/ui';
import { useAppStore } from '@/store/app-store';

export function CompareModal() {
  const { activeModal, closeModal, compareItems, removeFromCompare, clearCompare, openModal, addToRFQ, showToast } = useAppStore();

  const isOpen = activeModal === 'compare';

  const handleRequestQuote = () => {
    compareItems.forEach(diamond => {
      addToRFQ(diamond, 1);
    });
    showToast(`${compareItems.length} items added to RFQ`, 'success');
    clearCompare();
    closeModal();
    openModal('rfq');
  };

  if (compareItems.length === 0 && isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={closeModal} title="Compare Diamonds" size="md">
        <div className="py-12 text-center">
          <DiamondIcon className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
            No diamonds to compare
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Add diamonds from the catalog to compare them side by side.
          </p>
          <Button onClick={closeModal}>
            Browse Catalog
          </Button>
        </div>
      </Modal>
    );
  }

  const compareFields = [
    { key: 'shape', label: 'Shape' },
    { key: 'carat', label: 'Carat', format: (v: number) => v.toFixed(2) },
    { key: 'color', label: 'Color' },
    { key: 'clarity', label: 'Clarity' },
    { key: 'cut', label: 'Cut' },
    { key: 'certType', label: 'Certification' },
    { key: 'priceMin', label: 'Price Range', format: (v: number, d: typeof compareItems[0]) => `$${d.priceMin.toLocaleString()} - $${d.priceMax.toLocaleString()}` },
    { key: 'availability', label: 'Availability' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Compare Diamonds" size="xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-3 text-sm font-medium text-[var(--text-muted)] w-32">
                Specification
              </th>
              {compareItems.map((diamond) => (
                <th key={diamond.id} className="p-3 text-center">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(diamond.id)}
                      className="absolute -top-1 -right-1 p-1 bg-[var(--surface-elevated)] rounded-full text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
                    >
                      <X size={14} />
                    </button>
                    <div className="w-20 h-20 mx-auto mb-2 bg-[var(--surface-elevated)] rounded-[var(--radius)] flex items-center justify-center">
                      <DiamondIcon className="text-[var(--primary-gold)]" size={32} />
                    </div>
                    <p className="font-medium text-[var(--text-primary)]">{diamond.id}</p>
                  </div>
                </th>
              ))}
              {/* Empty slots */}
              {Array.from({ length: Math.max(0, 4 - compareItems.length) }).map((_, i) => (
                <th key={`empty-${i}`} className="p-3 text-center">
                  <div className="w-20 h-20 mx-auto mb-2 bg-[var(--surface-elevated)] rounded-[var(--radius)] flex items-center justify-center border-2 border-dashed border-[var(--border)]">
                    <span className="text-xs text-[var(--text-muted)]">Empty</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareFields.map((field) => (
              <tr key={field.key} className="border-t border-[var(--border)]">
                <td className="p-3 text-sm font-medium text-[var(--text-secondary)]">
                  {field.label}
                </td>
                {compareItems.map((diamond) => {
                  const value = diamond[field.key as keyof typeof diamond];
                  const displayValue = field.format 
                    ? field.format(value as number, diamond)
                    : value;
                  
                  return (
                    <td key={diamond.id} className="p-3 text-center text-sm text-[var(--text-primary)]">
                      {field.key === 'availability' ? (
                        <Badge variant={value === 'In Stock' ? 'success' : 'warning'} size="sm">
                          {displayValue as string}
                        </Badge>
                      ) : (
                        displayValue as string
                      )}
                    </td>
                  );
                })}
                {Array.from({ length: Math.max(0, 4 - compareItems.length) }).map((_, i) => (
                  <td key={`empty-${i}`} className="p-3 text-center text-[var(--text-muted)]">
                    —
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-[var(--border)]">
        <Button variant="ghost" onClick={clearCompare} leftIcon={<Trash2 size={18} />}>
          Clear All
        </Button>
        <Button onClick={handleRequestQuote}>
          Request Quote for Selected
        </Button>
      </div>
    </Modal>
  );
}
