import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const userRoutes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent},

  { path: '**', redirectTo: 'login'}
];

export const UserRouting = RouterModule.forRoot(userRoutes, { enableTracing: true });
