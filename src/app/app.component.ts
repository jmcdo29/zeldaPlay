import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZeldaPlay Character Tracker';
  showModal = false;
  showCharacterCreate = false;

  showRace = true;
  showAttributes = false;
  showSkills = false;

  about() {
    this.showModal = !this.showModal;
  }

  characterCreate() {
    this.showCharacterCreate = !this.showCharacterCreate;
  }

  showTab(index: number): void {
    this.showRace = false;
    this.showAttributes = false;
    this.showSkills = false;
    if (index === 0) {
      this.showRace = true;
    } else if (index === 1) {
      this.showAttributes = true;
    } else if (index === 2) {
      this.showSkills = true;
    }
  }
}
