import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] text-white hover:brightness-110 shadow-[0_4px_16px_rgba(255,106,0,0.25)] border-none',
      secondary: 'bg-white/[0.05] text-white hover:bg-white/[0.1] backdrop-blur-md border border-white/10',
      ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
      outline: 'bg-transparent border border-white/10 text-white hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg font-semibold',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ translateY: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-[18px] transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
