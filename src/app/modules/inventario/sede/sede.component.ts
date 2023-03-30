import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SedeService } from '../../../core/services/sede.service';
import { MatTableDataSource } from '@angular/material/table';
import { ISede } from 'src/app/core/interfaces/sede';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogSedeComponent } from './dialog-sede/dialog-sede.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css'],
})
export class SedeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'is_active', 'opciones'];
  private listaSedes!: ISede[];
  dataSource = new MatTableDataSource<ISede>(this.listaSedes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accion = 'Agregar';
  modalRef: MdbModalRef<DialogSedeComponent> | null = null;

  constructor(
    private sedeService: SedeService,
    private modalService: MdbModalService
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.listarSede();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog() {
    this.modalRef = this.modalService.open(DialogSedeComponent, {
      modalClass: 'modal-centred',
    });
    this.modalRef.onClose.subscribe({
      next: (response) => {
        if (response) this.listarSede();
      },
    });
  }
  openDialogForEdit(sede: ISede) {
    this.modalRef = this.modalService.open(DialogSedeComponent, {
      modalClass: 'modal-centred',
      data: { sedeEdit: sede },
    });
    this.modalRef.onClose.subscribe({
      next: (response: ISede) => {
        if (response) this.listarSede();
      },
    });
  }

  listarSede() {
    this.sedeService.listarSede().subscribe((data: ISede[]) => {
      console.log(data);
      this.dataSource.data = data;
    });
    
  }

  darBajaSede(id: number, accion: number) {
    console.log(id, accion);
    this.sedeService.modificarEstadoSede(id, accion).subscribe((r) => {
      this.listarSede();
    });
  }
}
