import { Injectable } from '@angular/core';
import { ProductInfo } from './product-list/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  deleteProduct(id: number) {
    throw new Error('Method not implemented.');
  }
  productListing : ProductInfo[] = [
      { id: 1,
        name: 'Water Bottle', 
        price: 100, 
        description: 'A bottle for water'},
      { id: 2, 
        name: 'Backpack', 
        price: 200, 
        description: 'A backpack for carrying items'},
      { id: 3, 
        name: 'Thermos', 
        price: 300, 
        description: 'A thermos for hot drinks'},
    ];
  
  getProducts(): ProductInfo[] {
    return this.productListing;
}
  getProductsById(id: number): ProductInfo | undefined {
    return this.productListing.find((product: { id: any; }) => product.id === id);
  }  
}

