export default class User {
  constructor($http, $q, $window) {
    'ngInject';

    this.$http = $http;
    this.$window = $window;
    this.$q = $q;
  }

  auth() {
    const sessionToken = this.$window.localStorage.getItem('session_token');
    const deferred = this.$q.defer();

    if (sessionToken) {
      return deferred.resolve(true);
    }

    return this.$http({
      url: `http://localhost:3000/auth`,
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
    }, (error) => {
      return deferred.resolve(false);
    });
  }

  logout() {
    const sessionToken = this.$window.localStorage.getItem('session_token');
    const deferred = this.$q.defer();

    if (!sessionToken) {
      return deferred.resolve(false);
    }

    return this.$http({
      url: `http://localhost:3000/logout`,
      method: 'POST',
      data: {
        session_token: sessionToken,
      },
    }).then((sessionToken) => {
      this.$window.localStorage.setItem('session_token', null);
      return deferred.resolve(true);
    }, (error) => {
      return deferred.resolve(false);
    });
  }

  // logout() {
  //   this.current = null;
  //   this.JWT.destroy();
  //   this.removeDefaultCompany();
  //   this.$state.go('auth.login', null, { reload: true });
  // }

  // getInfo() {
  //   let deferred = this.$q.defer();

    

  //   return deferred.promise;
  // }

  // ensureAuth() {
  //   const deferred = this.$q.defer();

  //   this.verifyAuth().then((authValid) => {
  //     if (authValid === true) {
  //       deferred.resolve(true);
  //     } else {
  //       this.$state.go('auth.login');
  //       deferred.resolve(false);
  //     }
  //   });

  //   return deferred.promise;
  // }
}
