import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { EgresoComponent } from './egreso/egreso.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogEgresoComponent } from './egreso/dialog-egreso/dialog-egreso.component';


@NgModule({
  declarations: [
    EgresoComponent,
    DialogEgresoComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AlmacenModule { }
