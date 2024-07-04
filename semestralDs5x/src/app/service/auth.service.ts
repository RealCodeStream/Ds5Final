import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9000';
  private currentUser: { firstname: String, role: string } | null = null;
  private authToken!: string;

  constructor(private http: HttpClient) {}

  log(firstname: String, password: String): Observable<any> {
   
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<any>(`${this.apiUrl}/login`, { firstname, password, headers }).pipe(
      tap(response => {
        this.authToken = response.token;
        this.currentUser = { firstname, role: response.role };
        localStorage.setItem('authToken', this.authToken);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        console.log('Respuesta del servidor:', response);
      }),
      catchError(this.handleError)
    );
  }

  
   loadAuthData() {
    this.authToken = localStorage.getItem('authToken') || '';
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser') || 'null');
    return !!token && !!user;
  }
  // Cerrar sesión
  logout() {
    this.authToken = '';
    this.currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  // Obtener el token JWT almacenado
  getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }


  // Obtener el rol del usuario
  getUserRole(): string | null {
    const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user ? user.role : null;
  }

  // Método de manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // El servidor retornó un código de error
      console.error(`Código de error del servidor: ${error.status}, ` +
                    `mensaje: ${error.error}`);
    }
    // Devuelve un observable con un mensaje de error legible para el usuario
    return throwError('Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente más tarde.');
  }
}

