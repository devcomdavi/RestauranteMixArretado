import { Component, input } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-menu-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dish-menu-component.html',
  styleUrl: './dish-menu-component.css',
})
export class DishMenuComponent {
  dish = input.required<Dish>();

  formatPrice(price: number | undefined): string {
    if (price === undefined) return 'R$ 0,00';
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
