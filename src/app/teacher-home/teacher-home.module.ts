import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherHomeRoutingModule } from './teacher-home-routing.module';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { SharedModule } from '@atestattion/shared';

@NgModule({
  declarations: [TeacherHomeComponent],
  imports: [
    CommonModule,
    TeacherHomeRoutingModule,
    SharedModule
  ]
})
export class TeacherHomeModule { }
