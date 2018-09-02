import * as angular from 'angular';

export default function routes($routeProvider) {
    $routeProvider.when('/dashboard', { template: "<dashboard></dashboard>" });
}
routes.$inject = ['$routeProvider'];