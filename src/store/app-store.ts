'use client';

import { createContext, useContext } from 'react';
import { Diamond } from '@/data/mock-data';

// RFQ Item
export interface RFQItem {
  diamond: Diamond;
  quantity: number;
  notes?: string;
}

// Toast Types
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Modal Types
export type ModalType = 
  | 'rfq' 
  | 'brochure' 
  | 'certificate' 
  | 'compare' 
  | 'booking' 
  | 'whatsapp' 
  | 'product-detail'
  | 'image-lightbox'
  | null;

// App State
export interface AppState {
  // RFQ Cart
  rfqItems: RFQItem[];
  addToRFQ: (diamond: Diamond, quantity?: number) => void;
  removeFromRFQ: (diamondId: string) => void;
  updateRFQQuantity: (diamondId: string, quantity: number) => void;
  clearRFQ: () => void;
  
  // Compare
  compareItems: Diamond[];
  addToCompare: (diamond: Diamond) => void;
  removeFromCompare: (diamondId: string) => void;
  clearCompare: () => void;
  
  // Toast
  toasts: Toast[];
  showToast: (message: string, type: Toast['type'], duration?: number) => void;
  dismissToast: (id: string) => void;
  
  // Modal
  activeModal: ModalType;
  modalData: unknown;
  openModal: (modal: ModalType, data?: unknown) => void;
  closeModal: () => void;
  
  // Filters (for catalog)
  filters: CatalogFilters;
  setFilters: (filters: Partial<CatalogFilters>) => void;
  resetFilters: () => void;
}

export interface CatalogFilters {
  shapes: string[];
  caratMin: number;
  caratMax: number;
  colors: string[];
  clarities: string[];
  cuts: string[];
  certTypes: string[];
  priceMin: number;
  priceMax: number;
  availability: string[];
  sortBy: 'price-asc' | 'price-desc' | 'carat-asc' | 'carat-desc' | 'newest';
  viewMode: 'grid' | 'table';
}

export const defaultFilters: CatalogFilters = {
  shapes: [],
  caratMin: 0,
  caratMax: 5,
  colors: [],
  clarities: [],
  cuts: [],
  certTypes: [],
  priceMin: 0,
  priceMax: 50000,
  availability: [],
  sortBy: 'newest',
  viewMode: 'grid',
};

// Context
export const AppContext = createContext<AppState | null>(null);

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
}
