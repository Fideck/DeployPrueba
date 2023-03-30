import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public username:any;
  public rol:any;
  constructor(private _cookieService:CookieService) { 
    this.username = this._cookieService.get('user');
    this.rol = this._cookieService.get('rol');
    console.log(this.rol);
    
  }

  ngOnInit(): void {
  }


}
