'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Diamond, 
  Mail, 
  Phone, 
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Shield,
  Award,
  Globe,
  MessageCircle,
  CheckCircle,
  Truck,
  CreditCard
} from 'lucide-react';
import { companyInfo, certifications } from '@/data/mock-data';
import { useAppStore } from '@/store/app-store';

const footerLinks = {
  diamonds: [
    { name: 'All Diamonds', href: '/catalog' },
    { name: 'Round Brilliant', href: '/catalog?shape=round' },
    { name: 'Oval', href: '/catalog?shape=oval' },
    { name: 'Princess', href: '/catalog?shape=princess' },
    { name: 'Emerald', href: '/catalog?shape=emerald' },
    { name: 'Cushion', href: '/catalog?shape=cushion' },
    { name: 'Melee Diamonds', href: '/catalog?type=melee' },
    { name: 'Calibrated Sets', href: '/catalog?type=calibrated' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Capabilities', href: '/capabilities' },
    { name: 'Quality Assurance', href: '/quality' },
    { name: 'Export Services', href: '/export' },
    { name: 'Industry Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Request Quote', href: '/contact', action: true },
    { name: 'Download Brochure', href: '#', action: true },
    { name: 'Schedule Call', href: '#', action: true },
    { name: 'WhatsApp Support', href: '#', action: true },
    { name: 'FAQs', href: '/faq' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Returns Policy', href: '/returns' },
  ],
};

const offices = [
  { city: 'Surat', country: 'India', type: 'HQ & Manufacturing', phone: '+91 261 234 5678' },
  { city: 'Hong Kong', country: 'HK', type: 'Trade Office', phone: '+852 2345 6789' },
  { city: 'Mumbai', country: 'India', type: 'Sales Office', phone: '+91 22 4567 8901' },
];

const shippingPartners = ['Brinks', 'Malca-Amit', 'Loomis', 'FedEx'];

export function Footer() {
  const { openModal, showToast } = useAppStore();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    showToast('Subscribed successfully! Check your email for confirmation.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[var(--secondary-navy)] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-[var(--font-heading)] mb-3">
                Stay Ahead of the Market
              </h3>
              <p className="text-white/60 text-sm lg:text-base">
                Exclusive inventory updates, pricing trends, and industry insights delivered weekly. 
                Join 5,000+ jewelers who trust our market intelligence.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--primary-gold)] transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-8 py-3.5 bg-[var(--primary-gold)] text-white font-medium rounded-lg hover:bg-[var(--primary-gold-hover)] transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
              >
                {isSubscribing ? 'Subscribing...' : (
                  <>
                    Subscribe
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-gold)] to-[var(--primary-gold-dark)] rounded-xl flex items-center justify-center shadow-lg">
                <Diamond className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-[var(--font-heading)] font-bold block">{companyInfo.name}</span>
                <span className="text-xs text-white/50">Est. {companyInfo.founded}</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              {companyInfo.description}
            </p>
            
            {/* Global Offices */}
            <div className="space-y-3 mb-8">
              {offices.map((office) => (
                <div key={office.city} className="flex items-start gap-3">
                  <MapPin size={14} className="text-[var(--primary-gold)] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/80 font-medium">
                      {office.city}, {office.country}
                      <span className="text-white/40 font-normal ml-2">• {office.type}</span>
                    </p>
                    <a href={`tel:${office.phone}`} className="text-xs text-white/50 hover:text-[var(--primary-gold)] transition-colors">
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: companyInfo.social.linkedin, label: 'LinkedIn' },
                { icon: Instagram, href: companyInfo.social.instagram, label: 'Instagram' },
                { icon: Facebook, href: companyInfo.social.facebook, label: 'Facebook' },
                { icon: Youtube, href: companyInfo.social.youtube, label: 'YouTube' },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                  title={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Diamonds */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-[var(--primary-gold-light)]">
              Diamonds
            </h4>
            <ul className="space-y-3">
              {footerLinks.diamonds.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-[var(--primary-gold-light)]">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications & Trust */}
          <div className="col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-[var(--primary-gold-light)]">
              Certifications & Compliance
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { name: 'GIA Certified', icon: Award },
                { name: 'IGI Certified', icon: Award },
                { name: 'HRD Antwerp', icon: Award },
                { name: 'Kimberley Process', icon: Shield },
                { name: 'RJC Member', icon: Shield },
                { name: 'ISO 9001:2015', icon: CheckCircle },
              ].map((cert) => (
                <div 
                  key={cert.name}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                >
                  <cert.icon size={14} className="text-[var(--primary-gold-light)]" />
                  <span className="text-xs text-white/70">{cert.name}</span>
                </div>
              ))}
            </div>

            {/* Shipping Partners */}
            <div className="mb-6">
              <h5 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                Secure Shipping Partners
              </h5>
              <div className="flex flex-wrap gap-2">
                {shippingPartners.map((partner) => (
                  <span key={partner} className="px-3 py-1.5 bg-white/5 rounded-md text-xs text-white/50">
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Need Assistance?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('whatsapp')}
                  className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>
                <span className="text-white/20">|</span>
                <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                  <Mail size={14} />
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Credentials Bar */}
      <div className="border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 text-xs text-white/40">
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span>Serving 40+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={14} />
              <span>Insured Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={14} />
              <span>100% Conflict-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={14} />
              <span>GJEPC Member</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={14} />
              <span>Secure Bank Transfers & LC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
