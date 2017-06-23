var router = angular.module('materialApp.routes', ['ui.router']);
router.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    // UI Router States
    // Inserting Page title as State Param
    $stateProvider
        .state('default', {
            url: '/',
            templateUrl: 'default.html',
            params: {
               title: "Welcome To"
            }
        })
       .state('home', {
          url: '/home',
          templateUrl: 'home.html',
          params: {
             title: "Welcome To"
          }
       })
       .state('news', {
          url: '/news',
          templateUrl: 'news.html',
          params: {
             title: "FCC News"
          }
       })
        .state('list', {
            url: '/list',
            templateUrl: '/modules/list/views/list.html',
            controller: 'listCtrl',
            controllerAs: 'List',
            params: {
                title: "List"
            }
        })
        .state('tabs', {
            url: '/tabs',
            templateUrl: '/modules/tabs/views/tabs.html',
            controller: 'tabsCtrl',
            controllerAs: 'Tabs',
            params: {
                title: "Tabs"
            }
        });

    //$locationProvider.html5Mode({ enabled: true, requireBase: false });

});
angular.module('tabsDemoDynamicHeight', ['ngMaterial']);