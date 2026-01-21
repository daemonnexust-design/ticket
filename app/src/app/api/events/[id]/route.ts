import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    // Get event with relations
    const { data: event, error: eventError } = await supabase
        .from('events')
        .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
        .eq('id', id)
        .single();

    if (eventError) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Get tickets for this event
    const { data: tickets, error: ticketsError } = await supabase
        .from('tickets')
        .select('*')
        .eq('event_id', id)
        .eq('available', true)
        .order('price', { ascending: true });

    if (ticketsError) {
        return NextResponse.json({ error: ticketsError.message }, { status: 500 });
    }

    return NextResponse.json({
        ...event,
        tickets,
    });
}
