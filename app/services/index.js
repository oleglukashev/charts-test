import angular from 'angular';
import UserService from './user.service'
import BandwidthService from './bandwidth.service'

export default angular.module('app.services', [])
  .service('User', UserService)
  .service('Bandwidth', BandwidthService)
  .name;
