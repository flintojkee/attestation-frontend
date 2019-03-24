import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherAttestationComponent } from './pages/teacher-attestation/teacher-attestation.component';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationType } from '@atestattion/shared/models/application';

const routes: Routes = [
    {
      path: '',
      component: TeacherAttestationComponent
    },
    {
      path: 'extra-application',
      component: ApplicationComponent,
      data: { type: ApplicationType.extra }
    },
    {
      path: 'deferment-application',
      component: ApplicationComponent,
      data: { type: ApplicationType.deferment }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherAttestationRoutingModule { }
