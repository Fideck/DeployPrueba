import {createSelector} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {AuthState} from "./auth.state";

export const selectAuthFeature = (state:AppState) => state.auth;

export const selectUserAuthenticated = createSelector(
  selectAuthFeature,
  (state:AuthState) => state.isAuthenticated
);
export const selectAuthError = createSelector(
  selectAuthFeature,
  (state:AuthState) => state.error
);
