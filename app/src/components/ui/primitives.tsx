'use client';

import styled, { css } from 'styled-components';

// Button variants matching Ticketmaster
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: css`
      padding: 6px 12px;
      font-size: 0.875rem;
    `,
    md: css`
      padding: 10px 20px;
      font-size: 1rem;
    `,
    lg: css`
      padding: 14px 28px;
      font-size: 1.125rem;
    `,
  };
  return sizes[size];
};

const getVariantStyles = (variant: ButtonVariant) => {
  const variants = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.textInverse};
      border: none;
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.blueDark};
      }
      
      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    `,
    secondary: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.blue};
      border: 2px solid ${({ theme }) => theme.colors.blue};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.blueLight};
      }
    `,
    ghost: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textPrimary};
      border: 1px solid ${({ theme }) => theme.colors.border};
      
      &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.borderHover};
        color: ${({ theme }) => theme.colors.blue};
      }
    `,
    text: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textLink};
      border: none;
      padding: 4px 8px;
      
      &:hover:not(:disabled) {
        text-decoration: underline;
      }
    `,
  };
  return variants[variant];
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  white-space: nowrap;
  
  ${({ $size = 'md' }) => getSizeStyles($size)}
  ${({ $variant = 'primary' }) => getVariantStyles($variant)}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Badge component
interface BadgeProps {
  $variant?: 'presale' | 'onsale' | 'cancelled' | 'default';
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  ${({ $variant = 'default', theme }) => {
    const variants = {
      presale: css`
        background-color: ${theme.colors.presale};
        color: ${theme.colors.textInverse};
      `,
      onsale: css`
        background-color: ${theme.colors.onsale};
        color: ${theme.colors.textInverse};
      `,
      cancelled: css`
        background-color: ${theme.colors.cancelled};
        color: ${theme.colors.textInverse};
      `,
      default: css`
        background-color: ${theme.colors.border};
        color: ${theme.colors.textPrimary};
      `,
    };
    return variants[$variant];
  }}
`;

// Pill component (filter buttons)
interface PillProps {
  $active?: boolean;
}

export const Pill = styled.button<PillProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  white-space: nowrap;
  
  ${({ $active, theme }) => $active && css`
    background-color: ${theme.colors.blue};
    color: ${theme.colors.textInverse};
    border-color: ${theme.colors.blue};
  `}
  
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};
  }
`;

// Icon wrapper for consistent sizing
export const Icon = styled.span<{ $size?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size = 24 }) => $size}px;
  height: ${({ $size = 24 }) => $size}px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// Container for consistent max-width
export const Container = styled.div<{ $fluid?: boolean }>`
  width: 100%;
  max-width: ${({ $fluid }) => ($fluid ? '100%' : '1280px')};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 16px; /* Ensure 16px safe margin on mobile */
  }
`;

// Flex utilities
export const Flex = styled.div<{
  $direction?: 'row' | 'column';
  $align?: string;
  $justify?: string;
  $gap?: string;
  $wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $direction = 'row' }) => $direction};
  align-items: ${({ $align = 'stretch' }) => $align};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  gap: ${({ $gap = '0' }) => $gap};
  ${({ $wrap }) => $wrap && css`flex-wrap: wrap;`}
`;

// Grid utilities
export const Grid = styled.div<{
  $columns?: number;
  $gap?: string;
  $minWidth?: string;
}>`
  display: grid;
  gap: ${({ $gap = '16px' }) => $gap};
  
  ${({ $columns, $minWidth, theme }) => {
    if ($minWidth) {
      return css`
        grid-template-columns: repeat(auto-fill, minmax(${$minWidth}, 1fr));
        
        @media (max-width: ${theme.breakpoints.mobile}) {
            grid-template-columns: 1fr; /* Force single column on mobile */
        }
      `;
    }
    return css`
      grid-template-columns: repeat(${$columns || 1}, 1fr);
      
      @media (max-width: ${theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
      }
    `;
  }}
`;

// Visually hidden for accessibility
export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
