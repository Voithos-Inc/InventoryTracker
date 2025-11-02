export interface InventoryItem {
  id: number;
  name: string;
  icon: string;
  quantity: number;
  unit: string;
}

export type InventoryCategory = 'toppings' | 'flavors' | 'cones' | 'supplies';

export interface InventoryData {
  toppings: InventoryItem[];
  flavors: InventoryItem[];
  cones: InventoryItem[];
  supplies: InventoryItem[];
}