import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueCustomerBillComponent } from './unique-customer-bill.component';

describe('UniqueCustomerBillComponent', () => {
  let component: UniqueCustomerBillComponent;
  let fixture: ComponentFixture<UniqueCustomerBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniqueCustomerBillComponent]
    });
    fixture = TestBed.createComponent(UniqueCustomerBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
