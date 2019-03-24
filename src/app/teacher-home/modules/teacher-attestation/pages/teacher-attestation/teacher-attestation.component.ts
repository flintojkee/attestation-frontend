import { Component, OnInit } from '@angular/core';
import { TeacherAttestationService } from '../../shared/teacher-attestation.service';
import { TeacherService } from '@atestattion/teacher-home/shared/teacher.service';
import { Observable } from 'rxjs';
import { Teacher } from '@atestattion/shared/models/teacher';

@Component({
  selector: 'app-teacher-attestation',
  templateUrl: './teacher-attestation.component.html',
  styleUrls: ['./teacher-attestation.component.sass']
})
export class TeacherAttestationComponent implements OnInit {

  constructor(
    private teacherAttestaionService: TeacherAttestationService,
    private teacherService: TeacherService
    ) { }
  teacher: Teacher;
  ngOnInit() {
    this.teacherService.currentTeacher.subscribe(teacher => {
      this.teacher = teacher;
    });
  }

}
