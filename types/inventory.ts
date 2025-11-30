export type CATEGORY = "DAIRY" | "REFRIGERATED" | "BEVERAGES" | "SAUCES" | "FROZEN" | "TOPPINGS" | "INGREDIENTS"

export interface InventoryItem {
  id: number;
  created_at: string;
  name: string;
  foh_quantity: 0;
  boh_quantity: 0;
  units: string;
  image_link: string;
  category: CATEGORY
}

export interface InventoryData {
  toppings: InventoryItem[];
  flavors: InventoryItem[];
  // cones: InventoryItem[];
  supplies: InventoryItem[];
}