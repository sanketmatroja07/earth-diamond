// ═══════════════════════════════════════════════════════════════
// EARTH DIAMOND - PREMIUM MOCK DATA
// Target Markets: India, Hong Kong, China, Global
// ═══════════════════════════════════════════════════════════════

// Diamond Data Types and Constants
export const DIAMOND_SHAPES = ['Round', 'Princess', 'Oval', 'Emerald', 'Cushion', 'Marquise', 'Pear', 'Radiant', 'Asscher', 'Heart'] as const;
export const COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'] as const;
export const CLARITIES = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2'] as const;
export const CUTS = ['Excellent', 'Very Good', 'Good'] as const;
export const CERT_TYPES = ['GIA', 'IGI', 'HRD', 'GCAL'] as const;

export type DiamondShape = typeof DIAMOND_SHAPES[number];
export type Color = typeof COLORS[number];
export type Clarity = typeof CLARITIES[number];
export type Cut = typeof CUTS[number];
export type CertType = typeof CERT_TYPES[number];

export interface Diamond {
  id: string;
  shape: DiamondShape;
  carat: number;
  color: Color;
  clarity: Clarity;
  cut: Cut;
  certType: CertType;
  priceMin: number;
  priceMax: number;
  availability: 'In Stock' | 'Made to Order';
  image: string;
  certNumber?: string;
}

// Premium Diamond Images (High Quality)
const diamondImages = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=90',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=90',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=90',
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=90',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90',
  'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=90',
  'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=800&q=90',
  'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=800&q=90',
];

const getImage = (i: number) => diamondImages[i % diamondImages.length];

