// lib/supabase.ts - Client-side Supabase utilities

import { InventoryItem } from '@/types/inventory';

const API_ROUTE = '/supabase';

function checkResponse(response: Response) {
  if (response.status >= 400) {
    throw Error(response.statusText);
  }
}

/**
 * Retrieve the data from the database as an {@linkcode InventoryItem}[]
 */
export async function getInventory(): Promise<InventoryItem[]> {
  const response = await fetch(API_ROUTE);
  checkResponse(response);

  const { data } = await response.json();
  return data as InventoryItem[];
}

/**
 * Insert an {@linkcode InventoryItem} into the database. Can
 * be used for updating a row as well, as it does UPSERT.
 *
 * @param item
 */
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

/**
 * Upload image to Supabase Storage
 *
 * NOTE: Image upload is simplified for Phase 1
 * For now, we'll just store the local URI
 * In Phase 2, we'll implement full Supabase Storage upload via API route
 */
export async function uploadImage(uri: string, itemName: string): Promise<string> {
  // Phase 1: Just return the URI as-is
  // The image will be stored locally on the device
  console.log('Image selected:', uri);

  // Phase 2 TODO: Implement proper upload via API route
  // This would send the image to /supabase/upload endpoint
  // which would then upload to Supabase Storage bucket


  try {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: `${Date.now()}_${itemName.replace(/\s+/g, '_')}.jpg`,
    } as any);

    const response = await fetch('/supabase/upload', {
      method: 'POST',
      body: formData,
    });

    checkResponse(response);
    const { publicUrl } = await response.json();
    return publicUrl;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
}