import { Component, inject } from '@angular/core';
import { ProductInfo } from '../product-list/product.model';
import { ProductListService } from '../services/product-list.service'; 
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}