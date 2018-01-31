export default class Bandwidth {
  constructor($http, $q, $window) {
    'ngInject';

    this.$http = $http;
    this.$window = $window;
    this.$q = $q;
  }

  loadData(from, to) {
    const sessionToken = this.$window.localStorage.getItem('session_token');
    const deferred = this.$q.defer();

    if (!sessionToken || !from || !to) {
      deferred.promise;
    }

    return this.$http({
      url: `http://localhost:3000/bandwidth`,
      method: 'POST',
      data: {
        session_token: sessionToken,
        from: from,
        to: to,
      },
    }).then((result) => {
      return result;
    }, (error) => {
      return error;
    });
  }
}
