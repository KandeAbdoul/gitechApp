import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DossierFinancierPage } from './dossier-financier.page';

const routes: Routes = [
  {
    path: '',
    component: DossierFinancierPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DossierFinancierPage]
})
export class DossierFinancierPageModule {}
