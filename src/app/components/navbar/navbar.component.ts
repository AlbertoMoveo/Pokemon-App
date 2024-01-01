import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router, private location: Location) {}

  get loggedIn(): boolean {
    return this.authService.loggedIn;
  }

  logout(): void {
    this.authService.logout();
  }

  navigateToHome(): void {
    this.router.navigate(['/pokemons']);
    this.location.replaceState('/pokemons');
    this.location.go('/pokemons');
    window.location.reload();
  }

  navigateToMap() {
    this.router.navigate(['/map']);
    this.location.replaceState('/map');
    this.location.go('/map');
    window.location.reload();
  }

  navigateToPokedex(){
    this.router.navigate(['/pokemons']);
    this.location.replaceState('/pokemons');
    this.location.go('/pokemons');
    window.location.reload();
  }
  
}