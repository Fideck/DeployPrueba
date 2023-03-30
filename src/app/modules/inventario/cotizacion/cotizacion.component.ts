import { Component, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  IProducto,
  ICotizacion,
  AlertsService,
  CotizacionpdfService,
  ProductoService,
} from 'src/app/core';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
})
export class CotizacionComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'stock', 'opciones'];

  public listaProductos: IProducto[] = [];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<IProducto>(this.listaProductos);

  public form!: FormGroup;
  public accion: string = 'activado';
  constructor(
    private _cotizacionPdfService: CotizacionpdfService,
    private _productoService: ProductoService,
    private fb: FormBuilder,
    private _route: Router,
    private _redner: Renderer2
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
  openPdf() {
    const cotizacion: ICotizacion = this.form.value;
    const data = cotizacion.detalleEgreso.map((producto) =>
      Object.values(producto)
    );
    this._cotizacionPdfService.generatePdf(data);
    this._route.navigate(['/home/dashboard/']);
  }
  agregarProducto(producto: IProducto): void {
    const button = document.getElementById(`${producto.id}`);
    this._redner.setProperty(button, 'disabled', true);
    this.accion = 'desactivado';
    let detalleProductoArr = this.form.get('detalleEgreso') as FormArray;
    let detalleFg = this.construirDetalleProducto(producto);
    detalleProductoArr.push(detalleFg);
  }

  eliminarDetalleProducto(index: number) {
    let detalleProductoArr = this.form.get('detalleEgreso') as FormArray;
    const id = detalleProductoArr.at(index).value.codigo;
    const button = document.getElementById(`${id}`);
    this._redner.setProperty(button, 'disabled', false);
    detalleProductoArr.removeAt(index);
  }

  private construirDetalleProducto(value:IProducto) {
    return this.fb.group({
      codigo: [value.id?.toString(), Validators.required],
      descripcion: [value.description, Validators.required],
      producto: [value.name, Validators.required],
      unidadMedida: ['EQUIPO', Validators.required],
      precio: [value.selling_price.toString(), Validators.required],
    });
  }
  getForm() {
    return <FormArray>this.form.get('detalleEgreso');
  }
  
  private listarProducto() {  this._productoService.listarProductos().subscribe((data: IProducto[]) => {      console.log(data);    this.dataSource.data = data.filter(      (producto) => producto.is_active == true    );  });}
}
