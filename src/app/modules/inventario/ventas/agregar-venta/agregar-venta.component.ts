import {Component, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {SelectProductComponent} from "../../../../shared/select-product/select-product.component";
import {IProducto} from "../../../../core";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.css']
})
export class AgregarVentaComponent implements OnInit{

  saleDetail:Array<IProducto> = [];
  displayedColumns:String[] = ['name', 'stock', 'purchase_price'];
  transactions = new MatTableDataSource<IProducto>(this.saleDetail);
  modalRef:MdbModalRef<SelectProductComponent> | null = null;


  ngOnInit():void {
  }
  constructor( private modalService: MdbModalService) {
  }
  openModal(){
    this.modalRef = this.modalService.open(SelectProductComponent, {modalClass:"modal-lg"});
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    // return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    return 0;
  }
}
