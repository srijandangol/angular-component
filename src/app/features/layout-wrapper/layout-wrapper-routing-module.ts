import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './wrapper-component/wrapper-component';
import { UserTableComponent } from '../../features/user/user.component/user.component';
import { DashboardComponent } from '../../features/user/demo/dashboard.component/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserTableComponent },
      // Add more child routes here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutWrapperRoutingModule { }
