import * as angular from "angular";
import * as ngRoute from "angular-route";
import * as ngAnimate from "angular-animate";
import * as ngAria from "angular-aria";
import * as ngMaterial from "angular-material";
import "angular-material/angular-material.scss";
import "hammerjs";
import * as hmTouchEvents from "angular-hammer";
import * as _ from "underscore";
import "./assets/style.scss";
import routes from "./app.routes";
import mainModule from "./app/main/main.module";
import homeModule from "./app/home/home.module";
import dashboardModule from "./app/dashboard/dashboard.module";
import authModule from "./app/auth/auth.module";
import { AuthService } from "./app/auth/auth.service";

angular.module("app", [
  ngRoute,
  ngAnimate,
  ngAria,
  ngMaterial,
  hmTouchEvents,
  mainModule,
  homeModule,
  dashboardModule,
  authModule
]);
angular.module("app").config(routes);

angular.module("app").config([
  "$mdThemingProvider",
  function($mdThemingProvider) {
    $mdThemingProvider
      .theme("blue")
      .primaryPalette("blue")
      .accentPalette("red");

    $mdThemingProvider
      .theme("green")
      .primaryPalette("teal")
      .accentPalette("red");

    $mdThemingProvider.alwaysWatchTheme(true);
  }
]);

angular.module("app").config([
  "$compileProvider",
  function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
  }
]);


angular
  .module("app")
  .constant("_", ((<any>window)._ = _))
  .service("AuthService", AuthService)
  .run([
    "$rootScope",
    "AuthService",
    "$location",
    function($rootScope, AuthService, $location) {
      $rootScope._ = (<any>window)._ = _;

      $rootScope.$on("$routeChangeStart", function(event) {
        console.log("Event fire ")
        if (!AuthService.isLoggedIn()) {
          console.log("DENY");
          $location.path("/auth");
        } else {
          console.log("ALLOW");
          if ($location.path() === "/auth") {
            $location.path("/");
            event.preventDefault();
          }
        }
      });
    }
  ]);



angular.bootstrap(document, ["app"]);
