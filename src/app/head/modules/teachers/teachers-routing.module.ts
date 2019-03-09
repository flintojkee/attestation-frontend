import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherResolver } from '@atestattion/head/shared/teacher.resolver';


const routes: Routes = [
  {
    path: '',
    component: TeachersComponent
  },
  {
    path: ':id',
    component: TeacherComponent,
    resolve: {
      teacher: TeacherResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
