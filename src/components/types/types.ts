export interface Product {
    name: string;
    category: Category;
    price: number;
    quantity?: number;
}

export interface Category {
    id: string;
    name: string;
}