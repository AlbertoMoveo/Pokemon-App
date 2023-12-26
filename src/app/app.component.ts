import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from "./components/header/header.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, HeaderComponent, PokemonListComponent, AuthComponent, RouterOutlet, FormsModule, NavbarComponent],
    providers: [AuthService]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get loggedIn(): boolean {
    return this.authService.loggedIn;
  }
}
