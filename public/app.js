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
    'tabsService',
   'material.components.eventCalendar'
   ]).config(function ($mdThemingProvider, $mdIconProvider) {
      $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
   $mdIconProvider.iconSet("avatar", 'img/avatar-icons.svg', 128);
   $mdIconProvider
      .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
      .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
   var podsharkOrange;

   podsharkOrange = $mdThemingProvider.extendPalette('orange', {
      '600': '#296490',
      'contrastDefaultColor': 'light'
   });

   $mdThemingProvider.definePalette('podsharkOrange', podsharkOrange);

   $mdThemingProvider.theme('default').primaryPalette('podsharkOrange', {
      'default': '600'
   });
});