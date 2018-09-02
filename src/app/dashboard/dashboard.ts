class DashboardCtrl {
   constructor(
       private $rootScope: ng.IRootScopeService
   ) {
   }

   $onInit() {
   }

}

DashboardCtrl.$inject = ["$rootScope"];

export default {
   bindings: {},
   templateUrl: require("./dashboard.html"),
   controller: DashboardCtrl
}