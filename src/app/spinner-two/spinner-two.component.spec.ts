import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerTwoComponent } from './spinner-two.component';

describe('SpinnerTwoComponent', () => {
  let component: SpinnerTwoComponent;
  let fixture: ComponentFixture<SpinnerTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerTwoComponent]
    });
    fixture = TestBed.createComponent(SpinnerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
