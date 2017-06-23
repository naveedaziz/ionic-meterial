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
      this.tiles = buildGridModel({
         icon: "avatar:svg-",
         title: "Svg-",
         background: ""
      });

      function buildGridModel(tileTmpl) {
         var it, results = [];

         for (var j = 0; j < 10; j++) {

            it = angular.extend({}, tileTmpl);
            it.icon = it.icon + (j + 1);
            it.title = it.title + (j + 1);
            it.span = { row: 1, col: 1 };

            switch (j + 1) {
               case 1:
                  it.background = "red";
                  it.span.row = it.span.col = 2;
                  break;

               case 2: it.background = "green"; break;
               case 3: it.background = "darkBlue"; break;
               case 4:
                  it.background = "blue";
                  it.span.col = 2;
                  break;

               case 5:
                  it.background = "yellow";
                  it.span.row = it.span.col = 2;
                  break;

               case 6: it.background = "pink"; break;
               case 7: it.background = "darkBlue"; break;
               case 8: it.background = "purple"; break;
               case 9: it.background = "deepBlue"; break;
               case 10: it.background = "lightPurple"; break;
               case 11: it.background = "yellow"; break;
            }

            results.push(it);
         }
         return results;
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
