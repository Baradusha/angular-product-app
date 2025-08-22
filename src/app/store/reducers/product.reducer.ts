import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../models/product.model';
import * as ProductActions from '../actions/product.actions';

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

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ProductActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.createProductSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.updateProductSuccess, (state, { product }) =>
    adapter.updateOne(
      { id: product.id!, changes: product },
      {
        ...state,
        loading: false,
        error: null,
      }
    )
  ),

  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.deleteProductSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
      selectedProductId: state.selectedProductId === id ? null : state.selectedProductId,
    })
  ),

  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ProductActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedProductId: id,
  })),

  on(ProductActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProductId: null,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
