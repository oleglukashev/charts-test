export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.dash', {
      url: '/',
      template: require('./dash.view.html'),
      controller: 'DashCtrl',
      controllerAs: 'dash'
    });
}
