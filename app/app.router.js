export default function routes($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  $stateProvider
    .state('app', {
      abstract: true,
      template: '<div ui-view></div>',
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
}
