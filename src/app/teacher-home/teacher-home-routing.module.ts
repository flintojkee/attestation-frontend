import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { TeacherProfileResolver } from './shared/teacher-profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: TeacherHomeComponent,
    children: [
      {
        path: 'profile',
        loadChildren: 'app/teacher-home/modules/teacher-profile/teacher-profile.module#TeacherProfileModule'
      },
      {
        path: 'attestation',
        loadChildren: 'app/teacher-home/modules/teacher-attestation/teacher-attestation.module#TeacherAttestationModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherHomeRoutingModule { }
