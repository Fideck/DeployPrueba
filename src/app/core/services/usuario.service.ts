import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response';
import { User } from '../interfaces/usuario';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public cantidadUsuario:number = 0;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private interceptor: InterceptorService
  ) {}
  
  obtenerUsuarios(): Observable<any> {
    return this.httpClient
      .get<IResponse>(`${environment.API_URL}/users/users/`,{ headers: this.interceptor.getHeaders() });
  }


  agregarUsuario(usuario: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.API_URL}/users/users/`,
      usuario,
      { headers: this.interceptor.getHeaders() }
    );
  }

  modificarEstadoUsuario(id: number, accion: number): Observable<any> {
    return this.httpClient.delete(`${environment.API_URL}/users/users/${id}/`, {
      headers: this.interceptor.getHeaders(),
      params: { accion: accion },
    });
  }
  getUser(){
    return this.cookieService.get('user');
  }
}
