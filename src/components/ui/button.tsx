'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    leftIcon, 
    rightIcon, 
    isLoading, 
    fullWidth,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium tracking-wide
      transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `;

    const variants = {
      primary: `
        bg-[var(--navy-deep)] text-white
        hover:bg-[var(--navy-rich)]
        focus-visible:ring-[var(--navy-deep)]
      `,
      secondary: `
        bg-[var(--background-cream)] text-[var(--text-primary)]
        hover:bg-[var(--background-warm)]
        border border-[var(--border)]
        focus-visible:ring-[var(--border)]
      `,
      outline: `
        bg-transparent text-[var(--text-primary)]
        border border-[var(--text-primary)]
        hover:bg-[var(--text-primary)] hover:text-white
        focus-visible:ring-[var(--text-primary)]
      `,
      ghost: `
        bg-transparent text-[var(--text-secondary)]
        hover:bg-[var(--background-cream)] hover:text-[var(--text-primary)]
        focus-visible:ring-[var(--border)]
      `,
      gold: `
        bg-[var(--primary-gold)] text-white
        hover:bg-[var(--primary-gold-light)]
        focus-visible:ring-[var(--primary-gold)]
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
