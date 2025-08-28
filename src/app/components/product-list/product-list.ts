import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { productActions } from '../../store/actions/product.actions';
import * as ProductSelectors from '../../store/selectors/product.selectors';
import { Product } from '../../models/product.model';
import { ProductEditModal } from '../product-edit-modal/product-edit-modal';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductEditModal],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);

  products$: Observable<Product[]> = this.store.select(ProductSelectors.selectAllProducts);
  loading$: Observable<boolean> = this.store.select(ProductSelectors.selectProductLoading);
  error$: Observable<string | null> = this.store.select(ProductSelectors.selectProductError);

  editingProduct: Product | null = null;
  showModal = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(productActions.loadProducts());
  }

  createProduct(): void {
    this.editingProduct = null;
    this.showModal = true;
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.showModal = true;
  }

  deleteProduct(id: number): void {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
      this.store.dispatch(productActions.deleteProduct({ id }));
    }
  }

  onProductCreated(createdProduct: Product): void {
    this.store.dispatch(productActions.createProduct({ product: createdProduct }));
    this.closeModal();
  }

  onProductUpdated(updatedProduct: Product): void {
    this.store.dispatch(
      productActions.updateProduct({
        id: updatedProduct.id!,
        changes: updatedProduct,
      })
    );
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
    this.editingProduct = null;
  }
}
