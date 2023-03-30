import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable, tap} from 'rxjs';
import { IJWTResponse } from '../interfaces/jwt.interface';
import { CookieService } from 'ngx-cookie-service';
import {Credentials, User} from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}


  authToken(user: Credentials): Observable<IJWTResponse> {
    return this.httpClient.post<IJWTResponse>(
      `${environment.API_URL}/auth/login/`,
      user, {headers:this.getHeaders()}
    ).pipe(
      tap((resp) => this.saveToken(resp))
    );
  }

  deleteToken(id: string): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/auth/logout/`,
    { user: id}, {headers:this.getHeaders()}
    ).pipe(
      tap(() => this.deleteCookies())
    );
  }

  private getHeaders():HttpHeaders{
    return new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${this.cookieService.get('access')}`,
    });
  }
  private saveToken(resp: IJWTResponse) {
    this.cookieService.set('user', resp.user?.username??"",1,'/');
    this.cookieService.set('access', resp?.access??"", 1, '/');
    this.cookieService.set('refresh', resp?.refresh??"", 1, '/');
    this.cookieService.set('rol', resp.user?.usertype??"", 1, '/');
  }
  private deleteCookies(){
    this.cookieService.deleteAll('/');
  }
}
