'use client';

import styled from 'styled-components';
import { CalendarIcon } from '@/components/ui/icons';
import { useState } from 'react';

const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  min-width: 320px;
  z-index: 1000;
`;

const PresetButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ $active }) => ($active ? '#026cdf' : '#e5e7eb')};
  border-radius: 6px;
  background: ${({ $active }) => ($active ? '#e6f0ff' : 'white')};
  color: ${({ $active }) => ($active ? '#026cdf' : '#1f262d')};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.2s;
  
  &:hover {
    border-color: #026cdf;
    background: #f5f9ff;
  }
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #026cdf;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

interface CalendarDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (preset: string) => void;
    selectedPreset?: string;
}

const presets = [
    { label: 'This Weekend', value: 'weekend' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'All Dates', value: 'all' },
];

export function CalendarDropdown({ isOpen, onClose, onSelect, selectedPreset }: CalendarDropdownProps) {
    if (!isOpen) return null;

    return (
        <DropdownContainer>
            <Label>Select Dates</Label>
            <PresetGrid>
                {presets.map((preset) => (
                    <PresetButton
                        key={preset.value}
                        $active={selectedPreset === preset.value}
                        onClick={() => {
                            onSelect(preset.value);
                            onClose();
                        }}
                    >
                        {preset.label}
                    </PresetButton>
                ))}
            </PresetGrid>
        </DropdownContainer>
    );
}
