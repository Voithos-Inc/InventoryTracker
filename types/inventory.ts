export type CATEGORY =
    | "DAIRY"
    | "REFRIGERATED"
    | "BEVERAGES"
    | "SAUCES"
    | "FROZEN"
    | "TOPPINGS"
    | "INGREDIENTS";

export interface InventoryItem {
  id: number;
  created_at: string;
  updated_at?: string;
  name: string;
  foh_quantity: number;
  boh_quantity: number;
  units: string;
  image_url: string;
  category: CATEGORY;
  low_stock_threshold: number;

  // is_completed: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon_name: string;  // Lucide icon name
  display_order: number;
  is_active: boolean;
  created_at: string;
}


// Utility types for forms
export interface AddItemFormData {
  name: string;
  category: CATEGORY;
  units: string;
  foh_quantity: number;
  boh_quantity: number;
  low_stock_threshold: number;
  is_seasonal: boolean;
  image?: File | null;
}
