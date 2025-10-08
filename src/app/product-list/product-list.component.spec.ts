import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductListService } from '../services/product-list.service';
import { ProductInfo } from './product.model';

// Mock data
const mockProducts: ProductInfo[] = [
  { id: 1, title: 'Product A', price: 100, description: 'Desc A', category: 'Category A', imageUrl: 'a.jpg', rating: 4 },
  { id: 2, title: 'Product B', price: 200, description: 'Desc B', category: 'Category B', imageUrl: 'b.jpg', rating: 5 }
];

// ✅ Create a mock ProductListService
const productListServiceMock = {
  getProducts: jest.fn(),
  deleteProduct: jest.fn()
};

// ✅ Create a mock Router
const routerMock = {
  navigate: jest.fn()
};

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent], // standalone component
      providers: [
        { provide: ProductListService, useValue: productListServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    productListServiceMock.getProducts.mockReturnValue(of(mockProducts));

    component.ngOnInit();

    expect(productListServiceMock.getProducts).toHaveBeenCalled();
    expect(component.productListing).toEqual(mockProducts);
    expect(component.loading).toBe(false);
  });

  it('should handle error when loading products', () => {
    productListServiceMock.getProducts.mockReturnValue(throwError(() => new Error('API error')));

    component.loadProducts();

    expect(productListServiceMock.getProducts).toHaveBeenCalled();
    expect(component.productListing).toEqual([]); // stays empty
    expect(component.loading).toBe(false);
  });

  it('should navigate to edit page', () => {
    const productId = 1;
    component.editProduct(productId);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/edit', productId]);
  });

  it('should delete product and reload list', () => {
    productListServiceMock.getProducts.mockReturnValue(of(mockProducts));
    productListServiceMock.deleteProduct.mockReturnValue(of(void 0));

    // Load initial products
    component.loadProducts();
    expect(component.productListing.length).toBe(2);

    // Confirm mock (always "true")
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    // Delete product with id=1
    component.deleteProduct(1);

    expect(productListServiceMock.deleteProduct).toHaveBeenCalledWith(1);
    expect(productListServiceMock.getProducts).toHaveBeenCalledTimes(2); // reload called after delete
  });

  it('should NOT delete product if user cancels confirm', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    component.deleteProduct(1);

    expect(productListServiceMock.deleteProduct).not.toHaveBeenCalled();
  });
});

