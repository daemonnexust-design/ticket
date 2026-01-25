'use client';

import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { mapVariants } from '@/components/seatmaps/SeatMapData';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #fbfbfb;
  position: relative;
  overflow: hidden;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: 0 0; // Essential for correct pan/zoom math
  will-change: transform;
  
  /* Shared SVG Styles */
  .block {
    fill: #dbeafe; 
    stroke: #fff;
    stroke-width: 2px;
    cursor: pointer;
    transition: fill 0.2s;
  }

  .block:hover {
    fill: #026cdf;
  }

  .is-available {
    fill: #93c5fd;
  }
  
  .is-ga {
    fill: #cbd5e1;
  }
  
  /* Text labels */
  .label {
    fill: #fff;
    font-family: sans-serif;
    pointer-events: none;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }

  /* Specifics for Map 5 seats */
  .seat {
    fill: #93c5fd;
    cursor: pointer;
    transition: all 0.2s;
  }
  .seat:hover {
    fill: #026cdf;
    r: 24; /* Zoom effect on hover */
  }
`;

interface SeatMapSVGProps {
    variant?: number;
}

export function SeatMapSVG({ variant = 2 }: SeatMapSVGProps) {
    const MapComponent = mapVariants[variant as keyof typeof mapVariants] || mapVariants[2];

    // Zoom/Pan State
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const lastPosition = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const scaleAmount = -e.deltaY * 0.001;
        const newScale = Math.min(Math.max(0.5, scale + scaleAmount), 4);

        // Simple zoom to center for now, can improve to zoom-to-cursor
        setScale(newScale);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;

        setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const zoomIn = () => setScale(s => Math.min(s * 1.2, 4));
    const zoomOut = () => setScale(s => Math.max(s / 1.2, 0.5));

    return (
        <MapContainer
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <SvgWrapper style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}>
                <MapComponent />
            </SvgWrapper>

            <MapControls>
                <ControlBtn onClick={zoomIn}>+</ControlBtn>
                <ControlBtn onClick={zoomOut}>−</ControlBtn>
            </MapControls>
        </MapContainer>
    );
}

const MapControls = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 10;
`;

const ControlBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #026cdf;
  font-size: 20px;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f3f4f6;
  }
  
  &:active {
    background: #e5e7eb;
  }
`;
