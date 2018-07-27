import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  password: string;
  username: string;
  passwordConfirmation: string;
  loading = false;

  constructor(private userService: UserService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.userService.register(this.username, this.password, this.passwordConfirmation)
      .subscribe(
        next => {
          localStorage.setItem('currentUser', next.toString());
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
          this.alertService.error(error.error);
        }
      );
  }
}
