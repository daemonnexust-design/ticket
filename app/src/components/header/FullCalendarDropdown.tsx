'use client';

import styled from 'styled-components';
import { Flex } from '@/components/ui/primitives';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons';

const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0; 
  transform: translateX(-25%); 
  margin-top: 8px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  width: 650px; // Default Double Width
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
  z-index: 1000;
  border: 1px solid #e5e7eb;
  padding: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 90vw; // Responsive width
    left: 50%;
    transform: translateX(-50%); // Center exactly
    padding: 16px;
    height: 80vh; // Constrain height on small screens
    overflow-y: auto; // Allow scroll if calendars stack
  }
`;

// ... inputs ...

const CalendarRow = styled.div`
  display: flex;
  gap: 32px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column; // Stack vertically
    gap: 24px;
  }
`;

const SingleCalendar = styled.div`
  flex: 1;
  min-width: 280px; // Ensure readable width
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 700;
  color: #1f262d;
`;

const WeekDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayCell = styled.button<{ $isSelected?: boolean; $isRange?: boolean; $isDisabled?: boolean }>`
  height: 40px; // Increased for touch
  width: 100%; // Fill grid cell
  background: ${({ $isSelected, $isRange }) => $isSelected ? '#026cdf' : $isRange ? '#eff6ff' : 'transparent'};
  color: ${({ $isSelected, $isDisabled }) => $isSelected ? 'white' : $isDisabled ? '#ccc' : '#1f262d'};
  border: none;
  font-size: 14px; // Larger text
  cursor: ${({ $isDisabled }) => $isDisabled ? 'default' : 'pointer'};
  border-radius: ${({ $isSelected }) => $isSelected ? '50%' : '0'};
  touch-action: manipulation; // Better touch handling
  
  &:hover {
    background: ${({ $isSelected, $isDisabled }) => !$isSelected && !$isDisabled ? '#f3f4f6' : undefined};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

const TextBtn = styled.button`
  background: none;
  border: none;
  color: #026cdf;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
`;

const PrimaryBtn = styled.button`
  background: #026cdf;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #004494;
  }
`;

const SecondaryBtn = styled(PrimaryBtn)`
  background: white;
  color: #026cdf;
  border: 1px solid #026cdf;
  margin-right: 8px;
  
  &:hover {
    background: #eff6ff;
  }
`;

interface FullCalendarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (range: string) => void;
}

export function FullCalendarDropdown({ isOpen, onClose, onSelect }: FullCalendarDropdownProps) {
  // Mock Calendar Data
  const daysJan = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffsetJan = 4; // Thursday

  const daysFeb = Array.from({ length: 28 }, (_, i) => i + 1);
  const startOffsetFeb = 0; // Sunday

  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);

  const handleDayClick = (day: number) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      setEndDate(day);
    }
  };

  const getLabel = () => {
    if (startDate && endDate) return `${startDate}/01/2026 - ${endDate}/01/2026`;
    if (startDate) return `${startDate}/01/2026`;
    return 'MM/DD/YYYY';
  }

  return (
    <DropdownContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
      <DateInputRow>
        <DateInputGroup>
          <Label>Start Date</Label>
          <StyledInput>{startDate ? `${startDate}/01/2026` : 'MM/DD/YYYY'}</StyledInput>
        </DateInputGroup>
        <DateInputGroup>
          <Label>End Date</Label>
          <StyledInput>{endDate ? `${endDate}/01/2026` : 'MM/DD/YYYY'}</StyledInput>
        </DateInputGroup>
      </DateInputRow>

      <CalendarRow>
        {/* Month 1 */}
        <SingleCalendar>
          <MonthHeader>
            <ChevronLeftIcon /> {/* Placeholder */}
            <span>Jan 2026</span>
            <span />
          </MonthHeader>
          <WeekDaysGrid>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}
          </WeekDaysGrid>
          <DaysGrid>
            {Array.from({ length: startOffsetJan }).map((_, i) => <div key={`empty-${i}`} />)}
            {daysJan.map(d => (
              <DayCell
                key={d}
                onClick={() => handleDayClick(d)}
                $isSelected={d === startDate || d === endDate}
                $isRange={startDate && endDate && d > startDate && d < endDate ? true : false}
              >
                {d}
              </DayCell>
            ))}
          </DaysGrid>
        </SingleCalendar>

        {/* Month 2 */}
        <SingleCalendar>
          <MonthHeader>
            <span />
            <span>Feb 2026</span>
            <ChevronRightIcon /> {/* Placeholder */}
          </MonthHeader>
          <WeekDaysGrid>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}
          </WeekDaysGrid>
          <DaysGrid>
            {Array.from({ length: startOffsetFeb }).map((_, i) => <div key={`empty-${i}`} />)}
            {daysFeb.map(d => (
              <DayCell key={d}>{d}</DayCell>
            ))}
          </DaysGrid>
        </SingleCalendar>
      </CalendarRow>

      <Footer>
        <TextBtn onClick={() => { setStartDate(null); setEndDate(null); }}>Reset</TextBtn>
        <div>
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
          <PrimaryBtn onClick={() => { onSelect(getLabel()); onClose(); }}>Apply</PrimaryBtn>
        </div>
      </Footer>
    </DropdownContainer>
  );
}
