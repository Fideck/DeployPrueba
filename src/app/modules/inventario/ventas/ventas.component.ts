import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IVenta } from 'src/app/core/interfaces/venta';
import { VentasService } from 'src/app/core/services/ventas.service';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit,AfterViewInit {
  displayedColumns:string[]=['id','serial_number','sale_price','buy_price','sale_tax','sale_total','receipt_type','is_active','opciones']
  private listaVentas!:IVenta[];
 
  dataSource = new MatTableDataSource<IVenta>(this.listaVentas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ventaService:VentasService) { }

  ngOnInit(): void {
    this.listarVentas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listarVentas(){
    this.ventaService.listarVentas().subscribe({next: (data) =>{
      this.dataSource.data = data;
      console.log(data);
      this.paginator._changePageSize(this.paginator.pageSize);
    },
    });
  }
  modificarEstado(id: number, accion: number) {
    this.ventaService.modificarEstadoVenta(id,accion).subscribe((data)=>{
      this.listarVentas();
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
