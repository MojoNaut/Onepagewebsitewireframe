import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            // Base styles
            'w-full px-4 py-3',
            'text-base text-foreground',
            'bg-background',
            'border border-border',
            'rounded-md', // 8px subtle corners
            'transition-all duration-200',
            
            // Placeholder
            'placeholder:text-mutedForeground',
            
            // Focus state
            'focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-0 focus:border-transparent',
            
            // Hover state
            'hover:border-foreground/50',
            
            // Disabled state
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted',
            
            // Error state
            error && 'border-error focus:ring-error',
            
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-errorForeground"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-mutedForeground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };