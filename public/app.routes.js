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
          url: '/home/:page',
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
       .state('acadamic-calender', {
          url: '/acadamic-calender',
          templateUrl: 'acdamic-calender.html',
          params: {
             title: "FCC News"
          }
       })
       .state('events', {
          url: '/event/:page',
          templateUrl: 'events.html',
          params: {
             title: "FCC News"
          }
       })
       .state('eventlist', {
          url: '/event_list',
          templateUrl: 'event.html',
          params: {
             title: "FCC News"
          }
       })
       .state('acadamic', {
          url: '/acadamic/:page',
          templateUrl: 'acadamic.html',
          params: {
             title: "FCC News"
          }
       })
       .state('page', {
          url: '/page/:page',
          templateUrl: 'page.html',
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