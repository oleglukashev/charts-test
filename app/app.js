import angular from 'angular';
import './assets/css/app.scss';

import angularUiRouter from 'angular-ui-router';
import angularUiBootstrap from 'angular-ui-bootstrap';
import angularAnimate from 'angular-animate';
import angularMoment from 'angular-moment';
import c3Angular from './directives/c3-angular-directives';
import routing from './app.router';
import dash from './components/dash';
import headerController from './shared/header/header.controller';
import services from './services';
import constants from './app.constants';

angular
  .module('app', [angularUiRouter, angularUiBootstrap, angularMoment, angularAnimate, dash,
    c3Angular, services, constants])
  .config(routing)
  .controller('HeaderCtrl', headerController)
  .run(($templateCache) => {
    $templateCache.put('header.view.html', require('./shared/header/header.view.html'));
    $templateCache.put('dash.view.html', require('./components/dash/dash.view.html'));
    $templateCache.put('layout.view.html', require('./shared/layout.view.html'));
  });

