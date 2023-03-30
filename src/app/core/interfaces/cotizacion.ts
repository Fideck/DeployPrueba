export interface ICotizacion {
  detalleEgreso: [
    {
      codigo: number,
      nombre:string,
      descripcion: string,
      unidadMedida: string,
      precio: number,
    }
  ];
}
