import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './shared/shared-module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserTableComponent } from './features/user/user.component/user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { baseTableReducer } from './shared/tableComponent/store/table.reducer';
import { BaseTableEffects } from './shared/tableComponent/store/table.effects';

@NgModule({
  declarations: [App, UserTableComponent, ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule, 
    RouterModule, 
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
      StoreModule.forRoot({ baseTable: baseTableReducer }),
    EffectsModule.forRoot([BaseTableEffects]),
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App],
})
export class AppModule {}
