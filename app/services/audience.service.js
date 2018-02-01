export default class Auidience {
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
      return deferred.promise;
    }

    return this.$http({
      url: `http://localhost:3000/audience`,
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
