import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttestationRoutingModule } from './attestation-routing.module';
import { AttestationComponent } from './attestation/attestation.component';

@NgModule({
  declarations: [AttestationComponent],
  imports: [
    CommonModule,
    AttestationRoutingModule
  ]
})
export class AttestationModule { }
