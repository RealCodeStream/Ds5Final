import { Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestAdminComponent } from './components/request-admin/request-admin.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProfessorComponent } from './components/professor/professor.component';

export const routes: Routes = [
    { path: 'nav', component: NavComponent, canActivate: [AuthGuardService], 
        children: [
          { path: 'request', component: RequestAdminComponent, canActivate: [AuthGuardService] },
          { path: 'courses', component: CoursesComponent, canActivate: [AuthGuardService] },
          { path: 'professor', component: ProfessorComponent, canActivate: [AuthGuardService] }
        ] 
    },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterComponent},
      { path: '**', component: LoginComponent }
];
