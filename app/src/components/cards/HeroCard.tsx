'use client';

import styled from 'styled-components';
import Link from 'next/link';

const CardWrapper = styled(Link)`
  display: block;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 16 / 9;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
`;

const Category = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textInverse};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.h2};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textInverse};
  margin-bottom: 12px;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const CTAButton = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

interface HeroCardProps {
    title: string;
    category: string;
    imageUrl: string;
    href: string;
    ctaText?: string;
}

export function HeroCard({
    title,
    category,
    imageUrl,
    href,
    ctaText = 'Find Tickets',
}: HeroCardProps) {
    return (
        <CardWrapper href={href}>
            <Image src={imageUrl} alt={title} />
            <Overlay />
            <Content>
                <Category>{category}</Category>
                <Title>{title}</Title>
                <CTAButton>{ctaText}</CTAButton>
            </Content>
        </CardWrapper>
    );
}

// City card for "Popular Cities" section
const CityCardWrapper = styled(Link)`
  display: block;
  position: relative;
  flex-shrink: 0;
  width: 160px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 3 / 4;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};
`;

const CityName = styled.h4`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textInverse};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

interface CityCardProps {
    name: string;
    imageUrl: string;
    href: string;
}

export function CityCard({ name, imageUrl, href }: CityCardProps) {
    return (
        <CityCardWrapper href={href}>
            <CityImage src={imageUrl} alt={name} />
            <Overlay />
            <CityName>{name}</CityName>
        </CityCardWrapper>
    );
}
