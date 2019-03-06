import { Component, OnInit } from '@angular/core';
import { AuthService} from '@atestattion/account/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {

    }

    logout() {
        this.authService.logout();
        this.router.navigate(['account/login']);
    }
}
