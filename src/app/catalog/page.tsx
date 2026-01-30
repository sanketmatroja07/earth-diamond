'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid3X3, 
  List, 
  Filter, 
  X, 
  SlidersHorizontal,
  RefreshCw,
  ShoppingBag,
  Scale,
  Eye,
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';
import { Button, Card, Badge, Checkbox, RangeSlider, ProductCardSkeleton } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { 
  diamonds, 
  DIAMOND_SHAPES, 
  COLORS, 
  CLARITIES, 
  CUTS, 
  CERT_TYPES,
} from '@/data/mock-data';

// Diamond shape SVG paths
const shapeIcons: Record<string, string> = {
  'Round': 'M12 2L2 12l10 10 10-10L12 2z',
  'Princess': 'M3 3h18v18H3V3z',
  'Oval': 'M12 2C6 2 2 7 2 12s4 10 10 10 10-5 10-10S18 2 12 2z',
  'Emerald': 'M4 4h16v16H4V4z M6 6h12v12H6V6z',
  'Cushion': 'M4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z',
  'Marquise': 'M12 2C6 6 4 12 4 12s2 6 8 10c6-4 8-10 8-10s-2-6-8-10z',
  'Pear': 'M12 2c-4 4-8 10-8 14a8 8 0 0016 0c0-4-4-10-8-14z',
  'Radiant': 'M4 4h16v16H4V4z',
  'Asscher': 'M4 4h16v16H4V4z M6 6h12v12H6V6z',
  'Heart': 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
};

