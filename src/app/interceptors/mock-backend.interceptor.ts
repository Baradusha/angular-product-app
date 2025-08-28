import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Product, ProductFormData } from '../models/product.model';

let products: Product[] = [
  {
    id: 1,
    name: 'iPhone 16 Pro 128 Гб "Пустынный титан"',
    description:
      'iPhone 16 Pro создан вместе с Apple Intelligence, персональной интеллектуальной системой, которая помогает вам писать, выражать себя и выполнять задачи без усилий. Благодаря новаторской защите конфиденциальности вы можете быть уверены, что никто другой не сможет получить доступ к вашим данным — даже Apple. Apple Intelligence разработан для защиты вашей конфиденциальности на каждом этапе .',
    price: 999.99,
    category: 'Электроника',
    stock: 21,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    name: 'Apple MacBook Air 13"',
    description:
      'MacBook Air, переработанный на базе чипа M2 нового поколения, поразительно тонкий и обеспечивает исключительную скорость и энергоэффективность в прочном полностью алюминиевом корпусе. Это сверхбыстрый и сверхмощный ноутбук, который позволяет вам работать, играть или создавать что угодно — где угодно.',
    price: 1399.99,
    category: 'Электроника',
    stock: 32,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 3,
    name: 'Беспроводные наушники AirPods Pro (2nd generation)',
    description:
      'AirPods Pro (2-го поколения) с зарядным чехлом MagSafe (USB-C) обеспечивают в 2 раза более активное шумоподавление, чем предыдущее поколение, с режимом прозрачности, который позволяет вам слышать окружающий мир. Совершенно новый адаптивный звук, который динамически адаптирует управление шумом к вашей среде. Осведомленность о разговоре помогает снизить громкость мультимедиа и усилить голоса перед вами, когда вы взаимодействуете с другими людьми. Одна зарядка обеспечивает до 6 часов автономной работы. Сенсорное управление позволяют легко регулировать громкость одним касанием.',
    price: 599.99,
    category: 'Электроника',
    stock: 54,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export const MockBackendInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const { url, method, body } = request;

  if (url.endsWith('/api/products') && method === 'GET') {
    return getProducts();
  }

  if (url.endsWith('/api/products') && method === 'POST') {
    return createProduct(body as ProductFormData);
  }

  if (url.match(/\/api\/products\/\d+$/) && method === 'PUT') {
    const id = parseInt(url.split('/').pop() || '0');
    return updateProduct(id, body as ProductFormData);
  }

  if (url.match(/\/api\/products\/\d+$/) && method === 'DELETE') {
    const id = parseInt(url.split('/').pop() || '0');
    return deleteProduct(id);
  }

  if (url.match(/\/api\/products\/\d+$/) && method === 'GET') {
    const id = parseInt(url.split('/').pop() || '0');
    return getProduct(id);
  }

  return next(request);
};

function getProducts(): Observable<HttpResponse<Product[]>> {
  return of(
    new HttpResponse({
      status: 200,
      body: [...products],
    })
  ).pipe(delay(500));
}

function getProduct(id: number): Observable<HttpResponse<Product | null>> {
  const product = products.find((p) => p.id === id);
  return of(
    new HttpResponse({
      status: 200,
      body: product || null,
    })
  ).pipe(delay(300));
}

function createProduct(productData: ProductFormData): Observable<HttpResponse<Product>> {
  const newProduct: Product = {
    ...productData,
    id: products.length > 0 ? Math.max(...products.map((p) => p.id || 0), 0) + 1 : 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  products.push(newProduct);
  return of(
    new HttpResponse({
      status: 201,
      body: newProduct,
    })
  ).pipe(delay(500));
}

function updateProduct(
  id: number,
  productData: ProductFormData
): Observable<HttpResponse<Product>> {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...productData,
      id,
      updatedAt: new Date(),
    };
    return of(
      new HttpResponse({
        status: 200,
        body: products[index],
      })
    ).pipe(delay(500));
  }

  return of(
    new HttpResponse({
      status: 404,
      body: null as any,
    })
  ).pipe(delay(300));
}

function deleteProduct(id: number): Observable<HttpResponse<void>> {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return of(
      new HttpResponse({
        status: 204,
        body: void 0,
      })
    ).pipe(delay(300));
  }

  return of(
    new HttpResponse({
      status: 404,
      body: void 0,
    })
  ).pipe(delay(300));
}
