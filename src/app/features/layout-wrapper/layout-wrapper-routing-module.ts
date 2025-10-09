import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './wrapper-component/wrapper-component';
import { UserTableComponent } from '../../features/user/user.component/user.component';
import { DashboardComponent } from '../../features/user/demo/dashboard.component/dashboard.component';
import { ProductFormComponent } from '../product/product-form/product-form-component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserTableComponent },
      { path: 'products/new', component: ProductFormComponent },
      // Add more child routes here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutWrapperRoutingModule { }
