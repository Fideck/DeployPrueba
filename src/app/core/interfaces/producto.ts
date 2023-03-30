export interface IProducto{
    id?:number,
    name:string,
    description:string,
    stock:number,
    purchase_price:number,
    industry:string,
    assurance_months:string,
    marca:string,
    image: string,
    barcode: string,
    is_active:boolean,
    selling_price:number | string,
    supplier:number | string,
    branchOffice:number | string
    user:number | string
}