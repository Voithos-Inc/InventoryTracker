import {createClient, PostgrestSingleResponse} from "@supabase/supabase-js";
import {InventoryItem} from "@/types/inventory";

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseURL, supabaseServiceKey)

export async function GET() {
  const { data } = await supabase.from('inventory').select('*');
  return Response.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { upsert, ...rest } = body;

  let result: PostgrestSingleResponse<InventoryItem[]>

  if (upsert) {
    result = await supabase.from('inventory').upsert(rest).select();
  } else {
    result = await supabase.from('inventory').insert(rest).select();
  }

  if (result.error) {
    console.error(result.error);
    return Response.json({ error: result.error.message }, { status: 400 });
  }

  return Response.json(result);
}

export async function PUT(request: Request) {
  const { id, ...updates } = await request.json();
  const { data } = await supabase.from('inventory').update(updates).eq('id', id).select();
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const { data } = await supabase.from('inventory').delete().eq('id', id);
  return Response.json({ data });
}
