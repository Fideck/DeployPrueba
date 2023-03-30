import {IProducto} from "../../../../core";

export interface ProductState{
  products:Array<IProducto>;
  productsForSale:Array<IProducto>,
  isLoading:boolean;
  error: Error | null
}
