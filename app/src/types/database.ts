// Database types for Supabase
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
}

export interface Venue {
    id: string;
    name: string;
    city: string;
    state: string | null;
    country: string;
    address: string | null;
    capacity: number | null;
    seat_map_svg: string | null;
    image_url: string | null;
    created_at: string;
}

export interface Event {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    category_id: string | null;
    venue_id: string | null;
    event_date: string;
    event_time: string;
    status: 'onsale' | 'presale' | 'cancelled' | 'soldout';
    min_price: number | null;
    max_price: number | null;
    image_url: string | null;
    featured: boolean;
    created_at: string;
    // Joined relations
    category?: Category;
    venue?: Venue;
}

export interface Ticket {
    id: string;
    event_id: string;
    section: string;
    row: string;
    seat_number: string | null;
    price: number;
    type: 'regular' | 'vip' | 'premium';
    available: boolean;
    created_at: string;
}

export interface Profile {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string | null;
    event_id: string | null;
    total_amount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
    created_at: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    ticket_id: string | null;
    price: number;
    quantity: number;
}

// API Response types
export interface EventWithDetails extends Event {
    category: Category;
    venue: Venue;
    tickets?: Ticket[];
}

export interface SearchResult {
    events: EventWithDetails[];
    total: number;
}
