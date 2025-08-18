import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductListService } from '../product-list.service';
import { ProductInfo } from '../product-list/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  // Inject services
  private productService = inject(ProductListService);
  private router = inject(Router);

  // Form state
  isSubmitting = false;
  submitMessage = '';
  submitMessageType: 'success' | 'error' | '' = '';

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

  constructor() {
    // Auto-generate next ID
    this.id.setValue(this.productService.getNextId().toString());
  }

  submit() {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = '';

      try {
        // Get form values
        const formValues = this.productForm.value;
        
        // Create new product
        const newProduct: ProductInfo = {
          id: parseInt(formValues.id!, 10),
          name: formValues.name!,
          price: parseFloat(formValues.price!),
          description: formValues.description!
        };

        // Check if ID already exists
        if (this.productService.getProductsById(newProduct.id)) {
          this.submitMessage = 'A product with this ID already exists. Please use a different ID.';
          this.submitMessageType = 'error';
          this.isSubmitting = false;
          return;
        }

        // Add product to service
        this.productService.addProduct(newProduct);
        
        // Show success message
        this.submitMessage = 'Product added successfully!';
        this.submitMessageType = 'success';
        
        // Reset form and generate new ID
        this.productForm.reset();
        this.id.setValue(this.productService.getNextId().toString());
        
        // Navigate to products page after delay
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);

      } catch (error) {
        this.submitMessage = 'Error adding product. Please check your input and try again.';
        this.submitMessageType = 'error';
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.productForm.markAllAsTouched();
      this.submitMessage = 'Please fill in all required fields correctly.';
      this.submitMessageType = 'error';
    }
  }

  cancel() {
    this.router.navigate(['/products']);
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



