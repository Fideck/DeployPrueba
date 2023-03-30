import { IProducto } from "./producto";

export interface IVenta {
    id?:number,
    serial_number:number,
    sale_price:number,
    buy_price:number,
    sale_tax:number,
    sale_total:number,
    receipt_type:string,
    is_active:boolean
    //date_created:string,
    //producto:IProducto
}
