'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'error' | 'info' | 'dark';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium tracking-wide';
    
    const variants = {
      default: 'bg-[var(--background-cream)] text-[var(--text-secondary)]',
      gold: 'bg-[var(--accent-champagne)] text-[var(--primary-gold-dark)]',
      success: 'bg-[var(--success-light)] text-[var(--success)]',
      warning: 'bg-[var(--warning-light)] text-[var(--warning)]',
      error: 'bg-[var(--error-light)] text-[var(--error)]',
      info: 'bg-[var(--info-light)] text-[var(--info)]',
      dark: 'bg-[var(--navy-deep)] text-white',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-3 py-1 text-xs',
    };

    return (
      <span
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
