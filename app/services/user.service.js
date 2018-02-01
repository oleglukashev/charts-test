export default class User {
  constructor($http, $q, $window, AppConstants) {
    'ngInject';

    this.$http = $http;
    this.$window = $window;
    this.$q = $q;
    this.AppConstants = AppConstants;
  }

  auth() {
    const sessionToken = this.$window.localStorage.getItem('session_token');
    const deferred = this.$q.defer();

    if (sessionToken) {
      return deferred.resolve(true);
    }

    return this.$http({
      url: `${this.AppConstants.serverDomain}/auth`,
      method: 'POST',
      data: {
        identifiant: 'urtoob',
        password: 'ToobRU',
      },
    }).then((result) => {
      if (result && result.data && result.data.session_token) {
        this.$window.localStorage.setItem('session_token', result.data.session_token);
      }

      return deferred.resolve(true);
    }, () => deferred.resolve(false));
  }

  logout() {
    const sessionToken = this.$window.localStorage.getItem('session_token');
    const deferred = this.$q.defer();

    if (!sessionToken) {
      return deferred.resolve(false);
    }

    return this.$http({
      url: `${this.AppConstants.serverDomain}/logout`,
      method: 'POST',
      data: {
        session_token: sessionToken,
      },
    }).then(() => {
      this.$window.localStorage.setItem('session_token', null);
      return deferred.resolve(true);
    }, () => deferred.resolve(false));
  }
}
