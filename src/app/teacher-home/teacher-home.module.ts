import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherHomeRoutingModule } from './teacher-home-routing.module';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { SharedModule } from '@atestattion/shared';
import { TeacherService } from './shared/teacher.service';

@NgModule({
  declarations: [TeacherHomeComponent],
  imports: [
    CommonModule,
    TeacherHomeRoutingModule,
    SharedModule
  ],
  providers: []
})
export class TeacherHomeModule { }
