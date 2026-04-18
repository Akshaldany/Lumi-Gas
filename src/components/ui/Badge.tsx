import React from 'react';
import { cn } from '@/src/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className }: BadgeProps) => {
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]',
    warning: 'bg-[#FF6A00]/10 text-[#FF6A00] border-[#FF6A00]/20 shadow-[0_0_12px_rgba(255,106,0,0.1)]',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-[#FF8C42]/10 text-[#FF8C42] border-[#FF8C42]/20',
    neutral: 'bg-white/5 text-gray-400 border-white/10',
  };

  return (
    <span className={cn(
      'px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full border flex items-center w-fit',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
