export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}
