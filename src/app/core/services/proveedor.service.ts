import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProveedor } from '../interfaces/proveedor';
import { IResponse } from '../interfaces/response';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  public cantidadProveedor:number = 0;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private interceptor: InterceptorService
  ) {}

  listarProveedores(): Observable<IProveedor[]> {
    return this.httpClient
      .get<IProveedor[]>(`${environment.API_URL}/inventory/supplier/`, {headers:this.interceptor.getHeaders()});
  }
  agregarProveedor(proveedor: IProveedor): Observable<IProveedor> {
    return this.httpClient.post<IProveedor>(
      `${environment.API_URL}/inventory/supplier/`,
      proveedor,
      { headers: this.interceptor.getHeaders() }
    );
  }

  editarProveedor(proveedor: IProveedor): Observable<IProveedor> {
    return this.httpClient.put<IProveedor>(
      `${environment.API_URL}/inventory/supplier/${proveedor.id}/`,
      proveedor,
      { headers: this.interceptor.getHeaders() }
    );
  }
  modificarEstadoProveedor(id: number, accion: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.API_URL}/inventory/supplier/${id}/`,
      { headers: this.interceptor.getHeaders(), params:{accion:accion} }
    );
  }
}
