import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {IProducto} from "../../core";
import {MatTableDataSource} from "@angular/material/table";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {selectProducts} from "../../modules/inventario/producto/state/product.selector";
import {Observable, Subscription} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {productAction} from "../../modules/inventario/producto/state/product.action";

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css']
})
export class SelectProductComponent implements OnInit, AfterViewInit, OnDestroy{

  private listProducts: IProducto[] = [];
  private selectedProducts:Array<IProducto> = [];
  products$:Observable<Array<IProducto>> = new Observable<Array<IProducto>>();
  subscription!:Subscription;
  displayedColumns: string[] = ['select','id', 'name', 'stock'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<IProducto>(this.listProducts);
  clickedRows = new Set<IProducto>();
  selection = new SelectionModel<IProducto>(true, []);
  constructor(private store:Store<AppState>, public modalRef: MdbModalRef<SelectProductComponent>) {
  }
  ngOnInit():void {
    this.products$ = this.store.select(selectProducts);
    this.subscription = this.products$.subscribe({next:(products) => {
      this.dataSource.data = [...products];
      }}
    )
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedProducts = [];
      this.store.dispatch(productAction.addProductForSale({product:[]}));
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.selectedProducts = [...this.dataSource.data]
    this.store.dispatch(productAction.addProductForSale({product:[...this.selectedProducts]}))
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IProducto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    if(this.selection.isSelected(row)){
      this.selectedProducts.push(row);
      this.store.dispatch(productAction.addProductForSale({product:[...this.selectedProducts]}))
    }else{
      const index = this.selectedProducts.findIndex(product => product.id === row.id);
      this.selectedProducts.splice(index, 1);
      this.store.dispatch(productAction.addProductForSale({product:[...this.selectedProducts]}));
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id ?? + 1}`;
  }

}
