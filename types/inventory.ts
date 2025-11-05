import type { ComponentType } from 'react';
import {LucideIcon} from "lucide-react-native";

export interface InventoryItem {
  id: number;
  name: string;
  icon: LucideIcon;
  quantity: number;
  unit: string;
}

export interface InventoryData {
  toppings: InventoryItem[];
  flavors: InventoryItem[];
  // cones: InventoryItem[];
  supplies: InventoryItem[];
}