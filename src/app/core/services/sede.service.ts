import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response';
import { ISede } from '../interfaces/sede';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  public cantidadSede: number = 0;
  constructor(private http: HttpClient, private cookieService: CookieService, private interceptor: InterceptorService) {}

  listarSede(): Observable<ISede[]> {
    return this.http
      .get<ISede[]>(`${environment.API_URL}/inventory/sede/`, {headers: this.interceptor.getHeaders()});
    // .get<IResponse>(`${environment.API_URL}/inventory/sede/`)
    // .pipe(map((res) => {
    //   this.cantidadSede = res.count;
    //   return res.results;
    // }));
  }
  agregarSede(sede: any): Observable<any> {
    sede.estado = true;
    return this.http.post(`${environment.API_URL}/inventory/sede/`, sede, {
      headers: this.interceptor.getHeaders(),
    });
  }
  modificarSede(sede: ISede): Observable<ISede> {
    return this.http.put<ISede>(
      `${environment.API_URL}/inventory/sede/${sede.id}/`,
      sede,
      {
        headers: this.interceptor.getHeaders(),
      }
    );
  }
  modificarEstadoSede(id: number, accion: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/inventory/sede/${id}/`, {
      headers: this.interceptor.getHeaders(),
      params: { accion: accion },
    });
  }
}
