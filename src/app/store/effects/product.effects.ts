import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { productActions } from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => productActions.loadProductsSuccess({ products })),
          catchError((error) => of(productActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.createProduct),
      mergeMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((createdProduct) => productActions.createProductSuccess({ product: createdProduct })),
          catchError((error) => of(productActions.createProductFailure({ error: error.message })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.updateProduct),
      switchMap(({ id, changes }) =>
        this.productService.updateProduct(id, changes).pipe(
          map((updatedProduct) => productActions.updateProductSuccess({ product: updatedProduct })),
          catchError((error) => of(productActions.updateProductFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => productActions.deleteProductSuccess({ id })),
          catchError((error) => of(productActions.deleteProductFailure({ error: error.message })))
        )
      )
    )
  );
}
