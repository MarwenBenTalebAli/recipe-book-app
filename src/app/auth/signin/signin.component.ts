import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authSignInError: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.eventAuthSignInError.subscribe(
      (dataErrorMessage: string) => {
        if (dataErrorMessage) {
          this.authSignInError = dataErrorMessage;
        }
      }
    );
  }

  onSignin(form: NgForm) {
    this.authSignInError = '';
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

}
