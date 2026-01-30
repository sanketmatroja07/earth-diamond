'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2,
  BookOpen,
  ArrowRight,
  Download
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { blogPosts } from '@/data/mock-data';

export default function BlogPostPage() {
  const params = useParams();
  const { openModal, showToast } = useAppStore();
  const slug = params.slug as string;
  
  const post = blogPosts.find(p => p.slug === slug);
  const relatedPosts = blogPosts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Article not found</h1>
          <Link href="/insights">
            <Button variant="outline">Back to Insights</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard', 'success');
  };

  // Mock table of contents
  const tableOfContents = [
    'Introduction',
    'Key Considerations',
    'Best Practices',
    'Industry Standards',
    'Conclusion',
  ];

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="bg-[var(--surface)] border-b border-[var(--border)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary-gold)] mb-6"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="gold" className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-[var(--primary-gold)] transition-colors"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="block text-sm text-[var(--text-muted)] hover:text-[var(--primary-gold)] transition-colors py-1"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Featured Image Placeholder */}
              <div className="aspect-video bg-[var(--surface)] rounded-[var(--radius)] mb-8 flex items-center justify-center">
                <BookOpen className="text-[var(--text-muted)]" size={64} />
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                <div id="section-0" className="mb-8">
                  <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                    Introduction
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-4">
                    Understanding the intricacies of diamond procurement is essential for B2B buyers looking to 
                    establish reliable supply chains. This guide covers the key considerations and best practices 
                    for sourcing diamonds from manufacturers.
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    Whether you&apos;re a jeweler, wholesaler, or retail chain, these insights will help you make 
                    informed decisions and build lasting partnerships with suppliers.
                  </p>
                </div>

                {/* CTA Block */}
                <Card className="p-6 mb-8 bg-gradient-to-r from-[var(--primary-gold)]/10 to-transparent border-[var(--primary-gold)]/30">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                    Looking for a reliable diamond supplier?
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Get a quote tailored to your specific requirements.
                  </p>
                  <Button size="sm" onClick={() => openModal('rfq')}>
                    Request Quote
                  </Button>
                </Card>

                <div id="section-1" className="mb-8">
                  <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                    Key Considerations
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-4">
                    When evaluating potential diamond suppliers, several factors come into play. Quality consistency, 
                    certification standards, and delivery reliability are among the most critical considerations.
                  </p>
                  <ul className="space-y-2 mb-4">
                    {['Quality Consistency', 'Certification Standards', 'Delivery Reliability', 'Pricing Transparency', 'Communication'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[var(--text-secondary)]">
                        <span className="text-[var(--primary-gold)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="section-2" className="mb-8">
                  <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                    Best Practices
                  </h2>
                  <p className="text-[var(--text-secondary)]">
                    Establishing clear communication channels and setting expectations upfront helps build 
                    successful supplier relationships. Regular quality audits and performance reviews ensure 
                    standards are maintained over time.
                  </p>
                </div>

                {/* Brochure CTA */}
                <Card className="p-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--primary-gold)]/10 rounded-[var(--radius-sm)] flex items-center justify-center">
                      <Download className="text-[var(--primary-gold)]" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[var(--text-primary)]">Download Our Buyer&apos;s Guide</h4>
                      <p className="text-sm text-[var(--text-muted)]">Comprehensive guide for B2B diamond procurement</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => openModal('brochure')}>
                      Download
                    </Button>
                  </div>
                </Card>

                <div id="section-3" className="mb-8">
                  <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                    Industry Standards
                  </h2>
                  <p className="text-[var(--text-secondary)]">
                    The diamond industry operates under strict international standards. Understanding GIA and IGI 
                    grading systems, Kimberley Process certification, and ethical sourcing guidelines is essential 
                    for compliance and quality assurance.
                  </p>
                </div>

                <div id="section-4" className="mb-8">
                  <h2 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                    Conclusion
                  </h2>
                  <p className="text-[var(--text-secondary)]">
                    Building a successful B2B diamond supply relationship requires due diligence, clear communication, 
                    and a commitment to quality standards. With the right approach, you can establish reliable 
                    partnerships that support your business growth.
                  </p>
                </div>
              </div>

              {/* Author / CTA */}
              <Card className="p-6 mt-12">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  Have questions about diamond sourcing?
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Our team is ready to help you find the right solutions for your business.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => openModal('rfq')}>Request Quote</Button>
                  <Button variant="outline" onClick={() => openModal('whatsapp')}>
                    Chat on WhatsApp
                  </Button>
                </div>
              </Card>
            </article>

            {/* Related Posts */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} href={`/insights/${related.slug}`}>
                      <Card hover className="p-4">
                        <Badge variant="default" size="sm" className="mb-2">
                          {related.category}
                        </Badge>
                        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2 line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)]">
                          {related.readTime}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <Link 
                      href="/catalog"
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary-gold)]"
                    >
                      Browse Catalog <ArrowRight size={14} />
                    </Link>
                    <Link 
                      href="/quality"
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary-gold)]"
                    >
                      View Certifications <ArrowRight size={14} />
                    </Link>
                    <Link 
                      href="/contact"
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary-gold)]"
                    >
                      Contact Us <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
