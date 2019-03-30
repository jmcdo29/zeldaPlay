import { Component, OnInit } from '@angular/core';

import { NavBarService } from '#Shared/nav-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private readonly navBarService: NavBarService) {}

  /**
   * Initialize the get profile service
   */
  ngOnInit() {
    this.navBarService.navigate({ page: 'profile' });
  }
}
