import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SharedModule } from '@atestattion/shared';
import { AddTeacherPopupComponent } from './components/add-teacher-popup/add-teacher-popup.component';
import { HeadService } from '@atestattion/head/shared/head.service';

import { TeacherResolver } from '@atestattion/shared/resolvers/teacher.resolver';
import { EditTeacherPopupComponent } from './components/edit-teacher-popup/edit-teacher-popup.component';

export const Popups = [ AddTeacherPopupComponent, EditTeacherPopupComponent ];

@NgModule({
  declarations: [TeachersComponent, Popups],
  imports: [
    CommonModule,
    SharedModule,
    TeachersRoutingModule
  ],
  providers: [HeadService, TeacherResolver],
  entryComponents: [Popups]
})
export class TeachersModule { }

