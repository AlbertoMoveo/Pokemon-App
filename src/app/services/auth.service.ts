import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedInKey = 'loggedInKey';
  private readonly expectedValue = 'c3VwZXJfc2VjcmV0X2tleQ==';

  errorMessage: string = ''

  get loggedIn(): boolean {
    const storedValue = localStorage.getItem(this.loggedInKey);
    return !!storedValue && storedValue === this.expectedValue;
  }

  login(email: string): void {
    if (email === 'demo@skills.co.il') {
      this.errorMessage = '';
      return localStorage.setItem(this.loggedInKey, this.expectedValue);
    }
    this.errorMessage = 'Invalid email. Please try again.'
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  constructor() {}
}

