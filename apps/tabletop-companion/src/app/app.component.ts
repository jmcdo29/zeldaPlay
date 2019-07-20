import { Component, OnInit } from '@angular/core';
import { Message } from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'tabletop-companion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit /*, OnDestroy */ {
  public hello$: Observable<Message>;

  constructor(private readonly appService: AppService) {}

  ngOnInit() {
    this.hello$ = this.appService.getHello();
  }
}
