// auth.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  // Use authService.loggedIn in your component
  get loggedIn(): boolean {
    return this.authService.loggedIn;
  }
}
