import { create } from 'zustand'
import {getInventory} from "@/lib/supabase";
import {InventoryItem} from "@/types/inventory";

export const useInventory = create<InventoryState>((set) => ({
  inv: null as InventoryItem[] | null,
  loadInv: async () => { set({
    inv:
      (await getInventory())
        .sort((a: InventoryItem, b: InventoryItem)=> a.name.localeCompare(b.name))
        .sort((a: InventoryItem, b: InventoryItem) => a.sort_order - b.sort_order)
  })}
}))

interface InventoryState {
  inv: InventoryItem[] | null;
  loadInv: () => Promise<void>
}
