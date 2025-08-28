import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product, ProductFormData } from '../../models/product.model';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-edit-modal',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-edit-modal.html',
  styleUrl: './product-edit-modal.scss',
})
export class ProductEditModal {
  @Input() product: Product | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<Product>();
  @Output() productCreated = new EventEmitter<Product>();

  get isEditMode(): boolean {
    return !!this.product?.id;
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Редактировать продукт' : 'Создать новый продукт';
  }

  onSave(productData: ProductFormData): void {
    if (this.isEditMode) {
      const updatedProduct = { ...this.product, ...productData };
      this.productUpdated.emit(updatedProduct);
    } else {
      this.productCreated.emit(productData);
    }
    this.closeModal.emit();
  }

  onCancel(): void {
    if (confirm(`Выйти из режима ${this.isEditMode ? 'редактирования' : 'создания'} товара?`)) {
      this.closeModal.emit();
    }
  }
}
