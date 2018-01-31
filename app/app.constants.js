import angular from 'angular';

export default angular.module('app.constants', [])
  .constant('AppConstants', {
    colors: {
      lightBlue: '#4FBCF2',
      darkBlue: '#3AA0D3',
      berry: '#B2125C',
      greyBlack: '#324147',
      deepOrange: '#E65F00',
      purple: '#3AA0D3',
      green: '#458741',
      lightGrey: '#747C93',
      paleGrey: '#ECF2F6',
    },
  })
  .name;
