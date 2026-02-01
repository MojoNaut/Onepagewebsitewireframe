import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            // Base styles
            'w-full px-4 py-3',
            'text-base text-foreground',
            'bg-background',
            'border border-border',
            'rounded-md', // 8px subtle corners
            'transition-all duration-200',
            'resize-y', // Allow vertical resize only
            'min-h-[100px]',
            
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
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-2 text-sm text-errorForeground"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="mt-2 text-sm text-mutedForeground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };