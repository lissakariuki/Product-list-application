import { Component } from '@angular/core';
import { Product } from './product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
     product : Product[] = [
    { id: 1, name: 'Water Bottle', price: 100, description: 'A bottle for water'},
    { id: 2, name: 'Backpack', price: 200, description: 'A backpack for carrying items'},
    { id: 3, name: 'Thermos', price: 300, description: 'A thermos for hot drinks'}
  ]
}
