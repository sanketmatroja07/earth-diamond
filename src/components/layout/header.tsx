'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle,
  Diamond,
  FileText,
  ChevronDown,
  Search,
  Globe,
  Mail,
  MapPin,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { companyInfo } from '@/data/mock-data';

const navigation = [
  { name: 'Catalog', href: '/catalog', highlight: true },
  { name: 'About', href: '/about' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Quality', href: '/quality' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
];

const diamondShapes = ['Round', 'Princess', 'Oval', 'Emerald', 'Cushion', 'Marquise', 'Pear', 'Radiant'];

export function Header() {
  const pathname = usePathname();
  const { openModal } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar - Contact & Trust */}
      <div className="bg-[var(--secondary-navy)] text-white py-2 px-4 hidden lg:block relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={12} />
              <span>Surat, India • Hong Kong • Mumbai</span>
            </div>
            <span className="text-white/30">|</span>
            <a 
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-2 text-white/70 hover:text-[var(--primary-gold-light)] transition-colors"
            >
              <Phone size={12} />
              {companyInfo.phone}
            </a>
            <span className="text-white/30">|</span>
            <a 
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-2 text-white/70 hover:text-[var(--primary-gold-light)] transition-colors"
            >
              <Mail size={12} />
              {companyInfo.email}
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/50">GIA & IGI Certified • Kimberley Compliant • Free Shipping $5,000+</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-lg'
            : 'bg-white border-b border-[var(--border-light)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-[var(--primary-gold)] to-[var(--primary-gold-dark)] rounded-lg flex items-center justify-center shadow-lg shadow-[var(--primary-gold)]/20 group-hover:shadow-[var(--primary-gold)]/40 transition-all duration-300">
                <Diamond className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg lg:text-xl font-[var(--font-heading)] font-bold text-[var(--text-primary)] tracking-tight">
                  {companyInfo.name}
                </span>
                <p className="text-[9px] lg:text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] -mt-0.5">
                  Est. {companyInfo.founded} • Surat
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const hasMegaMenu = item.name === 'Catalog';
                
                return (
                  <div 
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => hasMegaMenu && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                        isActive
                          ? 'text-[var(--primary-gold)] bg-[var(--primary-gold-light)]/40'
                          : item.highlight 
                            ? 'text-[var(--text-primary)] hover:text-[var(--primary-gold)] hover:bg-[var(--primary-gold-light)]/30'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-cream)]'
                      }`}
                    >
                      {item.name}
                      {hasMegaMenu && <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                    </Link>

                    {/* Mega Menu for Catalog */}
                    {hasMegaMenu && (
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-[400px] bg-white rounded-xl shadow-2xl border border-[var(--border-light)] p-6"
                          >
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                                  By Shape
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {diamondShapes.map((shape) => (
                                    <Link
                                      key={shape}
                                      href={`/catalog?shape=${shape.toLowerCase()}`}
                                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-gold)] transition-colors py-1"
                                    >
                                      {shape}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                                  By Category
                                </h4>
                                <div className="space-y-2">
                                  <Link href="/catalog" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--primary-gold)] transition-colors py-1">
                                    All Diamonds
                                  </Link>
                                  <Link href="/catalog?type=melee" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--primary-gold)] transition-colors py-1">
                                    Melee Diamonds
                                  </Link>
                                  <Link href="/catalog?type=calibrated" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--primary-gold)] transition-colors py-1">
                                    Calibrated Sets
                                  </Link>
                                  <Link href="/catalog?availability=in-stock" className="block text-sm text-[var(--primary-gold)] font-medium py-1">
                                    Ready to Ship →
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[var(--border-light)]">
                              <p className="text-xs text-[var(--text-muted)]">
                                50,000+ certified diamonds in stock. GIA & IGI.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-cream)] rounded-lg transition-all duration-200"
                title="Search"
              >
                <Search size={18} />
              </button>
              
              <button
                onClick={() => openModal('whatsapp')}
                className="p-2.5 text-[var(--text-secondary)] hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </button>
              
              <button
                onClick={() => openModal('brochure')}
                className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--primary-gold)] hover:bg-[var(--primary-gold-light)]/30 rounded-lg transition-all duration-200"
                title="Brochure"
              >
                <FileText size={18} />
              </button>
              
              <div className="w-px h-6 bg-[var(--border)] mx-2" />
              
              <button
                onClick={() => openModal('rfq')}
                className="px-5 py-2.5 bg-[var(--primary-gold)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-gold-hover)] transition-all duration-200 shadow-lg shadow-[var(--primary-gold)]/20 hover:shadow-[var(--primary-gold)]/30"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => openModal('whatsapp')}
                className="p-2.5 text-green-600 bg-green-50 rounded-lg"
              >
                <MessageCircle size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-[var(--text-primary)] bg-[var(--background-cream)] rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[var(--border-light)] bg-white"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search by shape, carat, color, clarity..."
                    className="w-full pl-12 pr-4 py-3 bg-[var(--background-cream)] border border-[var(--border-light)] rounded-lg text-sm focus:outline-none focus:border-[var(--primary-gold)] focus:ring-2 focus:ring-[var(--primary-gold-light)]"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="w-9 h-9 bg-gradient-to-br from-[var(--primary-gold)] to-[var(--primary-gold-dark)] rounded-lg flex items-center justify-center">
                        <Diamond className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg font-[var(--font-heading)] font-bold text-[var(--text-primary)]">
                        {companyInfo.name}
                      </span>
                    </Link>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-1 mb-8">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-colors ${
                            isActive
                              ? 'text-[var(--primary-gold)] bg-[var(--primary-gold-light)]/40'
                              : 'text-[var(--text-primary)] hover:bg-[var(--background-cream)]'
                          }`}
                        >
                          {item.name}
                          {item.highlight && (
                            <span className="text-xs px-2 py-0.5 bg-[var(--primary-gold)] text-white rounded-full">
                              New
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Quick Shapes */}
                  <div className="mb-8">
                    <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-4">
                      Popular Shapes
                    </h4>
                    <div className="flex flex-wrap gap-2 px-4">
                      {diamondShapes.slice(0, 6).map((shape) => (
                        <Link
                          key={shape}
                          href={`/catalog?shape=${shape.toLowerCase()}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] bg-[var(--background-cream)] rounded-full hover:bg-[var(--primary-gold-light)] hover:text-[var(--primary-gold)] transition-colors"
                        >
                          {shape}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 mb-8">
                    <button
                      onClick={() => {
                        openModal('rfq');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3.5 bg-[var(--primary-gold)] text-white font-medium rounded-xl shadow-lg shadow-[var(--primary-gold)]/20"
                    >
                      Request Quote
                    </button>
                    <button
                      onClick={() => {
                        openModal('whatsapp');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3.5 border border-[var(--border)] text-[var(--text-primary)] font-medium rounded-xl flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={18} className="text-green-600" />
                      WhatsApp Us
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-6 border-t border-[var(--border-light)] space-y-4">
                    <a 
                      href={`tel:${companyInfo.phone}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary-gold)]"
                    >
                      <Phone size={16} />
                      {companyInfo.phone}
                    </a>
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary-gold)]"
                    >
                      <Mail size={16} />
                      {companyInfo.email}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                      <MapPin size={16} />
                      Surat, India
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
