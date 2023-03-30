import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IProducto} from "./core";
import {Store} from "@ngrx/store";
import {AppState} from "./app.state";
import {productAction} from "./modules/inventario/producto/state/product.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  productLoaded$:Observable<Array<IProducto>> = new Observable<Array<IProducto>>();
  title = 'sistema-inventory-cybercorp';
  constructor(private store:Store<AppState>) {
  }
  ngOnInit() {
    this.store.dispatch(productAction.loadProducts({products:[]}));
  }
}
