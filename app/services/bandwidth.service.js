export default class Bandwidth {
  constructor($http, $q, $window, AppConstants) {
    'ngInject';

    this.$http = $http;
    this.$window = $window;
    this.$q = $q;
    this.AppConstants = AppConstants;
  }

  loadData(from, to) {
    const sessionToken = this.$window.localStorage.getItem('session_token');
    const deferred = this.$q.defer();

    if (!sessionToken || !from || !to) {
      return deferred.promise;
    }

    return this.$http({
      url: `${this.AppConstants.serverDomain}/bandwidth`,
      method: 'POST',
      data: {
        session_token: sessionToken,
        from,
        to,
      },
    }).then(result => result, error => error);
  }
}
