import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedInKey = 'loggedInKey';

  get loggedIn(): boolean {
    return !!localStorage.getItem(this.loggedInKey);
  }

  login(email: string): void {
    if (email === 'example@example.com') {
      localStorage.setItem(this.loggedInKey, 'SecretKey');
    }
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  constructor() { }
}
