import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

constructor(private _cookieService: CookieService) { }
  getHeaders():HttpHeaders{
    return new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${this._cookieService.get('access')}`,
    });
  }
}
