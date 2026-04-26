import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import { InventoryItem } from "../types/inventory";

export const config = {
  runtime: 'edge',
};

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { global: { fetch } }
);

export default async function handler(req: Request) {
  try {
    if (req.method === 'GET') {
      const {data} = await supabase.from('inventory').select('*');
      return Response.json({data});
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const {upsert, ...rest} = body;
      const result: PostgrestSingleResponse<InventoryItem[]> = upsert
        ? await supabase.from('inventory').upsert(rest).select()
        : await supabase.from('inventory').insert(rest).select();
      if (result.error) return Response.json({error: result.error.message}, {status: 400});
      return Response.json(result);
    }

    if (req.method === 'PUT') {
      const {id, ...updates} = await req.json();
      const {data} = await supabase.from('inventory').update(updates).eq('id', id).select();
      return Response.json({data});
    }

    if (req.method === 'DELETE') {
      const {id} = await req.json();
      const {data} = await supabase.from('inventory').delete().eq('id', id);
      return Response.json({data});
    }

    return Response.json({error: 'Method not allowed'}, {status: 405});
  } catch (e: any) {
    console.log('caught error:', e.message);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
