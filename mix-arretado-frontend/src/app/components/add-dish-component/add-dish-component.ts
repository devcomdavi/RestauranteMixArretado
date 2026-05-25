import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddFormStateService } from '../../services/add-form-state.service';
import { DishService } from '../../services/dish-service';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-add-dish-component',
  imports: [FormsModule],
  templateUrl: './add-dish-component.html',
  styleUrl: './add-dish-component.css',
})
export class AddDishComponent {
  private addFormState = inject(AddFormStateService);
  private dishService = inject(DishService);
  public dishName: string = '';
  public dishDescription: string = '';
  public dishPrice: string | number | null = null;
  public dishPicture: string = '';
  public selectedCategory: string = 'tapioca-arretada';
  
  public openAddForm = this.addFormState.openAddForm;

  toggleAddForm() {
    this.addFormState.toggleAddForm();
  }

  triggerAddButton() {    
    // Converte o preço caso o usuário tenha digitado com vírgula e garante que é um número
    let precoFormatado = null;
    if (this.dishPrice !== null && this.dishPrice !== '') {
      const precoString = String(this.dishPrice).replace(',', '.');
      precoFormatado = parseFloat(precoString);
    }

    if (this.selectedCategory !== '' && this.dishName !== '' && precoFormatado !== null && !isNaN(precoFormatado) && precoFormatado >= 0) {
      const postDish: Dish = {
        title: this.dishName,
        description: this.dishDescription,
        picture: this.dishPicture,
        price: precoFormatado,
        category: this.selectedCategory
      };
      
      this.dishService.create(postDish);
      this.toggleAddForm();
    } else if (precoFormatado !== null && isNaN(precoFormatado)) {
      alert("O preço deve conter apenas números.");
    } else {
      alert("Por favor, preencha todos os campos obrigatórios corretamente (Nome, Preço válido e selecione uma Categoria)!");
    }
  }

}
