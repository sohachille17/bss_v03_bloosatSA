import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlooServiceComponent } from './bloo-service.component';

describe('BlooServiceComponent', () => {
  let component: BlooServiceComponent;
  let fixture: ComponentFixture<BlooServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlooServiceComponent]
    });
    fixture = TestBed.createComponent(BlooServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
