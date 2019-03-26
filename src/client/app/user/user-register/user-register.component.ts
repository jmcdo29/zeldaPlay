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
    console.log('User Registration initialized');
    this.answers = [
      { question: '', answer: '' },
      { question: '', answer: '' },
      { question: '', answer: '' }
    ];
    this.userService.getQuestions().subscribe(
      (questions) => {
        console.log('Got questions!');
        console.log(questions);
        this.shownQuestions = questions;
        this.allQuestions = questions;
      },
      (err) => {
        this.alertService.error(err.message);
        this.shownQuestions = [];
        this.allQuestions = [];
        return of([]);
      }
    );
  }

  register() {
    this.alertService.clear();
    this.loading = true;
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
}
