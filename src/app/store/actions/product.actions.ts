import { createAction, props } from '@ngrx/store';
import { Product, ProductFormData } from '../../models/product.model';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: ProductFormData }>()
);
export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: Product }>()
);
export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ id: number; product: ProductFormData }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: string }>()
);

export const deleteProduct = createAction('[Product] Delete Product', props<{ id: number }>());
export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: string }>()
);

export const selectProduct = createAction('[Product] Select Product', props<{ id: number }>());

export const clearSelectedProduct = createAction('[Product] Clear Selected Product');
