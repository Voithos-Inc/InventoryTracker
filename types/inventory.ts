export type CATEGORY = "DAIRY" | "REFRIGERATED" | "BEVERAGES" | "SAUCES" | "FROZEN" | "TOPPINGS" | "INGREDIENTS"

export interface InventoryItem {
  id: number;
  created_at: string;
  name: string;
  foh_quantity: number;
  boh_quantity: number;
  units: string;
  image_link: string;
  category: CATEGORY
}
