import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = await createClient();

    let query = supabase
        .from('events')
        .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
        .order('event_date', { ascending: true })
        .range(offset, offset + limit - 1);

    // Apply filters
    if (category) {
        query = query.eq('category.slug', category);
    }

    if (featured === 'true') {
        query = query.eq('featured', true);
    }

    const { data: events, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(events);
}
