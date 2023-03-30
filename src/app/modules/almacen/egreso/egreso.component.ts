import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IProducto,
  EgresoService,
  ProductoService,
  AlertsService,
} from 'src/app/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.css'],
})
export class EgresoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'cantidad', 'opciones'];

  public listaProductos: IProducto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<IProducto>(this.listaProductos);

  public form: FormGroup;
  public accion: string = 'activado';
  constructor(
    private _productoService: ProductoService,
    private fb: FormBuilder,
    private _egresoService: EgresoService,
    private _alertService: AlertsService,
    private _route: Router
  ) {
    this.form = this.fb.group({
      detalleEgreso: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.listarProducto();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  agregarProducto(producto: IProducto): void {
    this.accion = 'desactivado';
    let detalleProductoArr = this.form.get('detalleEgreso') as FormArray;
    let detalleFg = this.construirDetalleProducto(producto);
    detalleProductoArr.push(detalleFg);
  }

  eliminarDetalleProducto(index: number) {
    let detalleProductoArr = this.form.get('detalleEgreso') as FormArray;
    detalleProductoArr.removeAt(index);
  }

  registrarDetalle(): void {
    console.log(this.form.value);
    this._egresoService.guardarDetalleEgreso(this.form.value).subscribe(
      (data) => {
        console.log(data);
        this._alertService.alertSucces('Registro exitoso');
        this._route.navigate(['/inventory/producto/']);
      },
      (error) => this._alertService.alertError('A ocurrido un problema')
    );
  }

  getForm() {
    return <FormArray>this.form.get('detalleEgreso');
  }

  private listarProducto() {
    this._productoService.listarProductos().subscribe((data: IProducto[]) => {
      this.dataSource.data = data.filter(
        (producto) => producto.is_active == true && producto.stock > 0
      );
    });
  }

  private construirDetalleProducto(value:IProducto) {
    return this.fb.group({
      cantidad: ['', Validators.required],
      stock: [value.stock.toString(), Validators.required],
      producto: [value.id, [Validators.required, Validators.min(0)]],
    });
  }
}
