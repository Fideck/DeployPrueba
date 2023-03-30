import {AuthState} from "./modules/auth/state/auth.state";
import {ActionReducerMap} from "@ngrx/store";
import {authReducer} from "./modules/auth/state/auth.reducer";
import {ProductState} from "./modules/inventario/producto/state/product.state";
import {productReducer} from "./modules/inventario/producto/state/product.reducer";

export interface AppState{
  auth:AuthState,
  product:ProductState,
}
export const ROOT_STATE: ActionReducerMap<AppState> = {
  auth:authReducer,
  product:productReducer
}
