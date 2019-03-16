import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './account/auth.guard';
import { AccessLevel } from './shared/models/user';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/account/account.module#AccountModule',
  },
  {
    path: 'head',
    loadChildren: 'app/head/head.module#HeadModule',
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.head] }
  },
  {
    path: 'teacher',
    loadChildren: 'app/teacher-home/teacher-home.module#TeacherHomeModule',
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.teacher] }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
