import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService, AlertsService, Credentials} from 'src/app/core';
import {Store} from "@ngrx/store";
import {authActions} from "../../state/auth.actions";
import {filter, Observable, take, tap} from "rxjs";
import {selectAuthError, selectUserAuthenticated} from "../../state/auth.selector";
import {AppState} from "../../../../app.state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  isAuthenticated$: Observable<boolean> = new Observable<boolean>();
  authError$: Observable<string | null> = new Observable<string | null>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private route: Router,
    private _alertService:AlertsService,
    private store:Store<AppState>,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectUserAuthenticated);
    this.authError$ = this.store.select(selectAuthError).pipe(
      filter(error => error !== null),
      tap(error => this._alertService.alertError(`${error}`))
    )
  }

  login(){
    const userCredentials:Credentials = this.form.value;
    this.store.dispatch(authActions.startLogin(userCredentials));

    this.isAuthenticated$.pipe(
      filter(authenticated => authenticated),
      take(1),
    ).subscribe(()=>
      this.route.navigate(['/home'])
    )
    this.form.reset();
  }
}
