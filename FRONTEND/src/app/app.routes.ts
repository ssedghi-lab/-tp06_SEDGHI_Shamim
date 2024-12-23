import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // Assurez-vous que ce composant est également en mode standalone

export const routes: Route[] = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./components/login/login.component').then(m => m.loginModule) },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardModule) },
  { path: 'products', loadChildren: () => import('./components/product-list/product-list.component').then(m => m.ProductsModule) }
];
