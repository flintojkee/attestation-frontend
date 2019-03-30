import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttestationPopupComponent } from './add-attestation-popup.component';

describe('AddAttestationPopupComponent', () => {
  let component: AddAttestationPopupComponent;
  let fixture: ComponentFixture<AddAttestationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttestationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttestationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
