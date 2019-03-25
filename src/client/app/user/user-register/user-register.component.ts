import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '#Alert/alert.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  password: string;
  username: string;
  passwordConfirmation: string;
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  register() {
    this.alertService.clear();
    this.loading = true;
    this.userService
      .register({
        email: this.username,
        password: this.password,
        confirmationPassword: this.passwordConfirmation,
        recovery: []
      })
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          this.alertService.error(error.error);
        }
      );
  }
}
