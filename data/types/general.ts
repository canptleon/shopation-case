export interface Product {
  createdAt: string;
  name: string;
  image: string;
  price: string;
  description: string;
  brand: string;
  id: string;
  model: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}