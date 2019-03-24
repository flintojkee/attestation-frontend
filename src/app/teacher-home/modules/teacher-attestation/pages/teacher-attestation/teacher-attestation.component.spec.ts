import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttestationComponent } from './teacher-attestation.component';

describe('TeacherAttestaionComponent', () => {
  let component: TeacherAttestationComponent;
  let fixture: ComponentFixture<TeacherAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
