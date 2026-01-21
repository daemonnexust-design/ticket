import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = await createClient();

    // Full-text search on events
    const { data: events, error } = await supabase
        .from('events')
        .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('featured', { ascending: false })
        .order('event_date', { ascending: true })
        .limit(limit);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
        events,
        total: events?.length || 0,
        query,
    });
}
