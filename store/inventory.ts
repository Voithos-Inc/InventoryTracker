import { create } from 'zustand'
import {getInventory} from "@/lib/supabase";
import {CATEGORY, InventoryItem} from "@/types/inventory";

export const useInventory = create<InventoryState>((set) => ({
  inv: null as InventoryItem[] | null,
  categories: [] as string[],
  loadInv: async () => { 
    let recieved = (await getInventory())
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.sort_order - b.sort_order);

    const cats = Array.from(new Set(recieved.map(u => u.category))).sort();

    set({ inv: recieved, categories: cats });
  }
}))

interface InventoryState {
  inv: InventoryItem[] | null;
  categories: string[];
  loadInv: () => Promise<void>;
}
