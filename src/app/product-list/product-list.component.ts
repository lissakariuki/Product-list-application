import { Component, inject } from '@angular/core';
import { ProductInfo } from './product.model';
import { CommonModule } from '@angular/common';
import { ProductListService } from '../product-list.service';

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

    constructor(){
       this.productListing = this.productListService.getProducts();
    }
}
