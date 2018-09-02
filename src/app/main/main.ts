interface IMenu {
    link: string,
    title: string,
    icon: string
}

class MainCtrl {
    constructor(
        private $scope: ng.IScope,
        private $mdSidenav: ng.material.ISidenavService,
        public $location: ng.ILocationService,
        public $window: ng.IWindowService,
        private AuthService: any,
        private AuthState: boolean
    ) {
        this.$scope.$on('update-theme', (event, args) => {
            this.currentTheme = args;
        });
    }

    $onInit(): void {
        this.AuthState = this.auth();
        console.log(this.AuthState)
    }

    currentTheme: string = "green";

    menu: Array<IMenu> = [
        { link: "home", title: "Home", icon: "home" },
        { link: "dashboard", title: "Dashboard", icon: "dashboard" },
        { link: "auth", title: "Auth", icon: "input" }
    ];

    toggleNav(): void {
        this.$mdSidenav("left").toggle();
    }

    openNav(): void {
        this.$mdSidenav("left").open();
    }

    closeNav(): void {
        this.$mdSidenav("left").close();
    }

    goTo(link: string) {
        this.$mdSidenav("left").close();
        this.$location.path(link);
    }

    auth(): boolean {
        return this.AuthService.isLoggedIn();
    }

    logout(): void {
        console.log("Logout");
        this.AuthService.logout();
        this.$location.path('/auth');
    }
}

MainCtrl.$inject = ["$scope", "$mdSidenav", "$location", "$window", "AuthService"];

export default {
    bindings: { title: "=" },
    templateUrl: require("./main.html"),
    controller: MainCtrl
}