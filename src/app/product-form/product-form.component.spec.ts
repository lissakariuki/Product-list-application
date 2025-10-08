import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductFormComponent } from './product-form.component';
import { ProductListService } from '../services/product-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ProductInfo } from '../product-list/product.model';

describe('ProductFormComponent (Jest)', () => {
  let component: ProductFormComponent;

  //  Mock services with Jest
  const mockProductService = {
    getNextId: jest.fn(),
    getProductById: jest.fn(),
    addProduct: jest.fn(),
    updateProduct: jest.fn()
  };

  const mockRouter = {
    navigate: jest.fn()
  };

  const mockSnackBar = {
    open: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, NoopAnimationsModule],
      providers: [
        { provide: ProductListService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Add Product Mode', () => {
    beforeEach(() => {
      // Mock next ID
      mockProductService.getNextId.mockReturnValue(101);
      component.ngOnInit();
    });

    it('should auto-set the product ID on init', () => {
      expect(component.id.value).toBe('101');
      expect(mockProductService.getNextId).toHaveBeenCalled();
    });

    it('should show error if form is invalid', () => {
      component.productForm.setValue({
        id: '101',
        title: 'Duplicate',
        price: '10',
        description: 'Exists',
        category: 'Test Category',
        imageUrl: 'http://example.com/image.jpg',
        rating: '4'
      });

      component.submit();

      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Please fill in all required fields correctly.',
        'Close',
        expect.any(Object)
      );
    });

    it('should add a new product when form is valid', () => {
      const newProduct: ProductInfo = {
        id: 101,
        title: 'Duplicate',
        price: 10,
        description: 'Exists',
        category: 'Test Category',
        imageUrl: 'http://example.com/image.jpg',
        rating: 4
      };

      mockProductService.getProductById.mockReturnValue(null);

      component.productForm.setValue({
        id: '101',
        title: 'Duplicate',
        price: '10',
        description: 'Exists',
        category: 'Test Category',
        imageUrl: 'http://example.com/image.jpg',
        rating: '4'
      });

      component.submit();

      expect(mockProductService.addProduct).toHaveBeenCalledWith(newProduct);
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Product added successfully!',
        'Close',
        expect.any(Object)
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
    });

    it('should not add product if ID already exists', () => {
      mockProductService.getProductById.mockReturnValue({ id: 101 } as any);

      component.productForm.setValue({
        id: '101',
        title: 'Duplicate',
        price: '10',
        description: 'Exists',
        category: 'Test Category',
        imageUrl: 'http://example.com/image.jpg',
        rating: '4'
      });

      component.submit();

      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'A product with this ID already exists.',
        'Close',
        expect.any(Object)
      );
      expect(mockProductService.addProduct).not.toHaveBeenCalled();
    });
  });
});
