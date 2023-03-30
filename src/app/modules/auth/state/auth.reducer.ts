import {createReducer, on} from "@ngrx/store";
import {AuthState} from "./auth.state";
import {authActions} from "./auth.actions";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  access: null,
  refresh: null,
  error:null
}
export const authReducer = createReducer(
  initialState,
  on(authActions.startLogin, state => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(authActions.loginSuccess, (state, {response}) => {
    return {
      ...state,
      isLoading: false,
      isAuthenticated: true,
      user: response.user,
      access: response.access,
      refresh: response.refresh,
      error: null

    }
  }),
  on(authActions.loginFailure, (state, error) => {
    return{
      ...state,
      isLoading: false,
      error: error.error
    }
  }),
  on(authActions.startLogout, state => ({...state, isLoading: false})),
  on(authActions.logoutSuccess, state => (
    {
      ...state,
      isLoading: false,
      isAuthenticated: false,
      user: null,
      access: null,
      refresh: null,
      error: null,
    }
  ))
)
