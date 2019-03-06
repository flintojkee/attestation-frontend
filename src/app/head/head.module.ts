import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadRoutingModule } from './head-routing.module';
import { HeadHomeComponent } from './pages/head-home/head-home.component';
import { SharedModule } from '@atestattion/shared';

@NgModule({
  declarations: [HeadHomeComponent],
  imports: [
    CommonModule,
    HeadRoutingModule,
    SharedModule
  ]
})
export class HeadModule { }
