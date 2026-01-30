# Earth Diamond - Diamond Manufacturing Website

A luxury-grade, production-ready frontend website for a diamond manufacturing company (import/export/wholesale/factory). Built with Next.js 15, React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── capabilities/      # Manufacturing capabilities
│   ├── catalog/           # Diamond catalog with filters
│   ├── contact/           # Contact & RFQ form
│   ├── export/            # Import/Export & logistics
│   ├── insights/          # Blog/market insights
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── privacy/           # Privacy policy
│   ├── quality/           # Quality & compliance
│   ├── terms/             # Terms & conditions
│   ├── globals.css        # Global styles & design system
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/
│   ├── layout/            # Header, Footer, CTAs
│   ├── modals/            # RFQ, WhatsApp, Compare, etc.
│   └── ui/                # Reusable UI components
├── data/
│   └── mock-data.ts       # Mock data for development
└── store/
    ├── app-provider.tsx   # Global state provider
    └── app-store.ts       # State management
```

## 🎨 Design System

### Colors
- **Background**: `#0B0F14` (deep near-black)
- **Surface**: `#121826`
- **Primary Gold**: `#C9A227` (champagne gold)
- **Secondary Blue**: `#3B82F6` (CTA blue)
- **Text Primary**: `#F9FAFB`
- **Text Secondary**: `#9CA3AF`

### Typography
- **Headings**: Cinzel (serif)
- **Body**: Inter (sans-serif)

### Components
- Border radius: 14px
- Glass effect cards with backdrop blur
- Soft, premium shadows

## 📄 Pages

1. **Home** (`/`) - Trust-first conversion homepage with hero, social proof, featured inventory
2. **About** (`/about`) - Company story, timeline, leadership, facility
3. **Capabilities** (`/capabilities`) - Manufacturing services, process, buyer fit widget
4. **Catalog** (`/catalog`) - Full filterable diamond catalog with grid/table views
5. **Quality** (`/quality`) - Certifications, compliance, packaging standards
6. **Export** (`/export`) - Shipping, lead time calculator, wholesale programs
7. **Insights** (`/insights`) - Blog with category filtering
8. **Contact** (`/contact`) - Full RFQ form with validation
9. **Privacy** (`/privacy`) - Privacy policy
10. **Terms** (`/terms`) - Terms & conditions

## 🔧 Features

### Global
- Sticky header with scroll compression
- Floating desktop CTAs (WhatsApp + RFQ)
- Mobile bottom bar with CTAs
- Toast notification system
- Global modal system

### Modals
- **RFQ Modal**: Multi-step form with validation
- **WhatsApp Modal**: Pre-filled message templates
- **Brochure Modal**: Email capture for downloads
- **Certificate Modal**: PDF/image viewer with zoom
- **Compare Modal**: Side-by-side diamond comparison (up to 4)
- **Booking Modal**: Calendar-based call scheduling
- **Product Detail Modal**: Full specs and quick quote

### Catalog
- Shape, carat, color, clarity, cut filters
- Price and availability filters
- Grid/table view toggle
- Bulk RFQ selection
- Diamond comparison

### Forms
- Frontend validation
- Loading states
- Success/error states
- File upload support

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context API

## 📱 Responsive Design

- **Desktop**: Full multi-column layouts, sticky sidebar filters
- **Tablet**: Stacked layouts, drawer filters
- **Mobile**: Single column, bottom fixed CTA bar, full-screen modals

## ♿ Accessibility

- All interactive items keyboard navigable
- Proper ARIA labels for icons
- Form error announcements
- WCAG AA color contrast

## 📊 Mock Data

Includes sample data for:
- 24 diamond SKUs
- 8 client logos
- 6 testimonials
- 8 blog posts
- 6 certificate entries
- Company timeline & leadership

## 🔮 Production Notes

This is a frontend-only application with mock data. To deploy to production:

1. Replace mock data with actual API endpoints
2. Configure real WhatsApp number
3. Set up form submission backend
4. Add actual product images
5. Configure SEO metadata per page
6. Add analytics tracking

## 📝 License

Private - Built for B2B diamond manufacturing business.
