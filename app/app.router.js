export default function routes($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout.view.html',
      resolve: {
        auth: User => User.auth(),
      },
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
}
