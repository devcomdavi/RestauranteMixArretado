import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  public openMenu = signal(false);

  toggleMenu() {
    this.openMenu.update(valorAtual => !valorAtual);
  }
}
