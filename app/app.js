import angular from 'angular';
import './assets/css/app.scss';

import angularUiRouter from 'angular-ui-router';
import angularUiBootstrap from 'angular-ui-bootstrap';
import angularMoment from 'angular-moment';
import c3Angular from './directives/c3-angular-directives';
import routing from './app.router';
import dash from './components/dash';
import services from './services';
import constants from './app.constants';

angular
  .module('app', [angularUiRouter, angularUiBootstrap, angularMoment, dash, c3Angular, services, constants])
  .config(routing)
  .run(($templateCache) => {
    $templateCache.put('dash.view.html', require('./components/dash/dash.view.html'));
    $templateCache.put('layout.view.html', require('./shared/layout.view.html'));
  })
  
