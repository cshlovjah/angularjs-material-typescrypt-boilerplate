import { IAuthCredentials } from './auth.interfaces';
import { AuthService } from './auth.service';

class AuthCtrl {
   constructor(
      private $rootScope: ng.IRootScopeService,
      private authService: AuthService,
      public _: any
   ) {
   }

   $onInit() {
   }

   loginModel: IAuthCredentials = {
      username: "",
      password: ""
   };

   sendCredentials() {
      console.log(this.loginModel);
      //Send user credentials to autService
      this.authService.request(this.loginModel);
   };
}

AuthCtrl.$inject = ["$rootScope", "authService", "_"];

export default {
   bindings: {},
   templateUrl: require("./auth.html"),
   controller: AuthCtrl
}