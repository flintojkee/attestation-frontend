import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule, routedComponents } from './account-routing.module';
import { SharedModule } from '@atestattion/shared';


@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ],
  exports: []
})
export class AccountModule { }