// 24 Diamond SKUs with Expanded Data
export const diamonds: Diamond[] = [
  { id: 'ED-RND-001', shape: 'Round', carat: 0.72, color: 'D', clarity: 'VVS2', cut: 'Excellent', certType: 'GIA', priceMin: 1850, priceMax: 2120, availability: 'In Stock', image: getImage(0), certNumber: 'GIA2345678901' },
  { id: 'ED-RND-002', shape: 'Round', carat: 1.01, color: 'E', clarity: 'VS1', cut: 'Excellent', certType: 'GIA', priceMin: 4200, priceMax: 4800, availability: 'In Stock', image: getImage(1), certNumber: 'GIA3456789012' },
  { id: 'ED-RND-003', shape: 'Round', carat: 1.52, color: 'F', clarity: 'VVS1', cut: 'Excellent', certType: 'IGI', priceMin: 8500, priceMax: 9200, availability: 'In Stock', image: getImage(2), certNumber: 'IGI456789012' },
  { id: 'ED-PRI-001', shape: 'Princess', carat: 0.91, color: 'D', clarity: 'VS2', cut: 'Very Good', certType: 'IGI', priceMin: 2800, priceMax: 3200, availability: 'In Stock', image: getImage(3), certNumber: 'IGI567890123' },
  { id: 'ED-PRI-002', shape: 'Princess', carat: 1.23, color: 'G', clarity: 'VS1', cut: 'Excellent', certType: 'GIA', priceMin: 4100, priceMax: 4600, availability: 'Made to Order', image: getImage(4), certNumber: 'GIA5678901234' },
  { id: 'ED-OVL-001', shape: 'Oval', carat: 0.85, color: 'E', clarity: 'VVS2', cut: 'Excellent', certType: 'GIA', priceMin: 2600, priceMax: 3100, availability: 'In Stock', image: getImage(5), certNumber: 'GIA6789012345' },
  { id: 'ED-OVL-002', shape: 'Oval', carat: 2.01, color: 'F', clarity: 'VS2', cut: 'Very Good', certType: 'IGI', priceMin: 9800, priceMax: 11200, availability: 'Made to Order', image: getImage(6), certNumber: 'IGI678901234' },
  { id: 'ED-EMR-001', shape: 'Emerald', carat: 1.15, color: 'D', clarity: 'VVS1', cut: 'Excellent', certType: 'GIA', priceMin: 5200, priceMax: 5900, availability: 'In Stock', image: getImage(7), certNumber: 'GIA7890123456' },
  { id: 'ED-EMR-002', shape: 'Emerald', carat: 1.75, color: 'E', clarity: 'VS1', cut: 'Excellent', certType: 'IGI', priceMin: 7800, priceMax: 8600, availability: 'In Stock', image: getImage(0), certNumber: 'IGI789012345' },
  { id: 'ED-CUS-001', shape: 'Cushion', carat: 0.68, color: 'F', clarity: 'VS2', cut: 'Very Good', certType: 'GIA', priceMin: 1650, priceMax: 1920, availability: 'In Stock', image: getImage(1), certNumber: 'GIA8901234567' },
  { id: 'ED-CUS-002', shape: 'Cushion', carat: 1.42, color: 'G', clarity: 'VVS2', cut: 'Excellent', certType: 'IGI', priceMin: 5100, priceMax: 5800, availability: 'Made to Order', image: getImage(2), certNumber: 'IGI890123456' },
  { id: 'ED-MAR-001', shape: 'Marquise', carat: 0.95, color: 'D', clarity: 'VS1', cut: 'Excellent', certType: 'GIA', priceMin: 3400, priceMax: 3900, availability: 'In Stock', image: getImage(3), certNumber: 'GIA9012345678' },
  { id: 'ED-MAR-002', shape: 'Marquise', carat: 1.28, color: 'E', clarity: 'VVS1', cut: 'Excellent', certType: 'GIA', priceMin: 5800, priceMax: 6500, availability: 'In Stock', image: getImage(4), certNumber: 'GIA0123456789' },
  { id: 'ED-PEA-001', shape: 'Pear', carat: 0.78, color: 'F', clarity: 'VS2', cut: 'Very Good', certType: 'IGI', priceMin: 2100, priceMax: 2450, availability: 'In Stock', image: getImage(5), certNumber: 'IGI012345678' },
  { id: 'ED-PEA-002', shape: 'Pear', carat: 1.65, color: 'G', clarity: 'VS1', cut: 'Excellent', certType: 'GIA', priceMin: 6200, priceMax: 7100, availability: 'Made to Order', image: getImage(6), certNumber: 'GIA1234567890' },
  { id: 'ED-RAD-001', shape: 'Radiant', carat: 1.02, color: 'D', clarity: 'VVS2', cut: 'Excellent', certType: 'IGI', priceMin: 4300, priceMax: 4900, availability: 'In Stock', image: getImage(7), certNumber: 'IGI123456789' },
  { id: 'ED-RAD-002', shape: 'Radiant', carat: 1.88, color: 'E', clarity: 'VS2', cut: 'Very Good', certType: 'GIA', priceMin: 8100, priceMax: 9200, availability: 'In Stock', image: getImage(0), certNumber: 'GIA2345678901' },
  { id: 'ED-ASS-001', shape: 'Asscher', carat: 0.82, color: 'F', clarity: 'VVS1', cut: 'Excellent', certType: 'GIA', priceMin: 2900, priceMax: 3400, availability: 'In Stock', image: getImage(1), certNumber: 'GIA3456789012' },
  { id: 'ED-ASS-002', shape: 'Asscher', carat: 1.35, color: 'D', clarity: 'VS1', cut: 'Excellent', certType: 'IGI', priceMin: 5600, priceMax: 6300, availability: 'Made to Order', image: getImage(2), certNumber: 'IGI234567890' },
  { id: 'ED-HRT-001', shape: 'Heart', carat: 0.71, color: 'E', clarity: 'VS2', cut: 'Very Good', certType: 'GIA', priceMin: 2200, priceMax: 2600, availability: 'In Stock', image: getImage(3), certNumber: 'GIA4567890123' },
  { id: 'ED-HRT-002', shape: 'Heart', carat: 1.18, color: 'G', clarity: 'VVS2', cut: 'Excellent', certType: 'IGI', priceMin: 4500, priceMax: 5100, availability: 'In Stock', image: getImage(4), certNumber: 'IGI345678901' },
  { id: 'ED-RND-004', shape: 'Round', carat: 2.52, color: 'D', clarity: 'IF', cut: 'Excellent', certType: 'GIA', priceMin: 28000, priceMax: 32000, availability: 'Made to Order', image: getImage(5), certNumber: 'GIA5678901234' },
  { id: 'ED-OVL-003', shape: 'Oval', carat: 3.01, color: 'E', clarity: 'VVS1', cut: 'Excellent', certType: 'GIA', priceMin: 35000, priceMax: 42000, availability: 'Made to Order', image: getImage(6), certNumber: 'GIA6789012345' },
  { id: 'ED-EMR-003', shape: 'Emerald', carat: 2.78, color: 'F', clarity: 'VVS2', cut: 'Excellent', certType: 'IGI', priceMin: 22000, priceMax: 26000, availability: 'Made to Order', image: getImage(7), certNumber: 'IGI456789012' },
];

