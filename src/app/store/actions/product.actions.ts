import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, ProductFormData } from '../../models/product.model';

export const productActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),

    'Create Product': props<{ product: ProductFormData }>(),
    'Create Product Success': props<{ product: Product }>(),
    'Create Product Failure': props<{ error: string }>(),

    'Update Product': props<{ id: number; changes: ProductFormData }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),

    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Failure': props<{ error: string }>(),

    'Select Product': props<{ id: number }>(),
    'Clear Selected Product': emptyProps(),

    'Reset Products State': emptyProps(),
  },
});
