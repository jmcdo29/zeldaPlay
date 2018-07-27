import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../_services/authenticate.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username: string;
  password: string;
  loading = false;

  constructor(private router: Router, private authServices: AuthenticateService, private alertService: AlertService) { }

  ngOnInit() {
    this.authServices.logout();
  }

  login(): void {
    this.loading = true;
    this.authServices.login(this.username, this.password)
      .subscribe(
        data => {
          localStorage.setItem('currentUser', data);
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
          this.alertService.error(error.error);
        }
      );
  }

}
