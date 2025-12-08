// types/inventory.ts - Updated with all new fields

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
  foh_quantity: number;  // Front of House
  boh_quantity: number;  // Back of House
  units: string;  // e.g., "quart container", "topping container", "jar"
  image_url?: string | null;  // URL to Supabase Storage
  image_link?: string;  // Legacy field
  category: CATEGORY;

  // Completion tracking
  is_completed?: boolean;
  completed_at?: string;
  completed_by?: string;

  // Low stock alerts
  low_stock_threshold?: number;  // Alert when quantity <= this value

  // Seasonal management
  is_seasonal?: boolean;

  // Display order
  display_order?: number;
}

export interface Category {
  id: number;
  name: string;
  icon_name: string;  // Lucide icon name
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface InventoryExport {
  id: number;
  export_date: string;
  exported_by: string;
  file_url?: string;  // Google Drive link or local file path
  category_filter?: CATEGORY;  // If exporting specific category
  total_items: number;
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
