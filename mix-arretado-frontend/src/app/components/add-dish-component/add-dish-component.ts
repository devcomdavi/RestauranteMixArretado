import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFormStateService } from '../../services/add-form-state.service';
import { DishService } from '../../services/dish-service';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-add-dish-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dish-component.html',
  styleUrl: './add-dish-component.css',
})
export class AddDishComponent {
  private addFormState = inject(AddFormStateService);
  private dishService = inject(DishService);
  private fb = inject(FormBuilder);
  
  public dishForm: FormGroup;
  public openAddForm = this.addFormState.openAddForm;

  constructor() {
    this.dishForm = this.fb.group({
      dishName: ['', [Validators.required]],
      dishDescription: ['', [Validators.required]],
      dishPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+([,\.][0-9]+)?$/)]],
      selectedCategory: ['tapioca-arretada', [Validators.required]],
      dishPicture: ['']
    });
  }

  toggleAddForm() {
    this.addFormState.toggleAddForm();
  }

  triggerAddButton() {    
    if (this.dishForm.valid) {
      const formValue = this.dishForm.value;
      const precoString = String(formValue.dishPrice).replace(',', '.');
      const precoFormatado = parseFloat(precoString);

      const postDish: Dish = {
        title: formValue.dishName,
        description: formValue.dishDescription,
        picture: formValue.dishPicture,
        price: precoFormatado,
        category: formValue.selectedCategory
      };
      
      this.dishService.create(postDish);
      this.dishForm.reset({ selectedCategory: 'tapioca-arretada' });
      this.toggleAddForm();
    } else {
      alert("Por favor, preencha todos os campos obrigatórios corretamente (Nome, Preço válido e selecione uma Categoria)!");
      this.dishForm.markAllAsTouched();
    }
  }

}
