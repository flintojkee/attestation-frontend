import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeadHomeComponent } from './pages/head-home/head-home.component';
import { TeachersComponent } from './modules/teachers/components/teachers/teachers.component';

const routes: Routes = [
  {
    path: '',
    component: HeadHomeComponent,
    children: [
      {
        path: 'teachers',
        loadChildren: 'app/head/modules/teachers/teachers.module#TeachersModule',
      },
      {
        path: 'attestation',
        loadChildren: 'app/head/modules/attestation/attestation.module#AttestationModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadRoutingModule { }
