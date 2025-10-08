export interface ProductInfo {
  id: number;
  title: string; // Optional title field
  price: number;
  description: string;
  category?: string; 
  imageUrl?: string; 
  rating: number; // Optional rating field
}