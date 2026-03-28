export enum UnitType {
  PIECE = 'db',
  KG = 'kg',
  BATCH = 'prés',
  STRETCH = 'nyújtás'
}

export interface Ingredient {
  name: string;
  percentage?: number; // Relative to flour (100%)
  absolute?: number;   // Absolute value for a specific batch size
  unit: string;
}

export interface SubItem {
  id: string;
  name: string;
  ratio: number;
}

export interface Recipe {
  id: string;
  name: string;
  flourRatio: number; // Flour weight per unit
  unitType: UnitType;
  ingredients: Ingredient[];
  notes?: string;
  originalText?: string;
  piecesPerUnitWeight?: number; // How many pieces in 1 unit of the unitType (e.g. 14 pieces in 1kg)
  subItems?: SubItem[];
}
