import { MaterialModule } from './../material/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotePage } from './note.page';

const routes: Routes = [
  {
    path: '',
    component: NotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotePage]
})
export class NotePageModule {}
