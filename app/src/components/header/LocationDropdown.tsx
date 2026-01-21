'use client';

import styled from 'styled-components';
import { LocationIcon, GlobeIcon } from '@/components/ui/icons';
import { useState } from 'react';

const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 300px;
  z-index: 1000;
`;

const UseLocationButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #026cdf;
  border-radius: 6px;
  background: white;
  color: #026cdf;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s;
  
  &:hover {
    background: #e6f0ff;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
  position: relative;
  
  &::after {
    content: 'OR';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 0 12px;
    font-size: 11px;
    color: #6b7280;
    font-weight: 600;
  }
`;

const CityList = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const CityButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: none;
  color: #1f262d;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #026cdf;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

interface LocationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (location: string) => void;
}

const popularCities = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA',
    'Dallas, TX',
    'San Jose, CA',
];

export function LocationDropdown({ isOpen, onClose, onSelect }: LocationDropdownProps) {
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    if (!isOpen) return null;

    const handleUseMyLocation = () => {
        setIsGettingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, you'd reverse geocode the coordinates
                    onSelect('Current Location');
                    setIsGettingLocation(false);
                    onClose();
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setIsGettingLocation(false);
                }
            );
        }
    };

    return (
        <DropdownContainer>
            <UseLocationButton onClick={handleUseMyLocation} disabled={isGettingLocation}>
                <GlobeIcon />
                {isGettingLocation ? 'Getting location...' : 'Use my location'}
            </UseLocationButton>

            <Divider />

            <Label>Popular Cities</Label>
            <CityList>
                {popularCities.map((city) => (
                    <CityButton
                        key={city}
                        onClick={() => {
                            onSelect(city);
                            onClose();
                        }}
                    >
                        {city}
                    </CityButton>
                ))}
            </CityList>
        </DropdownContainer>
    );
}
