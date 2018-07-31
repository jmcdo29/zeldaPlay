import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const appRoutes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent},

  { path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);
