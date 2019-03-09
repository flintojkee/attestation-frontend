import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SharedModule } from '@atestattion/shared';
import { AddTeacherPopupComponent } from './components/add-teacher-popup/add-teacher-popup.component';
import { HeadService } from '@atestattion/head/shared/head.service';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherResolver } from '@atestattion/head/shared/teacher.resolver';
import { EditTeacherPopupComponent } from './components/edit-teacher-popup/edit-teacher-popup.component';

export const Popups = [ AddTeacherPopupComponent, EditTeacherPopupComponent ];

@NgModule({
  declarations: [TeachersComponent, Popups, TeacherComponent],
  imports: [
    CommonModule,
    SharedModule,
    TeachersRoutingModule
  ],
  providers: [HeadService, TeacherResolver],
  entryComponents: [Popups]
})
export class TeachersModule { }

