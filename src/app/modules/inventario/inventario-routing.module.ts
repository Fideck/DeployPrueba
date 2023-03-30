import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { DialogProductoComponent } from './producto/dialog-producto/dialog-producto.component';
import { ProductoComponent } from './producto/producto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { SedeComponent } from './sede/sede.component';
import { VentasComponent } from './ventas/ventas.component';
import {AgregarVentaComponent} from "./ventas/agregar-venta/agregar-venta.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'proveedor', component: ProveedorComponent },
      { path: 'producto', component: ProductoComponent },
      { path: 'agregar', component: DialogProductoComponent },
      { path: 'sede', component: SedeComponent },
      { path: 'cotizacion', component: CotizacionComponent },
      { path: 'ventas', component: VentasComponent },
      { path: "crear-venta", component:AgregarVentaComponent},
      { path: '**', redirectTo: 'proveedor', pathMatch: 'full' },
    ],
    canActivateChild: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}
