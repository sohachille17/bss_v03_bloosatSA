import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsRecieptComponent } from './bills-reciept.component';

describe('BillsRecieptComponent', () => {
  let component: BillsRecieptComponent;
  let fixture: ComponentFixture<BillsRecieptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillsRecieptComponent]
    });
    fixture = TestBed.createComponent(BillsRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
