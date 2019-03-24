import { TestBed } from '@angular/core/testing';

import { TeacherAttestationService } from './teacher-attestation.service';

describe('TeacherAttestationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherAttestationService = TestBed.get(TeacherAttestationService);
    expect(service).toBeTruthy();
  });
});
