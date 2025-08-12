import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';

import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
{ path: 'Home', component: HomeComponent },
{ path: 'products', component: ProductListComponent },
{ path: 'form', component: ProductFormComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: '**', redirectTo: 'home'}
];
