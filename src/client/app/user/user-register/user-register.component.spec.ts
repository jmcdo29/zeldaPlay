import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { MaterialModule } from '#Shared/material/material.module';
import { UserService } from '../user.service';
import { UserRegisterComponent } from './user-register.component';

const alertServiceStub: Partial<AlertService> = {
  error(message) {
    return message;
  },
  clear() {
    return;
  }
};

const pa = 'password';
const qString = 'a Question';
const qString2 = 'Another question';

describe('UserLoginComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule
      ],
      declarations: [UserRegisterComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            register: jest.fn(),
            getQuestions: jest
              .fn()
              .mockReturnValue(
                of([{ qQuestion: qString }, { qQuestion: qString2 }])
              )
          }
        },
        { provide: AlertService, useValue: alertServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
    expect(component.shownQuestions).toEqual([
      { qQuestion: qString },
      { qQuestion: qString2 }
    ]);
  });

  describe('remove Question', () => {
    it('should remove a question after being chosen', () => {
      component.removeQuestion(qString);
      expect(component.shownQuestions.length).toBe(1);
      expect(component.shownQuestions).not.toContain(qString);
    });
    it('should put a question back after original choice is changed', () => {
      component.answers[0].question = qString;
      component.removeQuestion(qString);
      const originalLength = component.shownQuestions.length;
      component.answers[0].question = qString2;
      component.removeQuestion(qString2);
      component.restoreQuestions();
      expect(component.shownQuestions.length).toBe(originalLength); // this may change
      expect(component.shownQuestions).toContainEqual({ qQuestion: qString });
    });
  });

  describe('registration function', () => {
    test('successful registration', () => {
      spyOn(userService, 'register').and.returnValue(
        of({ token: 'a long token', id: 'the userId' })
      );
      component.username = 'userName';
      component.password = pa;
      component.passwordConfirmation = pa;
      component.answers = [
        {
          question: 'question 1',
          answer: 'answer 1'
        },
        {
          question: 'question 2',
          answer: 'answer 2'
        },
        {
          question: 'question 3',
          answer: 'answer 3'
        }
      ];
      component.register();
      expect(userService.register).toHaveBeenCalled();
    });
    test('unsuccessful registration', () => {
      jest.spyOn(userService, 'register').mockReturnValue(throwError({}));
      component.username = 'userName';
      component.password = pa;
      component.passwordConfirmation = pa;
      component.answers = [
        {
          question: 'question 1',
          answer: 'answer 1'
        },
        {
          question: 'question 2',
          answer: 'answer 2'
        },
        {
          question: 'question 3',
          answer: 'answer 3'
        }
      ];
      component.register();
      expect(userService.register).toHaveBeenCalled();
    });
    it('should be unsuccessful due to missing recovery answers', () => {
      component.username = '';
      component.password = '';
      component.passwordConfirmation = null;
      component.answers = [
        {
          question: '',
          answer: ''
        },
        {
          question: '',
          answer: ''
        },
        {
          question: '',
          answer: ''
        }
      ];
      component.register();
    });
  });
});
