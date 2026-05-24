import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-menu-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-menu-component.html',
  styleUrl: './filter-menu-component.css',
})
export class FilterMenuComponent {
  categories = input<string[]>([]);
  categorySelected = output<string>();
  
  activeCategory = signal<string>('Todos');

  selectCategory(category: string) {
    this.activeCategory.set(category);
    this.categorySelected.emit(category);
  }
}
