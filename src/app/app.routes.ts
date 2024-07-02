import { Routes } from '@angular/router';
import { FibonacciComponent } from './fibonacci/fibonacci.component';

export const routes: Routes = [
  { path: '', redirectTo: '/fibonacci/1', pathMatch: 'full' },
  { path: 'fibonacci/:page', component: FibonacciComponent },
];


