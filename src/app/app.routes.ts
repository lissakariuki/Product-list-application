import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';

import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
{ path: ' ', component: HomeComponent },
{path: 'products', component: ProductListComponent},
{ path: 'product-form', component: ProductFormComponent }
];
