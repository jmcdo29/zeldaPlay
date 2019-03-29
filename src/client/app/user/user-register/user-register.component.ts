import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  private allQuestions: any[];

  password: string;
  username: string;
  passwordConfirmation: string;
  loading = false;
  shownQuestions: any[];
  answers: Array<{ question: string; answer: string }>;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.answers = [
      { question: '', answer: '' },
      { question: '', answer: '' },
      { question: '', answer: '' }
    ];
    this.userService.getQuestions().subscribe((questions) => {
      this.shownQuestions = questions;
      this.allQuestions = questions;
    });
  }

  register() {
    this.alertService.clear();
    this.loading = true;
    if (this.isValidUser()) {
      this.userService
        .register({
          email: this.username,
          password: this.password,
          confirmationPassword: this.passwordConfirmation,
          recovery: this.answers
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
    } else {
      console.log('Did not send user for registration.');
      this.loading = false;
    }
  }

  removeQuestion(question: string): void {
    this.shownQuestions = this.shownQuestions.filter(
      (q) => q.qQuestion !== question
    );
  }

  restoreQuestions(): void {
    const questionsToRestore = [];
    const ansQuestions = this.answers.map((ans) => ans.question);
    for (const q of this.allQuestions.map((question) => question.qQuestion)) {
      if (!ansQuestions.includes(q)) {
        questionsToRestore.push({ qQuestion: q });
      }
    }
    this.shownQuestions = questionsToRestore;
  }

  isValidUser(): boolean {
    let hasNoError = true;
    if (!this.username) {
      this.alertService.error('Please ensure you have a valid username.');
      hasNoError = false;
    }
    if (!this.password) {
      this.alertService.error('Please ensure you have a valid password.');
      hasNoError = false;
    }
    if (!this.passwordConfirmation) {
      this.alertService.error(
        'Please ensure you have a valid confirmation password.'
      );
      hasNoError = false;
    }
    if (this.password !== this.passwordConfirmation) {
      this.alertService.error(
        'Please ensure your password and confirmation password match.'
      );
      hasNoError = false;
    }
    this.answers.forEach((answer) => {
      if (!answer.question) {
        this.alertService.error(
          'Please ensure you have all security questions chosen.'
        );
        hasNoError = false;
      }
      if (!answer.answer) {
        this.alertService.error(
          'Please ensure you have all security questions answered.'
        );
        hasNoError = false;
      }
    });
    return hasNoError;
  }
}
