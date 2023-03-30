import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './interceptor.service';
@Injectable({
  providedIn: 'root',
})
export class EgresoService {
  constructor(
    private _httpClientService: HttpClient,
    private _cookieService: CookieService,
    private interceptor: InterceptorService
  ) {}

  guardarDetalleEgreso(detalleEgreso: any): Observable<any> {
    return this._httpClientService.post(
      `${environment.API_URL}/almacen/egreso/`,
      detalleEgreso,
      { headers: this.interceptor.getHeaders() }
    );
  }
}
