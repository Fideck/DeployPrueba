import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducto } from '../interfaces/producto';
import { IResponse } from '../interfaces/response';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  public cantidadProductos: number = 0;
  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService,
    private interceptor: InterceptorService
  ) {}



  listarProductos(): Observable<IProducto[]> {
    return this._httpClient.get<IProducto[]>(
      `${environment.API_URL}/inventory/producto/`,
      {
        headers: this.interceptor.getHeaders(),
      }
    );
  }

  agregarProducto(producto: IProducto): Observable<IProducto> {
    return this._httpClient.post<IProducto>(
      `${environment.API_URL}/inventory/producto/`,
      producto,
      { headers: this.interceptor.getHeaders() }
    );
  }
  modificarProducto(producto: IProducto): Observable<IProducto> {
    return this._httpClient.put<IProducto>(
      `${environment.API_URL}/inventory/producto/${producto.id}/`,
      producto,
      { headers: this.interceptor.getHeaders() }
    );
  }
  modificarEstadoProducto(id: number, accion: number): Observable<any> {
    return this._httpClient.delete(
      `${environment.API_URL}/inventory/producto/${id}/`,
      { headers: this.interceptor.getHeaders(), params: { accion: accion } }
    );
  }
  saveExcel(productos: IProducto[]): Observable<any> {
    return this._httpClient.post(
      `${environment.API_URL}/inventory/producto/uploadExcel/`,
      productos,
      { headers: this.interceptor.getHeaders() }
    );
  }
}
