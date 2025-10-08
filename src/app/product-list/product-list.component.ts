import { Component, inject, OnInit } from '@angular/core';
import { ProductInfo } from './product.model';
import { ProductListService } from '../services/product-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productListing: ProductInfo[] = [];
  loading = true;

  productListService = inject(ProductListService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }

  // ✅ Load products from API
  loadProducts(): void {
    this.productListService.getProducts().pipe().subscribe({
      next: (products) => {
        this.productListing = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }

  // ✅ Navigate to edit product
  editProduct(productId: number): void {
    this.router.navigate(['/edit', productId]);
  }

  // ✅ Delete product via API
  deleteProduct(productId: number): void {
    const product = this.productListing.find(p => p.id === productId);
    if (product && confirm(`Are you sure you want to delete "${product.title}"?`)) {
      this.productListService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts(); // reload list after deletion
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }
}
