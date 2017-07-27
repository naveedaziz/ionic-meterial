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
             title: "Home"
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
             title: "FCC Acadamic Calender"
          }
       })
       .state('events', {
          url: '/event/:page',
          templateUrl: 'events.html',
          params: {
             title: "FCC Events"
          }
       })
       .state('eventlist', {
          url: '/event_list',
          templateUrl: 'event.html',
          params: {
             title: "FCC Events"
          }
       })
       .state('acadamic', {
          url: '/acadamic/:page',
          templateUrl: 'acadamic.html',
          params: {
             title: "FCC Courses"
          }
       })
       .state('social', {
          url: '/social',
          templateUrl: 'social.html',
          params: {
             title: "FCC Social"
          }
       })
       .state('societies', {
          url: '/societies',
          templateUrl: 'societies.html',
          params: {
             title: "FCC Society"
          }
       })
       .state('page', {
          url: '/page/:page',
          templateUrl: 'page.html',
          params: {
             title: "FCC Campus Information"
          }
       })
       .state('campus', {
          url: '/campus',
          templateUrl: 'campus.html',
          params: {
             title: "FCC Campus"
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