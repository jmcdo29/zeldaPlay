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

  /**
   * Toggle function to show the "About" modal
   */
  about() {
    this.showModal = !this.showModal;
  }

  /**
   * Toggle function to show the "Creating a Character" modal
   */
  characterCreate() {
    this.showCharacterCreate = !this.showCharacterCreate;
  }

  /**
   * Function to open the menu
   */
  showMenu(): void {
    document.getElementById('nav-bar').style.width = '20%';
  }

  /**
   * Function to close the menu
   */
  closeMenu(): void {
    document.getElementById('nav-bar').style.width = '0';
  }

  /**
   * Function to handle which buttons should be visible depending on the page that is showing
   * @param variable which page was loaded
   */
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

  /**
   * Function that helps switch tabs for "Creating a Character" modal
   * @param index Tab index relating to the "Creating a Character" modal
   */
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
