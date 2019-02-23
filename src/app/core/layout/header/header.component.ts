import { Component, OnInit } from '@angular/core';
import { AuthService} from '@atestattion/account/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  loggedIn = false;

  ngOnInit() {
  }

  login(): void {
    // this.authService.login();
  }
  logout(): void {
    // this.authService.logout();
  }
}
