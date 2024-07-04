import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  cedula: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private http: HttpClient, private router: Router ,private authService: AuthService) {}

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    

  createUser() {
    const userData = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "cedula": this.cedula,
      "email": this.email,
      "password": this.password,
      "role": this.role
    };
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Aquí implementarías la lógica para enviar los datos al servidor y crear el usuario
    this.http.post('http://localhost:9000/register', userData , { headers }).subscribe((response: any) => {
        console.log(response);
        alert('Usuario creado exitosamente');
        this.resetForm();
      }, error => {
        console.error('Error al crear usuario', error);
        alert('Error al crear usuario');
      });
  }

  resetForm() {
    this.firstname = '';
    this.lastname = '';
    this.cedula = '';
    this.email = '';
    this.password = '';
    this.role = '';
  }

}
