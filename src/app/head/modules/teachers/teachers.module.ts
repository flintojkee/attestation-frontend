import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SharedModule } from '@atestattion/shared';

@NgModule({
  declarations: [TeachersComponent],
  imports: [
    CommonModule,
    SharedModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
