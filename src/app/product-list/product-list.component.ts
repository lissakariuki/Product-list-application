import { Component, inject } from '@angular/core';
import { ProductInfo } from './product.model';
import { CommonModule } from '@angular/common';
import { ProductListService } from '../product-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
     productListing : ProductInfo[] = [];
     productListService = inject(ProductListService);
     router = inject(Router);

    constructor(){
       this.productListing = this.productListService.getProducts();
    }

    editProduct(productId: number): void {
      this.router.navigate(['/edit', productId]);
    }

    deleteProduct(productId: number): void {
      const product = this.productListService.getProductsById(productId);
      if (product && confirm(`Are you sure you want to delete "${product.name}"?`)) {
        if (this.productListService.deleteProduct(productId)) {
          this.productListing = this.productListService.getProducts();
        }
      }
    }
}
