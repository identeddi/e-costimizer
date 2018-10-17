import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  zipcode: string;
  username: string;


  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  response: any;
  errorMessage: string;
  constructor(public http: Http, public storage: Storage) {

  }
  public login(credentials) : Observable<boolean>{
    return this.getTokenWithCredentials(credentials).mergeMap((authcToken) => {
      let headers: Headers = new Headers();

      headers.append("Authorization", 'Token ' + authcToken);
      headers.append("Content-Type", 'application/json');
      let options = new RequestOptions({ headers: headers });
      var url = 'https://localhost:8443/rest/login/info';
      return this.http.get(url, options)
    })
      .map(res => {
        this.currentUser = res.json();
        return true;
      });

  }
  getToken() : Observable<string> {
    return Observable.defer(()=>
      Observable.fromPromise(this.storage.get('id_token')));
  }

  getTokenWithCredentials(credentials)  : Observable<string>{
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      let username: string = credentials.username;
      let password: string = credentials.password;
      let headers: Headers = new Headers();
      headers.append("Authorization", "Basic " + btoa(username + ":" + password));
      let options = new RequestOptions({ headers: headers });
      var url = 'https://localhost:8443/rest/authc';
      return this.http.get(url, options)
        .map(res => {
          let token: string = res.json().authctoken;
          this.storage.set('id_token', token);
          return token;
        }
        )
        .catch(
        error => Observable.throw("Benutzername oder Passwort ungültig"));
    }

  }

  public register(credentials) : Observable<string> {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Bitte E-Mail und Passwort eingeben");
    } else if (credentials.password != credentials.passwordConfirmation) {
      return Observable.throw("Die eingebenen Passörter stimmen nicht überein");
    }
    else {
      let headers: Headers = new Headers();

      headers.append("Content-Type", 'application/json');
      let options = new RequestOptions({ headers: headers });
      var url = 'https://localhost:8443/rest/register/';
      let body = JSON.stringify(credentials);
      console.log(body);
      return this.http.post(url, body, options)
        .map(res => {
          console.log("Registration request received: " + res);
          return "Bestätigungslink wurde an Ihre E-Mail geschickt, bitte bestätigen Sie Ihr Konto bevor Sie sich einloggen.";
        })
        .catch(error => {
          console.log("serror registering account: " + error.text());
          return Observable.throw(error.text());

        });
    }
  }

  public enableAccount(activationcode: string)  : Observable<string> {

    let headers: Headers = new Headers();

    headers.append("Content-Type", 'application/json');
    let options = new RequestOptions({ headers: headers });
    var url = 'https://localhost:8443/rest/register/activation/' + activationcode;
    return this.http.post(url, options)
      .map(res => {
        console.log("Enabled account with response: " + res);
        return res.text();
      })
      .catch(
      error => {
        console.log("serror enableAccount account: " + error.text());
        return Observable.throw(error.text());
      });

  }
  public getCurrentUser() : User{
    return this.currentUser;
  }

  public logout() : Observable<User> {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
