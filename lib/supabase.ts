import { InventoryItem } from '@/types/inventory';

const API_ROUTE = '/supabase';

function checkResponse(response: Response) {
  if (response.status >= 400) {
    throw Error(response.statusText);
  }
}

export async function getInventory(): Promise<InventoryItem[]> {
  const response = await fetch(API_ROUTE);
  checkResponse(response);
  const { data } = await response.json();
  return data as InventoryItem[];
}

export async function insertItem(item: InventoryItem, upsert: boolean = true): Promise<void> {
  const response: Response = await fetch(API_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...item,
      created_at: new Date().toISOString(),
      upsert,
    })
  });
  checkResponse(response);
}

export async function deleteItem(id: number): Promise<void> {
  const response: Response = await fetch(API_ROUTE, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  checkResponse(response);
}
