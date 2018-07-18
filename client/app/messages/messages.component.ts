import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  show = false;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  showMessages(): void {
    this.show = !this.show;
  }

}
