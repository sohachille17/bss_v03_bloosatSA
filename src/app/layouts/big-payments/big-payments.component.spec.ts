import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPaymentsComponent } from './big-payments.component';

describe('BigPaymentsComponent', () => {
  let component: BigPaymentsComponent;
  let fixture: ComponentFixture<BigPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BigPaymentsComponent]
    });
    fixture = TestBed.createComponent(BigPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
