import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
                this.loginForm = this.fb.group({
                  email: ['', Validators.required],
                  password: ['', Validators.required]
                });
}

  loginForm: FormGroup;

  ngOnInit() {
  }

  login() {
    const val = this.loginForm.value;

    if (val.email && val.password) {
        this.authService.login(val.email, val.password)
            .subscribe(
                () => {
                    console.log('User is logged in');
                    this.router.navigateByUrl('/');
                }
            );
    }
}

}
