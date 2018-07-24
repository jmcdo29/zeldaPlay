import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const appRoutes: Routes = [
  { path: '', component: CharactersComponent},
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent},

  { path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);
