import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccessLevel } from '@atestattion/shared/models/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    this.authService.logout();
  }

  get f() { return this.loginForm.controls; }

  login() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.spinner.show();
    this.loading = true;
    this.authService.login(this.f.login.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                switch (data.access_level) {
                  case AccessLevel.head:
                    this.router.navigate(['/head/teachers']);
                    break;
                  case AccessLevel.teacher:
                    this.router.navigate(['/teacher/profile']);
                    break;
                  default:
                  this.router.navigate(['/']);
                }

            },
            error => {
                this.error = error;
                this.spinner.hide();
            });
  }
}
