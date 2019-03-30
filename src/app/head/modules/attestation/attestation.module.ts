import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttestationRoutingModule } from './attestation-routing.module';
import { AttestationComponent } from './pages/attestation.component';
import { AddAttestationPopupComponent } from './components/add-attestation-popup/add-attestation-popup.component';
import { SharedModule } from '@atestattion/shared';

export const Popups = [ AddAttestationPopupComponent ];
@NgModule({
  declarations: [AttestationComponent, AddAttestationPopupComponent],
  imports: [
    CommonModule,
    SharedModule,
    AttestationRoutingModule
  ],
  entryComponents: [Popups]
})
export class AttestationModule { }
