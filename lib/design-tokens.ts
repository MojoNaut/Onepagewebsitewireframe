/**
 * LIVOTI STUDIO - DESIGN TOKENS
 * Centralized design system values
 * Reference: HJM Studio aesthetic - minimal, premium, warm off-white
 */

export const designTokens = {
  // ========================================
  // COLOR PALETTE
  // ========================================
  colors: {
    // Base colors
    background: '#F5F1E8',       // Warm off-white
    foreground: '#1a1a1a',       // Near-black (not pure black)
    
    // Muted colors
    muted: '#E8E4DC',            // Slightly darker than background
    mutedForeground: '#666666',  // Mid-gray for secondary text
    
    // Border colors
    border: '#D4CFC4',           // Hairline divider color (1px)
    borderSubtle: '#E8E4DC',     // Even more subtle border
    
    // Accent color (muted lavender for CTAs)
    accent: '#C4B5FD',           // Muted lavender
    accentHover: '#A78BFA',      // Slightly darker on hover
    accentForeground: '#1a1a1a', // Text on accent background
    
    // Alternative accent (neutral)
    accentNeutral: '#1a1a1a',
    accentNeutralHover: '#333333',
    
    // Status colors (subtle, not bright)
    success: '#86EFAC',
    successForeground: '#166534',
    error: '#FCA5A5',
    errorForeground: '#991B1B',
    warning: '#FCD34D',
    warningForeground: '#92400E',
    
    // Overlay
    overlay: 'rgba(26, 26, 26, 0.4)',
  },

  // ========================================
  // TYPOGRAPHY
  // ========================================
  typography: {
    // Font families
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    
    // Font sizes (mobile first, then desktop)
    fontSize: {
      // Body text
      xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],       // 16px (desktop body)
      lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
      
      // Headings
      xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      '5xl': ['3rem', { lineHeight: '1' }],           // 48px (mobile hero)
      '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
      '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px (desktop hero)
      '8xl': ['6rem', { lineHeight: '1' }],           // 96px (large wordmark)
    },
    
    // Font weights
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    // Letter spacing (for uppercase labels)
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
      wider: '0.05em',
      widest: '0.3em',  // For uppercase small labels
    },
    
    // Line height
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  // ========================================
  // SPACING (8pt grid system)
  // ========================================
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },

  // ========================================
  // BORDER RADIUS
  // ========================================
  borderRadius: {
    none: '0',
    sm: '0.375rem',   // 6px - subtle corners
    base: '0.5rem',   // 8px - default
    md: '0.625rem',   // 10px - cards
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',   // Pills/badges
  },

  // ========================================
  // SHADOWS (minimal, subtle)
  // ========================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(26, 26, 26, 0.05)',
    base: '0 1px 3px 0 rgba(26, 26, 26, 0.1), 0 1px 2px -1px rgba(26, 26, 26, 0.1)',
    md: '0 4px 6px -1px rgba(26, 26, 26, 0.1), 0 2px 4px -2px rgba(26, 26, 26, 0.1)',
    lg: '0 10px 15px -3px rgba(26, 26, 26, 0.1), 0 4px 6px -4px rgba(26, 26, 26, 0.1)',
    xl: '0 20px 25px -5px rgba(26, 26, 26, 0.1), 0 8px 10px -6px rgba(26, 26, 26, 0.1)',
  },

  // ========================================
  // TRANSITIONS
  // ========================================
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    timing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // ========================================
  // BREAKPOINTS
  // ========================================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ========================================
  // LAYOUT
  // ========================================
  layout: {
    maxWidth: {
      content: '1120px',  // Max content width (matching HJM)
      text: '65ch',       // Max text line length for readability
    },
    container: {
      padding: {
        mobile: '1.5rem',   // 24px
        desktop: '3rem',    // 48px
      },
    },
  },

  // ========================================
  // Z-INDEX SCALE
  // ========================================
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
  },
} as const;

// Type export for TypeScript autocomplete
export type DesignTokens = typeof designTokens;