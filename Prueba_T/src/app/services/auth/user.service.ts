import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loginUsuario(data: any) {
    return this.http.post(`${baseUrl}/auth/login`, data);
  }

  createUsuario(formData: any) {
    return this.http.post(`${baseUrl}/usuarios`, formData);
  }

  testBackend() {
    return this.http.get(`${baseUrl}/ping`);
  }
}
