import { TestBed } from '@angular/core/testing';

import { ProductListFeatureService } from './product-list-feature.service';

describe('ProductListFeatureService', () => {
  let service: ProductListFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
