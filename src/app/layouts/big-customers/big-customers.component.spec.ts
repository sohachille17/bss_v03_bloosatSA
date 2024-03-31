import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigCustomersComponent } from './big-customers.component';

describe('BigCustomersComponent', () => {
  let component: BigCustomersComponent;
  let fixture: ComponentFixture<BigCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BigCustomersComponent]
    });
    fixture = TestBed.createComponent(BigCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
