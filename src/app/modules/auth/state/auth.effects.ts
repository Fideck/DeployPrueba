import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../../core";
import {authActions} from "./auth.actions";
import {catchError, exhaustMap, map, of} from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {
  }
    login$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.startLogin),
      exhaustMap(({username, password}) => this.authService.authToken({username, password}).pipe(
        map((response) => ({type: authActions.loginSuccess.type, response})),
        catchError(error => of({type:authActions.loginFailure.type, error}))
      ))
    ));
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.startLogout),
    exhaustMap(({username}) => this.authService.deleteToken(username).pipe(
      map(() => ({type:authActions.logoutSuccess.type}))
    ))
  ));
}
