import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage-component/homepage-component';
import { MenuComponent } from './components/menu-component/menu-component';
import { AboutComponent } from './components/about-component/about-component';
import { LoginComponent } from './components/login-component/login-component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cardapio', component: MenuComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'login', component: LoginComponent },
];
