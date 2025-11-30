import { InventoryItem } from '@/types/inventory'

const API_ROUTE = '/supabase'

function checkResponse(response: Response) {
  if (response.status >= 400) {
    throw Error(response.statusText)
  }
}

/**
 * Retrieve the data from the database as an {@linkcode InventoryItem}[]
 */
export async function getInventory(): Promise<InventoryItem[]> {
  const response = await fetch(API_ROUTE)
  checkResponse(response)

  const { data } = await response.json()
  return data as InventoryItem[]
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
      created_at: new Date().toISOString()
    })
  })
  checkResponse(response)
}