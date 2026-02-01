import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, options, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              // Base styles
              'w-full px-4 py-3 pr-10',
              'text-base text-foreground',
              'bg-background',
              'border border-border',
              'rounded-md', // 8px subtle corners
              'transition-all duration-200',
              'appearance-none', // Remove default arrow
              
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
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom arrow icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-mutedForeground" strokeWidth={1.5} />
          </div>
        </div>
        
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-2 text-sm text-errorForeground"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={`${selectId}-helper`}
            className="mt-2 text-sm text-mutedForeground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };