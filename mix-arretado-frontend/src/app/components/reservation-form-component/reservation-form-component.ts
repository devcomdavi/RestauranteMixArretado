import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationStateService } from '../../services/reservation-state.service';

@Component({
  selector: 'app-reservation-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './reservation-form-component.html',
  styleUrl: './reservation-form-component.css',
})
export class ReservationFormComponent {
  private reservationState = inject(ReservationStateService);
  private fb = inject(FormBuilder);
  
  public reservationForm: FormGroup;
  // Opcional: Referencia o signal do serviço para usar no HTML se desejar
  public openForm = this.reservationState.openForm;

  constructor() {
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      numberOfPeople: ['2 Pessoas', Validators.required]
    });
  }

  toggleForm() {
    this.reservationState.toggleForm();
  }

  submitForm() {
    if (this.reservationForm.valid) {
      console.log('Reserva confirmada:', this.reservationForm.value);
      this.reservationForm.reset({ numberOfPeople: '2 Pessoas' });
      this.toggleForm();
    } else {
      alert("Por favor, preencha todos os campos da reserva!");
      this.reservationForm.markAllAsTouched();
    }
  }

}
