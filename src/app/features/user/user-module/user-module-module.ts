import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing-module';
import { UserTableComponent } from '../user.component/user.component';
import { UserDetailComponent } from '../user-detail-component/user-detail-component';
import { SharedModule } from '../../../shared/shared-module';
import { DashboardComponent } from '../demo/dashboard.component/dashboard.component';
import { UserFormComponent } from '../user-form-component/user-form-component';
import { BaseFormComponent } from '../../../core/base-form-component/base-form-component';


@NgModule({
  declarations: [UserTableComponent, UserDetailComponent, DashboardComponent, UserFormComponent, BaseFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserModuleRoutingModule
  ],
  exports: [UserTableComponent, UserDetailComponent, UserFormComponent]
})
export class UserModule {}
