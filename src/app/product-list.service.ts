import { Injectable } from '@angular/core';
import { ProductInfo } from './product-list/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {
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
<<<<<<< HEAD
=======

  addProduct(product: ProductInfo): void {
    this.productListing.push(product);
  }

  getNextId(): number {
    if (this.productListing.length === 0) {
      return 1;
    }
    return Math.max(...this.productListing.map(p => p.id)) + 1;
  }

  deleteProduct(id: number): boolean {
    const index = this.productListing.findIndex(product => product.id === id);
    if (index > -1) {
      this.productListing.splice(index, 1);
      return true;
    }
    return false;
  }

  updateProduct(id: number, updatedProduct: Partial<ProductInfo>): boolean {
    const index = this.productListing.findIndex(product => product.id === id);
    if (index > -1) {
      this.productListing[index] = { ...this.productListing[index], ...updatedProduct };
      return true;
    }
    return false;
  }
}
>>>>>>> a02358f46e67f70c0e116c1a33fea1ab43ef8cd0

  addProduct(product: ProductInfo): void {
    this.productListing.push(product);
  }

  getNextId(): number {
    if (this.productListing.length === 0) {
      return 1;
    }
    return this.productListing[this.productListing.length - 1]?.id + 1;
  }

  deleteProduct(id: number): boolean {
    const index = this.productListing.findIndex(product => product.id === id);
    if (index > -1) {
      this.productListing.splice(index, 1);
      return true;
    }
    return false;
  }

  updateProduct(id: number, updatedProduct: Partial<ProductInfo>): boolean {
    const index = this.productListing.findIndex(product => product.id === id);
    if (index > -1) {
      this.productListing[index] = { ...this.productListing[index], ...updatedProduct };
      return true;
    }
    return false;
  }
}
