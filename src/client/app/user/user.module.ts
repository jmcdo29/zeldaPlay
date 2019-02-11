import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '#Shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const userRoutes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(userRoutes)],
  declarations: [ProfileComponent, UserLoginComponent, UserRegisterComponent],
  exports: [RouterModule]
})
export class UserModule {}
