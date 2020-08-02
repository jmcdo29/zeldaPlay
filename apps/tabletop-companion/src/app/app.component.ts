import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from '@tabletop-companion/api-interface';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tabletop-companion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public hello$: Observable<Message>;
  public name: FormControl;
  private formChange$: Subscription;

  constructor() {
    this.name = new FormControl('');
    this.formChange$ = this.name.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          this.hello$ = of(value);
        },
      });
  }

  ngOnInit() {
    this.hello$ = of();
  }

  ngOnDestroy() {
    this.formChange$.unsubscribe();
  }
}
