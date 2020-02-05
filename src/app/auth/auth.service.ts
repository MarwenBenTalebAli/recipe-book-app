import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  token: string;
  private accountSignUpErrorMessage = new BehaviorSubject<string>('');
  private accountSignInErrorMessage = new BehaviorSubject<string>('');
  eventAuthSignUpError = this.accountSignUpErrorMessage.asObservable();
  eventAuthSignInError = this.accountSignInErrorMessage.asObservable();

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    if (email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
          (error: any) => {
            this.setSignUpAccountErrorMessage(error.code as string);
          }
        );
    } else if (!(email) || !(password))  {
      this.accountSignUpErrorMessage.next('Erreur: veuillez enter votre email et motdepasse!');
    }
  }

  signinUser(email: string, password: string) {
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          response => {
            this.router.navigate(['/']);
            firebase.auth().currentUser.getIdToken()
              .then(
                (token: string) => this.token = token
              );
          }
        )
        .catch(
          (error: any) => {
            this.setAccountSignInErrorMessage(error.code as string);
          }
        );
    } else if (!(email) || !(password)) {
      this.accountSignInErrorMessage.next('Erreur: veuillez enter votre email et motdepasse!');
    }
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  private setAccountSignInErrorMessage(errorCode: string) {
    switch (errorCode) {
      case 'auth/invalid-email': {
        this.accountSignInErrorMessage.next('Erreur: vérifier votre email et motdepasse!');
        break;
      }
      case 'auth/wrong-password': {
        this.accountSignInErrorMessage.next('Erreur: vérifier votre email et motdepasse!');
        break;
      }
      case 'auth/user-not-found':
        {
          this.accountSignInErrorMessage.next('Erreur: vérifier votre email et motdepasse!');
          break;
        }
      default:
        {
          this.accountSignInErrorMessage.next('Erreur inattendue!');
          break;
        }
    }
  }

  private setSignUpAccountErrorMessage(errorCode: string) {
    switch (errorCode) {
      case 'auth/email-already-in-use': {
        this.accountSignUpErrorMessage.next('Erreur: L\'adresse e-mail est déjà utilisée par un autre compte!');
        break;
      }
      case 'auth/weak-password': {
        this.accountSignUpErrorMessage.next('Erreur: Le mot de passe doit contenir au moins 6 caractères!');
        break;
      }
      default:
        {
          this.accountSignUpErrorMessage.next('Erreur inattendue!');
          break;
        }
    }
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
