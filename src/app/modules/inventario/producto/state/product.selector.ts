import {createSelector} from "@ngrx/store";
import {AppState} from "../../../../app.state";
import {ProductState} from "./product.state";

export const selectFeatureProduct = (state:AppState) => state.product;

export const selectProducts = createSelector(
  selectFeatureProduct,
  (state:ProductState) => state.products
)
