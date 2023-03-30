import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import { SedeService } from 'src/app/core/services/sede.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _productoService: ProductoService,
    private _proveedorService: ProveedorService,
    private _sedeService: SedeService
  ) {}
  public cantidadProductos = this._productoService.cantidadProductos;
  public cantidadSede = this._sedeService.cantidadSede;
  public cantidadProveedor = this._proveedorService.cantidadProveedor;
  ngOnInit(): void {}
}
