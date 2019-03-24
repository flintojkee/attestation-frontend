import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherAttestationRoutingModule } from './teacher-attestation-routing.module';
import { SharedModule } from '@atestattion/shared';

import { TeacherAttestationComponent } from './pages/teacher-attestation/teacher-attestation.component';
import { TeacherAttestationService } from './shared/teacher-attestation.service';
import { ApplicationComponent } from './components/application/application.component';
import { TeacherService } from '@atestattion/teacher-home/shared/teacher.service';


@NgModule({
  declarations: [ ApplicationComponent, TeacherAttestationComponent],
  imports: [
    CommonModule,
    TeacherAttestationRoutingModule,
    SharedModule
  ],
  providers: [TeacherAttestationService]
})
export class TeacherAttestationModule { }
