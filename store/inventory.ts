import { create } from 'zustand'
import {getInventory} from "@/lib/supabase";
import {InventoryItem} from "@/types/inventory";

export const useInventory = create<InventoryState>((set) => ({
  inv: null as InventoryItem[] | null,
  loadInv: async () => { set({inv: await getInventory()})}
}))

interface InventoryState {
  inv: InventoryItem[] | null;
  loadInv: () => Promise<void>
}
