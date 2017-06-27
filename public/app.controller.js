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
   .controller('appCtrl', function ($mdSidenav, $stateParams, $rootScope, $mdDialog) {
      
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
                        img: 'news-report', name: 'News', list: [
                           { name: 'Admissions', img: 'id-card', menu: [] },
                           { name: 'Accounts', img: 'check', menu: [] },
                           { name: 'Academics', img: 'books', menu: [] },
                           { name: 'Empower Troubleshooting', img: 'bell', menu: [] },
                           { name: 'University Counseling Center', img: 'glasses', menu: [] },
                           { name: 'Mercy Health Center', img: 'heart', menu: [] },
                           { name: 'Communications Office', img: 'phone-receiver', menu: [] },
                        ]},
                     { img: 'school', name: 'Admission' },
                     { img: 'calendar', name: 'Event' },
                     { img: 'team', name: 'Campus Services' },
                     { img: 'blackboard', name: 'Courses' },
                     { img: 'professor', name: 'Jobs' },
                     { img: 'boss', name: 'Society' },
                     { img: 'support', name: 'Support FCCU' },
                     { img: 'photo-camera', name: 'Photos' }, 
                     { img: 'network', name: 'Social' }, 
                     { img: 'contact', name: 'Contact' }, 
                  ]
     
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
         what: "Brunch this weekend?",
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
