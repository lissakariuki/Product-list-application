import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  // Form controls for product details

  id = new FormControl('');
  name = new FormControl('');
  price = new FormControl('');
  description = new FormControl('');

   submit() {
    console.log('Form values:', {
      id: this.id.value,
      name: this.name.value,
      price: this.price.value,
      description: this.description.value,
    });
   }
  };




