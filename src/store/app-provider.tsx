'use client';

import { useState, useCallback, ReactNode, useMemo } from 'react';
import { AppContext, AppState, RFQItem, Toast, ModalType, CatalogFilters, defaultFilters } from './app-store';
import { Diamond } from '@/data/mock-data';

export function AppProvider({ children }: { children: ReactNode }) {
  // RFQ State
  const [rfqItems, setRFQItems] = useState<RFQItem[]>([]);
  
  // Compare State
  const [compareItems, setCompareItems] = useState<Diamond[]>([]);
  
  // Toast State
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Modal State
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<unknown>(null);
  
  // Filters State
  const [filters, setFiltersState] = useState<CatalogFilters>(defaultFilters);

  // RFQ Actions
  const addToRFQ = useCallback((diamond: Diamond, quantity: number = 1) => {
    setRFQItems(prev => {
      const existing = prev.find(item => item.diamond.id === diamond.id);
      if (existing) {
        return prev.map(item => 
          item.diamond.id === diamond.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { diamond, quantity }];
    });
  }, []);

  const removeFromRFQ = useCallback((diamondId: string) => {
    setRFQItems(prev => prev.filter(item => item.diamond.id !== diamondId));
  }, []);

  const updateRFQQuantity = useCallback((diamondId: string, quantity: number) => {
    setRFQItems(prev => 
      prev.map(item => 
        item.diamond.id === diamondId 
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearRFQ = useCallback(() => {
    setRFQItems([]);
  }, []);

  // Compare Actions
  const addToCompare = useCallback((diamond: Diamond) => {
    setCompareItems(prev => {
      if (prev.length >= 4) return prev;
      if (prev.find(d => d.id === diamond.id)) return prev;
      return [...prev, diamond];
    });
  }, []);

  const removeFromCompare = useCallback((diamondId: string) => {
    setCompareItems(prev => prev.filter(d => d.id !== diamondId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareItems([]);
  }, []);

  // Toast Actions
  const showToast = useCallback((message: string, type: Toast['type'], duration: number = 4000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Modal Actions
  const openModal = useCallback((modal: ModalType, data?: unknown) => {
    setActiveModal(modal);
    setModalData(data);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
  }, []);

  // Filter Actions
  const setFilters = useCallback((newFilters: Partial<CatalogFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const value: AppState = useMemo(() => ({
    rfqItems,
    addToRFQ,
    removeFromRFQ,
    updateRFQQuantity,
    clearRFQ,
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    toasts,
    showToast,
    dismissToast,
    activeModal,
    modalData,
    openModal,
    closeModal,
    filters,
    setFilters,
    resetFilters,
  }), [
    rfqItems, addToRFQ, removeFromRFQ, updateRFQQuantity, clearRFQ,
    compareItems, addToCompare, removeFromCompare, clearCompare,
    toasts, showToast, dismissToast,
    activeModal, modalData, openModal, closeModal,
    filters, setFilters, resetFilters
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
