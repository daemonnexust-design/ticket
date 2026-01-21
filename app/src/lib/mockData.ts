// Mock data for development and testing
// Based on Ticketmaster's observed data structures

export const heroSlides = [
    {
        id: '1',
        title: 'Les Miserables (Touring)',
        category: 'Theatre',
        imageUrl: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1200&h=500&fit=crop',
        href: '/les-miserables-touring/event/1',
        ctaText: 'Find Tickets',
    },
    {
        id: '2',
        title: 'Disney Presents The Lion King',
        category: 'Theatre',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=500&fit=crop',
        href: '/lion-king-touring/event/2',
        ctaText: 'Find Tickets',
    },
    {
        id: '3',
        title: 'Jeff Dunham',
        category: 'Comedy',
        imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1200&h=500&fit=crop',
        href: '/jeff-dunham/event/3',
        ctaText: 'Find Tickets',
    },
];

export const trendingSearches = [
    'Taylor Swift',
    'Bad Bunny',
    'Beyoncé',
    'NBA',
    'Hamilton',
    'Morgan Wallen',
    'Peso Pluma',
    'NFL',
];

export const popularEvents = {
    concerts: [
        {
            id: 'c1',
            slug: 'taylor-swift-eras-tour',
            title: 'Taylor Swift | The Eras Tour',
            venue: 'SoFi Stadium',
            city: 'Los Angeles, CA',
            date: '2026-03-15',
            time: '7:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
            status: 'presale' as const,
        },
        {
            id: 'c2',
            slug: 'bad-bunny-world-tour',
            title: 'Bad Bunny: Most Wanted Tour',
            venue: 'Madison Square Garden',
            city: 'New York, NY',
            date: '2026-04-20',
            time: '8:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=225&fit=crop',
            status: 'onsale' as const,
        },
        {
            id: 'c3',
            slug: 'morgan-wallen-live',
            title: 'Morgan Wallen: One Night At A Time',
            venue: 'AT&T Stadium',
            city: 'Arlington, TX',
            date: '2026-05-10',
            time: '7:30 PM',
            imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=225&fit=crop',
        },
        {
            id: 'c4',
            slug: 'beyonce-renaissance',
            title: 'Beyoncé: Renaissance World Tour',
            venue: 'MetLife Stadium',
            city: 'East Rutherford, NJ',
            date: '2026-06-01',
            time: '8:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=225&fit=crop',
            status: 'presale' as const,
        },
    ],
    sports: [
        {
            id: 's1',
            slug: 'lakers-vs-celtics',
            title: 'Los Angeles Lakers vs Boston Celtics',
            venue: 'Crypto.com Arena',
            city: 'Los Angeles, CA',
            date: '2026-02-28',
            time: '7:30 PM',
            imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=225&fit=crop',
        },
        {
            id: 's2',
            slug: 'super-bowl-lxi',
            title: 'Super Bowl LXI',
            venue: 'State Farm Stadium',
            city: 'Glendale, AZ',
            date: '2026-02-08',
            time: '3:30 PM',
            imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=225&fit=crop',
            status: 'presale' as const,
        },
        {
            id: 's3',
            slug: 'world-series-game-7',
            title: 'World Series Game 7',
            venue: 'Yankee Stadium',
            city: 'Bronx, NY',
            date: '2026-10-30',
            time: '8:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1566577134665-2b568e35b991?w=400&h=225&fit=crop',
        },
    ],
    arts: [
        {
            id: 'a1',
            slug: 'hamilton-the-musical',
            title: 'Hamilton',
            venue: 'Richard Rodgers Theatre',
            city: 'New York, NY',
            date: '2026-03-01',
            time: '8:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=225&fit=crop',
        },
        {
            id: 'a2',
            slug: 'wicked-the-musical',
            title: 'Wicked',
            venue: 'Gershwin Theatre',
            city: 'New York, NY',
            date: '2026-03-05',
            time: '7:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=225&fit=crop',
        },
    ],
    family: [
        {
            id: 'f1',
            slug: 'disney-on-ice',
            title: 'Disney On Ice presents Frozen & Encanto',
            venue: 'Staples Center',
            city: 'Los Angeles, CA',
            date: '2026-04-15',
            time: '3:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
        },
        {
            id: 'f2',
            slug: 'harlem-globetrotters',
            title: 'Harlem Globetrotters 100 Year Tour',
            venue: 'United Center',
            city: 'Chicago, IL',
            date: '2026-03-20',
            time: '2:00 PM',
            imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=225&fit=crop',
        },
    ],
};

export const popularCities = [
    {
        name: 'New York City',
        imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=267&fit=crop',
        href: '/cities/new-york',
    },
    {
        name: 'Los Angeles',
        imageUrl: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=200&h=267&fit=crop',
        href: '/cities/los-angeles',
    },
    {
        name: 'Las Vegas',
        imageUrl: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=200&h=267&fit=crop',
        href: '/cities/las-vegas',
    },
    {
        name: 'Chicago',
        imageUrl: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=267&fit=crop',
        href: '/cities/chicago',
    },
    {
        name: 'Atlanta',
        imageUrl: 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=200&h=267&fit=crop',
        href: '/cities/atlanta',
    },
    {
        name: 'Miami',
        imageUrl: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=200&h=267&fit=crop',
        href: '/cities/miami',
    },
];

export const categories = [
    { label: 'Concerts', slug: 'concerts' },
    { label: 'Sports', slug: 'sports' },
    { label: 'Arts, Theater & Comedy', slug: 'arts-theater-comedy' },
    { label: 'Family', slug: 'family' },
];
