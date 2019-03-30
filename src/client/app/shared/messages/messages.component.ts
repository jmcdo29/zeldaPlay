import { Component, OnInit } from '@angular/core';

import { MessageService } from '#Shared/messages/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  show = false;

  constructor(public messageService: MessageService) {}

  ngOnInit() {}

  /**
   * toggle function to show or hide messages
   */
  showMessages(): void {
    this.show = !this.show;
  }
}
