export default class Dash {
  constructor($http, $q) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
  }

  loadBandwidth1() {
    return this.$http({
      url: `bandwidth1.json`,
      method: 'GET',
    }).then(result => result.data);
  }

  loadBandwidth2() {
    return this.$http({
      url: `bandwidth2.json`,
      method: 'GET',
    }).then(result => result.data);
  }
}
