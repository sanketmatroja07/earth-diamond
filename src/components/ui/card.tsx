'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hover = false, padding = 'none', className = '', ...props }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-300';
    
    const variants = {
      default: 'bg-white border border-[var(--border-light)]',
      elevated: 'bg-white shadow-md',
      outline: 'bg-transparent border border-[var(--border)]',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hover ? `
      hover:shadow-lg 
      hover:border-[var(--border-gold)] 
      hover:-translate-y-1
      cursor-pointer
    ` : '';

    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${paddings[padding]}
          ${hoverStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
