import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage-component/homepage-component';
import { MenuComponent } from './components/menu-component/menu-component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cardapio', component: MenuComponent },
];
