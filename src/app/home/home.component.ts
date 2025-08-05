import { Component, inject } from '@angular/core';
import { ProductInfo } from '../product-list/product.model';
import { ProductListService } from '../product-list.service'; 
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //injecting the ProductListService to access product data
   ProductListing: ProductInfo[] = [];
   productListService=inject(ProductListService);

  constructor() {
    this.ProductListing = this.productListService.getProducts();
}
}