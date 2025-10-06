import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutWrapperRoutingModule } from './layout-wrapper-routing-module';
import { WrapperComponent } from './wrapper-component/wrapper-component';
import { SidebarComponent } from '../../shared/constant-component/sidebar-component/sidebar-component';
import { FooterComponent } from '../../shared/constant-component/footer-component/footer-component';
import { HeaderComponent } from '../../shared/constant-component/header-component/header-component';
import { MaterialModule } from '../../shared/material/material-module';



@NgModule({
  declarations: [
    WrapperComponent, HeaderComponent, FooterComponent, SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutWrapperRoutingModule
  ],
  exports: [WrapperComponent]
})
export class LayoutWrapperModule { }
