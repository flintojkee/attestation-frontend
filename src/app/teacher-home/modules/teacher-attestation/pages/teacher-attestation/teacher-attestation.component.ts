import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherAttestationService } from '../../shared/teacher-attestation.service';
import { TeacherService } from '@atestattion/teacher-home/shared/teacher.service';
import { Observable, Subscription } from 'rxjs';
import { Teacher } from '@atestattion/shared/models/teacher';
import { ApplicationStatus, ApplicationType } from '@atestattion/shared/models/application';

@Component({
  selector: 'app-teacher-attestation',
  templateUrl: './teacher-attestation.component.html',
  styleUrls: ['./teacher-attestation.component.sass']
})
export class TeacherAttestationComponent implements OnInit, OnDestroy {

  constructor(
    private teacherAttestaionService: TeacherAttestationService,
    private teacherService: TeacherService
    ) { }
  teacher: Teacher;
  teacherSubscription: Subscription;
  extraApplications = [];
  defermentApplications = [];
  extraApplicationsOpenState = false;
  ngOnInit() {
    if (this.teacherService.currentTeacher) {
      this.teacherSubscription = this.teacherService.currentTeacher.subscribe(teacher => {
        this.teacher = teacher;
        this.teacherAttestaionService.getApplications(
          ApplicationType.extra,
          '',
          this.teacher.personnel_number)
          .subscribe(applications => {
          this.extraApplications = applications;
        });
        this.teacherAttestaionService.getApplications(
          ApplicationType.deferment,
          '',
          this.teacher.personnel_number)
          .subscribe(applications => {
          this.defermentApplications = applications;
        });

      });
    } else {
      this.teacherSubscription = this.teacherService.getTeacherProfile().subscribe(teacher => {
        this.teacher = teacher;
        this.teacherAttestaionService.getApplications(ApplicationType.extra, '', this.teacher.personnel_number).subscribe(applications => {
          this.extraApplications = applications;
        });
        this.teacherAttestaionService.getApplications(
          ApplicationType.deferment,
          '',
          this.teacher.personnel_number)
          .subscribe(applications => {
          this.defermentApplications = applications;
        });
      });
    }

  }

  ngOnDestroy() {
    this.teacherSubscription.unsubscribe();
  }

  getIcon(status: string): string {
    switch (status) {
      case 'підтверджено':
        return 'assignment_turned_in';
      case 'відхилено':
        return 'assignment_late';
      case 'на розгляді':
        return 'assignment';
      default:
        break;
    }
  }
  getColor(status: string): string {
    switch (status) {
      case 'підтверджено':
        return 'green';
      case 'відхилено':
        return 'red';
      case 'на розгляді':
        return 'gray';
      default:
        break;
    }
  }

}
