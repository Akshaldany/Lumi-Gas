import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-4 pointer-events-none">
            {icon}
          </div>}
          <input
            ref={ref}
            className={cn(
              'w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6A00]/50 focus:bg-white/[0.05] transition-all duration-300',
              icon && 'pl-12',
              error && 'border-rose-500/50 focus:border-rose-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-400 ml-1">{error}</p>}
      </div>
    );
  }
);
