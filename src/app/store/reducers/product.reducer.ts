import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../models/product.model';
import { productActions } from '../actions/product.actions';

export interface ProductState extends EntityState<Product> {
  selectedProductId: number | null;
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id!,
  sortComparer: (a: Product, b: Product) => a.name.localeCompare(b.name),
});

export const initialState: ProductState = adapter.getInitialState({
  selectedProductId: null,
  loading: false,
  error: null,
});

export const productReducer = createReducer(
  initialState,

  on(productActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(productActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(productActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(productActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(productActions.createProductSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(productActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(productActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(productActions.updateProductSuccess, (state, { product }) =>
    adapter.updateOne(
      { id: product.id!, changes: product },
      {
        ...state,
        loading: false,
        error: null,
      }
    )
  ),

  on(productActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(productActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(productActions.deleteProductSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
      selectedProductId: state.selectedProductId === id ? null : state.selectedProductId,
    })
  ),

  on(productActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(productActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedProductId: id,
  })),

  on(productActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProductId: null,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
