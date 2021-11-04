import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./httpclient.service";
import { map } from "rxjs/operators";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(username, password) {
    
    return this.httpClient
      .post<any>("http://localhost:8080/authenticate", { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("raw_token", userData.token);
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  register(username, password) {
    
    return this.httpClient
      .post<any>("http://localhost:8080/register", { username, password });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  isUserAdmin() {
    let token = sessionStorage.getItem("raw_token");
    if (token != null) {
      let payload = this.getDecodedAccessToken(token);
      if (payload.roles == "ROLE_ADMIN") {
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("raw_token");
  }
}
