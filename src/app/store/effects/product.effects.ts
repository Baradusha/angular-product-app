import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as ProductActions from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((createdProduct) => ProductActions.createProductSuccess({ product: createdProduct })),
          catchError((error) => of(ProductActions.createProductFailure({ error: error.message })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap(({ id, product }) =>
        this.productService.updateProduct(id, product).pipe(
          map((updatedProduct) => ProductActions.updateProductSuccess({ product: updatedProduct })),
          catchError((error) => of(ProductActions.updateProductFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError((error) => of(ProductActions.deleteProductFailure({ error: error.message })))
        )
      )
    )
  );
}
