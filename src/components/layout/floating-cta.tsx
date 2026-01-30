'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, ArrowUp } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { companyInfo } from '@/data/mock-data';

export function FloatingCTA() {
  const { openModal } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating CTAs */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 bottom-6 z-40 hidden lg:flex flex-col gap-3"
          >
            {/* Back to Top */}
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className="w-12 h-12 bg-white rounded-xl shadow-lg border border-[var(--border-light)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary-gold)] hover:border-[var(--primary-gold)] transition-all"
                title="Back to top"
              >
                <ArrowUp size={20} />
              </motion.button>
            )}

            {/* Expanded Options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="flex flex-col gap-2"
                >
                  {/* Schedule Call */}
                  <button
                    onClick={() => {
                      openModal('booking');
                      setIsExpanded(false);
                    }}
                    className="w-12 h-12 bg-[var(--secondary-navy)] rounded-xl shadow-lg flex items-center justify-center text-white hover:bg-[var(--secondary-navy-light)] transition-all"
                    title="Schedule Call"
                  >
                    <Phone size={20} />
                  </button>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#25D366] rounded-xl shadow-lg flex items-center justify-center text-white hover:bg-[#22c55e] transition-all"
                    title="WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Toggle / Request Quote */}
            <motion.button
              onClick={() => isExpanded ? setIsExpanded(false) : openModal('rfq')}
              onMouseEnter={() => setIsExpanded(true)}
              className={`relative w-14 h-14 rounded-xl shadow-xl flex items-center justify-center transition-all duration-300 ${
                isExpanded 
                  ? 'bg-white border border-[var(--border)] text-[var(--text-secondary)]'
                  : 'bg-[var(--primary-gold)] text-white hover:bg-[var(--primary-gold-hover)]'
              }`}
              title={isExpanded ? 'Close' : 'Get Quote'}
            >
              {isExpanded ? (
                <X size={22} />
              ) : (
                <>
                  <MessageCircle size={22} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating WhatsApp Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-4 bottom-24 z-40 lg:hidden w-14 h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center text-white"
          >
            <MessageCircle size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
