import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { IProveedor, ProveedorService } from 'src/app/core/';
import { DialogProveedorComponent } from './dialog-proveedor/dialog-proveedor.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
})
export class ProveedorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'phone_number',
    'email_address',
    'address',
    'is_active',
    'opciones',
  ];
  private proveedores!: IProveedor[];
  dataSource = new MatTableDataSource<IProveedor>(this.proveedores);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modalRef: MdbModalRef<DialogProveedorComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.listarProveedor();
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
    this.modalRef = this.modalService.open(DialogProveedorComponent, {
      modalClass: 'modal-centred',
    });
    this.modalRef.onClose.subscribe({
      next: (response: IProveedor) => {
        if(response){
            this.dataSource.data = [...this.dataSource.data, response];

        }
      },
    });
  }
  openDialogForEdit(proveedor: IProveedor) {
    this.modalRef = this.modalService.open(DialogProveedorComponent, {
      modalClass: 'modal-centred',
      data: { proveedorEdit: proveedor },
    });
    this.modalRef.onClose.subscribe({
      next: (response: IProveedor) => {
        if(response)
          this.listarProveedor();
      },
    });
  }

  modificarEstado(id: number, accion: number) {
    this.proveedorService
      .modificarEstadoProveedor(id, accion)
      .subscribe((res) => {
        console.log(res);
        this.listarProveedor();
      });
  }
  private listarProveedor(): void {
    this.proveedorService
      .listarProveedores()
      .subscribe((data: IProveedor[]) => {
        console.log(data);

        this.dataSource.data = data;
      });
  }
}
