// Animation specifications from Ticketmaster forensic analysis

export const animations = {
    // Hover transitions
    hover: {
        duration: '200ms',
        easing: 'ease-in-out',
    },

    // Modal/dropdown fade in
    fadeIn: {
        duration: '150ms',
        easing: 'ease-out',
    },

    // Carousel slide
    slide: {
        duration: '400ms',
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },

    // Card elevation on hover
    cardHover: {
        transform: 'translateY(-4px)',
        duration: '200ms',
    },

    // Button press
    buttonPress: {
        transform: 'scale(0.98)',
        duration: '100ms',
    },
} as const;

// CSS keyframes for reuse
export const keyframes = {
    fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,

    slideDown: `
    @keyframes slideDown {
      from { 
        opacity: 0;
        transform: translateY(-10px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

    slideUp: `
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(10px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

    pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
};
