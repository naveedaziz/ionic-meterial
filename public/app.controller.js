angular.module('appCtrl', [])
   .controller('DialogController', function ($mdSidenav, $stateParams, $rootScope, $mdDialog) {

   this.hide = function () {
      $mdDialog.hide();
   };

   this.cancel = function () {
      $mdDialog.cancel();
   };
   this.close = function () {
      $mdDialog.cancel();
   };

   this.answer = function (answer) {
      $mdDialog.hide(answer);
   };
})
   .controller('appCtrl', function ($mdSidenav, $stateParams, $rootScope, $mdDialog,$state) {
      this.events = [
         {
            start: getDate(-6, 10),
            end: getDate(-6, 11),
            title: 'Event 1'
         },
         {
            start: getDate(0, 10),
            end: getDate(1, 11),
            title: 'Event 1'
         },
         {
            start: getDate(1, 11),
            end: getDate(2, 12),
            title: 'Event 2'
         },
         {
            start: getDate(2, 12),
            end: getDate(3, 13),
            title: 'Event 3'
         },
         {
            start: getDate(4, 12),
            end: getDate(5, 13),
            title: 'Event 4'
         },
         {
            start: getDate(5, 12),
            end: getDate(6, 13),
            title: 'Event 5'
         },
         {
            start: getDate(6, 12),
            end: getDate(6, 13),
            title: 'Event 6'
         },
         {
            start: getDate(6, 12),
            allDay: true,
            title: 'Event 7'
         },




         {
            start: getDate(8, 12),
            end: getDate(8, 13),
            title: 'Event 5'
         },
         {
            start: getDate(8, 12),
            end: getDate(8, 13),
            title: 'Event 6'
         },
         {
            start: getDate(8, 12),
            allDay: true,
            title: 'Event 7'
         }
      ];
      this.selected = this.events[0];

      this.eventClicked = function (item) {
         console.log(item);
      };

      this.createClicked = function (date) {
         console.log(date);
      };

      function getDate(offsetDays, hour) {
         offsetDays = offsetDays || 0;
         var offset = offsetDays * 24 * 60 * 60 * 1000;
         var date = new Date(new Date().getTime() + offset);
         if (hour) { date.setHours(hour); }
         return date;
      }


      this.dis = false;
  // $timeout(function () {
  //   $scope.events.push({
  //     date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
  //     label: 'Event Three'
  //   });
  // }, 1000)
      this.openLink = function(link){
         if (link && link.indexOf('http') >= 0){
            if (cordova && cordova.InAppBrowser){
                  cordova.InAppBrowser.open(url, target, options);   
            }else{
                   window.open(link, '_new');
            }
         }else if(link){
            $location.path(link)
         }
      }
      this.grids = [
                     {
                        img:'student',name:'People',
                        list:[
                           { name: 'Admissions', img:'id-card', menu:[]},
                                 {name:'Accounts', img:'check', menu:[]},
                                 { name: 'Academics', img: 'books', menu: [] },
                                 { name: 'Empower Troubleshooting', img: 'bell', menu: [] },
                                 { name: 'University Counseling Center', img: 'glasses', menu: [] },
                                 { name: 'Mercy Health Center', img: 'heart', menu: [] },
                                 { name: 'Communications Office', img: 'phone-receiver', menu: [] },
                             ]
                     },
                     {
                        img: 'news-report', name: 'News', 
                        list: [
                           { name: 'Latest News 1', img: 'id-card', menu: [] },
                           { name: 'Latest News 1', img: 'check', menu: [] },
                           { name: 'Latest News 1', img: 'books', menu: [] },
                        ]
                     },
                     {
                        img: 'school', name: 'Admission',
                        list: [
                           { name: 'Apply Now', img: 'id-card', menu: [], link:'http://www.fccollege.edu.pk/apply-now/' },
                           { name: 'Financial Aid', img: 'check', menu: [] },
                           { name: 'Tuition Fee', img: 'books', menu: [] },
                           { name: 'Residential Life', img: 'books', menu: [] },
                        ] },
                     {
                        img: 'calendar', name: 'Event',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]  },
                     {
                        img: 'team', name: 'Campus Services',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   },
                     {
                        img: 'blackboard', name: 'Courses',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   },
                     {
                        img: 'professor', name: 'Jobs',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   },
                     {
                        img: 'boss', name: 'Society',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   },
                     {
                        img: 'support', name: 'Support FCCU',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   },
                     {
                        img: 'photo-camera', name: 'Photos',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   }, 
                     {
                        img: 'network', name: 'Social',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   }, 
                     {
                        img: 'contact', name: 'Contact',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   }, 
                  ]
      this.urlParser = function (str) {
         var rep = '-';
         str = str.toLowerCase()
            .replace(/\s+/g, rep) // replace whitespace
         // remove accents, swap ñ for n, etc
         var from = "àáäâèéëêìíïîòóöôùúüûñç";
         var to = "aaaaeeeeiiiioooouuuunc";
         for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(
               new RegExp(from.charAt(i), 'g'),
               to.charAt(i)
            );
         }
         // remove invalid chars
         str = str.replace(new RegExp('[^a-z0-9-' + rep + ']', "g"), '')
            .replace(/-+/g, rep); // collapse dashes;

         return str;
      }
     this.stateLoader = function(pageType){
        if (pageType == 'page'){
           console.log($state)
           this.pageName = this.urlParser($state.$current.url.prefix);
        }else{
           this.pageName = $state.params.page;
        }
        
     }
     this.showAdvanced = function (ev) {
        console.log(ev);
         $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
         })
            .then(function (answer) {
               this.status = 'You said the information was "' + answer + '".';
            }, function () {
               this.status = 'You cancelled the dialog.';
            });
      };
     
   var originatorEv;
   this.todos = [];
   var imagePath = 'img/60.jpeg';
   for (var i = 0; i < 15; i++) {
      this.todos.push({
         face: imagePath,
         what: "News Heading",
         who: "Min Li Chan",
         notes: "I'll be in your neighborhood doing errands."
      });
   }
   this.openMenu = function ($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
   };

   this.notificationsEnabled = true;
   this.toggleNotifications = function () {
      this.notificationsEnabled = !this.notificationsEnabled;
   };

   this.redial = function () {
      $mdDialog.show(
         $mdDialog.alert()
            .targetEvent(originatorEv)
            .clickOutsideToClose(true)
            .parent('body')
            .title('Suddenly, a redial')
            .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
            .ok('That was easy')
      );

      originatorEv = null;
   };

   this.checkVoicemail = function () {
      // This never happens.
   };
    self = this;

    // Update title using rootscope
    self.updateTitle = function() {
        $rootScope.title = $stateParams.title;
    }

    // Run updateTitle on each state change
    $rootScope.$on('$stateChangeSuccess', self.updateTitle);

	self.toggleLeft = function() {
    	$mdSidenav('left').toggle();
    }

    self.toggleRight = function() {
    	$mdSidenav('right').toggle();
    }

})
