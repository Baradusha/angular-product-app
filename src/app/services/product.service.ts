import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product, ProductFormData } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  createProduct(productData: ProductFormData): Observable<Product> {
    return this.http.post<Product>('/api/products', productData);
  }

  updateProduct(id: number, productData: ProductFormData): Observable<Product> {
    return this.http.put<Product>(`/api/products/${id}`, productData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }
}
