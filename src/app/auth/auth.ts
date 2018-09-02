import { AuthService } from "./auth.service";
import { IAuthCredentials, IAuthToken } from "./auth.interfaces";
import { IHttpResponse } from "angular";

class AuthCtrl {
  constructor(
    private $rootScope: ng.IRootScopeService,
    public $location: ng.ILocationService,
    private authService: AuthService,
    public _: any
  ) {}

  $onInit() {}

  loginModel: IAuthCredentials = {
    username: "",
    password: ""
  };

  public logout(): void {
    console.log("Service Logout");
    this.authService.removeToken();
    this.$location.path('/');
  }

  public sendCredentials(): void {
    this.authService.login(
      this.loginModel
    ).then((authAnswer: IHttpResponse<any>)=>{
      let success: boolean = authAnswer.data.success;

      if (success === true) {
        let user: IAuthToken = {
          username: authAnswer.data.username,
          token: authAnswer.data.token
        };
        console.log("Success true ", user);
        this.authService.saveToken(user);
        this.$location.path('/');
      } else {
        console.log("Error login");
      }
    });
  }
}

AuthCtrl.$inject = ["$rootScope", "$location", "authService", "_"];

export default {
  bindings: {},
  templateUrl: require("./auth.html"),
  controller: AuthCtrl
};
