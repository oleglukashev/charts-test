import angular from 'angular';
import routing from './dash.route';
import controller from './dash.controller';

export default angular.module('app.dash', [])
  .config(routing)
  .controller('DashCtrl', controller)
  .name;
