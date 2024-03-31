import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigMailComponent } from './big-mail.component';

describe('BigMailComponent', () => {
  let component: BigMailComponent;
  let fixture: ComponentFixture<BigMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BigMailComponent]
    });
    fixture = TestBed.createComponent(BigMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
