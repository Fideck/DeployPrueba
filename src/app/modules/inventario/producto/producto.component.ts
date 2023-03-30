import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ProductoService, IProducto, AlertsService } from 'src/app/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DialogProductoComponent } from './dialog-producto/dialog-producto.component';
import { DialogDetalleComponent } from './dialog-detalle/dialog-detalle.component';
import * as XLSX from 'xlsx';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {selectProducts} from "./state/product.selector";
import {productAction} from "./state/product.action";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit, AfterViewInit {
  loadProducts$:Observable<Array<IProducto>> = new Observable<Array<IProducto>>();
  displayedColumns: string[] = [
    'id',
    'name',
    'industry',
    'marca',
    'stock',
    'supplier',
    'branchOffice',
    'is_active',
    'opciones',
  ];
  private productos!: IProducto[];
  dataSource = new MatTableDataSource<IProducto>(this.productos);
  excelData: IProducto[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public form!: FormGroup;
  modalRef: MdbModalRef<
    DialogProductoComponent | DialogDetalleComponent
  > | null = null;

  constructor(
    private _productoService: ProductoService,
    private modalService: MdbModalService,
    private alertService: AlertsService,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(productAction.loadProducts({products:[]}));
    this.loadProducts$ = this.store.select(selectProducts);
    this.loadProducts$.subscribe({next:(value) => {
      this.dataSource.data = [...value];
    }});
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.modalRef = this.modalService.open(DialogProductoComponent, {
      modalClass: 'modal-lg',
    });

  }

  openDialogForEdit(producto: IProducto) {
    this.modalRef = this.modalService.open(DialogProductoComponent, {
      modalClass: 'modal-lg',
      data: { productoEdit: producto },
    });
    this.modalRef.onClose.subscribe({
      next: (response: IProducto) => {
        if (response) this.listarProductos();
      },
    });
  }

  openDialogForDetail(producto: IProducto) {
    this.modalRef = this.modalService.open(DialogDetalleComponent, {
      modalClass: 'modal-dialog-centered',
      data: { producto: producto },
    });
  }

  uploadFile(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      const workBook = XLSX.read(fileReader.result, { type: 'binary' });
      const sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
    };
  }
  saveExcel() {
    this._productoService.saveExcel(this.excelData).subscribe({
      next: (resp) => {
        console.log(resp);
        this.listarProductos();
      },
      error:(error) => {
        this.alertService.alertError("A ocurrido un error")
      }
    });
  }

  listarProductos(): void {
    this._productoService.listarProductos().subscribe({next: (data) => {
        console.log(data);
        this.dataSource.data = data;
        this.paginator._changePageSize(this.paginator.pageSize);
      },
    });
  }

  modificarEstado(id: number, accion: number) {
    this._productoService
      .modificarEstadoProducto(id, accion)
      .subscribe((data) => {
        this.listarProductos();
      });
  }
}
