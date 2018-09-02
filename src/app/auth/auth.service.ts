import { IAuthCredentials, IAuthToken } from "./auth.interfaces";
import { IHttpResponse } from "angular";

export class AuthService {
  static $inject: string[] = ["$http", "$location", "API_ENDPOINT"];

  constructor(
    private $http: ng.IHttpService,
    public $location: ng.ILocationService,
    public API_ENDPOINT: string
  ) {
    this.$http = $http;
    this.$location = $location;
    this.API_ENDPOINT = API_ENDPOINT;
  }
  token: IAuthToken;

  public getToken(): any {
    let token: string;
    if (!this.token) {
      token = localStorage.getItem("mtoken");
    }
    return JSON.parse(token);
  }

  public saveToken(token: IAuthToken) {
    localStorage.setItem("mtoken", JSON.stringify(token));
    //worked
    //this.$location.path('/');
  }

  public removeToken(): any {
    console.log("Remove token");
    localStorage.removeItem("mtoken");
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getUserDetails(): any {
    const token: IAuthToken = this.getToken();
    let payload;
    if (token) {
      payload = token.token.split(".")[1];
      try {
        payload = atob(payload);
        console.log("payload ", payload);
      } catch (err) {
        console.log("Error ", err);
        return err
      }

      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public logout() {
    console.log("Service Logout");
    this.removeToken();
   // this.$location.path('/');
  }

  public login(credentials: IAuthCredentials) {
    return this.$http.post(
      this.API_ENDPOINT + "/api/authenticate",
      credentials
    );
  }
}


