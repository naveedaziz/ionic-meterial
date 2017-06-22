angular.module('appCtrl', [])
.controller('appCtrl', function($mdSidenav, $stateParams, $rootScope) {
   this.selectedIndex = 0;
   
   this.onSwipeRight = function (tab_num) {
      console.log(tab_num)
      if (tab_num < 0) {
         return;
      }
      this.selectedIndex = tab_num;
   }

   this.onSwipeLeft = function (tab_num) {
      console.log(tab_num)
      if (tab_num > 4) {
         //l is number of tabs I have
         return;
      }
      this.selectedIndex = tab_num;
   }
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
