import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule } from './inventario-routing.module';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductoComponent } from './producto/producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SedeComponent } from './sede/sede.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { DialogProductoComponent } from './producto/dialog-producto/dialog-producto.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { DialogDetalleComponent } from './producto/dialog-detalle/dialog-detalle.component';
import { MatInputModule } from '@angular/material/input';
import { DialogProveedorComponent } from './proveedor/dialog-proveedor/dialog-proveedor.component';
import { DialogSedeComponent } from './sede/dialog-sede/dialog-sede.component';
import { DialogCotizacionComponent } from './cotizacion/dialog-cotizacion/dialog-cotizacion.component';
import { VentasComponent } from './ventas/ventas.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { AgregarVentaComponent } from './ventas/agregar-venta/agregar-venta.component';




@NgModule({
  declarations: [
    ProveedorComponent,
    ProductoComponent,
    SedeComponent,
    CotizacionComponent,
    VentasComponent,
    DialogProductoComponent,
    DialogDetalleComponent,
    DialogProveedorComponent,
    DialogSedeComponent,
    DialogCotizacionComponent,
    VentasComponent,
    AgregarVentaComponent


  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    MdbModalModule,
    MatInputModule,
    MatFormFieldModule

  ],
  exports: [
    ProveedorComponent,
    ProductoComponent,
    SedeComponent,
    InventarioRoutingModule,
    VentasComponent,
    AgregarVentaComponent
  ],
})
export class InventarioModule {}
