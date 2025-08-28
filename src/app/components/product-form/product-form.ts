import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductValidators } from '../../validators/product.validators';
import { Product, ProductFormData } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<ProductFormData>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  productForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, ProductValidators.nameValidator()]],
      description: ['', [Validators.required, ProductValidators.descriptionValidator()]],
      price: [0, [Validators.required, ProductValidators.priceValidator()]],
      category: ['', [Validators.required, ProductValidators.categoryValidator()]],
      stock: [0, [Validators.required, ProductValidators.stockValidator()]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.productForm.get(fieldName);
    if (!field || !field.errors) return [];

    const errors: string[] = [];
    Object.keys(field.errors).forEach((key) => {
      const fieldErrors = field.errors;
      if (!fieldErrors) return;

      switch (key) {
        case 'required':
          errors.push('Это поле обязательно для заполнения');
          break;
        case 'minlength':
          errors.push(`Минимальная длина: ${fieldErrors[key]?.requiredLength || 0} символов`);
          break;
        case 'maxlength':
          errors.push(`Максимальная длина: ${fieldErrors[key]?.requiredLength || 0} символов`);
          break;
        case 'invalidPrice':
          errors.push('Цена должна быть положительным числом');
          break;
        case 'maxPrice':
          errors.push('Цена не должна превышать 1,000,000');
          break;
        case 'invalidStock':
          errors.push('Количество должно быть неотрицательным целым числом');
          break;
        case 'maxStock':
          errors.push('Количество не должно превышать 100,000');
          break;
        default:
          if (fieldErrors[key]) {
            errors.push(fieldErrors[key]);
          }
      }
    });

    return errors;
  }
}
