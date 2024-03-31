import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueBigCustomerBillComponent } from './unique-big-customer-bill.component';

describe('UniqueBigCustomerBillComponent', () => {
  let component: UniqueBigCustomerBillComponent;
  let fixture: ComponentFixture<UniqueBigCustomerBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniqueBigCustomerBillComponent]
    });
    fixture = TestBed.createComponent(UniqueBigCustomerBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
