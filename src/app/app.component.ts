import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZeldaPlay Character Tracker';
  showModal = false;

  about(){
    this.showModal = !this.showModal;
  }
}
