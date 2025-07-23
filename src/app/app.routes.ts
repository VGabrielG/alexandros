import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { DonarComponent } from './donar/donar';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'donar', component: DonarComponent }
];
