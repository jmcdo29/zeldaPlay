import { Component } from '@angular/core';

import { NavBarService } from '#Shared/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  title = 'ZeldaPlay Character Tracker';
  showModal = false;
  showCharacterCreate = false;
  showMenuBool = false;

  showRace = true;
  showAttributes = false;
  showSkills = false;

  loggedIn = false;

  buttons = {
    showLoginButton: true,
    showCharButton: false,
    showProfileButton: true
  };

  constructor(private readonly navBarService: NavBarService) {
    this.navBarService.navigation$.subscribe((action) =>
      this.handleAction(action)
    );
  }

  about() {
    this.showModal = !this.showModal;
  }

  characterCreate() {
    this.showCharacterCreate = !this.showCharacterCreate;
  }

  showMenu(): void {
    document.getElementById('nav-bar').style.width = '20%';
  }

  closeMenu(): void {
    document.getElementById('nav-bar').style.width = '0';
  }

  handleAction(variable: { page: string }): void {
    switch (variable.page) {
      case 'login':
        this.buttons.showCharButton = true;
        this.buttons.showLoginButton = false;
        this.buttons.showProfileButton = true;
        break;
      case 'character':
        this.loggedIn = !!sessionStorage.getItem('currentUser');
        this.buttons.showCharButton = false;
        this.buttons.showLoginButton = true;
        this.buttons.showProfileButton = true;
        break;
      case 'profile':
        this.loggedIn = !!sessionStorage.getItem('currentUser');
        this.buttons.showCharButton = true;
        this.buttons.showLoginButton = true;
        this.buttons.showProfileButton = false;
        break;
    }
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

  toggleBackground() {
    if (document.body.classList.contains('light')) {
      document.body.classList.replace('light', 'dark');
    } else {
      document.body.classList.replace('dark', 'light');
    }
  }
}
