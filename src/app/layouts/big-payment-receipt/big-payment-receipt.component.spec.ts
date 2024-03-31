import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPaymentReceiptComponent } from './big-payment-receipt.component';

describe('BigPaymentReceiptComponent', () => {
  let component: BigPaymentReceiptComponent;
  let fixture: ComponentFixture<BigPaymentReceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BigPaymentReceiptComponent]
    });
    fixture = TestBed.createComponent(BigPaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
