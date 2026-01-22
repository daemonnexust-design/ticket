'use client';

import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons';

const CarouselWrapper = styled.div`
  position: relative;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 8px 0;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position}: -20px;
  z-index: 10;
  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.blue};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.cardBg};
      color: ${({ theme }) => theme.colors.textPrimary};
      border-color: ${({ theme }) => theme.colors.border};
    }
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

interface HorizontalScrollProps {
  children: React.ReactNode;
  scrollAmount?: number;
}

export function HorizontalScroll({
  children,
  scrollAmount = 300
}: HorizontalScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const amount = direction === 'left' ? -scrollAmount : scrollAmount;
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <CarouselWrapper>
      <NavButton
        $position="left"
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
      >
        <ChevronLeftIcon />
      </NavButton>

      <CarouselTrack ref={trackRef} onScroll={checkScroll}>
        {children}
      </CarouselTrack>

      <NavButton
        $position="right"
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Scroll right"
      >
        <ChevronRightIcon />
      </NavButton>
    </CarouselWrapper>
  );
}

// Hero Carousel for homepage
const HeroCarouselWrapper = styled.div`
  position: relative;
  aspect-ratio: 21 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 9;
  }
`;

const HeroSlide = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 48px;
  left: 48px;
  max-width: 500px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 24px;
    left: 24px;
    right: 24px;
    max-width: none;
  }
`;

const HeroCategory = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textInverse};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const HeroTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textInverse};
  margin-bottom: 16px;
  text-decoration: underline;
  text-underline-offset: 6px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const HeroCTA = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueDark};
    color: ${({ theme }) => theme.colors.textInverse};
  }
`;

const HeroNav = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 8px;
`;

const HeroDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.textInverse : 'rgba(255, 255, 255, 0.5)'};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.textInverse};
  }
`;

interface HeroSlideData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  ctaText?: string;
}

interface HeroCarouselProps {
  slides: HeroSlideData[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <HeroCarouselWrapper>
      {slides.map((slide, index) => (
        <HeroSlide key={slide.id} $active={index === activeIndex}>
          <HeroImage src={slide.imageUrl} alt={slide.title} />
          <HeroOverlay />
          <HeroContent>
            <HeroCategory>{slide.category}</HeroCategory>
            <HeroTitle>{slide.title}</HeroTitle>
            <HeroCTA href={slide.href}>
              {slide.ctaText || 'Find Tickets'}
            </HeroCTA>
          </HeroContent>
        </HeroSlide>
      ))}
      <HeroNav>
        {slides.map((_, index) => (
          <HeroDot
            key={index}
            $active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </HeroNav>
    </HeroCarouselWrapper>
  );
}
