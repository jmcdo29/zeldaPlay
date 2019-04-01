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
  private allQuestions: Array<{ qQuestion: string }>;

  password: string;
  username: string;
  passwordConfirmation: string;
  loading = false;
  shownQuestions: Array<{ qQuestion: string }>;
  answers: Array<{ question: string; answer: string }>;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {}

  /**
   * Set all the user answers to blank initially. Also get all the questions
   */
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

  /**
   * Function called when a users click on register.
   *
   * Will validate that the user object about to be sent to the server is valid.
   * If not will call the alertService and tell the user what is wrong
   */
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
      this.loading = false;
    }
  }

  /**
   * A function to find the question that the user chose and to remove it from the shownQuestions array.
   * This allows for the questions array to be dynamically updated
   * @param question The question the user chose
   */
  removeQuestion(question: string): void {
    this.shownQuestions = this.shownQuestions.filter(
      (q) => q.qQuestion !== question
    );
  }

  /**
   * A function to find what recovery questions have already been chosen and add those that have not been
   * back into the questions array so that it can be chosen by the user.
   *
   * This is for if the user chooses a question and then decides they do not want to use that question.
   */
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

  /**
   * Checks that the current user is valid.
   *
   * Will check that there is a username, a password, a matching confirmation password,
   * and valid answer objects (3 of them)
   */
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
