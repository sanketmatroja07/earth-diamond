'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full bg-[var(--surface)] border rounded-[var(--radius-sm)] 
            px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
            transition-all duration-200 min-h-[120px] resize-y
            focus:outline-none focus:border-[var(--primary-gold)] 
            focus:ring-2 focus:ring-[var(--primary-gold)]/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-[var(--error)]' : 'border-[var(--border)]'}
            ${className}
          `}
          {...props}
        />
        {(error || helperText) && (
          <p className={`mt-2 text-sm ${error ? 'text-[var(--error)]' : 'text-[var(--text-muted)]'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