// ═══════════════════════════════════════════════════════════════
// HERO & SECTION IMAGES
// ═══════════════════════════════════════════════════════════════
export const heroImages = {
  main: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&q=90',
  secondary: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=90',
  tertiary: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=90',
  about: 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=1600&q=90',
  process: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=90',
};

export const categoryImages = {
  loose: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85',
  melee: 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=800&q=85',
  calibrated: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=85',
  custom: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=85',
};

export const factoryImages = [
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=85',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=85',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85',
];

// Diamond Shape Images with Real Diamond Photos
export const diamondShapeImages: Record<string, string> = {
  'Round': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=85',
  'Princess': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=85',
  'Oval': 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=85',
  'Emerald': 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=400&q=85',
  'Cushion': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=85',
  'Marquise': 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400&q=85',
  'Pear': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=85',
  'Radiant': 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=400&q=85',
  'Asscher': 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=400&q=85',
  'Heart': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=85',
};

// ═══════════════════════════════════════════════════════════════
// TRUST SIGNALS & CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════
export const certifications = [
  { id: 'gia', name: 'GIA', fullName: 'Gemological Institute of America', description: 'World\'s foremost authority in gemology' },
  { id: 'igi', name: 'IGI', fullName: 'International Gemological Institute', description: 'Global leader in diamond certification' },
  { id: 'hrd', name: 'HRD', fullName: 'Hoge Raad voor Diamant', description: 'European diamond authority based in Antwerp' },
  { id: 'kimberley', name: 'Kimberley Process', fullName: 'Kimberley Process Certification', description: '100% conflict-free diamond guarantee' },
  { id: 'rjc', name: 'RJC', fullName: 'Responsible Jewellery Council', description: 'Certified for ethical business practices' },
  { id: 'iso', name: 'ISO 9001', fullName: 'ISO 9001:2015', description: 'Quality management system certified' },
];

export const trustStats = [
  { value: '15+', label: 'Years of Excellence', icon: 'award' },
  { value: '50,000+', label: 'Monthly Capacity', icon: 'gem' },
  { value: '40+', label: 'Countries Served', icon: 'globe' },
  { value: '99.2%', label: 'On-Time Delivery', icon: 'truck' },
  { value: '4.9/5', label: 'Client Satisfaction', icon: 'star' },
  { value: '$2B+', label: 'Trade Volume', icon: 'chart' },
];

// ═══════════════════════════════════════════════════════════════
// CLIENT LOGOS & TESTIMONIALS
// ═══════════════════════════════════════════════════════════════
export const clientLogos = [
  { id: 1, name: 'Azure Jewels', region: 'Hong Kong' },
  { id: 2, name: 'Crown Diamond Co.', region: 'USA' },
  { id: 3, name: 'Eternal Gems', region: 'Dubai' },
  { id: 4, name: 'Heritage Diamonds', region: 'London' },
  { id: 5, name: 'Imperial Jewelers', region: 'Shanghai' },
  { id: 6, name: 'Majestic Stones', region: 'Mumbai' },
  { id: 7, name: 'Royal Gem House', region: 'Singapore' },
  { id: 8, name: 'Sterling Diamonds', region: 'Belgium' },
];

