import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card = ({ children, className, animate = true, ...props }: CardProps) => {
  const Component = animate ? motion.div : 'div';
  
  return (
    // @ts-ignore - conflict between motion.div and div props in simple component
    <Component
      initial={animate ? { opacity: 0, y: 15 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      whileHover={animate ? { translateY: -4 } : undefined}
      className={cn(
        'glass-card rounded-2xl p-7 transition-all duration-500',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mb-4', className)}>{children}</div>
);

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);
