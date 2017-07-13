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
   .controller('appCtrl', function ($mdSidenav, $stateParams, $rootScope, $mdDialog,$state,$location) {
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
      this.openLink = function(link,params){
         if (link && link.indexOf('http') >= 0){
            window.open(link, '_blank', 'location=yes');
         }else if(link){
            if (params)
                $state.go(link, params );
            else
               $state.go(link);
            //$location.path(link)
         }
      }
      this.pageStatic  = {
         'account': {
                        name: 'Account Office', 
                        address: 'Room # 010, Ground Floor, Ahmad Saeed Administration Building', 
                        phone: 'Tel: (92-42) 99231581-8 Ext: 211, 217, 244', 
                        email: 'fccaccounts@fccollege.edu.pk', 
                        link: 'http://www.fccollege.edu.pk/accounts-office/', 
                        message: 'The Accounts Office deals with tuition fee, its billing and collections, maintaining students’ financial accounts, payments, and refunds.'
                     },
         'academic': {
            name: 'Acadamic Office',
            address: 'Room # 006, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 314',
            email: 'academicoffice@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/academic-office/',
            message: 'The Academic Office is the first place to go if students have questions regarding academics. This includes attendance, academic standing, roll number slips, transfers to or from other institutions and any forms students may need, such as character certificates, equivalence certificates, hope certificates, migration etc.'
         },
         'admission': {
            name: 'Admission Office',
            address: 'Room # 008, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 377, 566',
            email: 'admissions@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/admissions-office/',
            message: 'The Admissions Office is responsible for admitting students through a concentrated recruitment program that reaches both internal and external audiences.'
         },
         'communication': {
            name: 'Communications Office',
            address: 'Room # 217, 2nd Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 322, 324',
            email: 'communications@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/office-communications-publications/',
            message: 'The Communications and Publications Office consults in-house clients on their marketing, publications and communications needs. The Office helps to identify audiences, decides on the most effective communications tools to reach these audiences, facilitates collaborations among different academic and administrative departments, and connects departments to the right FCCU-approved vendors to complete projects.'
         },
         'campus': {
            name: 'Campus Security',
            address: 'Room # 009, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 336',
            email: 'securityreception@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/security-office/',
            message: false
         },
         'career': {
            name: 'Career Services',
            address: 'Room # 011, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 319',
            email: 'careers@fccollege.edu.pk, internships@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/career-servicesinternships-office/',
            message: 'The Career Services Office provides comprehensive guidance and counseling to its students and graduates on career development. It provides consistent assistance to students in finding attractive jobs and internships.'
         },
         
         'financial': {
            name: 'Financial Aid',
            address: 'Room # 011, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 313',
            email: 'financialaid@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/financial-aid-3/',
            message: 'The Financial Aid Office oversees the process of offering scholarships, need-based financial assistance, and Work-Study funds, for eligible entering and continuing students.'
         },
         'information': {
            name: 'Information Commons',
            address: 'Room # 125, 1st Floor, Armacost Science Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 554',
            email: 'library@fccollege.edu.pk',
            link: 'http://library.fccollege.edu.pk/information-commons/',
            message: 'The Information Commons is a learning space that provides comfortable and flexible discussion areas and meeting rooms as well as individual work areas for serious and focused research.This is a one stop shop for users to get printing and publishing support that facilitates the users in finalizing their projects conveniently in one place. Quick and guided access to information resources (online and offline) is provided with high-speed internet, latest computer hardware and utility software'
         },
         'information_tech': {
            name: 'Information Technology Services',
            address: 'Room # 016, 1st Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 250',
            email: 'ithelp@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/it-office/',
            message: 'The Information Technology Office provides the University administrative and academic departments with innovative, customer-centric, IT support and services.'
         },
         'international': {
            name: 'International Education',
            address: 'Room # 013, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 413',
            email: 'ieo@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/international-education-office/',
            message: 'The International Education Office (IEO) at Forman Christian College (A Chartered University) is committed to providing inclusive counseling and advising for extensive opportunities in prestigious foreign universities.'
         },
         'library': {
            name: 'Library',
            address: 'Ewing Memorial Library',
            phone: 'Tel: (92-42) 99231581-8 Ext: 426, 554',
            email: 'library@fccollege.edu.pk',
            link: 'http://library.fccollege.edu.pk/',
            message: 'The Ewing Memorial Library is one of the oldest and best college libraries in Lahore and now fast transforming itself into a state-of-the-art University Library.'
         },
         'library': {
            name: 'Library',
            address: 'Ewing Memorial Library',
            phone: 'Tel: (92-42) 99231581-8 Ext: 426, 554',
            email: 'library@fccollege.edu.pk',
            link: 'http://library.fccollege.edu.pk/',
            message: 'The Ewing Memorial Library is one of the oldest and best college libraries in Lahore and now fast transforming itself into a state-of-the-art University Library.'
         },
         'mercy': {
            name: 'Mercy Health Center',
            address: 'Mercy Health Center,',
            phone: 'Tel: (92-42) 99231581-8 Ext: 413 or 0300 0642006',
            email: 'health@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/mercy-health-center/',
            message: 'The university operates an emergency first response centre services through the Mercy Health Center, an on-campus facility equipped for the routine medical needs of the on-campus residents, day scholars, faculty and staff and has an on-going relationship with the nearby United Christian Hospital for cases that require specialized attention. For emergencies, please call Ext 413 or 0300 0642006 for medical assistance during regular hours of operation.Please save this number in your phone.'
         },
         'quality': {
            name: 'Quality Enhancement Cell',
            address: 'Room # 125, First Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 323',
            email: 'info@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/quality-enhancement-cell/',
            message: 'The Office of Assessment and Institutional Research oversees continuous assessment activities that are done throughout university.  Our Quality Enhancement Cell (QEC) resides in the Office of Assessment and Institutional Research and meets the specifications of the Higher Education Commission of Pakistan.'
         },
         'residential': {
            name: 'Residential Life',
            address: 'Hostel Office behind Armacost Science Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 402',
            email: 'hostels@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/hostel-office/',
            message: 'This Office provides students with comfortable and secure housing in FCCU’s on and off-campus residential facilities.'
         },
         'sports': {
            name: 'Sports',
            address: 'Lucas Center',
            phone: 'Tel: (92-42) 99231581-8 Ext: 312',
            email: 'shoaibbarket@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/sports/',
            message: 'The Sports Office organizes, promotes and conducts games. The Sports Board features a very active intramural sports program with competition in athletics, basketball, cricket, football, hockey, table tennis, wrestling, lawn tennis and swimming.'
         },
         'student': {
            name: 'Student Affairs Office',
            address: 'Room # 010, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 321, 355',
            email: 'dos@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/student-affairs-office/',
            message: 'Student Affairs Office provides support to students throughout their academic career. This includes overseeing the academic advisors, and answering questions regarding courses or general “how to be successful in college” questions.'
         },
         'university': {
            name: 'First Floor, Mercy Health Center',
            address: 'Room # 010, Ground Floor, Ahmad Saeed Administration Building',
            phone: 'Tel: (92-42) 99231581-8 Ext: 554',
            email: 'ucc@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/university-counseling-center/',
            message: 'The UCC is a facility to help students deal with problems which they may not want to discuss with family, friends or their teachers. The Center provides individual and confidential counseling and may refer students to other professionals if needed.'
         },
         'writing': {
            name: 'Writing Center',
            address: false,
            phone: false,
            email: false,
            link: false,
            message: 'FCCU’s Writing Center guides students in their writing and research needs. The facility provides students one-to-one tutoring for their specific writing needs with trained tutors. Students may sign up for appointments or walk-in to meet a tutor at their convenience. The Writing Center also arranges workshops run by experts on different aspects of University level writing and research.'
         },

      }
      this.grids = [
                     {
                        img:'student',name:'People',
                        list:[
                           { name: 'Admissions', img: 'id-card', menu: [], link:'home',params:{page:'admission'}},
                                 {name:'Accounts', img:'check', menu:[],link:'page',params:{page:'account'}},
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
                           { name: 'Financial Aid', img: 'check', menu: [], link: 'http://www.fccollege.edu.pk/financial-aid/' },
                           { name: 'Tuition Fee', img: 'books', menu: [], link:'http://www.fccollege.edu.pk/tuition-fee/' },
                           { name: 'Residential Life', img: 'books', menu: [], link:'http://www.fccollege.edu.pk/residential-life/' },
                        ] },
                     {
                        img: 'calendar', name: 'Event',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [], link:'acadamic-calender' },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]  },
                     {
                        img: 'team', name: 'Campus Services',
                        list: [
                           { name: 'Academic Office', img: 'id-card', menu: [], link: 'page', params: { page: 'academic' } },
                           { name: 'Accounts Office', img: 'check', menu: [], link: 'page', params: { page: 'account' }  },
                           { name: 'Admissions Office', img: 'books', menu: [], link: 'page', params: { page: 'admission' }  },
                           { name: 'Communications Office', img: 'books', menu: [], link: 'page', params: { page: 'communication' }  },
                           { name: 'Cafeteria', img: 'books', menu: [], link: 'page', params: { page: 'cafeteria' }  },
                           { name: 'Campus Security', img: 'books', menu: [], link: 'page', params: { page: 'campus' }  },
                           { name: 'Career Services', img: 'books', menu: [], link: 'page', params: { page: 'career' }  },
                           { name: 'Financial Aid', img: 'books', menu: [], link: 'page', params: { page: 'financial' }  },
                           { name: 'Information Commons', img: 'books', menu: [], link: 'page', params: { page: 'information' }  },
                           { name: 'Information Technology Services', img: 'books', menu: [], link: 'page', params: { page: 'information_tech' }  },
                           { name: 'International Education', img: 'books', menu: [], link: 'page', params: { page: 'international' }  },
                           { name: 'Library', img: 'books', menu: [], link: 'page', params: { page: 'library' }  },
                           { name: 'Mercy Health Center', img: 'books', menu: [], link: 'page', params: { page: 'account' }  },
                           { name: 'Quality Enhancement Cell', img: 'books', menu: [], link: 'page', params: { page: 'quality' }  },
                           { name: 'Residential Life', img: 'books', menu: [], link: 'page', params: { page: 'residential' }  },
                           { name: 'Sports', img: 'books', menu: [], link: 'page', params: { page: 'sports' }  },
                           { name: 'Student Affairs', img: 'books', menu: [], link: 'page', params: { page: 'student' }  },
                           { name: 'University Counseling Center', img: 'books', menu: [], link: 'page', params: { page: 'university' }  },
                           { name: 'Writing Center', img: 'books', menu: [], link: 'page', params: { page: 'writing' }  },

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
    this.selectedTab = 0;
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
