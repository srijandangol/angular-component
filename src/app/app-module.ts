import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormExampleComponent } from './core/form-eg/form-eg';
import { SharedModule } from './shared/shared-module';
import { RouterModule, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [App, FormExampleComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule, 
    RouterModule, 
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App],
})
export class AppModule {}
