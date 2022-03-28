import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';
import { MessageDialogComponent } from './message/message-dialog.component';

@NgModule({
  declarations: [
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule
  ],
  entryComponents: [
    MessageDialogComponent
  ]
})
export class SharedModule { }
