import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifficationsComponent } from './tariffications.component';

describe('TarifficationsComponent', () => {
  let component: TarifficationsComponent;
  let fixture: ComponentFixture<TarifficationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifficationsComponent]
    });
    fixture = TestBed.createComponent(TarifficationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
