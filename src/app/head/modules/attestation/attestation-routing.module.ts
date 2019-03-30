import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttestationComponent } from './pages/attestation.component';

const routes: Routes = [
  {
    path: '',
    component: AttestationComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttestationRoutingModule { }
