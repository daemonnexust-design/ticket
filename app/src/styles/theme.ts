// Ticketmaster Clone - Design System Theme
// Based on Phase 1 forensic analysis

export const theme = {
    colors: {
        // Primary Blue
        blue: '#026cdf',
        blueDark: '#0052b0',
        blueLight: '#e6f0ff',

        // Backgrounds
        headerBg: '#026cdf',
        headerTopBg: '#121212',
        footerBg: '#121212',
        bodyBg: '#f5f5f5',
        cardBg: '#ffffff',

        // Text
        textPrimary: '#1f262d',
        textSecondary: '#6b7280',
        textInverse: '#ffffff',
        textLink: '#026cdf',

        // Borders
        border: '#e5e7eb',
        borderHover: '#026cdf',

        // Status
        presale: '#9333ea',
        cancelled: '#dc2626',
        onsale: '#16a34a',
    },

    typography: {
        fontFamily: "Averta, 'Avenir Next', 'Helvetica Neue', Arial, sans-serif",

        sizes: {
            h1: '2rem',      // 32px
            h2: '1.5rem',    // 24px
            h3: '1.25rem',   // 20px
            body: '1rem',    // 16px
            small: '0.875rem', // 14px
            caption: '0.75rem', // 12px
        },

        weights: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },

        lineHeight: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.75,
        },
    },

    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },

    breakpoints: {
        mobile: '375px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1200px', // Re-adjust desktop? Or just alias
        wide: '1280px',
    },

    shadows: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        cardHover: '0 4px 16px rgba(0, 0, 0, 0.12)',
        dropdown: '0 4px 12px rgba(0, 0, 0, 0.15)',
        header: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },

    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
    },

    transitions: {
        fast: '150ms ease-in-out',
        normal: '200ms ease-in-out',
        slow: '400ms ease-in-out',
    },

    zIndex: {
        dropdown: 100,
        sticky: 200,
        modal: 300,
        toast: 400,
    },
} as const;

export type Theme = typeof theme;
