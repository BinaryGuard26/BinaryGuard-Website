import { createClient } from '@supabase/supabase-js';

interface ApiRequest {
  method?: string;
  body?: Record<string, unknown>;
}

interface ApiResponse {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseAdmin() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase API environment variables. Set NEXT_PUBLIC_SUPABASE_URL or VITE_SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

function cleanString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  try {
    const supabase = getSupabaseAdmin();

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('client_reviews')
        .select('id, name, company, role, rating, message, created_at')
        .eq('approved', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data ?? []);
    }

    if (req.method === 'POST') {
      const name = cleanString(req.body?.name);
      const message = cleanString(req.body?.message);
      const consent = Boolean(req.body?.consent);
      const rating = Number(req.body?.rating) || 5;

      if (!name) return res.status(400).json({ error: 'Name is required.' });
      if (!message) return res.status(400).json({ error: 'Feedback message is required.' });
      if (!consent) return res.status(400).json({ error: 'Consent is required.' });

      const { error } = await supabase.from('client_reviews').insert([
        {
          name,
          company: cleanString(req.body?.company),
          role: cleanString(req.body?.role),
          email: cleanString(req.body?.email),
          rating: Math.max(1, Math.min(5, rating)),
          message,
          consent,
          approved: false,
          featured: false,
        },
      ]);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error.';
    return res.status(500).json({ error: message });
  }
}