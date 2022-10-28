export interface Product {
  name: string;
  category: Category;
  price: number;
}
export interface CartProduct extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}
export type SortByFieldType = 'category' | 'price';
export type SortType = 'asc' | 'desc';
