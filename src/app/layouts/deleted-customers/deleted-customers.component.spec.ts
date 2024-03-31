import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedCustomersComponent } from './deleted-customers.component';

describe('DeletedCustomersComponent', () => {
  let component: DeletedCustomersComponent;
  let fixture: ComponentFixture<DeletedCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedCustomersComponent]
    });
    fixture = TestBed.createComponent(DeletedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
