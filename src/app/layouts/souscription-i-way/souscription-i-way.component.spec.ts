import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionIWAYComponent } from './souscription-i-way.component';

describe('SouscriptionIWAYComponent', () => {
  let component: SouscriptionIWAYComponent;
  let fixture: ComponentFixture<SouscriptionIWAYComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SouscriptionIWAYComponent]
    });
    fixture = TestBed.createComponent(SouscriptionIWAYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
