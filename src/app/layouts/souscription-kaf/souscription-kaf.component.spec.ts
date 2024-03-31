import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionKAFComponent } from './souscription-kaf.component';

describe('SouscriptionKAFComponent', () => {
  let component: SouscriptionKAFComponent;
  let fixture: ComponentFixture<SouscriptionKAFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SouscriptionKAFComponent]
    });
    fixture = TestBed.createComponent(SouscriptionKAFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
