import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private noAuthHeader = { headers: new HttpHeaders({ noAuth: 'True' }) };

  constructor(private http: HttpClient) {}

  // Login User
  loginUser(authDetails) {
    return this.http.post(
      this.baseUrl + '/login',
      authDetails,
      this.noAuthHeader
    );
  }

  // Get Secret Data
  getSecret() {
    return this.http.get(this.baseUrl + '/secret');
  }

  // ************ Helper Functions **************
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    }
    return null;
  }

  isLoggedIn() {
    const payload = this.getUserPayload();

    if (payload) {
      return payload.exp > Date.now() / 1000;
    }

    return false;
  }
}
