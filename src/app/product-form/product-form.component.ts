import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductListService } from '../services/product-list.service';
import { ProductInfo } from '../product-list/product.model';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  // Inject services
  private productService = inject(ProductListService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // Form state
  isSubmitting = false;
  isEditMode = false;
  editingProductId: number | null = null;

  // Form controls with validation
  id = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  price = new FormControl('', [Validators.required, Validators.min(0.01)]);
  description = new FormControl('', [Validators.required, Validators.minLength(5)]);

  // Form group for easier validation handling
  productForm = new FormGroup({
    id: this.id,
    name: this.name,
    price: this.price,
    description: this.description
  });

  ngOnInit() {
    // Check if we're in edit mode
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.editingProductId = parseInt(productId, 10);
      this.loadProductForEdit(this.editingProductId);
      // In edit mode, disable ID field
      this.id.disable();
    } else {
      // In add mode, auto-generate next ID
      this.id.setValue(this.productService.getNextId().toString());
    }
  }

  loadProductForEdit(productId: number) {
    const product = this.productService.getProductsById(productId);
    if (product) {
      this.id.setValue(product.id.toString());
      this.name.setValue(product.name);
      this.price.setValue(product.price.toString());
      this.description.setValue(product.description);
    } else {
      // Product not found, redirect to products page
      this.router.navigate(['/products']);
    }
  }

    submit() {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      try {
        const formValues = this.productForm.value;
        
        if (this.isEditMode && this.editingProductId) {
          // Update product
          const updatedProduct: Partial<ProductInfo> = {
            name: formValues.name!,
            price: parseFloat(formValues.price!),
            description: formValues.description!
          };

          if (this.productService.updateProduct(this.editingProductId, updatedProduct)) {
            this.showNotification('Product updated successfully!', 'success');
            this.router.navigate(['/products']);
          } else {
            this.showNotification('Error updating product. Product may not exist.', 'error');
          }
        } else {
          // Create new product
          const newProduct: ProductInfo = {
            id: parseInt(formValues.id!, 10),
            name: formValues.name!,
            price: parseFloat(formValues.price!),
            description: formValues.description!
          };

          if (this.productService.getProductsById(newProduct.id)) {
            this.showNotification('A product with this ID already exists.', 'error');
            this.isSubmitting = false;
            return;
          }

          this.productService.addProduct(newProduct);
          this.showNotification('Product added successfully!', 'success');
          this.router.navigate(['/products']);
        }
      } catch (error) {
        const action = this.isEditMode ? 'updating' : 'adding';
        this.showNotification(`Error ${action} product. Please try again.`, 'error');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.productForm.markAllAsTouched();
      this.showNotification('Please fill in all required fields correctly.', 'error');
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }

  // ✅ Reusable snackbar method
  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
  // Helper methods for template
  getFieldError(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required.`;
      }
      if (control.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${control.errors['minlength'].requiredLength} characters.`;
      }
      if (control.errors['min']) {
        return `${this.getFieldDisplayName(fieldName)} must be greater than 0.`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const names: { [key: string]: string } = {
      id: 'Product ID',
      name: 'Product Name',
      price: 'Price',
      description: 'Description'
    };
    return names[fieldName] || fieldName;
  }

  hasFieldError(fieldName: string): boolean {
    const control = this.productForm.get(fieldName);
    return !!(control?.errors && control.touched);
  }
}

  
        // Add product to service




