export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  in_stock: boolean;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}
