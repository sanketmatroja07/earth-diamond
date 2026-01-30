'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Award,
  Shield,
  Globe,
  Clock,
  Star,
  Phone,
  MessageCircle,
  CheckCircle2,
  Eye,
  Play,
  Sparkles,
  MapPin,
  Building2,
  ChevronRight,
  ArrowUpRight,
  Gem,
  Box,
  Users,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { 
  diamonds, 
  testimonials, 
  companyInfo,
  heroImages,
  categoryImages,
  trustStats,
  certifications,
  valueProps,
  diamondShapeImages,
  DIAMOND_SHAPES,
} from '@/data/mock-data';

// ═══════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function HomePage() {
  const { openModal } = useAppStore();
  const heroRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const featuredDiamonds = diamonds.slice(0, 8);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { 
      name: 'Loose Diamonds', 
      description: 'GIA & IGI certified, 0.30ct - 10ct+', 
      image: categoryImages.loose, 
      href: '/catalog',
      badge: 'Most Popular'
    },
    { 
      name: 'Melee Diamonds', 
      description: 'Precision-cut for jewelry settings', 
      image: categoryImages.melee, 
      href: '/catalog?type=melee',
      badge: null
    },
    { 
      name: 'Calibrated Sets', 
      description: 'Color & clarity matched pairs', 
      image: categoryImages.calibrated, 
      href: '/catalog?type=calibrated',
      badge: 'Premium'
    },
    { 
      name: 'Custom Orders', 
      description: 'Tailored to your specifications', 
      image: categoryImages.custom, 
      href: '/contact',
      badge: null
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic Full Screen
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[100vh] min-h-[750px] flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages.main}
            alt="Earth Diamond - Premium Diamond Manufacturing"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${20 + (i % 5) * 15}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <Sparkles className="w-3 h-3 text-[var(--primary-gold-light)]" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-white/90 font-medium">
                Trusted by 2,500+ jewelers worldwide
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-[var(--font-display)] text-white leading-[1.1] mb-6"
            >
              <span className="block">Factory-Direct</span>
              <span className="block text-[var(--primary-gold-light)]">Certified Diamonds</span>
              <span className="block text-4xl sm:text-5xl lg:text-5xl mt-2 font-[var(--font-subheading)] font-light italic text-white/80">
                from Surat to the World
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg lg:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
            >
              GIA & IGI certified diamonds with uncompromising quality. 
              No middlemen, no markup — direct from our manufacturing facility 
              with 7-14 day delivery to 40+ countries.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/catalog">
                <button className="group px-8 py-4 bg-[var(--primary-gold)] text-white font-medium tracking-wide hover:bg-[var(--primary-gold-hover)] transition-all duration-300 flex items-center gap-3 rounded-lg shadow-lg shadow-[var(--primary-gold)]/30 hover:shadow-[var(--primary-gold)]/50">
                  Explore Inventory
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button 
                onClick={() => openModal('rfq')}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium tracking-wide hover:bg-white/20 border border-white/30 transition-all duration-300 flex items-center gap-3 rounded-lg"
              >
                Get Custom Quote
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap items-center gap-6 lg:gap-10 mt-14 pt-8 border-t border-white/10"
            >
              {[
                { label: 'GIA & IGI Certified', icon: Award },
                { label: 'Kimberley Compliant', icon: Shield },
                { label: '40+ Countries', icon: Globe },
                { label: '7-14 Day Delivery', icon: Clock },
              ].map((item, i) => (
                <motion.div 
                  key={item.label} 
                  className="flex items-center gap-2.5 text-white/70"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <item.icon size={14} className="text-[var(--primary-gold-light)]" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Discover</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 border border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TRUST BAR - Quick Stats
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-[var(--secondary-navy)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4">
            {[
              { value: '15+', label: 'Years', sublabel: 'Experience' },
              { value: '50K+', label: 'Diamonds', sublabel: 'Monthly' },
              { value: '40+', label: 'Countries', sublabel: 'Served' },
              { value: '99.2%', label: 'On-Time', sublabel: 'Delivery' },
              { value: '4.9/5', label: 'Rating', sublabel: 'Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="text-center lg:text-left">
                  <p className="text-2xl lg:text-3xl font-[var(--font-display)] text-[var(--primary-gold-light)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
                {i < 4 && (
                  <div className="hidden lg:block w-px h-10 bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DIAMOND SHAPES - Premium Visual Grid
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="uppercase-tracking text-[var(--primary-gold)] mb-4 block">Premium Collection</span>
            <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Shop by Diamond Shape
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Every shape meticulously crafted. Every stone GIA or IGI certified. 
              Select your preferred cut to explore our inventory.
            </p>
          </motion.div>

          {/* Diamond Shape Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
          >
            {DIAMOND_SHAPES.map((shape, idx) => (
              <motion.div key={shape} variants={scaleIn}>
                <Link href={`/catalog?shape=${shape.toLowerCase()}`}>
                  <div className="group relative overflow-hidden rounded-xl bg-white border border-[var(--border-light)] hover:border-[var(--primary-gold)] hover:shadow-xl transition-all duration-500 cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--background-pearl)] to-[var(--background-warm)]">
                      <Image
                        src={diamondShapeImages[shape] || heroImages.main}
                        alt={`${shape} Cut Diamond`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700" />
                      </div>
                    </div>
                    
                    <div className="p-4 text-center bg-white">
                      <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary-gold)] transition-colors">
                        {shape}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">View Collection →</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CATEGORIES - Premium Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[var(--background-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category, idx) => (
              <motion.div key={category.name} variants={fadeInUp}>
                <Link href={category.href}>
                  <div className="group relative h-[320px] overflow-hidden rounded-2xl cursor-pointer">
                    {/* Background Image */}
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Badge */}
                    {category.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[var(--primary-gold)] text-white text-xs font-semibold rounded-full">
                        {category.badge}
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/70 text-sm mb-4">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[var(--primary-gold-light)] text-sm font-medium group-hover:gap-3 transition-all">
                        Explore
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED DIAMONDS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <span className="uppercase-tracking text-[var(--primary-gold)] mb-4 block">In Stock Now</span>
              <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Featured Diamonds
              </h2>
              <p className="text-[var(--text-secondary)] mt-3 max-w-lg">
                Hand-selected certified diamonds ready for immediate delivery. 
                Click any stone to view details and request pricing.
              </p>
            </motion.div>
            <Link 
              href="/catalog"
              className="group flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--primary-gold)] hover:text-[var(--primary-gold)] transition-all"
            >
              View All Inventory
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredDiamonds.map((diamond, idx) => (
              <motion.div key={diamond.id} variants={fadeInUp}>
                <div 
                  className="group cursor-pointer"
                  onClick={() => openModal('product-detail', diamond)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-[var(--background-pearl)] to-[var(--background-warm)] rounded-xl overflow-hidden mb-4 border border-[var(--border-light)] group-hover:border-[var(--primary-gold)] transition-all duration-300 group-hover:shadow-xl">
                    <Image
                      src={diamond.image}
                      alt={`${diamond.shape} ${diamond.carat}ct Diamond`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="px-5 py-2.5 bg-white text-[var(--text-primary)] text-sm font-medium flex items-center gap-2 shadow-xl rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Eye size={14} />
                        Quick View
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {diamond.certType && (
                        <span className="px-2.5 py-1 bg-[var(--secondary-navy)] text-white text-[10px] font-bold tracking-wide rounded shadow-lg">
                          {diamond.certType}
                        </span>
                      )}
                    </div>
                    
                    {diamond.availability === 'In Stock' && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 bg-[var(--success)] text-white text-[10px] font-bold tracking-wide rounded shadow-lg">
                          READY
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary-gold)] transition-colors">
                        {diamond.shape} · {diamond.carat}ct
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {diamond.color} Color · {diamond.clarity} · {diamond.cut}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-lg font-semibold text-[var(--primary-gold)]">
                        ${diamond.priceMin.toLocaleString()}
                      </p>
                      <span className="text-xs text-[var(--text-muted)]">
                        ID: {diamond.id}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY CHOOSE US - Split Section with Value Props
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative h-[50vh] lg:h-auto lg:min-h-[800px]">
            <Image
              src={heroImages.secondary}
              alt="Earth Diamond Craftsmanship"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute bottom-8 left-8 right-8 lg:right-auto lg:w-72 p-6 glass rounded-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-gold)] flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">$2B+</p>
                  <p className="text-xs text-[var(--text-muted)]">Annual Trade Volume</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Trusted by leading jewelers from Hong Kong to New York
              </p>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="bg-[var(--secondary-navy)] text-white py-20 lg:py-28 px-8 lg:px-16 flex items-center">
            <div className="max-w-lg">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <span className="uppercase-tracking text-[var(--primary-gold-light)] mb-6 block">
                  The Earth Diamond Advantage
                </span>
                <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] mb-6 leading-tight">
                  Why Leading Jewelers 
                  <span className="text-[var(--primary-gold-light)]"> Choose Us</span>
                </h2>
                <p className="text-white/60 mb-12 leading-relaxed text-lg">
                  For {companyInfo.stats.yearsInBusiness} years, we&apos;ve built our reputation on 
                  quality, reliability, and transparent pricing. Direct from Surat to your business.
                </p>

                <div className="space-y-6">
                  {[
                    { 
                      icon: Building2, 
                      title: 'Factory Direct', 
                      desc: 'No middlemen. Our facility in Surat handles cutting, polishing, and certification.' 
                    },
                    { 
                      icon: Award, 
                      title: 'Certified Quality', 
                      desc: 'Every diamond GIA or IGI certified. Full documentation and traceability.' 
                    },
                    { 
                      icon: Globe, 
                      title: 'Global Delivery', 
                      desc: 'Insured shipping to 40+ countries. 99.2% on-time delivery rate.' 
                    },
                    { 
                      icon: Users, 
                      title: 'Dedicated Support', 
                      desc: 'Regional teams in Hong Kong, Mumbai, Dubai. WhatsApp & WeChat support.' 
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary-gold)]/20 transition-colors">
                        <item.icon size={22} className="text-[var(--primary-gold-light)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 text-lg">{item.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <button
                    onClick={() => openModal('brochure')}
                    className="group flex items-center gap-3 text-[var(--primary-gold-light)] font-medium hover:text-white transition-colors"
                  >
                    <Play size={18} className="group-hover:scale-110 transition-transform" />
                    Download Company Brochure
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CERTIFICATIONS & COMPLIANCE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[var(--background-warm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Certified Excellence, Global Compliance
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Full certification and documentation for seamless international trade
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {certifications.slice(0, 6).map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm border border-[var(--border-light)] hover:shadow-md hover:border-[var(--primary-gold)] transition-all cursor-pointer"
              >
                <Award className="text-[var(--primary-gold)]" size={24} />
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{cert.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{cert.description.split('.')[0]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS - Premium Carousel
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="uppercase-tracking text-[var(--primary-gold)] mb-4 block">Client Success</span>
            <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              From Hong Kong to London, jewelers trust Earth Diamond for quality and reliability
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-[var(--border-light)]">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={20}
                        className="text-[var(--primary-gold)] fill-current"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl text-[var(--text-primary)] mb-8 leading-relaxed font-[var(--font-subheading)] italic">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--primary-gold-light)]">
                        <Image
                          src={testimonials[activeTestimonial].avatar}
                          alt={testimonials[activeTestimonial].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">
                          {testimonials[activeTestimonial].name}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[var(--background-cream)] rounded-full">
                      <MapPin size={14} className="text-[var(--primary-gold)]" />
                      <span className="text-sm text-[var(--text-secondary)]">
                        {testimonials[activeTestimonial].region}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeTestimonial 
                      ? 'bg-[var(--primary-gold)] w-8' 
                      : 'bg-[var(--border)] hover:bg-[var(--text-muted)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION - Premium Consultation
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={heroImages.tertiary}
            alt="Premium Diamond Collection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary-navy)]/95 via-[var(--secondary-navy)]/80 to-[var(--secondary-navy)]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="uppercase-tracking text-[var(--primary-gold-light)] mb-6 block">
              Start Your Partnership
            </span>
            <h2 className="text-4xl lg:text-6xl font-[var(--font-display)] text-white mb-6 leading-tight">
              Ready to Source
              <br />
              <span className="text-[var(--primary-gold-light)]">Premium Diamonds?</span>
            </h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
              Connect with our team to discuss your requirements. Whether you need 
              bulk wholesale, calibrated sets, or custom specifications — we&apos;re here to help.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => openModal('rfq')}
                className="px-10 py-4 bg-[var(--primary-gold)] text-white font-medium tracking-wide hover:bg-[var(--primary-gold-hover)] transition-all duration-300 flex items-center gap-3 rounded-lg shadow-lg shadow-[var(--primary-gold)]/30"
              >
                Request Quote
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => openModal('whatsapp')}
                className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-medium tracking-wide hover:bg-white/20 border border-white/20 transition-all duration-300 flex items-center gap-3 rounded-lg"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </button>
              <button
                onClick={() => openModal('booking')}
                className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-medium tracking-wide hover:bg-white/20 border border-white/20 transition-all duration-300 flex items-center gap-3 rounded-lg"
              >
                <Phone size={18} />
                Schedule Call
              </button>
            </div>

            {/* Contact Options */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/50 text-sm">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} />
                {companyInfo.phone}
              </a>
              <span className="hidden sm:block">|</span>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                {companyInfo.email}
              </a>
              <span className="hidden sm:block">|</span>
              <span>Mon - Sat, 9:00 AM - 7:00 PM IST</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacer for mobile CTA bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
