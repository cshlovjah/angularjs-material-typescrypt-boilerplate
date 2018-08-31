import * as angular from 'angular';
import './auth.css';
import routes from './auth.routes';

import authComponent from './auth';
import { AuthService } from './auth.service';

export default angular.module('auth', [])
    .config(routes)
    .component("auth", authComponent)
    .service('authService', AuthService)
    .constant('API_ENDPOINT', 'http://localhost:3000')
    .name;
