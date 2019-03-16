import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from '@atestattion/shared/components/teacher/teacher.component';
import { TeacherProfileResolver } from '@atestattion/teacher-home/shared/teacher-profile.resolver';


const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    resolve: {
      teacher: TeacherProfileResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherProfileRoutingModule { }
