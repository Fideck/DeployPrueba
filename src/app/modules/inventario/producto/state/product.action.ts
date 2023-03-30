import {createActionGroup, props} from "@ngrx/store";
import {IProducto} from "../../../../core";

export const productAction = createActionGroup({
  source:"product",
  events:{
    "Add Product":props<{product:IProducto}>(),
    "Add Product Success":props<{product:IProducto}>(),
    "Add Product Failure":props<{error:Error | null}>(),
      "Add Product for Sale":props<{product:IProducto[]}>(),
    "Delete Product for Sale":props<{id:number}>(),
    "Load Products": props<{products:Array<IProducto>}>(),
    "Load Products Success": props<{products:Array<IProducto>}>(),
    "Load Products Failure": props<{error:Error | null}>(),
    "Update Product":props<{product:IProducto}>(),
    "Update Product Success":props<{product:IProducto}>(),
    "Update Product Failure":props<{error:Error | null}>(),
    "Change State Product":props<{id:number, accion:number}>(),
    "Change State Product Success":props<{id:number, accion:number}>(),
    "Change State Product Failure":props<{error:Error | null}>()
  }
})
