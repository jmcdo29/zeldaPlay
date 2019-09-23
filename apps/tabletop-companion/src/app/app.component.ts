import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from '@tabletop-companion/api-interface';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'tabletop-companion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public hello$: Observable<Message>;
  public name: FormControl;
  private formChange$: Subscription;

  constructor(private readonly appService: AppService) {
    this.name = new FormControl('');
    this.formChange$ = this.name.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe({
        next: (value) => {
          this.hello$ = this.appService.getHello(value);
        },
      });
  }

  ngOnInit() {
    this.hello$ = this.appService.getHello();
  }

  ngOnDestroy() {
    this.formChange$.unsubscribe();
  }
}
