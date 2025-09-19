import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormExampleComponent } from './form-eg/form-eg';

const routes: Routes = [
  {path: '', component: FormExampleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
