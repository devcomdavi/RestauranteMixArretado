export interface Dish {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  categoryId?: number;
  picture?: string;
  type?: 'prato' | 'bebida';
}
