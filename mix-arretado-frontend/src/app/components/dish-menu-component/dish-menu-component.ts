import { Component, inject, input } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';
import { DishMenuStateService } from '../../services/dish-menu-state.service';
import { DishService } from '../../services/dish-service';
import { AuthService } from '../../services/auth.service';
import { AddFormStateService } from '../../services/add-form-state.service';

@Component({
  selector: 'app-dish-menu-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dish-menu-component.html',
  styleUrl: './dish-menu-component.css',
})
export class DishMenuComponent {
  private dishMenuState = inject(DishMenuStateService);
  private dishService = inject(DishService);
  public authService = inject(AuthService);

  public openEditId = this.dishMenuState.openEditId;

  deleteDishPrompt(event: Event) {
    event.stopPropagation();
    if (!this.authService.session) return;
    const id = this.dish().id;
    if (id !== undefined) {
      this.dishMenuState.editDish(id);
    }
  }

  private addFormState = inject(AddFormStateService);

  editDishDetails(event: Event) {
    event.stopPropagation();
    if (!this.authService.session) return;

    this.addFormState.toggleAddForm(this.dish());
  }

  cancelEdit(event: Event) {
    event.stopPropagation();
    this.dishMenuState.editDish(null);
  }

  confirmDelete(event: Event) {
    event.stopPropagation();
    const id = this.dish().id;
    if (id !== undefined) {
      this.dishService.removeById(id);
      this.dishMenuState.editDish(null);
    }
  }

  dish = input.required<Dish>();

  formatPrice(price: number | undefined): string {
    if (price === undefined) return 'R$ 0,00';
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}