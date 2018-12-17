import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { ProjectComponent } from '../project/project.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ViewTaskComponent } from '../view-task/view-task.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'view-task', component: ViewTaskComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
