import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigUstomerReceiptComponent } from './big-ustomer-receipt.component';

describe('BigUstomerReceiptComponent', () => {
  let component: BigUstomerReceiptComponent;
  let fixture: ComponentFixture<BigUstomerReceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BigUstomerReceiptComponent]
    });
    fixture = TestBed.createComponent(BigUstomerReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
