import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProfileRoutingModule } from './teacher-profile-routing.module';
import { SharedModule } from '@atestattion/shared';
import { TeacherProfileResolver } from '@atestattion/teacher-home/shared/teacher-profile.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeacherProfileRoutingModule,
    SharedModule
  ],
  providers: [TeacherProfileResolver]
})
export class TeacherProfileModule { }
