import type { IconProps } from '@tabler/icons-react-native';
import type { ComponentType } from 'react';

export interface InventoryItem {
  id: number;
  name: string;
  icon: ComponentType<IconProps>;
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