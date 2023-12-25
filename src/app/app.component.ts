import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './service/auth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, HeaderComponent, PokemonListComponent, AuthComponent, RouterOutlet],
    providers: [AuthService]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get loggedIn(): boolean {
    return this.authService.loggedIn;
  }
}
