import { Route } from '@angular/router';
import { NotFoundComponent } from '@layout/not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: 'products',
    loadChildren: () => import('../app/features/products/products.routes'),
  },
  {
    path: 'checkout',
    loadChildren: () => import('../app/features/checkout/checkout.routes'),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
