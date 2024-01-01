import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedInKey = 'loggedInKey';
  private readonly expectedValue = 'c3VwZXJfc2VjcmV0X2tleQ==';

  errorMessage: string = '';

  get loggedIn(): boolean {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(this.loggedInKey);
      return !!storedValue && storedValue === this.expectedValue;
    }
  }

  constructor(private router: Router) { }

  login(email: string): void {
    if (email === 'demo@skills.co.il') {
      this.errorMessage = '';
      localStorage.setItem(this.loggedInKey, this.expectedValue);
      this.router.navigate(['/pokemons']);
    } else {
      this.errorMessage = 'Invalid email. Please try again.';
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.loggedInKey);
      this.router.navigate(['/login']);
    }
  }
}
