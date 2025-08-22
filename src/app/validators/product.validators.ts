import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ProductValidators {
  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { required: 'Название товара обязательно' };
      }
      if (value.length < 2) {
        return {
          minlength: {
            requiredLength: 2,
            actualLength: value.length,
            message: 'Название должно содержать минимум 2 символа',
          },
        };
      }
      if (value.length > 100) {
        return {
          maxlength: {
            requiredLength: 100,
            actualLength: value.length,
            message: 'Название не должно превышать 100 символов',
          },
        };
      }
      return null;
    };
  }

  static descriptionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { required: 'Описание товара обязательно' };
      }
      if (value.length < 10) {
        return {
          minlength: {
            requiredLength: 10,
            actualLength: value.length,
            message: 'Описание должно содержать минимум 10 символов',
          },
        };
      }
      if (value.length > 500) {
        return {
          maxlength: {
            requiredLength: 500,
            actualLength: value.length,
            message: 'Описание не должно превышать 500 символов',
          },
        };
      }
      return null;
    };
  }

  static priceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { required: 'Цена товара обязательна' };
      }
      if (isNaN(value) || value <= 0) {
        return { invalidPrice: 'Цена должна быть положительным числом' };
      }
      if (value > 1000000) {
        return { maxPrice: 'Цена не должна превышать 1,000,000' };
      }
      return null;
    };
  }

  static categoryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { required: 'Категория товара обязательна' };
      }
      if (value.length < 2) {
        return {
          minlength: {
            requiredLength: 2,
            actualLength: value.length,
            message: 'Категория должна содержать минимум 2 символа',
          },
        };
      }
      if (value.length > 50) {
        return {
          maxlength: {
            requiredLength: 50,
            actualLength: value.length,
            message: 'Категория не должна превышать 50 символов',
          },
        };
      }
      return null;
    };
  }

  static stockValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value && value !== 0) {
        return { required: 'Количество товара обязательно' };
      }
      if (!Number.isInteger(value) || value < 0) {
        return { invalidStock: 'Количество должно быть неотрицательным целым числом' };
      }
      if (value > 100000) {
        return { maxStock: 'Количество не должно превышать 100,000' };
      }
      return null;
    };
  }
}
