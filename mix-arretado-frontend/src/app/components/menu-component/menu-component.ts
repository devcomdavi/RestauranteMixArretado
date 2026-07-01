import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { DishService } from '../../services/dish-service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DishMenuComponent } from '../dish-menu-component/dish-menu-component';
import { FilterMenuComponent } from '../filter-menu-component/filter-menu-component';
import { AddDishComponent } from '../add-dish-component/add-dish-component';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [CommonModule, DishMenuComponent, FilterMenuComponent, AddDishComponent],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent implements OnInit {
  private dishService = inject(DishService);
  private authService = inject(AuthService);

  isAuthenticated = signal<boolean>(false);

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated.set(!!user);
    });
  }

  selectedCategory = signal<string>('Todos');

  dishes = this.dishService.dishes;

  categories = computed(() => {
    const allDishes = this.dishes() || [];
    const cats = allDishes
      .map(d => d.category)
      .filter((c): c is string => !!c);
    return Array.from(new Set(cats));
  });

  filteredDishes = computed(() => {
    const allDishes = this.dishes() || [];
    const category = this.selectedCategory();

    if (category === 'Todos') {
      return allDishes;
    }

    return allDishes.filter(d => d.category === category);
  });

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
  }
}