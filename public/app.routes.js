var router = angular.module('materialApp.routes', ['ui.router']);
router.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    // UI Router States
    // Inserting Page title as State Param
    $stateProvider
        .state('default', {
           url: '/',
            templateUrl: 'default.html',
            
        })
      //  .state('home', {
      //     url: '/home/:page',
      //     templateUrl: 'home.html',
      //     params: {
      //        title: "Home"
      //     }
      //  })
       .state('news', {
          url: '/news',
          templateUrl: 'news.html',
          params: {
             title: "News"
          }
       })
       .state('acadamic-calender', {
          url: '/acadamic-calender',
          templateUrl: 'acdamic-calender.html',
          params: {
             title: "Acadamic Calender"
          }
       })
       .state('events', {
          url: '/event/:page',
          templateUrl: 'events.html',
          params: {
             title: "Events"
          }
       })
       .state('eventlist', {
          url: '/event_list',
          templateUrl: 'event_list.html',
          params: {
             title: "Events"
          }
       })
       .state('acadamic', {
          url: '/acadamic/:page',
          templateUrl: 'acadamic.html',
          params: {
             title: "Academics"
          }
       })
       .state('social', {
          url: '/social',
          templateUrl: 'social.html',
          params: {
             title: "Connect With Us"
          }
       })
       .state('societies', {
          url: '/societies',
          templateUrl: 'societies.html',
          params: {
             title: "Society"
          }
       })
       .state('insta', {
          url: '/insta',
          templateUrl: 'insta.html',
          params: {
             title: "Photos"
          }
       })
       .state('page', {
          url: '/page/:page',
          templateUrl: 'page.html',
          params: {
             title: "page"
          }
       })
       .state('blog', {
          url: '/blog/list',
          templateUrl: 'blog.html',
          params: {
             title: "Blog"
          }
       })
       .state('blogdetails', {
          url: '/blogs/:page',
          templateUrl: 'blog_details.html',
          params: {
             title: "Blog"
          }
       })
       .state('campus', {
          url: '/campus',
          templateUrl: 'campus.html',
          params: {
             title: "Student Services"
          }
       })
       .state('jobs', {
          url: '/jobs',
          templateUrl: 'jobs.html',
          params: {
             title: "Jobs"
          }
       })
       .state('support', {
          url: '/support',
          templateUrl: 'support.html',
          params: {
             title: "Support"
          }
       })
       .state('admission', {
          url: '/admission',
          templateUrl: 'admission.html',
          params: {
             title: "Admission"
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