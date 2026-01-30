'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            className={`
              w-full bg-white border rounded-[var(--radius)] 
              py-3.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
              transition-all duration-200
              focus:outline-none focus:border-[var(--primary-gold)] 
              focus:ring-2 focus:ring-[var(--primary-gold)]/10
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--surface-elevated)]
              ${leftIcon ? 'pl-12' : 'px-4'}
              ${rightIcon || isPassword ? 'pr-12' : 'px-4'}
              ${error ? 'border-[var(--error)]' : 'border-[var(--border)]'}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              {rightIcon}
            </span>
          )}
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

Input.displayName = 'Input';
