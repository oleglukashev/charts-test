import angular from 'angular';
import routing from './dash.route';
import controller from './dash.controller';
import DashChartsFactory from './dash.charts.factory';

export default angular.module('app.dash', [])
  .config(routing)
  .factory('DashChartsFactory', DashChartsFactory, ['moment', 'AppConstants'])
  .controller('DashCtrl', controller)
  .name;
