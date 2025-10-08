import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInfo } from '../product-list/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  // 👉 Replace this with your real backend URL later
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<ProductInfo[]> {
    return this.http.get<ProductInfo[]>(this.apiUrl);
  }

  // Get product by ID
  getProductById(id: number): Observable<ProductInfo> {
    return this.http.get<ProductInfo>(`${this.apiUrl}/${id}`);
  }

  // Add new product
  addProduct(product: ProductInfo): Observable<ProductInfo> {
    return this.http.post<ProductInfo>(this.apiUrl, product);
  }

  // Update existing product
  updateProduct(id: number, updatedProduct: Partial<ProductInfo>): Observable<ProductInfo> {
    return this.http.put<ProductInfo>(`${this.apiUrl}/${id}`, updatedProduct);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
