import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authSignUpError: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.eventAuthSignUpError.subscribe(
      (dataErrorMessage: string) => {
        if (dataErrorMessage) {
          this.authSignUpError = dataErrorMessage;
        }
      }
    );
  }

  onSignup(form: NgForm) {
    this.authSignUpError = '';
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }

}
