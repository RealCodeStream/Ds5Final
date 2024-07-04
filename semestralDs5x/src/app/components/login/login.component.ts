import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service'; 
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  firstname: String ='';
  password: String ='';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService){}


    login() {
      if (!this.firstname || !this.password) {
        alert('Por favor, ingrese el nombre de usuario y la contraseña');
        return;
      }
     
      this.authService.log(this.firstname, this.password).subscribe({
        next: () => {
          const userRole = this.authService.getUserRole();
          if (userRole === 'Admin') {
            this.router.navigate(['nav/request']);
          } else if (userRole === 'Student') {
            this.router.navigate(['nav/courses']);
          } else if(userRole === 'Professor'){
            this.router.navigate(['nav/professor']);
          }else{
            alert('Usuario o contraseña incorrectos vuelva a intentar');
          }
        },
        error: (err) => {
          console.error('Error de autenticación', err);
          this.errorMessage = 'Hubo un problema al iniciar sesión. Por favor, intenta nuevamente más tarde.';
        }
      });
    }
}

