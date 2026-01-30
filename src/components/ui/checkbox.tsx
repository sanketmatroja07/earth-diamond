'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', checked, ...props }, ref) => {
    return (
      <label className={`inline-flex items-center gap-3 cursor-pointer group ${className}`}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          <div className={`
            w-5 h-5 border rounded transition-all duration-200
            flex items-center justify-center
            ${checked 
              ? 'bg-[var(--primary-gold)] border-[var(--primary-gold)]' 
              : 'bg-transparent border-[var(--border)] group-hover:border-[var(--text-muted)]'
            }
          `}>
            {checked && <Check size={14} className="text-[var(--background)]" strokeWidth={3} />}
          </div>
        </div>
        {label && (
          <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
