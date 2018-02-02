export default class HeaderCtrl {
  constructor(User, $window) {
    'ngInject';

    this.User = User;
    this.isLoggedIn = false;

    const sessionToken = $window.localStorage.getItem('session_token');
    if (sessionToken) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.User.logout().then(() => {
      this.isLoggedIn = false;
    });
  }

  auth() {
    this.User.auth().then(() => {
      this.isLoggedIn = true;
    });
  }
}
