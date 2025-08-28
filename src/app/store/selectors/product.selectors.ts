import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  ProductState,
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProductIds = createSelector(selectProductState, selectIds);
export const selectProductEntities = createSelector(selectProductState, selectEntities);
export const selectAllProducts = createSelector(selectProductState, selectAll);
export const selectProductTotal = createSelector(selectProductState, selectTotal);

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectProductEntities,
  selectSelectedProductId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectProductsByCategory = (category: string) =>
  createSelector(selectAllProducts, (products) =>
    products.filter((product) => product.category === category)
  );

export const selectProductCategories = createSelector(selectAllProducts, (products) => [
  ...new Set(products.map((product) => product.category)),
]);
