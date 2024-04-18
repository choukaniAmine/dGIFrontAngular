import { Injectable } from '@angular/core';
const USER_KEY = 'user';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getUser(): any {
    const userString = window.localStorage.getItem(USER_KEY);
    const user = userString ? JSON.parse(userString) : null;
    return user;
  }

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const role: string = this.getUserRole();
    return role === 'Admin';
  }

  static isClientLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const role: string = this.getUserRole();
    return role === 'Client';
  }
}
