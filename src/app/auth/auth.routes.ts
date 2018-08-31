import * as angular from 'angular';

export default function routes($routeProvider) {
    $routeProvider.when('/auth', { template: "<auth></auth>" });
}
routes.$inject = ['$routeProvider'];