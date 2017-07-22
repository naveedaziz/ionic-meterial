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
      
      this.courses = [
         { name: 'Faculty of Business and Economics', image: 'img/department/department.jpg',
           departments:[
              { name: 'Department of Business', image: 'img/department/department.jpg',
                 courses: [
                    { name: 'Baccalaureate (Hons) in Business',
                       intro:'The department of Business offers a 4-year degree program in Business with five specializations.',
                        degrees:[
                            {
                             name: 'BS (Hons) Business', description: 'The 4-year degree has a strong emphasis on developing skill and confidence and currently offers specializations in Accounting and Finance, Operations Management and Marketing and Sales Management, and Human Resource Management. The program has been designed to ensure that students understand best practice in business and function efficiently in the practical world. The course contents intend to provide the right balance between academics and real world application. Students take core (required) courses throughout the four years of the program and begin to take courses in their areas of specialization from the third year. Business students are expected to maintain a minimum CGPA of 2.0 during the program. However, they are expected to maintain a higher CGPA in their major. Students take 72 credit hours in their business major (66 in taught courses and six in the mandatory Internship) as well as 51 credit hours in General Education and 15 in free electives (six of which are for the Summer Internship).The choice of specialization is made in the second year.',
                             link:'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Roadmap-for-BS-Hons-Business.pdf'
                            }
                         ] 
                     },
                    { name: 'Postgraduate in Business',
                       intro: 'The postgraduate programs in Business aim to develop the functional competence any contemporary manager is expected to have in today’s increasingly global business environment. The programs have a general management orientation without compromising any essentials of the core functional areas. The Executive MBA has been designed for optimal flexibility while retaining the rigor of comparable international programs.',
                       degrees: [
                          {
                             name: 'Masters in Business Administration', description: 'This is a two-year program with a general management focus. The program aims to develop high-quality professionals who will be agents of change through a combination of their creativity, initiative, competence and adaptability. The learning experience is highly interactive and offers the best mix of cases, simulations, and lectures to ensure that students gain both from theory and best practice of business. There is a strong emphasis on understanding and managing the modern enterprise in the Pakistani environment. The key to this is the varied experience of the SoM faculty.',
                             link: 'http://www.fccollege.edu.pk/wp-content/uploads/2015/12/Roadmap-for-MBA.pdf'
                          },
                          {
                             name: 'Executive Masters in Business Administration', description: 'The Executive MBA is a two-year modular, evening program. The Executive MBA has a unique structure. A total of 66 credit hours are earned through 14 modules and one project. The 14th and final module includes a Business Simulation game which will enable the students to apply all the concepts learnt during the entire program. Therefore, this module is 6 credit hours. Students will also be required to undertake a project under the supervision of a faculty advisor. This project will be spread out over a period of almost one year and is 8 credit hours.',
                             link: 'http://www.fccollege.edu.pk/wp-content/uploads/2015/12/Roadmap-for-EMBA.pdf'
                          }
                       ] }
                 ]
               },
              { name: 'Department of Economics', image: 'img/department/Ecomonics.jpg',
                 courses: [
                    { name: 'Baccalaureate (Hons) in Economics' },
                    { name: 'Postgraduate in Economics' }
                 ]
               }
           ] },
         { name: 'Faculty of Computer Science & Mathematics', image: 'img/department/Ecomonics.jpg' ,
            departments:[
               { name: 'Department of Computer Science', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate(Hons) in Computer Sciences' },
                     { name: 'MS Computer Science' }
                  ]
                   },
               { name: 'Department of Mathematics', image: 'img/department/Ecomonics.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Mathematics' }
                  ] },
               { name: 'Department of Statistics', image: 'img/department/Ecomonics.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Statistics' },
                  ] },
            ] },
         { name: 'Faculty of Education', image: 'img/department/Ecomonics.jpg' ,
            departments:[
               { name: 'Department of Education', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Education' }
                  ] }
            ] },
         { name: 'Faculty of Humanities', image: 'img/department/Ecomonics.jpg',
            departments: [
               { name: 'Department of English', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in English' },
                     { name: 'Postgraduate in English' },
                  ] },
               { name: 'Department of Mass Communication', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Mass Communication' }
                  ]  },
               { name: 'Department of Philosophy', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Philosophy' }
                  ] },
               { name: 'Department of Religious Studies', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Religious Studies' }
                  ] },
               { name: 'Department of Urdu', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Urdu' }
                  ] },
            ]
         },
         {
            name: 'Faculty of Natural & Physical Sciences', image: 'img/department/Ecomonics.jpg',
            departments: [
               { name: 'Department of Biological Sciences', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Biological Sciences' },
                     { name: 'Postgraduate in Biological Sciences' }
                  ] },
               { name: 'Department of Chemistry', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Chemistry' },
                     { name: 'Postgraduate in Chemistry' }
                  ] },
               { name: 'Department of Physics', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Physics' },
                     { name: 'Postgraduate in Physics' }
                  ] },
               { name: 'Department of Environmental Sciences', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Environmental Sciences' },
                     { name: 'Postgraduate in Environmental Sciences' }
                  ] },
               { name: 'Bioinformatics Program', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Bioinformatics' }
                  ] },
               { name: 'Department of Pharmacy', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Doctor of Pharmacy (PharmD) Program' }
                     ]},
            ]
         },
         {
            name: 'Faculty of Social Sciences', image: 'img/department/Ecomonics.jpg',
            departments: [
               { name: 'Department of Geography', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Geography' }
                  ] },
               { name: 'Department of History', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in History' }
                  ] },
               { name: 'Department of Political Science', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Political Science' },
                     { name: 'Postgraduate in Political Science' }
                  ] },
               { name: 'Department of Psychology', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Political Science' },
                     { name: 'Postgraduate in Political Science' }
                  ] },
               { name: 'Department of Sociology', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate(Hons) in Psychology' },
                     ]},
            ]
         },
      ]
      this.events = [
         {
            start: getDate(-6, 10),
            end: getDate(-6, 11),
            venue:'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description:'  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker:'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details:'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
         },
         {
            start: getDate(0, 10),
            end: getDate(1, 11),
            venue: 'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description: '  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker: 'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details: 'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
         },
         {
            start: getDate(1, 11),
            end: getDate(2, 12),
            venue: 'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description: '  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker: 'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details: 'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
         },
         {
            start: getDate(2, 12),
            end: getDate(3, 13),
            venue: 'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description: '  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker: 'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details: 'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
         },
         {
            start: getDate(4, 12),
            end: getDate(5, 13),
            venue: 'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description: '  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker: 'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details: 'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
         },
         {
            start: getDate(5, 12),
            end: getDate(6, 13),
            venue: 'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description: '  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker: 'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details: 'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
         },
         {
            start: getDate(6, 12),
            end: getDate(6, 13),
            venue: 'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description: '  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker: 'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details: 'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
         },
         {
            start: getDate(6, 12),
            allDay: true,
            venue: 'E-038',
            title: '19 Students Selected for International University Exchange Program',
            short_description: '  International Education Office alongwith Student Affairs Department team would like to congratulate all of our students who have been selected to study abroad on a semester exchange program. Sixteen Baccalaureate (Hons) students have been selected for International University Exchange Program. Two of our Postgraduate students have been nominated for E+ICM exchange Grant to Middlesex for their Research',
            speaker: 'Faham Ahmad',
            image: 'img/events/event.png',
            speaker_details: 'Faham Ahmad is currently serving as the Director HR at PepsiCo International. With over 10 years of HR Management experience across various organizations, Faham has managed to establish his identity in the world of HR.'
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
         'contact': {
            name: 'Contact Us',
            address: 'Forman Christian College Ferozepur Road Lahore 54600 Pakistan',
            phone: 'Tel: +92(42) 9923 1581 upto 88',
            email: 'contact@fccollege.edu.pk',
            link: 'http://fccollege.edu.pk',
            message: 'Please feel free to contact us any time'
         },

      }
      this.grids = [
                     {
            img: 'student', name: 'People', link: 'home', params: { page: 'people' },
                        list:[
                           { name: 'Admissions', img: 'id-card', menu: [], link:'home',params:{page:'admission'}},
                           { name: 'Accounts', img: 'check', menu: [], link:'http://www.fccollege.edu.pk/accounts-office/'},
                                 { name: 'Academics', img: 'books', menu: [], link:'acadamic-calender' },
                                 { name: 'Empower Troubleshooting', img: 'bell', menu: [], link:'http://www.fccollege.edu.pk/empower-web-module/' },
                                 { name: 'University Counseling Center', img: 'glasses', menu: [], link:'http://www.fccollege.edu.pk/university-counseling-center-staff/' },
                                 { name: 'Mercy Health Center', img: 'heart', menu: [], link:'http://www.fccollege.edu.pk/mercy-health-center-2/' },
                                 { name: 'Communications Office', img: 'phone-receiver', menu: [], link:'http://www.fccollege.edu.pk/office-communications-publications/' },
                             ]
                     },
                     {
                        img: 'news-report', name: 'News',link:'news', 
                        list: [
                           { name: 'Latest News 1', img: 'id-card', menu: [] },
                           { name: 'Latest News 1', img: 'check', menu: [] },
                           { name: 'Latest News 1', img: 'books', menu: [] },
                        ]
                     },
                     {
                        img: 'school', name: 'Admission', link: 'home', params: { page: 'admission' },
                        list: [
                           { name: 'Apply Now', img: 'id-card', menu: [], link:'http://www.fccollege.edu.pk/apply-now/' },
                           { name: 'Financial Aid', img: 'check', menu: [], link: 'http://www.fccollege.edu.pk/financial-aid/' },
                           { name: 'Tuition Fee', img: 'books', menu: [], link:'http://www.fccollege.edu.pk/tuition-fee/' },
                           { name: 'Residential Life', img: 'books', menu: [], link:'http://www.fccollege.edu.pk/residential-life/' },
                        ] },
                     {
                        img: 'calendar', name: 'Event', link:'eventlist',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [], link:'acadamic-calender' },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]  },
                     {
                        img: 'team', name: 'Campus Services', link: 'home', params: { page: 'campus-services' },
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
                        img: 'blackboard', name: 'Courses', link: 'home', params: { page: 'courses' },
                        list: [
                           { name: 'Academic Faculties', img: 'id-card', menu: [], link: 'acadamic', params: { page: 'faculties' }    },
                           { name: 'Academic Departments', img: 'check', menu: [], link: 'acadamic', params: { page: 'departments' }   },
                           { name: 'Courses', img: 'books', menu: [] },
                        ]   },
                     {
                        img: 'professor', name: 'Jobs',
                        list: [
                           { name: 'Faculty Positions', img: 'id-card', menu: [], link:'http://www.fccollege.edu.pk/faculty-positions/' },
                           { name: 'Staff Positions', img: 'check', menu: [], link:'http://www.fccollege.edu.pk/staff-positions/' },
                           { name: 'Academic Support Staff Positions', img: 'books', menu: [], link: 'http://www.fccollege.edu.pk/academic-support-staff/' },
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
                           { name: 'Learn About Current Campaigns', img: 'id-card', menu: [] },
                           { name: 'Give to FCCU', img: 'check', menu: [] },
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
                           { name: 'Facebook', img: 'id-card', menu: [], link:'https://www.facebook.com/fccollege/' },
                           { name: 'Twitter', img: 'check', menu: [], link: 'https://twitter.com/FCCollege' },
                           { name: 'Instagram', img: 'books', menu: [], link: 'https://www.instagram.com/formanchristiancollege/' },
                           { name: 'LinkedIn', img: 'books', menu: [], link: 'https://www.linkedin.com/school/310575/' },
                           { name: 'YouTube', img: 'books', menu: [], link: 'https://www.youtube.com/user/FCCUniversity' },
                        ]   }, 
                     {
                        img: 'contact', name: 'Contact',
                        list: [
                           { name: 'Address', img: 'id-card', menu: [],link:'page',params:{page:'contact'} },
                           { name: 'Phone', img: 'id-card', menu: [], link: 'page', params: { page: 'contact' }  },
                           { name: 'Email', img: 'id-card', menu: [], link: 'page', params: { page: 'contact' }  },
                        ]   }, 
                  ]
      this.urlParser = function (str) {
         if(str){
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
         }else{
            return false
         }
        
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
