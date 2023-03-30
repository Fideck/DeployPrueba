import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {ProductoService} from "../../../../core";
import {productAction} from "./product.action";
import {catchError, exhaustMap, map, of} from "rxjs";

@Injectable()
export class ProductEffects {
  constructor(private actions$:Actions, private productService:ProductoService) {
  }
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(productAction.loadProducts),
    exhaustMap(({products}) => this.productService.listarProductos().pipe(
      map(products => ({type:productAction.loadProductsSuccess.type, products})),
      catchError(error => of({type:productAction.loadProductsFailure.type, error}))
    ))
  ));
  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productAction.addProduct),
    exhaustMap(({product}) => this.productService.agregarProducto(product).pipe(
      map(product => ({type:productAction.addProductSuccess.type, product})),
      catchError(error => of({type:productAction.addProductFailure.type, error}))
    ))
  ));

  updateProduct = createEffect(() => this.actions$.pipe(
    ofType(productAction.updateProduct),
    exhaustMap(({product}) => this.productService.modificarProducto(product).pipe(
      map(product => ({type:productAction.updateProductSuccess.type, product})),
      catchError(error => of({type:productAction.updateProductFailure.type, error}))
    ))
  ))
  changeStateProduct = createEffect(() => this.actions$.pipe(
    ofType(productAction.changeStateProduct),
    exhaustMap(({id, accion}) => this.productService.modificarEstadoProducto(id, accion).pipe(
      map(product => ({type:productAction.updateProductSuccess.type, product}))
    ))
  ))
}
