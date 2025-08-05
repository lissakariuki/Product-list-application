import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListFeatureComponent } from './product-list-feature.component';

describe('ProductListFeatureComponent', () => {
  let component: ProductListFeatureComponent;
  let fixture: ComponentFixture<ProductListFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
