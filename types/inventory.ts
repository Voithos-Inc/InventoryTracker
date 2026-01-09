export interface InventoryItem {
  id: number;
  sort_order?: number;
  created_at: string;
  updated_at?: string;
  name: string;
  foh_quantity: number;
  boh_quantity: number;
  units: string;
  image_link?: string;
  low_stock_threshold?: number;
  category: string;
  completed?: boolean;
}

export interface InventoryExport {
  id: number;
  export_date: string;
  exported_by: string;
  file_url?: string;
  category_filter?: string;
  total_items: number;
  created_at: string;
}

export interface AddItemFormData {
  name: string;
  category: string;
  units: string;
  sort_order?: number;
  foh_quantity: number;
  boh_quantity: number;
  low_stock_threshold: number;
}
