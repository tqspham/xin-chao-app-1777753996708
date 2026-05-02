import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface Greeting {
  id: string;
  message: string;
  language: string;
  created_at: string;
}

export async function GET(): Promise<Response> {
  try {
    const { data, error } = await supabase
      .from('xin_chao_app_1777753996708_greetings')
      .select('message')
      .eq('language', 'vi')
      .single();

    if (error) {
      return Response.json(
        { error: 'Failed to fetch greeting' },
        { status: 500 }
      );
    }

    const greeting = data as Pick<Greeting, 'message'> | null;

    if (!greeting) {
      return Response.json(
        { error: 'No greeting found' },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: greeting.message,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}