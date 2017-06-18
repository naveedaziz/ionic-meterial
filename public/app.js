var materialApp = angular
.module('materialApp', [
    'materialApp.routes',
    'ui.router',
    'ngMaterial',
    'appCtrl',
    'cardsCtrl',
    'cardsService',
    'listCtrl',
    'listService',
    'tabsCtrl',
    'tabsService'
]).config(function($mdThemingProvider) {
   var podsharkOrange;

   podsharkOrange = $mdThemingProvider.extendPalette('orange', {
      '600': '#253b80',
      'contrastDefaultColor': 'light'
   });

   $mdThemingProvider.definePalette('podsharkOrange', podsharkOrange);

   $mdThemingProvider.theme('default').primaryPalette('podsharkOrange', {
      'default': '600'
   });
});