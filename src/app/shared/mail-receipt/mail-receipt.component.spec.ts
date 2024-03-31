import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailReceiptComponent } from './mail-receipt.component';

describe('MailReceiptComponent', () => {
  let component: MailReceiptComponent;
  let fixture: ComponentFixture<MailReceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailReceiptComponent]
    });
    fixture = TestBed.createComponent(MailReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
