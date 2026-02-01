import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'muted';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center',
      'px-3 py-1',
      'text-xs font-medium uppercase tracking-wider',
      'rounded-full', // Pill-shaped
      'transition-colors duration-200',
      'whitespace-nowrap',
    ];

    const variantStyles = {
      default: [
        'bg-foreground text-background',
      ],
      outline: [
        'bg-transparent text-foreground',
        'border border-border',
      ],
      muted: [
        'bg-muted text-mutedForeground',
      ],
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };