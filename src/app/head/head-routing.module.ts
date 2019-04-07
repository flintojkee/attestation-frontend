import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeadHomeComponent } from './pages/head-home/head-home.component';

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
      },
      {
        path: 'applications',
        loadChildren: 'app/head/modules/applications/applications.module#ApplicationsModule',
      },
      {
        path: 'courses',
        loadChildren: 'app/head/modules/courses/courses.module#CoursesModule',
      },
      {
        path: 'analytics',
        loadChildren: 'app/head/modules/analytics/analytics.module#AnalyticsModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadRoutingModule { }
