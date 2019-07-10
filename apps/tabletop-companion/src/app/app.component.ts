import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '@tabletop-companion/api-interface';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'tabletop-companion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private hello$: Subscription;

  public greeting: Message;

  constructor(private readonly appService: AppService) {}

  ngOnInit() {
    this.hello$ = this.appService
      .getHello()
      .subscribe(
        (result) => (this.greeting = result),
        (error) => console.error(error)
      );
  }

  ngOnDestroy() {
    this.hello$.unsubscribe();
  }
}
