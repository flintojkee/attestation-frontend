import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SharedModule } from '@atestattion/shared';
import { AddTeacherPopupComponent } from './components/add-teacher-popup/add-teacher-popup.component';
import { HeadService } from '@atestattion/head/shared/head.service';

@NgModule({
  declarations: [TeachersComponent, AddTeacherPopupComponent],
  imports: [
    CommonModule,
    SharedModule,
    TeachersRoutingModule
  ],
  providers: [HeadService],
  entryComponents: [AddTeacherPopupComponent]
})
export class TeachersModule { }
