import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DishService } from '../../services/dish-service';
import { Dish } from '../../models/dish.model';

interface Testimonial {
  author: string;
  text: string;
  stars: number;
}

@Component({
  selector: 'app-homepage-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homepage-component.html',
  styleUrl: './homepage-component.css',
})
export class HomepageComponent {
  private dishService = inject(DishService);

  featuredDishes = computed(() => {
    const dishes = this.dishService.dishes() || [];
    const selectedDishes: number[] = [3, 26, 39, 88];
    const featuredDishes: Dish[] = selectedDishes
      .map(id => dishes.find(dish => dish.id === id))
      .filter((dish): dish is Dish => !!dish);
    return featuredDishes;
  });

  testimonials: Testimonial[] = [
    {
      author: 'Maria Silva',
      text: 'Melhor baião de dois que já comi fora de casa, tempero no ponto, atendimento caloroso e um clima maravilhoso!',
      stars: 5
    },
    {
      author: 'João Pedro',
      text: 'A carne de sol desmancha na boca. A sobremesa de cartola me fez lembrar da minha infância em Recife. Recomendo demais!',
      stars: 5
    },
    {
      author: 'Ana Clara',
      text: 'Um pedacinho do nordeste na capital. A caipirinha de caju com rapadura é divina. Ambiente nota 10!',
      stars: 5
    }
  ];

  getStars(count: number): string {
    return '★'.repeat(count);
  }
}
