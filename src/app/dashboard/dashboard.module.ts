import * as angular from 'angular';

import routes from './dashboard.routes';

import dashboardComponent from './dashboard';
import { DashboardService } from './dashboard.service';

export default angular.module('dashboard', [])
    .config(routes)
    .component("dashboard", dashboardComponent)
    .service('dashboardService', DashboardService)
    .name;
