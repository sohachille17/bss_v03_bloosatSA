import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlooStarComponent } from './bloo-star.component';

describe('BlooStarComponent', () => {
  let component: BlooStarComponent;
  let fixture: ComponentFixture<BlooStarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlooStarComponent]
    });
    fixture = TestBed.createComponent(BlooStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
