import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseTableComponent } from './shared/tableComponent/base-table-component/base-table-component';
import { UserTableComponent } from './features/user/user.component/user.component';

const routes: Routes = [
  // {path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  {path: '', component: UserTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