export const testimonials = [
  {
    id: 1,
    name: 'Chen Wei',
    role: 'Procurement Director',
    company: 'Chow Tai Fook',
    region: 'Hong Kong',
    quote: 'Earth Diamond has been our trusted partner for over 8 years. Their quality consistency and reliable delivery have made them indispensable to our supply chain. The calibrated sets are always perfect.',
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    highlight: 'Trusted Partner Since 2016',
  },
  {
    id: 2,
    name: 'Ahmad Al-Rashid',
    role: 'Wholesale Buyer',
    company: 'Dubai Gold Souk',
    region: 'UAE',
    quote: 'The grading accuracy is remarkable. Every shipment matches the certificates exactly. Their understanding of Middle Eastern market preferences sets them apart from competitors.',
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    highlight: 'Exceptional Quality',
  },
  {
    id: 3,
    name: 'Sarah Mitchell',
    role: 'Head of Procurement',
    company: 'Signet Jewelers',
    region: 'United Kingdom',
    quote: 'Their export documentation is flawless. Customs clearance has never been smoother. A truly professional operation that understands international trade requirements.',
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    highlight: 'Seamless Global Trade',
  },
  {
    id: 4,
    name: 'Liu Ming',
    role: 'CEO',
    company: 'Beijing Gems Ltd.',
    region: 'China',
    quote: 'Working with Earth Diamond has transformed our business. Their dedicated China desk understands our market nuances and provides excellent WeChat support for quick communication.',
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    highlight: 'China Market Expert',
  },
  {
    id: 5,
    name: 'Raj Patel',
    role: 'Managing Director',
    company: 'Mumbai Diamond Exchange',
    region: 'India',
    quote: 'As fellow industry veterans in Surat, we appreciate their commitment to quality. Even for smaller orders, the attention to detail remains impeccable. True craftsmanship.',
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    highlight: 'Industry Recognition',
  },
  {
    id: 6,
    name: 'Maria Santos',
    role: 'Brand Director',
    company: 'HStern',
    region: 'Brazil',
    quote: 'From inquiry to delivery, every touchpoint reflects their commitment to excellence. The virtual inventory system has revolutionized how we source diamonds.',
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    highlight: 'Excellence in Service',
  },
];

// ═══════════════════════════════════════════════════════════════
// BLOG POSTS
// ═══════════════════════════════════════════════════════════════
export const blogPosts = [
  {
    id: 1,
    slug: 'understanding-diamond-certification',
    title: 'Understanding Diamond Certification: GIA vs IGI vs HRD',
    excerpt: 'A comprehensive guide to diamond certification standards and what they mean for B2B buyers in different markets.',
    category: 'Buying Guide',
    readTime: '8 min',
    date: '2026-01-15',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85',
    featured: true,
  },
  {
    id: 2,
    slug: 'china-diamond-market-2026',
    title: 'China Diamond Market: Trends & Opportunities in 2026',
    excerpt: 'Key insights into China\'s evolving diamond market and what international suppliers need to know.',
    category: 'Market',
    readTime: '10 min',
    date: '2026-01-12',
    image: 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=800&q=85',
    featured: true,
  },
  {
    id: 3,
    slug: 'hong-kong-trade-shows',
    title: 'Maximizing Hong Kong Trade Shows: A Buyer\'s Guide',
    excerpt: 'Expert strategies for B2B buyers attending Hong Kong Jewellery & Gem Fair.',
    category: 'Market',
    readTime: '6 min',
    date: '2026-01-10',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=85',
    featured: false,
  },
  {
    id: 4,
    slug: 'melee-diamond-sourcing',
    title: 'Melee Diamond Sourcing: Quality at Scale',
    excerpt: 'How to ensure consistent quality when sourcing melee diamonds for jewelry manufacturing.',
    category: 'Manufacturing',
    readTime: '6 min',
    date: '2026-01-08',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85',
    featured: false,
  },
  {
    id: 5,
    slug: 'ethical-sourcing-compliance',
    title: 'Ethical Sourcing: Beyond Kimberley Process',
    excerpt: 'Modern compliance frameworks and chain-of-custody documentation for responsible sourcing.',
    category: 'Compliance',
    readTime: '7 min',
    date: '2026-01-05',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=85',
    featured: false,
  },
  {
    id: 6,
    slug: 'calibrated-diamond-matching',
    title: 'The Art of Calibrated Diamond Matching',
    excerpt: 'Technical insights into achieving perfect color and clarity matching for jewelry production.',
    category: 'Manufacturing',
    readTime: '9 min',
    date: '2026-01-02',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85',
    featured: false,
  },
  {
    id: 7,
    slug: 'export-documentation-guide',
    title: 'Export Documentation: A Complete Checklist',
    excerpt: 'Essential documentation requirements for smooth international diamond trade.',
    category: 'Trade',
    readTime: '5 min',
    date: '2025-12-28',
    image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=85',
    featured: false,
  },
  {
    id: 8,
    slug: 'lab-grown-vs-natural',
    title: 'Lab-Grown vs Natural: Market Positioning Strategy',
    excerpt: 'Strategic considerations for B2B buyers navigating both market segments.',
    category: 'Market',
    readTime: '8 min',
    date: '2025-12-25',
    image: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=800&q=85',
    featured: false,
  },
];

// ═══════════════════════════════════════════════════════════════
// CERTIFICATES
// ═══════════════════════════════════════════════════════════════
export const certificates = [
  { id: 1, name: 'GIA Certified Grading Lab', type: 'GIA Partnership', description: 'Official GIA-certified grading partnership since 2012.', downloadUrl: '/downloads/gia-cert.pdf' },
  { id: 2, name: 'IGI Authorized Facility', type: 'IGI Authorization', description: 'Authorized IGI facility for on-site certification.', downloadUrl: '/downloads/igi-cert.pdf' },
  { id: 3, name: 'Kimberley Process Certificate', type: 'Compliance', description: 'Full Kimberley Process compliance - conflict-free guarantee.', downloadUrl: '/downloads/kimberley-cert.pdf' },
  { id: 4, name: 'ISO 9001:2015', type: 'Quality Management', description: 'Certified quality management system.', downloadUrl: '/downloads/iso-cert.pdf' },
  { id: 5, name: 'RJC Certification', type: 'Responsible Jewelry', description: 'RJC certified for ethical business practices.', downloadUrl: '/downloads/rjc-cert.pdf' },
  { id: 6, name: 'Export License - GJEPC', type: 'Trade Authorization', description: 'Licensed member of Gems & Jewellery Export Promotion Council.', downloadUrl: '/downloads/export-license.pdf' },
];

// ═══════════════════════════════════════════════════════════════
// COMPANY INFO
// ═══════════════════════════════════════════════════════════════
export const companyInfo = {
  name: 'Earth Diamond',
  tagline: 'Excellence in Every Facet',
  shortTagline: 'Surat\'s Premier Diamond Manufacturer',
  description: 'Premium diamond manufacturing and global export since 2009. Factory-direct GIA & IGI certified diamonds for discerning jewelers worldwide.',
  founded: 2009,
  headquarters: 'Surat, India',
  address: '14th Floor, Diamond Tower, G.T. Road, Surat, Gujarat 395003, India',
  phone: '+91 261 234 5678',
  phoneHK: '+852 2345 6789',
  phoneChina: '+86 21 5123 4567',
  email: 'inquiry@earthdiamond.com',
  whatsapp: '+919876543210',
  wechat: 'EarthDiamondHQ',
  social: {
    linkedin: 'https://linkedin.com/company/earth-diamond',
    instagram: 'https://instagram.com/earthdiamond',
    facebook: 'https://facebook.com/earthdiamond',
    youtube: 'https://youtube.com/@earthdiamond',
  },
  stats: {
    monthlyCapacity: '50,000+',
    avgTurnaround: '7-14 days',
    exportRegions: ['North America', 'Europe', 'Middle East', 'Asia Pacific', 'China'],
    yearsInBusiness: 15,
    onTimeDispatch: '99.2%',
    buyerSatisfaction: '4.9/5',
    totalCustomers: '2,500+',
    teamSize: '200+',
    facilitySize: '50,000 sq ft',
  },
  offices: [
    { city: 'Surat', country: 'India', type: 'Headquarters & Manufacturing', phone: '+91 261 234 5678' },
    { city: 'Hong Kong', country: 'Hong Kong', type: 'Trade Office', phone: '+852 2345 6789' },
    { city: 'Mumbai', country: 'India', type: 'Sales Office', phone: '+91 22 4567 8901' },
  ],
};

// ═══════════════════════════════════════════════════════════════
// COMPANY TIMELINE
// ═══════════════════════════════════════════════════════════════
export const companyTimeline = [
  { year: 2009, title: 'Foundation', description: 'Established as a cutting and polishing unit in Surat, Gujarat.' },
  { year: 2012, title: 'GIA Partnership', description: 'Became an authorized GIA grading partner, elevating quality standards.' },
  { year: 2015, title: 'Global Expansion', description: 'Opened Hong Kong trade office, expanded to 20+ countries.' },
  { year: 2018, title: 'Capacity Growth', description: 'Expanded facility to 50,000 sq ft with 50,000+ monthly capacity.' },
  { year: 2021, title: 'Digital Innovation', description: 'Launched digital inventory platform with real-time availability.' },
  { year: 2024, title: 'Market Leadership', description: 'Now serving 40+ countries with $2B+ annual trade volume.' },
];

// ═══════════════════════════════════════════════════════════════
// LEADERSHIP TEAM
// ═══════════════════════════════════════════════════════════════
export const leadershipTeam = [
  { id: 1, name: 'Vikram Shah', role: 'Founder & Managing Director', bio: '25+ years in diamond manufacturing. Visionary leader who built Earth Diamond from ground up.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { id: 2, name: 'Priya Mehta', role: 'Director of Operations', bio: 'Former De Beers executive. Oversees production, quality control, and supply chain.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { id: 3, name: 'Arjun Patel', role: 'Head of International Trade', bio: 'Expert in global diamond trade with deep connections in Hong Kong and China markets.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { id: 4, name: 'Neha Sharma', role: 'Chief Quality Officer', bio: 'GIA Graduate Gemologist. Leads QA protocols and certification processes.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
];

// ═══════════════════════════════════════════════════════════════
// CAPABILITIES
// ═══════════════════════════════════════════════════════════════
export const capabilities = [
  { 
    id: 'cutting', 
    title: 'Precision Cutting & Polishing', 
    description: 'State-of-the-art laser cutting with expert craftsmanship for all shapes.',
    details: ['Laser precision technology', 'Master craftsmen with 20+ years experience', 'All shapes and sizes', 'Triple Excellent cuts available'],
    deliverables: ['Polished stones', 'Custom cuts', 'Recuts and repairs'],
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85',
    icon: 'gem'
  },
  { 
    id: 'matching', 
    title: 'Calibrated Matching', 
    description: 'Perfect color, clarity, and size matching for jewelry production.',
    details: ['Spectroscopic color matching', 'Consistency guarantee', 'Graduated sets available', 'Custom size calibration'],
    deliverables: ['Matched pairs', 'Graduated sets', 'Layout parcels'],
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85',
    icon: 'layers'
  },
  { 
    id: 'wholesale', 
    title: 'Wholesale Programs', 
    description: 'Volume pricing with dedicated account management.',
    details: ['Tiered pricing structure', 'Priority inventory access', 'Dedicated account manager', 'Custom payment terms'],
    deliverables: ['Bulk parcels', 'Mixed lots', 'Regular supply contracts'],
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=85',
    icon: 'box'
  },
  { 
    id: 'custom', 
    title: 'Custom Orders', 
    description: 'Tailored specifications for unique requirements.',
    details: ['Bespoke cutting specifications', 'White-label programs', 'Special size requests', 'Exclusive shapes'],
    deliverables: ['Custom specifications', 'Private labeling', 'Exclusive cuts'],
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=85',
    icon: 'settings'
  },
  { 
    id: 'melee', 
    title: 'Melee Diamonds', 
    description: 'Precision-cut small diamonds for jewelry settings and pavé work.',
    details: ['0.001ct to 0.20ct sizes', 'Full cut and single cut options', 'Strict calibration standards', 'Bulk quantities available'],
    deliverables: ['Calibrated melee lots', 'Star melee', 'Single cuts'],
    image: 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=600&q=85',
    icon: 'sparkles'
  },
];

// ═══════════════════════════════════════════════════════════════
// EXPORT REGIONS & SHIPPING
// ═══════════════════════════════════════════════════════════════
export const exportRegions = [
  { region: 'Asia Pacific', countries: ['Hong Kong', 'China', 'Japan', 'Singapore', 'Australia'], leadTime: '3-5 days', highlight: true },
  { region: 'North America', countries: ['USA', 'Canada'], leadTime: '5-7 days', highlight: false },
  { region: 'Europe', countries: ['UK', 'Germany', 'Belgium', 'Italy', 'France', 'Switzerland'], leadTime: '4-6 days', highlight: false },
  { region: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain'], leadTime: '3-5 days', highlight: true },
  { region: 'South Asia', countries: ['India', 'Sri Lanka', 'Bangladesh'], leadTime: '2-4 days', highlight: false },
];

export const shippingPartners = [
  { name: 'Brinks', type: 'Premium Secure', description: 'Global diamond logistics specialist' },
  { name: 'Malca-Amit', type: 'Secure', description: 'Worldwide precious cargo transport' },
  { name: 'Loomis', type: 'Secure', description: 'International valuables transport' },
  { name: 'FedEx', type: 'Express', description: 'Priority shipping with insurance' },
];

// ═══════════════════════════════════════════════════════════════
// BUYER TYPES & FORM OPTIONS
// ═══════════════════════════════════════════════════════════════
export const buyerTypes = [
  { id: 'jeweler', label: 'Jeweler', icon: 'gem' },
  { id: 'wholesaler', label: 'Wholesaler', icon: 'warehouse' },
  { id: 'retailChain', label: 'Retail Chain', icon: 'store' },
  { id: 'brand', label: 'Brand / Designer', icon: 'crown' },
  { id: 'manufacturer', label: 'Manufacturer', icon: 'factory' },
] as const;

export const budgetRanges = ['$1,000 - $5,000', '$5,000 - $25,000', '$25,000 - $100,000', '$100,000 - $500,000', '$500,000+'];
export const timelines = ['ASAP', '1-2 weeks', '2-4 weeks', '1-2 months', 'Flexible'];
export const interestAreas = ['Loose Diamonds', 'Melee Diamonds', 'Calibrated Stones', 'Custom Specifications', 'Bulk Wholesale', 'Lab-Grown'];

// ═══════════════════════════════════════════════════════════════
// VALUE PROPOSITIONS
// ═══════════════════════════════════════════════════════════════
export const valueProps = [
  {
    title: 'Factory Direct Pricing',
    description: 'No middlemen. Direct from our Surat manufacturing facility to your business.',
    icon: 'building',
  },
  {
    title: 'Certified Quality',
    description: 'Every diamond GIA or IGI certified. Full traceability and documentation.',
    icon: 'award',
  },
  {
    title: 'Global Logistics',
    description: 'Insured shipping to 40+ countries. 99.2% on-time delivery rate.',
    icon: 'globe',
  },
  {
    title: 'Dedicated Support',
    description: 'Regional teams in Hong Kong, Mumbai, and Surat. WeChat & WhatsApp support.',
    icon: 'headphones',
  },
];

// ═══════════════════════════════════════════════════════════════
// QUICK ACTIONS / CTAS
// ═══════════════════════════════════════════════════════════════
export const quickActions = [
  { id: 'quote', label: 'Request Quote', icon: 'fileText', primary: true },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'messageCircle', primary: false },
  { id: 'call', label: 'Schedule Call', icon: 'phone', primary: false },
  { id: 'brochure', label: 'Download Brochure', icon: 'download', primary: false },
];
