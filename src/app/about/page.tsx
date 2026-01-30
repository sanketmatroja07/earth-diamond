'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Diamond, 
  Target, 
  Heart, 
  Handshake, 
  Clock,
  Building2,
  Users,
  Globe,
  ArrowRight,
  Play,
  Award,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { companyInfo, companyTimeline, leadershipTeam, factoryImages, heroImages } from '@/data/mock-data';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every cut, every polish, every grade meets exacting standards. We don\'t compromise on quality.'
  },
  {
    icon: Heart,
    title: 'Ethics',
    description: 'Full compliance with Kimberley Process and responsible sourcing. Transparency at every step.'
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: 'Consistent supply, on-time delivery, and dependable turnaround. Your business depends on it.'
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'We invest in long-term relationships. Your success is our success.'
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function AboutPage() {
  const { openModal } = useAppStore();

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <Image
          src={heroImages.main}
          alt="Earth Diamond Facility"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-[var(--primary-gold)]" />
              <span className="uppercase-tracking text-[var(--primary-gold-light)]">Our Story</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-[var(--font-display)] text-white mb-6 leading-tight">
              Built for Excellence,
              <br />
              <span className="text-[var(--primary-gold-light)]">Since {companyInfo.founded}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              From a small cutting unit in Surat to a global diamond manufacturing powerhouse, 
              our journey has been defined by an unwavering commitment to quality and trust.
            </p>
            <Button 
              onClick={() => openModal('brochure')}
              rightIcon={<ArrowRight size={16} />}
            >
              Download Company Profile
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[var(--navy-deep)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: companyInfo.stats.yearsInBusiness + '+', label: 'Years of Excellence' },
              { value: companyInfo.stats.monthlyCapacity, label: 'Monthly Capacity' },
              { value: '40+', label: 'Countries Served' },
              { value: companyInfo.stats.buyerSatisfaction, label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-[var(--font-display)] text-[var(--primary-gold-light)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="uppercase-tracking text-[var(--primary-gold)] mb-4 block">Our Heritage</span>
              <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
                A Legacy of Craftsmanship
              </h2>
              <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Founded in {companyInfo.founded} in the heart of India&apos;s diamond capital, Surat, 
                  Earth Diamond began as a vision to bring world-class diamond manufacturing to global markets.
                </p>
                <p>
                  What started as a modest cutting and polishing unit has evolved into a comprehensive 
                  diamond manufacturing facility, serving prestigious jewelers and wholesalers across 
                  {companyInfo.stats.exportRegions.length} continents.
                </p>
                <p>
                  Today, we combine traditional craftsmanship with cutting-edge technology, ensuring 
                  every diamond that leaves our facility meets the highest standards of quality and precision.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={heroImages.secondary}
                  alt="Diamond Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-xl rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[var(--accent-champagne)] rounded-full flex items-center justify-center">
                    <Award className="text-[var(--primary-gold)]" size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-[var(--font-display)] text-[var(--text-primary)]">GIA & IGI</p>
                    <p className="text-sm text-[var(--text-muted)]">Certified Partner</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[var(--background-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="uppercase-tracking text-[var(--primary-gold)] mb-4 block">Our Journey</span>
            <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
              Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary-gold)] via-[var(--primary-gold)] to-transparent" />

            <div className="space-y-12">
              {companyTimeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Year Badge */}
                  <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-10">
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-[var(--primary-gold)] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs lg:text-sm font-bold text-white">
                        {item.year.toString().slice(2)}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 pl-16 lg:pl-0 ${idx % 2 === 0 ? 'lg:pr-24 lg:text-right' : 'lg:pl-24'}`}>
                    <div className="inline-block bg-white p-6 rounded-lg shadow-sm border border-[var(--border-light)]">
                      <p className="text-sm text-[var(--primary-gold)] font-medium mb-1">{item.year}</p>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="uppercase-tracking text-[var(--primary-gold)] mb-4 block">Leadership</span>
            <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
              Meet Our Team
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Experienced professionals dedicated to excellence in diamond manufacturing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[var(--navy-deep)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="uppercase-tracking text-[var(--primary-gold-light)] mb-4 block">Our Values</span>
            <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)]">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-[var(--primary-gold-light)]" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              {factoryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative rounded-lg overflow-hidden ${
                    idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Facility ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="uppercase-tracking text-[var(--primary-gold)] mb-4 block">Our Facility</span>
              <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
                State-of-the-Art Manufacturing
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                Our modern facility in Surat houses the latest diamond cutting and polishing technology, 
                operated by skilled craftsmen with decades of experience.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Building2, value: '50,000 sq ft', label: 'Manufacturing Area' },
                  { icon: Users, value: '200+', label: 'Skilled Craftsmen' },
                  { icon: Diamond, value: companyInfo.stats.monthlyCapacity, label: 'Monthly Capacity' },
                  { icon: Globe, value: '40+', label: 'Countries Served' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[var(--accent-champagne)] rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-[var(--primary-gold)]" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{item.value}</p>
                      <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={() => openModal('booking')} leftIcon={<Play size={16} />}>
                Schedule a Virtual Tour
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--background-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Join our network of satisfied buyers worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => openModal('rfq')} size="lg">
                Request Quote
              </Button>
              <Button variant="outline" onClick={() => openModal('booking')} size="lg">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
