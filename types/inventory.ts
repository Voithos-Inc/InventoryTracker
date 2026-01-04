export type CATEGORY =
    | "DAIRY"
    | "REFRIGERATED"
    | "BEVERAGES"
    | "SAUCES"
    | "BAKED GOODS"
    | "TOPPINGS"
    | "INGREDIENTS";

export interface InventoryItem {
  id: number;
  sort_order: number;
  created_at: string;
  updated_at?: string;
  name: string;
  foh_quantity: number;
  boh_quantity: number;
  units: string;
  image_link?: string;
  low_stock_threshold?: number;
  category: CATEGORY;
  completed?: boolean; // Track if item has been counted
}

export interface InventoryExport {
  id: number;
  export_date: string;
  exported_by: string;
  file_url?: string;
  category_filter?: CATEGORY;
  total_items: number;
  created_at: string;
}

export interface AddItemFormData {
  name: string;
  category: CATEGORY;
  units: string;
  foh_quantity: number;
  boh_quantity: number;
  low_stock_threshold: number;
}