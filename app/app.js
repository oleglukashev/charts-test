import angular from 'angular';
import './assets/css/app.styl';

import angularUiRouter from 'angular-ui-router';
import c3Angular from './directives/c3-angular-directives';
import routing from './app.router';
import dash from './components/dash';

angular
  .module('app', [angularUiRouter, dash, c3Angular])
  .config(routing)
  .run(($templateCache) => {
    $templateCache.put('dash.view.html', require('./components/dash/dash.view.html'));
  })
  
