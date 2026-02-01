import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper Tailwind class precedence
 * 
 * @example
 * cn('px-4 py-2', 'bg-blue-500', condition && 'text-white')
 * cn('px-4', { 'py-2': true, 'bg-red-500': isError })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}