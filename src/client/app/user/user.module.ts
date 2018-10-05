import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const userRoutes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(userRoutes)],
  declarations: [UserLoginComponent, UserRegisterComponent],
  exports: [RouterModule]
})
export class UserModule {}
