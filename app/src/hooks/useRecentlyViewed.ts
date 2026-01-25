'use client';

import { useState, useEffect } from 'react';

export interface RecentlyViewedItem {
    id: string;
    slug: string;
    title: string;
    imageUrl: string;
    category: string;
    timestamp: number;
}

const STORAGE_KEY = 'tm_recently_viewed';
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
    const [items, setItems] = useState<RecentlyViewedItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load recently viewed items', e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    const addItem = (item: Omit<RecentlyViewedItem, 'timestamp'>) => {
        try {
            const newItem = { ...item, timestamp: Date.now() };

            setItems(prev => {
                // Remove duplicate if exists
                const filtered = prev.filter(i => i.id !== item.id);
                // Add new item to front
                const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);

                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                return updated;
            });
        } catch (e) {
            console.error('Failed to save recently viewed item', e);
        }
    };

    const clearItems = () => {
        localStorage.removeItem(STORAGE_KEY);
        setItems([]);
    };

    return { items, addItem, clearItems, isLoaded };
}
