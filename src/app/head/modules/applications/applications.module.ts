import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { SharedModule } from '@atestattion/shared';
import { ApplicationComponent } from './components/application/application.component';

@NgModule({
  declarations: [ApplicationsComponent, ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule
  ]
})
export class ApplicationsModule { }