export default function CatalogPage() {
  const { 
    openModal, 
    addToRFQ, 
    addToCompare, 
    showToast, 
    filters, 
    setFilters, 
    resetFilters,
    compareItems 
  } = useAppStore();
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredDiamonds = useMemo(() => {
    return diamonds.filter(d => {
      if (filters.shapes.length > 0 && !filters.shapes.includes(d.shape)) return false;
      if (d.carat < filters.caratMin || d.carat > filters.caratMax) return false;
      if (filters.colors.length > 0 && !filters.colors.includes(d.color)) return false;
      if (filters.clarities.length > 0 && !filters.clarities.includes(d.clarity)) return false;
      if (filters.cuts.length > 0 && !filters.cuts.includes(d.cut)) return false;
      if (filters.certTypes.length > 0 && !filters.certTypes.includes(d.certType)) return false;
      if (d.priceMin < filters.priceMin || d.priceMax > filters.priceMax) return false;
      if (filters.availability.length > 0 && !filters.availability.includes(d.availability)) return false;
      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.priceMin - b.priceMin;
        case 'price-desc': return b.priceMin - a.priceMin;
        case 'carat-asc': return a.carat - b.carat;
        case 'carat-desc': return b.carat - a.carat;
        default: return 0;
      }
    });
  }, [filters]);

  const toggleShape = (shape: string) => {
    const newShapes = filters.shapes.includes(shape)
      ? filters.shapes.filter(s => s !== shape)
      : [...filters.shapes, shape];
    setFilters({ shapes: newShapes });
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkRFQ = () => {
    const selectedDiamonds = diamonds.filter(d => selectedItems.includes(d.id));
    selectedDiamonds.forEach(d => addToRFQ(d));
    showToast(`${selectedDiamonds.length} items added to RFQ`, 'success');
    setSelectedItems([]);
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Shapes */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4 uppercase tracking-wider">Shape</h4>
        <div className="grid grid-cols-5 gap-2">
          {DIAMOND_SHAPES.map(shape => (
            <button
              key={shape}
              onClick={() => toggleShape(shape)}
              className={`
                flex flex-col items-center gap-1 p-2 rounded-lg transition-all
                ${filters.shapes.includes(shape)
                  ? 'bg-[var(--accent-champagne)] text-[var(--primary-gold)]'
                  : 'hover:bg-[var(--background-cream)] text-[var(--text-muted)]'
                }
              `}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d={shapeIcons[shape] || shapeIcons['Round']} />
              </svg>
              <span className="text-[9px]">{shape}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Carat Range */}
      <div>
        <RangeSlider
          label="Carat Weight"
          min={0}
          max={5}
          step={0.01}
          value={[filters.caratMin, filters.caratMax]}
          onChange={([min, max]) => setFilters({ caratMin: min, caratMax: max })}
          formatValue={(v) => v.toFixed(2)}
        />
      </div>

      {/* Color */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4 uppercase tracking-wider">Color</h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => {
                const newColors = filters.colors.includes(color)
                  ? filters.colors.filter(c => c !== color)
                  : [...filters.colors, color];
                setFilters({ colors: newColors });
              }}
              className={`
                w-9 h-9 text-xs font-medium rounded-full border transition-all flex items-center justify-center
                ${filters.colors.includes(color)
                  ? 'border-[var(--primary-gold)] bg-[var(--accent-champagne)] text-[var(--primary-gold)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                }
              `}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Clarity */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4 uppercase tracking-wider">Clarity</h4>
        <div className="flex flex-wrap gap-2">
          {CLARITIES.map(clarity => (
            <button
              key={clarity}
              onClick={() => {
                const newClarities = filters.clarities.includes(clarity)
                  ? filters.clarities.filter(c => c !== clarity)
                  : [...filters.clarities, clarity];
                setFilters({ clarities: newClarities });
              }}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-full border transition-all
                ${filters.clarities.includes(clarity)
                  ? 'border-[var(--primary-gold)] bg-[var(--accent-champagne)] text-[var(--primary-gold)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                }
              `}
            >
              {clarity}
            </button>
          ))}
        </div>
      </div>

      {/* Cut */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4 uppercase tracking-wider">Cut</h4>
        <div className="space-y-2">
          {CUTS.map(cut => (
            <Checkbox
              key={cut}
              label={cut}
              checked={filters.cuts.includes(cut)}
              onChange={() => {
                const newCuts = filters.cuts.includes(cut)
                  ? filters.cuts.filter(c => c !== cut)
                  : [...filters.cuts, cut];
                setFilters({ cuts: newCuts });
              }}
            />
          ))}
        </div>
      </div>

      {/* Certification */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4 uppercase tracking-wider">Certification</h4>
        <div className="space-y-2">
          {CERT_TYPES.map(cert => (
            <Checkbox
              key={cert}
              label={cert}
              checked={filters.certTypes.includes(cert)}
              onChange={() => {
                const newCerts = filters.certTypes.includes(cert)
                  ? filters.certTypes.filter(c => c !== cert)
                  : [...filters.certTypes, cert];
                setFilters({ certTypes: newCerts });
              }}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <RangeSlider
          label="Price Range"
          min={0}
          max={50000}
          step={100}
          value={[filters.priceMin, filters.priceMax]}
          onChange={([min, max]) => setFilters({ priceMin: min, priceMax: max })}
          formatValue={(v) => `$${v.toLocaleString()}`}
        />
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4 uppercase tracking-wider">Availability</h4>
        <div className="space-y-2">
          {['In Stock', 'Made to Order'].map(status => (
            <Checkbox
              key={status}
              label={status}
              checked={filters.availability.includes(status)}
              onChange={() => {
                const newAvail = filters.availability.includes(status)
                  ? filters.availability.filter(a => a !== status)
                  : [...filters.availability, status];
                setFilters({ availability: newAvail });
              }}
            />
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="pt-4 border-t border-[var(--border)]">
        <Button 
          variant="outline" 
          fullWidth
          onClick={resetFilters}
          leftIcon={<RefreshCw size={14} />}
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="pb-24 lg:pb-0 min-h-screen bg-[var(--background)]">
      {/* Hero Banner */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=80"
          alt="Diamond Collection"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-[var(--font-display)] mb-3">
              Diamond Collection
            </h1>
            <p className="text-white/70 max-w-lg mx-auto">
              Explore our curated selection of GIA & IGI certified diamonds
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28 bg-white border border-[var(--border-light)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-[var(--text-primary)] flex items-center gap-2">
                  <Filter size={16} />
                  Filters
                </h3>
                <span className="text-xs text-[var(--text-muted)]">
                  {filteredDiamonds.length} results
                </span>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">{filteredDiamonds.length}</span> diamonds found
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileFilterOpen(true)}
                  leftIcon={<SlidersHorizontal size={14} />}
                >
                  Filters
                </Button>
              </div>

              <div className="flex items-center gap-3">
                {selectedItems.length > 0 && (
                  <Button
                    size="sm"
                    onClick={handleBulkRFQ}
                    leftIcon={<ShoppingBag size={14} />}
                  >
                    Add {selectedItems.length} to Quote
                  </Button>
                )}

                {compareItems.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal('compare')}
                    leftIcon={<Scale size={14} />}
                  >
                    Compare ({compareItems.length})
                  </Button>
                )}

                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ sortBy: e.target.value as typeof filters.sortBy })}
                  className="bg-white border border-[var(--border)] rounded px-4 py-2 text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary-gold)]"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="carat-asc">Carat: Low to High</option>
                  <option value="carat-desc">Carat: High to Low</option>
                </select>

                <div className="hidden sm:flex items-center border border-[var(--border)] rounded overflow-hidden">
                  <button
                    onClick={() => setFilters({ viewMode: 'grid' })}
                    className={`p-2.5 ${filters.viewMode === 'grid' ? 'bg-[var(--background-cream)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setFilters({ viewMode: 'table' })}
                    className={`p-2.5 ${filters.viewMode === 'table' ? 'bg-[var(--background-cream)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredDiamonds.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
                  No diamonds match your criteria
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Try adjusting your filters to see more results.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredDiamonds.map((diamond, idx) => (
                    <motion.div
                      key={diamond.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <div className="group cursor-pointer">
                        {/* Image */}
                        <div 
                          className="relative aspect-square bg-[var(--background-cream)] rounded-lg overflow-hidden mb-4"
                          onClick={() => openModal('product-detail', diamond)}
                        >
                          <Image 
                            src={diamond.image}
                            alt={`${diamond.shape} ${diamond.carat}ct Diamond`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            {diamond.availability === 'In Stock' && (
                              <Badge variant="success" size="sm">Ready to Ship</Badge>
                            )}
                          </div>
                          
                          <div className="absolute top-3 right-3">
                            <Badge variant="dark" size="sm">{diamond.certType}</Badge>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                              <button 
                                className="px-4 py-2 bg-white text-[var(--text-primary)] text-sm font-medium flex items-center gap-2 hover:bg-[var(--primary-gold)] hover:text-white transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openModal('product-detail', diamond);
                                }}
                              >
                                <Eye size={14} />
                                View
                              </button>
                              <button 
                                className="px-4 py-2 bg-[var(--navy-deep)] text-white text-sm font-medium hover:bg-[var(--navy-rich)] transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToRFQ(diamond);
                                  showToast('Added to quote', 'success');
                                }}
                              >
                                Add to Quote
                              </button>
                            </div>
                          </div>

                          {/* Selection */}
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Checkbox
                              checked={selectedItems.includes(diamond.id)}
                              onChange={() => toggleSelection(diamond.id)}
                            />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-[var(--text-muted)]">{diamond.id}</p>
                            <div className="flex items-center gap-1 text-[var(--primary-gold)]">
                              <Award size={12} />
                              <span className="text-xs font-medium">{diamond.certType}</span>
                            </div>
                          </div>
                          <h3 className="font-medium text-[var(--text-primary)]">
                            {diamond.shape} · {diamond.carat} Carat
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {diamond.color} · {diamond.clarity} · {diamond.cut}
                          </p>
                          <p className="text-[var(--primary-gold)] font-medium pt-1">
                            ${diamond.priceMin.toLocaleString()} - ${diamond.priceMax.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-[var(--text-primary)] flex items-center gap-2">
                    <Filter size={18} />
                    Filters
                  </h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 text-[var(--text-muted)]"
                  >
                    <X size={20} />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
