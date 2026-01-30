'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight,
  Tag,
  BookOpen
} from 'lucide-react';
import { Button, Card, Badge, Input } from '@/components/ui';
import { blogPosts } from '@/data/mock-data';

const categories = ['All', 'Market', 'Manufacturing', 'Buying Guide'];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPosts.find(p => p.featured);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] via-white to-[#f5f0eb]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[var(--primary-gold)] font-medium mb-4">Insights & Resources</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-heading)] text-[var(--text-primary)] mb-6">
              Industry Insights & Buying Guides
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Market trends, manufacturing insights, and expert guides for B2B diamond buyers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/insights/${featuredPost.slug}`}>
              <Card hover className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto lg:min-h-[300px] overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex gap-2 mb-4">
                      <Badge variant="gold">Featured</Badge>
                      <Badge variant="default">{featuredPost.category}</Badge>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="py-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedCategory === cat
                      ? 'bg-[var(--primary-gold)] text-white'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)]'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
              <p className="text-[var(--text-secondary)]">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/insights/${post.slug}`}>
                    <Card hover className="h-full overflow-hidden group">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <Badge variant="default" size="sm" className="mb-3">
                          {post.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-28 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
            Stay Informed
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Subscribe to receive market insights and industry updates directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
