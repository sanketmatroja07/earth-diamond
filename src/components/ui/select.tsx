'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full bg-[var(--surface)] border rounded-[var(--radius-sm)] 
              px-4 py-3 text-[var(--text-primary)] appearance-none cursor-pointer
              transition-all duration-200
              focus:outline-none focus:border-[var(--primary-gold)] 
              focus:ring-2 focus:ring-[var(--primary-gold)]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-[var(--error)]' : 'border-[var(--border)]'}
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" className="text-[var(--text-muted)]">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" 
            size={20} 
          />
        </div>
        {(error || helperText) && (
          <p className={`mt-2 text-sm ${error ? 'text-[var(--error)]' : 'text-[var(--text-muted)]'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
