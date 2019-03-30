import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '#Alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnDestroy {
  private subscription: Subscription;
  message: { type: 'success' | 'error'; text: string };

  constructor(private alertService: AlertService) {
    this.subscription = alertService.getMessage().subscribe((message) => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Clear the messages and move on
   */
  remove(): void {
    this.message.text = '';
    this.alertService.clear();
  }
}
