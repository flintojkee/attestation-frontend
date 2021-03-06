import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherResolver } from '@atestattion/shared/resolvers/teacher.resolver';
import { TeacherComponent } from '@atestattion/shared/components/teacher/teacher.component';


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
