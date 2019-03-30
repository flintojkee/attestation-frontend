import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalitycsComponent } from './pages/analitycs/analitycs.component';
import { SharedModule } from '@atestattion/shared';

@NgModule({
  declarations: [AnalitycsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
