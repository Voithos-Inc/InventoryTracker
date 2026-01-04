/*export type CATEGORY =
    | "DAIRY"
    | "REFRIGERATED"
    | "BEVERAGES"
    | "SAUCES"
    | "BAKED GOODS"
    | "TOPPINGS"
    | "INGREDIENTS";
*/

export let CATEGORY: string[] = []

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
  category: string;
}

export interface InventoryExport {
  id: number;
  export_date: string;
  exported_by: string;
  file_url?: string;  // Google Drive link or local file path
  category_filter?: string;  // If exporting specific category
  total_items: number;
  created_at: string;
}


// Utility types for forms
export interface AddItemFormData {
  name: string;
  category: string;
  units: string;
  foh_quantity: number;
  boh_quantity: number;
  low_stock_threshold: number;
}
