import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from '../user.component/user.component';
import { UserDetailComponent } from '../user-detail-component/user-detail-component';
import { DashboardComponent } from '../demo/dashboard.component/dashboard.component';

const routes: Routes = [
  {path: '', component:DashboardComponent},
   { path: 'users', component: UserTableComponent },
  { path: 'users/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
