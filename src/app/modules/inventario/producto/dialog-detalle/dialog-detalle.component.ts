import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { IProducto } from 'src/app/core';
import { DialogProductoComponent } from '../dialog-producto/dialog-producto.component';

@Component({
  selector: 'app-dialog-detalle',
  templateUrl: './dialog-detalle.component.html',
  styleUrls: ['./dialog-detalle.component.css']
})
export class DialogDetalleComponent implements OnInit {

  producto!:IProducto;
  constructor(public modalRef: MdbModalRef<DialogProductoComponent>,) { }

  ngOnInit(): void {
  }

}
