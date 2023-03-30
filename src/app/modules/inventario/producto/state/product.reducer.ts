import {createReducer, on} from "@ngrx/store";
import {ProductState} from "./product.state";
import {productAction} from "./product.action";

const initialState:ProductState = {
  products:[],
  productsForSale:[],
  isLoading:false,
  error:null
}
export const productReducer = createReducer(
  initialState,
    on(productAction.addProductForSale, (state, {product}) => ({...state, productsForSale: [...product] })),
  on(productAction.deleteProductForSale, (state, {id}) => {
    const listProduct = state.productsForSale.filter(product => product.id !== id);
    return {
      ...state,
      productsForSale: listProduct
    }
  }),
  on(productAction.addProduct, (state) => ({...state, isLoading: true})),
  on(productAction.addProductSuccess, (state, {product}) => {
    return {
      ...state,
      products: [...state.products, product],
      isLoading: false
    }
  }),
  on(productAction.addProductFailure, (state, payload) =>{
    return{
      ...state,
      isLoading: false,
      error: payload.error
    }
  }),
  on(productAction.loadProducts, (state) => {
    return{
      ...state,
      isLoading: true
    }
  }),
  on(productAction.loadProductsSuccess, (state, {products}) => {
    return {
      ...state,
      products: [...state.products, ...products],
      isLoading: false
    }
  }),
  on(productAction.loadProductsFailure, (state, {error}) => {
    return {
      ...state,
      isLoading: false,
      error: error
    }
  }),
  on(productAction.updateProduct, (state) => ({...state, isLoading: true, error: null})),
  on(productAction.updateProductSuccess, (state, {product}) => {
    const productsUpdated = state.products.map(productInList => (
      productInList.id !== product.id ? productInList : product
    ));
    return {
      ...state,
      isLoading: false,
      products: productsUpdated,
      error: null
    }
  }),
  on(productAction.updateProductFailure, (state, {error}) => ({...state, isLoading: false, error: error}))
)
