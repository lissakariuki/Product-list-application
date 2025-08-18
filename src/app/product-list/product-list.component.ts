import { Component, inject } from '@angular/core';
import { ProductInfo } from './product.model';
import { CommonModule } from '@angular/common';
import { ProductListService } from '../product-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productListing: ProductInfo[] = [];
  productListService = inject(ProductListService);
  router = inject(Router);

  constructor() {
    this.productListing = this.productListService.getProducts();
  }
 editProduct(product: ProductInfo) {
    console.log('Editing product:', product);
    // Navigate to the form page with the product id
    this.router.navigate(['/product-form', product.id]);
  }

  deleteProduct(product: ProductInfo) {
    console.log('Deleting product:', product);
    // Call the service to delete the product
    this.productListService.deleteProduct(product.id);
  }

  trackById(index: number, product: ProductInfo): number {
    return product.id;
  }
}

  