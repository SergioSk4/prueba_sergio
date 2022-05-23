import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get url(): string {
    return localStorage.getItem('url') || '';
  }

  pdfUpload(file: any) {
    let formData = new FormData();
    formData.append('curriculum', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
      headers: new HttpHeaders().append('Authorization', this.token),
    };

    const req = new HttpRequest(
      'POST',
      `${baseUrl}/usuarios/${this.url}/cargar_cv`,
      formData,
      options
    );
    return this.http.request(req);
  }

  getUser() {
    return this.http.get(`${baseUrl}/usuarios`, {
      headers: {
        Authorization: this.token,
      },
    });
  }

  getPdf() {
    return this.http.get(`${baseUrl}/usuarios/mostrar_cv`, {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
