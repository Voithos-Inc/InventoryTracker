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

export async function insertItem(item: InventoryItem): Promise<void> {
  const response: Response = await fetch(API_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...item,
      updated_at: new Date().toISOString()
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

export async function uploadImage(uri: string, itemName: string): Promise<string> {
  console.log('Image selected:', uri);
  return uri;
}