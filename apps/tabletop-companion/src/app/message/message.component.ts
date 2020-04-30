import { Component, Input } from '@angular/core';
import { Message } from '@tabletop-companion/api-interface';

@Component({
  selector: 'tabletop-companion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input()
  message: Message;
}
