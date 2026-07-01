import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormStateService } from '../../services/add-form-state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-filter-menu-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-menu-component.html',
  styleUrl: './filter-menu-component.css',
})
export class FilterMenuComponent {
  private addFormState = inject(AddFormStateService);
  public authService = inject(AuthService);

  toggleAddForm() {
    this.addFormState.toggleAddForm();
  }

  categories = input<string[]>([]);
  categorySelected = output<string>();

  activeCategory = signal<string>('Todos');

  selectCategory(category: string) {
    this.activeCategory.set(category);
    this.categorySelected.emit(category);
  }
}