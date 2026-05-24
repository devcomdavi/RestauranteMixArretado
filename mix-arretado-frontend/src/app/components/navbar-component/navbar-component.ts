import { Component, signal, inject } from '@angular/core';
import { ReservationStateService } from '../../services/reservation-state.service';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  private reservationState = inject(ReservationStateService);
  public openMenu = signal(false);

  toggleMenu() {
    this.openMenu.update(valorAtual => !valorAtual);
  }

  toggleForm() {
    this.reservationState.toggleForm();
  }
}
