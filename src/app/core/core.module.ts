import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent, FormUiModule, InputTextComponent, TestAreaComponent } from 'form-ui';
import { FormExampleComponent } from "./form-eg/form-eg";
import { SharedModule } from "../shared/shared-module";

@NgModule({
  declarations: [FormExampleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormUiModule
  ],
  exports: [
    ReactiveFormsModule,
    FormExampleComponent,
    FormUiModule,
    TestAreaComponent,
    InputTextComponent,
    ButtonComponent
  ]
})

export class CoreModule { }