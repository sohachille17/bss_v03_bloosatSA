import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBigComponent } from './subscription-big.component';

describe('SubscriptionBigComponent', () => {
  let component: SubscriptionBigComponent;
  let fixture: ComponentFixture<SubscriptionBigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionBigComponent]
    });
    fixture = TestBed.createComponent(SubscriptionBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
