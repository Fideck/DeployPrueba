import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _router: Router,
    private _cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    Swal.fire({
      title: 'Estas seguro de salir?',
      text: 'Estas a punto de cerrar la sesion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesion!',
    }).then((result) => {
      if (result.isConfirmed) {
        const userid = this._cookieService.get('user');
        this.authService.deleteToken(userid).subscribe(data => {
          console.log(data);
          this._cookieService.deleteAll('/');
          this._router.navigate(['/auth']);

        })
      }
    });
  }
}
