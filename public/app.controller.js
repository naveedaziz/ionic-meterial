'use strict';

(
   function (angular) {
      return angular
         .module('ngOrderObjectBy', [])
         .filter('orderObjectBy', function () {
            return function (items, field, reverse) {

               function isNumeric(n) {
                  return !isNaN(parseFloat(n)) && isFinite(n);
               }

               var filtered = [];

               angular.forEach(items, function (item, key) {
                  item.key = key;
                  filtered.push(item);
               });

               function index(obj, i) {
                  return obj[i];
               }

               filtered.sort(function (a, b) {
                  var comparator;
                  var reducedA = field.split('.').reduce(index, a);
                  var reducedB = field.split('.').reduce(index, b);

                  if (isNumeric(reducedA) && isNumeric(reducedB)) {
                     reducedA = Number(reducedA);
                     reducedB = Number(reducedB);
                  }

                  if (reducedA === reducedB) {
                     comparator = 0;
                  } else {
                     comparator = reducedA > reducedB ? 1 : -1;
                  }

                  return comparator;
               });

               if (reverse) {
                  filtered.reverse();
               }

               return filtered;
            };
         });
   }
)(angular);
angular.module('appCtrl', ['ngOrderObjectBy'])
   .run(['$rootScope', '$location', function ($rootScope, $location) {
      document.addEventListener("deviceready", function () {
         console.log("deviceready");
         document.addEventListener("backbutton", onBackKeyDown, false);
         function onBackKeyDown(e) {
            e.preventDefault();
            if ($location.path() === "/login" || $location.path() === "/home") {
               var r = confirm("exit");
               if (r == true) {
                  console.log("not exit");
                  navigator.app.exitApp();
               } else {
                  navigator.app.goBack();
               }
            } else {
               /* $ionicHistory.goBack(); */
               window.history.back();
               navigator.app.goBack();
            }
         }
      }, 100)
   }
   ])
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
   .controller('appCtrl', function ($mdSidenav, $stateParams, $rootScope, $mdDialog, $state, $location, $http, $controller, $scope, $interval) {
      this.tiles = buildGridModel({
         icon: "avatar:svg-",
         title: "Svg-",
         background: ""
      });

      function buildGridModel(tileTmpl) {
         var it, results = [];

         for (var j = 0; j < 11; j++) {

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
     $scope.currentpages = $location.$$path;;
      $scope.returnOrderState = function(obj){
         return Object.keys(obj).length;
      }
      var self = this, j = 0, counter = 0;

      self.mode = 'query';
      self.activated = true;
      self.determinateValue = 30;
      self.determinateValue2 = 30;

      self.showList = [];

      /**
       * Turn off or on the 5 themed loaders
       */
      self.toggleActivation = function () {
         if (!self.activated) self.showList = [];
         if (self.activated) {
            j = counter = 0;
            self.determinateValue = 30;
            self.determinateValue2 = 30;
         }
      };

      $interval(function () {
         self.determinateValue += 1;
         self.determinateValue2 += 1.5;

         if (self.determinateValue > 100) self.determinateValue = 30;
         if (self.determinateValue2 > 100) self.determinateValue2 = 30;

         // Incrementally start animation the five (5) Indeterminate,
         // themed progress circular bars

         if ((j < 2) && !self.showList[j] && self.activated) {
            self.showList[j] = true;
         }
         if (counter++ % 4 === 0) j++;

         // Show the indicator in the "Used within Containers" after 200ms delay
         if (j == 2) self.contained = "indeterminate";

      }, 100, 0, true);

      $interval(function () {
         self.mode = (self.mode == 'query' ? 'determinate' : 'query');
      }, 7200, 0, true);
      $scope.news = {};
      $scope.processImages = function(id,parent){
         $http.get('http://www.fccollege.edu.pk/wp-json/wp/v2/media/' + id + '?fields=source_url')
            .then(function (respose) {
               $scope.news[parent].image = respose.data.source_url;
            })
      }
      $scope.newsPage = 0;
      $scope.loadMoreCall = true;
      $scope.getNews = function(){
         $scope.loadMoreCall = true;
         $scope.newsPage = $scope.newsPage + 1;
         $http.get('http://www.fccollege.edu.pk/wp-json/wp/v2/posts?categories=113&fields=title,link,featured_media,id&page=' + $scope.newsPage)
         .then(function(response){
            $scope.loadMoreCall = false;
            for (var news_data in response.data){
               if (response.data[news_data].featured_media){
                  $scope.news[response.data[news_data].id] = response.data[news_data];
                  $scope.processImages(response.data[news_data].featured_media,response.data[news_data].id)
               }else{
                  $scope.news[response.data[news_data].id] = response.data[news_data];
               }
            }
         })
         
      }
     
      $scope.getEvents = function(){
         if($state.params.page == 'academy'){
            $scope.getEventAcademy();
         }
         if ($state.params.page == 'international') {
            $scope.getEventInternational();
         }
         $scope.pageName = $state.params.page;
      }
      $scope.events = {};
      $scope.events.academy = {};
      $scope.events.international = {};
      $scope.EventAcademyPage = 0;
      $scope.monthArray = [0,'Jan','Feb','Mrh','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      $scope.returnDate = function(itm,type){
         var dated = itm.split('-');
        if(type == 'day'){
           var days = dated[2].split('T');
           return days[0];
        }
        if (type == 'month') {
           return $scope.monthArray[parseInt(dated[1])];
        }
        if (type == 'year') {
           return dated[0];
        }    
      }
      $scope.getEventAcademy = function () {
         $scope.loadMoreCall = true;
         $scope.EventAcademyPage = $scope.EventAcademyPage + 1;
         $http.get('http://www.fccollege.edu.pk/wp-json/wp/v2/posts?categories=112&fields=title,link,featured_media,id,date&page=' + $scope.EventAcademyPage)
            .then(function (response) {
               console.log(response)
               if (!response.data.length){
                  $scope.loadMoreCall = -1;
               }else{
                  $scope.loadMoreCall = false;
               }
               for (var news_data in response.data) {
                  if (response.data[news_data].featured_media) {
                     $scope.events.academy[response.data[news_data].id] = response.data[news_data];
                    //$scope.processImages(response.data[news_data].featured_media, response.data[news_data].id)
                  } else {
                     $scope.events.academy[response.data[news_data].id] = response.data[news_data];
                  }
               }
            })

      }
      $scope.EventInternationalPage = 0;
      $scope.getEventInternational = function () {
         $scope.loadMoreCall = true;
         $scope.EventInternationalPage = $scope.EventInternationalPage + 1;
         $http.get('http://www.fccollege.edu.pk/wp-json/wp/v2/posts?categories=109&fields=title,link,featured_media,id,date&page=' + $scope.EventInternationalPage)
            .then(function (response) {
               console.log(response)
               if (!response.data.length) {
                  $scope.loadMoreCall = -1;
               }else{
                  $scope.loadMoreCall = false;
               }
              
               for (var news_data in response.data) {
                  if (response.data[news_data].featured_media) {
                     $scope.events.international[response.data[news_data].id] = response.data[news_data];
                     //$scope.processImages(response.data[news_data].featured_media, response.data[news_data].id)
                  } else {
                     $scope.events.international[response.data[news_data].id] = response.data[news_data];
                  }
               }
            })

      }
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
                    { name: 'Baccalaureate (Hons) in Economics',
                       intro: 'The program provides a thorough understanding of the economic theory pertaining to global economic issues and its impact on Pakistan’s economy.',
                       degrees: [
                          {
                             name: 'BS (Hons) Economics', description: 'The BS (Hons) Economics program enables students to perform quantitative analysis, research and effectively present the results.  The degree facilitates the students to become accomplished professionals who can contribute towards policy formulation. The program provides a thorough understanding of economic theories pertaining to global economic issues with special focus on Pakistan’s economy.It also enables the students to perform both quantitative and qualitative analyses in research and present the findings effectively. The degree enhances the students’ personal and professional decision- making capacities. Further, it encourages them to contribute in policy formulation and participate in the economic development of Pakistan.',
                             link: 'http://www.fccollege.edu.pk/wp-content/uploads/2015/12/Economics-Road-Map.pdf'
                          }
                       ] },
                    { name: 'Postgraduate in Economics',
                       intro: 'The postgraduate programs in Economics focus on in-demand areas to ensure quality education and research training. The following areas of specialization are currently offered: Applied Econometrics, Environmental and Resource Economics, Development Economics, International Economics and Monetary Economics',
                       degrees: [
                          {
                             name: 'MPhil Applied Economics', description: 'This is a 2-year program following the completion of 16 years of education i.e. BSc (Hons) or conventional MA/MSc Economics. It consists of two semesters of coursework (27 credit hours) and a research thesis (12 credit hours). After the completion of coursework in two semesters, students will focus their efforts on the MPhil thesis under the supervision of a supervisor. After completion of MPhil, a student will have exposure to those courses and skills which are helpful to pursue a doctoral program or enter the teaching/ research professions. As a graduate of MPhil Applied Economics, you will have:',
                             link: false
                          }
                       ]  }
                 ]
               }
           ] },
         { name: 'Faculty of Computer Science & Mathematics', image: 'img/department/Ecomonics.jpg' ,
            departments:[
               { name: 'Department of Computer Science', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate(Hons) in Computer Sciences',
                        intro: false,
                        degrees: [
                           {
                              name: 'Baccalaureate (Hons) in Computer Sciences (BCS)', description: 'The 4-year BCS degree program at Forman Christian College (A Chartered University) provides a solid understanding of the theory and techniques of Computer Science so that upon graduation the students can enter various industries or pursue graduate studies. The curriculum offers a holistic view of the discipline. It emphasizes both the state-of-the-art and the essential skills of modeling, abstraction and problem-solving, which opens up a wide range of industries to the students. Our courses are a mix from various areas that reflect the excitement and joy of computing, e.g. physics, mathematics, electronics, artificial intelligence, game development, software engineering, networks, operating systems, databases, computer vision, human-computer interaction. This degree is accredited by the National Computing Education Accreditation Council (NCEAC), which is the authority representing the Higher Education Commission (HEC).',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Roadmap-2016-17-COMP.pdf'
                           },
                           {
                              name: 'Research at Department of Computer Science', description: 'Systems Research Group Computer Systems provides the core foundation for the smooth functioning of different applications. The System group intends to investigate the applied and theoretical aspects in the domain of Computer Systems for designing and building of Internet Systems and Services. This group covers a large range of subject areas including but not limited to Computer Architecture, Operating systems, Communication Networks, Computer Networks, Mobile Computing, High-Performance Computing, Wireless Networking and Distributed Computing Systems.We anticipate to contribute in various research avenues that shape the future Next Generation Networks (NGN), Internet Systems and Services. Contact Person: Dr Mubashar Mushtaq: mubasharmushtaq@fccollege.edu.pk Software Engineering Research Group (SERG) The research interests of Software Engineering research group at the Forman Christian College (A Chartered University) cover both the software development and maintenance activities.Our foremost priority is to promote the software engineering research at the undergraduate and graduate level within our University.Second, we develop tools and techniques to equip developers for better engineering software systems.We investigate product, processes and people in software engineering.” Contact Person: Dr Saad Bin Saleem: saadsaleem@fccollege.edu.pk Computer Vision/ Image Processing (CV / IP) Research Group The Computer Vision Group at FCCU is geared towards teaching computers understand the visual world.We conduct research in a number of areas including 3D vision, camera calibration, image understanding, and action recognition. Contact Person: Dr.Nazim Ashraf: nazimashraf@fccollege.edu.pk Artificial Intelligence and Machine Learning (AI / ML) Research Group The Artificial Intelligence group at FCCU is actively involved in foundational research in core areas of knowledge representation, information retrieval, reasoning, learning, planning, decision - making, speech and language processing, pattern recognition, text mining and optimization.The group’s focus is on practically exploring all machine learning aspects like deep learning, natural language processing and classical algorithms.The group research addresses the central challenges of machine cognition, both from a theoretical perspective and application perspective.The group is also aimed at applying intelligent algorithms to applied problems in areas like bioinformatics, search and information retrieval. Contact person: Ms Umber Nisar: umbernisar@fccollege.edu.pk Socially Relevant Computing Research Group This group is working to create computing based projects that can enrich and improve lives of people by directly solving real- world problems.We are working on projects like assistive technologies for the disabled, emergency response, and tele- healthcare. Contact person: Dr Aasia Khanum: aasiakhanum@fccollege.edu.pk',
                              link: false
                           }
                        ]  },
                     { name: 'MS Computer Science',
                        intro: 'A postgraduate degree in the field of Computer Science at Forman Christian College opens the doors for the graduates to innumerable possibilities in the fields of Software Engineering, Intelligent Systems, Computational Imaging & Vision, Information Sciences and Technology and Data Science for a successful career.',
                        degrees: [
                           {
                              name: 'MS Computer Science', description: 'Program Details:Duration: 2 years4 semestersExtendible to 5 years under certain conditionsTiming: Evening (Full Time)Distribution:3 CS core courses5 CS elective courses, out of which at least 3 will be selected from the student’s selected specialization trackSalient Features:Five (05) modern labsStrong Faculty10 PhD12 MS qualified Specializations: Software EngineeringIntelligent SystemsComputational Imaging and VisionInformation Sciences and TechnologyData ScienceSoftware Engineering:CoursesAdvanced Software EngineeringSoftware Requirements EngineeringSoftware Quality EngineeringFormal Methods in SEComponent Based SESoftware Evolution & ReengineeringEmpirical SEAgent Oriented SESoftware Process ImprovementSoftware ArchitectureSoftware Project ManagementSoftware Engineering for Safety-Critical SystemsModel Driven SEIntelligent Systems:CoursesAdvanced Artificial IntelligenceAdvanced Machine LearningFuzzy SystemsNatural Language ProcessingComputer VisionSoft ComputingComputational Imaging & Vision:CoursesTopics in Computer VisionComputational Photography3D Computer VisionBiomedical Image ProcessingInformation Sciences and Technology:CoursesSemantic WebHuman and Information InteractionWeb Servicese-GovernmentSocial Network AnalysisUbiquitous Information InteractionData Science:CoursesData MiningData WarehousingData Visualization Big Data AnalyticsInfo Integration on the WebInfo Retrieval & Web SearchNon-Degree Seeking Option:Enrollment as a non-degree student does not constitute admission to a degree program.Students can however transfer credit hours earned while on non-degree status to a degree program.The policy limits the number of hours that can be petitioned into a graduate program to 12 credit hours.A certificate of achievement (with the grade achieved in the course) will be issued to a student after successful completion of a graduate level course.Undergraduate students of FCC can also enroll for the graduate courses, provided they meet the pre-requisites and get permission from Graduate Studies Committee of the department. Credits earned in graduate courses will be counted towards their bachelors’ degree requirements.',
                              link: ''
                           }
                        ] }
                  ]
                   },
               { name: 'Department of Mathematics', image: 'img/department/Ecomonics.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Mathematics',
                        intro: 'The Baccalaureate (Hons) program in Mathematics help students to gain a broad understanding of, and practice with, basic ideas of modern pure mathematics (including analysis, linear algebra, geometry, and group theory). The program has been designed to apply mathematical knowledge to analyze and interpret information in other disciplines and professions.',
                        degrees: [
                           {
                              name: 'BS (Hons) Mathematics', description: 'The 4-year degree program in Mathematics was launched in 2005. A degree in Mathematics develops clear logical thinking. Students majoring in Mathematics take 48 credit hours in their major as well as 47 or 48 in general education and 35 or 34 respectively as free electives. The coursework looks at topics in Mathematics: from pure Mathematics to how Mathematics is used in the real world. Cross listing of courses with other departments further helps students to analyze Mathematics as a real world tool. Students obtain a secure understanding of Mathematics with a good choice of topics in pure and applied Mathematics at an advanced level.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/MATH-major-ROAD-MAP.pdf'
                           }
                        ] }
                  ] },
               { name: 'Department of Statistics', image: 'img/department/Ecomonics.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Statistics',
                        intro: 'The department of Statistics offers a BS (Hons) degree and is part of the Faculty of Information Technology and Mathematics.',
                        degrees: [
                           {
                              name: 'BS (Hons) Statistics', description: 'The BS (Hons) Statistics program equips students to demonstrate knowledge about basic statistical concepts, terms and techniques. It also help students to practice high moral and ethical values in their personal and professional lives and in their communities. Upon completion of their degree, students are able to:Demonstrate knowledge about basic statistical concepts, terms and techniques. Analyze various types of data and interpret the results effectively Think critically about applications of statistics in various fields Practice high moral and ethical values in their personal and professional lives and in their communities',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/ROAD-MAP.Statistics.pdf'
                           }
                        ] },
                  ] },
            ] },
         { name: 'Faculty of Education', image: 'img/department/Ecomonics.jpg' ,
            departments:[
               { name: 'Department of Education', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Education',
                        intro: 'The BA (Hons) and BS (Hons) degrees follow a liberal arts education framework. This provides each student an opportunity to explore the breadth of knowledge in the field of education. Students take courses in varied disciplines to fulfill the general education requirements and be better prepared to join the mainstream profession.',
                        degrees: [
                           {
                              name: 'BA/BS (Hons) Education', description: 'Graduates are well prepared to be in a real classroom and impact young lives as they teach. A unique feature of this program is a full semester of teaching practice during the final year. It provides the student-teacher with a real-world classroom experience. The student-teacher works in close association with a cooperating teacher at the school and the advisor from FCC. It helps the prospective teacher visualize his/her career. Our education graduates make a difference: they teach! Our graduates have the ability to explain and critique the teacher’s role in the progress of a nation; develop and use appropriate teaching approaches, strategies, and skills depending on grade level and content area; cater to the learning needs of all students in mixed - ability classrooms; interact ethically with students, parents, administrators, colleagues, and the wider community; practice core values in varied academic and other situations and evaluate education literature in order to explore opportunities in the field: teaching, research, counseling, administration.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/04/Road-map.Education-Courses.pdf'
                           }
                        ] }
                  ] }
            ] },
         { name: 'Faculty of Humanities', image: 'img/department/Ecomonics.jpg',
            departments: [
               { name: 'Department of English', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in English',
                        intro: 'The Baccalaureate (Hons) program trains the students for lifelong effective communication in English. It teaches them to connect literature with history, theology, culture, and civilization and interpret them in the perspective of liberal education. The main objectives are to broaden the vision of students, to enlighten their minds, and to give them deep insight into literature. This program opens various options for English majors and prepares them for pursuing postgraduate research in language and literature within and outside Pakistan. They also have the option of joining various careers such as newscasting, teaching, civil services, law, journalism, editing, creative writing, and publishing.',
                        degrees: [
                           {
                              name: 'BA (Hons) English', description: 'This program equips students to be active readers who express their appreciation for ambiguity and interpret multiple perspectives; able to write for a variety of professional and social settings while revising for grammatical and stylistic clarity; appraise the diversity of literary and social voices within – and sometimes marginalized by – major traditions of literature; read works of literary, rhetorical, and cultural criticism, and apply ideas from these texts in their own reading and writing. The program instills research skills that allow students to identify topics, formulate questions for productive inquiry, use appropriate methods and sources for research, evaluate critically the sources they find, and employ their chosen sources effectively in their own writing.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Department-English-Roadmap.pdf'
                           }
                        ] },
                     { name: 'Postgraduate in English',
                        intro: 'The MPhil English program is a 2-year, evening program that allows graduates to be equipped with analytical and critical research approaches to face the challenges of today’s world. The program will carry on FCCU’s rich legacy of research and quality teaching.',
                        degrees: [
                           {
                              name: 'MPhil English', description: 'The MPhil English program is an evening program and is aimed both at students continuing their education as well as in-service practitioners who want to upgrade their qualification. The program has a number of objectives. It will advance the levels of English communication and fluency skills within Pakistan and develop well-groomed leadership for research and publication in English. It will improve philological and pedagogical practices in English in the country and enhance ethical values by ensuring original work in the field. It will emphasize the importance of English language and literature through both local and global interactions.',
                              link: false
                           }
                        ] },
                  ] },
               { name: 'Department of Mass Communication', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Mass Communication',
                        intro: 'The Baccalaureate program in Mass Communication focuses on offering research courses that are unparalleled in Pakistan. Leading industry professionals from television, radio, public relations and advertising are invited for special lectures from time to time. This helps students obtain knowledge of the industry in addition to bolstering the prospects of future contacts and placements or internships in the media, an edge only a few Pakistani universities offer.',
                        degrees: [
                           {
                              name: 'BA (Hons) Mass Communication', description: 'The BA (Hons) program is designed keeping in view the practices and growth of Mass Communication in Pakistan. All aspects of media work are covered, ranging from writing and reporting news to political, cultural, legal and sociological aspects of technologies in broadcasting, telecommunications and print. Leading industry professionals from television, radio, public relations and advertising are invited for special lectures from time to time. This Helps students get up-to-date knowledge of the industry in addition to bolstering the prospects of future contacts and placements or internships in the media.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Roadmap_Mass-Comm_Unified-Format_2011-2014.pdf'
                           }
                        ] }
                  ]  },
               { name: 'Department of Philosophy', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Philosophy',
                        intro: 'The Department of Philosophy at FCCU is relatively new – launched in 2010, but the rich tradition of learning and knowledge-seeking is adopted and adapted for contemporary times. It is the part of the Faculty of Humanities.',
                        degrees: [
                           {
                              name: 'BA (Hons) Philosophy', description: 'The degree program equips students to understand the various methods that have been used to identify and resolve philosophical problems; analyze philosophical arguments; apply critical thinking to whole life issues; know the major philosophical movements through the history of philosophy past to present; understand the various methods that have been used to identify and resolve philosophical problems; analyze philosophical arguments and apply critical thinking to whole life issues, that is, career, recreation, self-development, etc.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Road-Map-for-a-Philosophy-Major.pdf'
                           }
                        ] }
                  ] },
               { name: 'Department of Religious Studies', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Religious Studies',
                        intro: 'The Department of Religious Studies is part of the Faculty of Humanities and offers two degrees: BA (Hons) Islamic Studies and BA (Hons) Christian Studies. The lower division courses for each concentration are designed to provide students with the fundamental understanding of respective major, while the upper division courses provide them with depth and breadth of knowledge.',
                        degrees: [
                           {
                              name: 'BA (Hons) Islamic Studies', description: 'This program is designed to explain fundamental concepts and intellectual basis of various branches of Islamic Studies and to diagnose and solve everyday problems in the light of Islamic teachings, principles and values.',
                              link: false
                           },
                           {
                              name: 'BA (Hons) Christian Studies', description: 'The main objective of this program is to skillfully use biblical study methods to interpret what effect the original writers intended to have on their readers. It helps students to formulate a personal career plan which exhibits the values taught and exemplified by Jesus Christ and which contributes to the betterment of Pakistan and especially the Christian community',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Road-Map-Rel.-Studies.pdf'
                           }
                        ] }
                  ] },
               { name: 'Department of Urdu', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Urdu',
                        intro: 'The Baccalaureate program equips students for their academic and professional careers through imparting the skills of advanced reading, and writing; oral communication; critical approaches and research.',
                        degrees: [
                           {
                              name: 'BA (Hons) Urdu', description: 'This program is designed to empower students to become accomplished, active readers who appreciate ambiguity and complexity, and who can articulate their own interpretations with an awareness and curiosity for other perspectives. It enables students to write effectively for a variety of professional and social settings, practice writing as a process of motivated inquiry, engaging other writers’ ideas as they explore and develop their own, and develop an awareness of and confidence in the voice as a writer; express ideas as informed opinions that are in dialogue with a larger community of interpreters, and understand how an approach compares to the variety of critical and theoretical approaches.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Urdu-Road-Map-New.pdf'
                           }
                        ] }
                  ] },
            ]
         },
         {
            name: 'Faculty of Natural & Physical Sciences', image: 'img/department/Ecomonics.jpg',
            departments: [
               { name: 'Department of Biological Sciences', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Biological Sciences',
                        intro: 'The Department in Biological Sciences offers majors in 4-year degree programs in Biology, Biotechnology, Bioinformatics and Environmental Sciences.',
                        degrees: [
                           {
                              name: 'BS (Hons) Biological Sciences', description: 'The BS (Hons) Biological Sciences is designed to offer a broad and general training in plant and animal sciences with opportunity for research. This is to ensure that the needs of both students preparing for postgraduate studies and/or the job market are catered by the department. This major is offered after the end of the Sophomore year.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/BIOL-Unifide-Road-Maps.pdf'
                           },
                           {
                              name: 'BS (Hons) Biotechnology', description: 'This program is learner-centered and job oriented in different specializations of Biotechnology. It establishes an environment of collaborative and reflective learning based on modern concepts of Biotechnology. This major must be opted at the time of admission',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/BIOT-Unifide-Road-Maps.pdf'
                           },
                           {
                              name: 'BS (Hons) Bioinformatics', description: 'This cross-disciplinary program is offered by the Department of Computer Science & Information Technology, and includes a Biological Sciences component. This major must be opted at the time of admission.',
                              link: false
                           }
                        ] },
                     { name: 'Postgraduate in Biological Sciences',
                        intro: 'Following the success of the 4-year Baccalaureate (Hons)  programs in Biological Sciences, 2-year MPhil degrees in in 3 disciplines were also introduced. This has been possible due to the highly qualified faculty, recognized by the HEC. The Department has several ongoing research programs and the faculty has been able to win competitive research grants worth more than Rs 120 million for conducting goal-oriented research. Based on the availability of project funds, many MPhil students are offered Research Assistantships during the second year of MPhil.',
                        degrees: [
                           {
                              name: 'MPhil Biotechnology', description: 'This degree was launched to further FCCU’s commitment to research and development and to introduce a degree with a holistic vision of preparing students for their professional and academic careers. The MPhil in Biotechnology is a rigorous program that is supported by modern infrastructure such as six dedicated research and six teaching laboratories as well as state-of the art equipment.',
                              link: false
                           },
                           {
                              name: 'MPhil in Food Safety and Quality Management', description: 'Access to safe, wholesome and nutritious food is a fundamental human right. Nevertheless, food systems in developing countries continue to be stressed due to lack of capacity to deal with pre- and post-harvest losses. This combined with increase in population, migration, urbanization, lack of resources and problems of environmental and food hygiene adversely affect quality and safety of food supplies in most parts of Pakistan.FCCU’s resources and expertise in the fields of Biotechnology, Chemistry and Business make it an ideal institution to initiate an MPhil in Food Safety and Quality Management (FSQM) to cater to the needs of the food industry and other sectors.As an evening program the MPhil FSQM allows in-service professionals to benefit from this cross-disciplinary degree. FCCU’s MoU with PCSIR Laboratories, Lahore, means that PCSIR expertise can also be used by students to help with research and internships.',
                              link: false
                           },
                           {
                              name: 'MPhil in Molecular Pathology and Genomics', description: 'Molecular pathology is a rapidly expanding discipline that connects pathology and molecular biology. The future of medicine and clinical diagnostics is molecular based. Therefore theoretical and practical applications of molecular diagnostics must be the kind of knowledge that is available to aspirants. This program provides training in the application and interpretation of advanced molecular technologies and their use in pathology and clinical diagnostics. This specialist training enables physicians, scientists and technologists to validate, use and develop molecular assays for improved management of patients.As an evening program the MPhil MPGN allows in-service professionals to benefit from this cross-disciplinary degree. Our partner organization, Chughtai Lahore Labs, is one of the largest private clinical diagnostic laboratories in Pakistan and provides clinical and practical expertise.',
                              link: false
                           },
                           {
                              name: 'PhD Biotechnology', description: 'The Department of Biological Sciences has taken an important step forward by launching a PhD Biotechnology program. With undivided attention given to research, the program has been designed to produce scientists equipped with a complete knowledge of their chosen field and the skills required to conduct breakthrough studies in many disciplines.',
                              link: false
                           }
                        ] }
                  ] },
               { name: 'Department of Chemistry', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Chemistry',
                        intro: 'The Baccalaureate program in Chemistry is designed to explain major concepts of chemistry, equip students to think critically and apply the concepts of Chemistry in the real world; use library resources and technology efficiently, to gather information and solve problems and to apply ethical principles in the domain of Chemistry.',
                        degrees: [
                           {
                              name: 'BS (Hons) Chemistry', description: 'The program prepares students to demonstrate the ability to understand, analyze and address real world situations, from academia to industry, using Chemistry. It also provides them with the opportunity to excel both in a diverse job market and contribute to the field in future.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Unified.ROAD-MAP.Chem_.pdf'
                           }
                        ] },
                     { name: 'Postgraduate in Chemistry',
                        intro: 'The department has state-of-the-art facilitates available for research in several significant areas including Natural Products, Organic Synthesis, Organometallics, Nano and Composite Materials, and Pharmaceutical Chemistry. It also provides opportunities for students to work on projects funded by organizations like the Pakistan Science Foundation (PSF), and the HEC.The department has four dedicated teaching laboratories and six postgraduate research laboratories. The research and teaching instruments available include: Atomic Absorption Spectrophotometer (AAS), TGA-DSC Analyzer, CHNS/O Analyzer, Gas Chromatography-Mass Spectrometer (GC-MS), HPLC Equipment, Gas Chromatograph, FT-IR Spectrophotometer, UV-VIS Spectrophotometers, Digital Polarimeter, and Rotavapors.',
                        degrees: [
                           {
                              name: 'MPhil Chemistry', description: 'The MPhil Chemistry program is a 2-year, four- semester degree program. The first year, comprising two semesters, is dedicated to course work. Each student must pass a Comprehensive Examination at the end of their first year. During the second year, the students conduct research under the supervision of a faculty member. A full year of research plays a crucial role in training and preparing the students for higher studies and/or to pursue a career',
                              link: false
                           },
                           {
                              name: 'PhD Chemistry', description: 'The Department of Chemistry at FCCU is determined to demonstrate the distinguished features of this great institution including excellence in learning and research. The department boasts an excellent Ph.D. faculty, most being HEC approved supervisors. Equipment like GC-MS, AAS, CHNSO analyzer, FTIR, UV-Visible Spectrophotometer and HPLC, etc. are available for students. PhD in Chemistry is a 3-year program focusing on independent research and learning. The scholars are encouraged to research in areas like natural products, organic synthesis, medicinal chemistry, colloidal chemistry, organometallics, modern materials and bioactivities among others.',
                              link: false
                           }
                        ] }
                  ] },
               { name: 'Department of Physics', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Physics',
                        intro: 'The Baccalaureate program focuses on demonstrating a general working knowledge of the basic areas of Physics and applies formal knowledge in a problem-solving environment. It instills proficiency in basic laboratory skills (e.g. instrumental analysis and laboratory safety) and enables students to formulate effective strategies for solving scientific problems.',
                        degrees: [
                           {
                              name: 'BS (Hons) Physics', description: 'The department is a part of the Faculty of Natural Sciences and offers a rigorous program that equips students with the knowledge and skills required for their academic and professional careers. It teaches students to efficiently use library resources and technology to gather information, read, understand and communicate scientific information clearly and precisely, both orally and in writing. Students are able to analyze the broader implications of physics related experimentation and application processes (e.g., resource management, economic factors, and ecological considerations); work effectively with others as part of a team to solve scientific problems and describe the opportunities in, and requirements for, careers available to those with training in physics.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Unified-Roadmap-for-Physics.pdf'
                           }
                        ] },
                     { name: 'Postgraduate in Physics',
                        intro: 'The Department has launched an MPhil Physics program, keeping in view the needs of Pakistan to upgrade the state of its industries, educational institutions and other services sectors, to compete in the modern world and meet new challenges.',
                        degrees: [
                           {
                              name: 'MPhil Physics', description: 'The MPhil Physics is a two-year program consisting of two semesters of coursework followed by two semesters of research. Coursework includes core courses and electives. Research is conducted in Experimental Material Science, Nanophysics and Nanotechnology and Theoretical Physics. The program consists of four regular semesters of 40 credit hours in total. 24 credit hours of coursework must be completed in the first two semesters while the 3rd and 4th semesters will be dedicated to research. Limited teaching assistantships are available.',
                              link: false
                           },
                           {
                              name: 'PhD Physics', description: 'Admission to PhD program is made in the research areas which are supported through research projects, and in which faculty research groups are currently engaged. Current PhD students are enrolled and working in both theoretical as well as experimental disciplines. Limited Teaching Assistantships are available.',
                              link: false
                           }
                        ] }
                  ] },
               { name: 'Department of Environmental Sciences', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Environmental Sciences',
                        intro: 'The Baccalaureate in Environmental Sciences is a rigorous program designed to enable students with an ability to understand the linkages between various bio-physical and socio-economic components of the environment.',
                        degrees: [
                           {
                              name: 'BS (Hons) Environmental Sciences', description: 'The BS (Hons) in Environmental Sciences opens opportunities for careers in the public sector including Regional and National government agencies, Environmental Protection Agency, Department of Natural Resources, Fish & Wildlife Services, National Park Service, National Forest Service, and Food Safety. In private sector, environmental science graduates have the opportunity to work in Environmental NGOs, Industry, Research and Development Organizations, Environmental Consultancy, Environmental Journalism, Education and Social Development. The available laboratories are equipped with high- tech equipment to provide the students with research facilities. The major areas of research proposed include soil and water resource management, solid waste management and treatment, toxicology, water supply and sanitation, biodiversity conservation, pollution control, GIS applications and modeling.The broad spectrum of the Program thus provides its students a great flexibility in choosing the research area of their interest.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Roadmap_ENVR-Sci.pdf'
                           }
                        ] },
                     { name: 'Postgraduate in Environmental Sciences',
                        intro: 'The unsustainable economic development has resulted in a disastrous environmental crisis such as pollution, climate change and depletion of resources and loss of biodiversity. In order to cope with the challenges of increasing population, environmental deterioration, and unsustainable economic development, a harmonious collaboration between human development efforts and environment concerns are urgently needed to achieve the ultimate goal of sustainable development. The target of sustainable development can only be achieved through an integrated and comprehensive approach involving social and technological changes in all sectors of human life and its environment. There are a few renowned institutions in Pakistan which are doing quality work that could meet reasonable standards at the international level.',
                        degrees: [
                           {
                              name: 'MPhil Environmental Sciences', description: 'The MPhil Environmental Sciences is a 2-year research degree, committed to train and develop, well equipped and highly skilled manpower to tackle the growing environmental and developmental problems and changes arising from the transition to a sustainable society. The Program follows HEC guidelines and requirements. The program prepares students for analysis and assessment of environmental problems; conducting independent scientific and technical research on environmental issues and propose sustainable solutions for environmental problems.',
                              link: ''
                           }
                        ] }
                  ] },
               { name: 'Bioinformatics Program', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Bioinformatics',
                        intro: 'Bioinformatics has emerged as a vital science in biological and health sciences. The technological advancements in genomics, proteomics, transcriptomics and metabolomics have opened many avenues to use Bioinformatics for biological data interpretation and analysis, specifically diagnostics, therapeutics and forensics. Nowadays, there is an urgent need for graduates with this expertise in our country. Forman Christian College (A Chartered University) has, over its 150-year history, adapted and responded to the technological needs of the time, and so offers the BS (Hons) Bioinformatics program.',
                        degrees: [
                           {
                              name: 'BS (Hons) Bioinformatics', description: '4-year – 8 semester program Evening sessions only (3:00 pm to 8:00 pm) Interdisciplinary (designed by Departments of Biological Sciences, Computer Science, Mathematics and Statistics) Taught by experts in the fieldLinkages with industry and end users',
                              link: false
                           }
                        ] }
                  ] },
               { name: 'Department of Pharmacy', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Doctor of Pharmacy (PharmD) Program',
                        intro: 'Keeping in view the ever-increasing demand of professionally skilled pharmacists in the country and abroad, Department of Pharmacy has taken the initiative to start Doctor of Pharmacy (PharmD), a five years professional degree program to cater the needs of pharmaceutical industry in research & development, manufacturing, quality assurance, clinical research, marketing, drug regulatory affairs and the requirements of Pharmaceutical care.The training in industry as per GMP and cGMP requirements and healthcare settings is the essential component of FCCU Doctor of Pharmacy (PharmD) program to develop pharmacy professionals whose scientific knowledge, training and skills enable them to deliver excellence in pharmaceutical industry and pharmacy practice. This would strengthen the pharmaceutical industry to manufacture quality and cost effective pharmaceutical products. This makes FCCU Doctor of Pharmacy (PharmD) program distinct from other institutions. The program will be conducted as per the requirements of Pharmacy Council of Pakistan.',
                        degrees: [
                           {
                              name: 'Admission Requirements', description: 'Individuals desiring admission in Doctor of Pharmacy (PharmD) degree program should have passed the Higher Secondary School Certificate (with major subjects: Biology, Chemistry and Physics, etc.) with minimum 60% marks or an equivalent diploma from national or international board (e.g. A-level)',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2017/01/Road-Map-PharmD.pdf'
                           }
                        ] }
                     ]},
            ]
         },
         {
            name: 'Faculty of Social Sciences', image: 'img/department/Ecomonics.jpg',
            departments: [
               { name: 'Department of Geography', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Geography',
                        intro: 'Department of Geography has the distinction of pioneering the subject in this part of the sub-continent, with glorious traditions going back to 1924. Its mission is to groom students as contributors to humanity and as inspiring leaders in the nation-building process. It focuses on the student’s intellectual ability to take on difficult challenges of today and the future.',
                        degrees: [
                           {
                              name: 'BA/BS (Hons) Geography', description: 'This degree program enables students to analyze and synthesize the knowledge of different concepts and processes of physical, human and regional geography; demonstrate competency in the use of fundamental geographic tools/techniques for data collection, display and analysis; be productive individuals in the service of humanity and develop themselves into inspiring leaders in the progress and uplift of the country. The program is designed with independent research projects with competence to build a spatiotemporal profile of the phenomena under investigation that helps in reaching recommendations for further development. The degree employs knowledge and skills that help in an advanced study in the discipline for job placement',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/ROAD-MAP.Geo-BA-and-BS.pdf'
                           }
                        ] }
                  ] },
               { name: 'Department of History', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in History',
                        intro: 'The Department of History offers Baccalaureate (Hons) program in History which help students to demonstrate mastery of historical concepts and theories and apply them to historical fact in the context of their times and subsequent historical events.',
                        degrees: [
                           {
                              name: 'BA (Hons) History', description: 'The BA (Hons) in History provide students with an opportunity to demonstrate an understanding of the history and current situation of Pakistan in the context of South Asian and world history. It also helps them to integrate and apply the knowledge of historical concepts, theories, facts and trends into other academic subjects and in future scholarship and employment.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/ROADMAP-FOR-HISTORY.pdf'
                           }
                        ] }
                  ] },
               { name: 'Department of Political Science', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Political Science',
                        intro: 'The Baccalaureate (Hons) program in Political Science is designed to demonstrate in-depth knowledge of the major concepts of politics. The quality of instructional work in the department has been of a high standard. Research work is encouraged. There is a dedicated faculty available to teach various papers and supervise research.',
                        degrees: [
                           {
                              name: 'BA (Hons) Political Science', description: 'The 4-year degree in Political Science encourages students to take courses in the fields of International Relations, Politics of Pakistan and Political Philosophy. Students are encouraged to develop a critical understanding of various phenomena of national and international politics and their abilities to critically evaluate these concepts are nurtured through active classroom discussions. Upon completion of their degree, students are able to:Demonstrate in-depth knowledge of the major concepts of politics.Think critically and analytically with a view to developing the habit of lifelong learning.Use appropriate skills for careers in foreign and domestic service, politics, law school, teaching, research and graduate study in Political Science.Function as active citizens in keeping with high ethical standards.Write analytically on an issue and present it effectively to an audience.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/roadmap-pol-sc.pdf'
                           }
                        ] },
                     { name: 'Postgraduate in Political Science',
                        intro: 'The Postgraduate program in Political Science builds on training received at the Baccalaureate level. This program has a strong emphasis on research skills that will be beneficial for those pursuing careers in the government or private sectors, civil society, or teaching among others.',
                        degrees: [
                           {
                              name: 'MPhil Political Science', description: 'MPhil Political Science is a 2-year program comprising 30 credit hours of mandatory course work and a written thesis for 12 credits.  Course work will involve eight core courses and two optional courses offered by the department. Teaching will be mostly in the form of lectures, seminars and colloquium. The program is designed to lead to PhD for those desiring to pursue a terminal degree in the field.',
                              link: false
                           }
                        ] }
                  ] },
               { name: 'Department of Psychology', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate (Hons) in Political Science',
                        intro: 'The Department emphasizes on one of the most interesting and challenging areas of scientific inquiry with the potential to benefit both individuals and society as a whole. The degree programs enable students to think critically about psychological concepts, theories and research and clearly speak and write about psychological material.',
                        degrees: [
                           {
                              name: 'BA (Hons) Psychology', description: 'This program enables students to analyze real world situations using psychological concepts and demonstrate increased respect for human unity and diversity.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/BA-in-psyc-road-map.pdf'
                           },
                           {
                              name: 'BS (Hons) Psychology', description: 'The degree program equips students to describe the range of career possibilities with training in psychology; efficiently use library resources and technology to gather information and solve problems in psychology and apply ethical principles of psychologists both personally and through socially responsible behaviors.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/BS-in-psyc-road-map.pdf'
                           }
                        ] }
                  ] },
               { name: 'Department of Sociology', image: 'img/department/department.jpg',
                  courses: [
                     { name: 'Baccalaureate(Hons) in Psychology',
                        intro: 'The Department of Sociology at FCCU offers two degrees, a BA (Hons) degree in Sociology and a BS (Hons) degree. Both emphasize the development of sociological skills, observing, analyzing and interpreting the events of human behavior of individuals and groups at the family, group, societal, national and global levels. The BS (Hons) builds on the BA (Hons) degree by requiring two more core courses and two more additional courses at the 300/400 level.',
                        degrees: [
                           {
                              name: 'BA/ BS (Hons) Sociology', description: 'This degree equips students to demonstrate a mastery of sociological concepts and be able to use them; demonstrate a mastery of sociological theories and be able to apply them; apply sociological concepts and theories to real world situations at individual, family, group, national, and global levels; and demonstrate quantitative and qualitative research concepts and skills to conduct research projects. Graduates are able to exhibit a mastery of the English language and are able to effectively present ideas and research efforts in a scholarly and clear manner. The BS (Hons) builds on the BA (Hons) degree by requiring two more core courses and two more additional courses at the 300/400 level.',
                              link: 'http://www.fccollege.edu.pk/wp-content/uploads/2016/02/Sociology-Roadmap-021317.pdf'
                           }
                        ] },
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
                        phone: '+924299231581-8211, 217, 244', 
                        email: 'fccaccounts@fccollege.edu.pk', 
                        link: 'http://www.fccollege.edu.pk/accounts-office/', 
                        img: 'account-office.jpg',
                        p_link: 'page', params: { page: 'account' },
                        message: 'The Accounts Office deals with tuition fee, its billing and collections, maintaining students’ financial accounts, payments, and refunds.'
                     },
         'academic': {
            name: 'Acadamic Office',
            address: 'Room # 006, Ground Floor, Ahmad Saeed Administration Building',
            phone: '314',
            email: 'academicoffice@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/academic-office/',
            img:'academic-office.jpg',
            p_link: 'page', params: { page: 'academic' },
            message: 'The Academic Office is the first place to go if students have questions regarding academics. This includes attendance, academic standing, roll number slips, transfers to or from other institutions and any forms students may need, such as character certificates, equivalence certificates, hope certificates, migration etc.'
         },
         'admission': {
            name: 'Admission Office',
            address: 'Room # 008, Ground Floor, Ahmad Saeed Administration Building',
            phone: '377, 566',
            email: 'admissions@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/admissions-office/',
            img: 'admission-office.jpg',
            p_link: 'page', params: { page: 'admission' },
            message: 'The Admissions Office is responsible for admitting students through a concentrated recruitment program that reaches both internal and external audiences.'
         },
         'communication': {
            name: 'Communications Office',
            address: 'Room # 217, 2nd Floor, Ahmad Saeed Administration Building',
            phone: '322, 324',
            email: 'communications@fccollege.edu.pk',
            img: 'Communications-Office.jpg',
            p_link: 'page', params: { page: 'communication' },
            link: 'http://www.fccollege.edu.pk/office-communications-publications/',
            message: 'The Communications and Publications Office consults in-house clients on their marketing, publications and communications needs. The Office helps to identify audiences, decides on the most effective communications tools to reach these audiences, facilitates collaborations among different academic and administrative departments, and connects departments to the right FCCU-approved vendors to complete projects.'
         },
         'campus': {
            name: 'Campus Security',
            address: 'Room # 009, Ground Floor, Ahmad Saeed Administration Building',
            phone: '336',
            email: 'securityreception@fccollege.edu.pk',
            img: 'Campus-Security.jpg',
            p_link: 'page', params: { page: 'campus' },
            link: 'http://www.fccollege.edu.pk/security-office/',
            message: false
         },
         'career': {
            name: 'Career Services',
            address: 'Room # 011, Ground Floor, Ahmad Saeed Administration Building',
            phone: '319',
            email: 'careers@fccollege.edu.pk, internships@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/career-servicesinternships-office/',
            img: 'Career-Services.jpg',
            p_link: 'page', params: { page: 'career' },
            message: 'The Career Services Office provides comprehensive guidance and counseling to its students and graduates on career development. It provides consistent assistance to students in finding attractive jobs and internships.'
         },
         
         'financial': {
            name: 'Financial Aid',
            address: 'Room # 011, Ground Floor, Ahmad Saeed Administration Building',
            phone: '313',
            email: 'financialaid@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/financial-aid-3/',
            message: 'The Financial Aid Office oversees the process of offering scholarships, need-based financial assistance, and Work-Study funds, for eligible entering and continuing students.'
         },
         'information': {
            name: 'Information Commons',
            address: 'Room # 125, 1st Floor, Armacost Science Building',
            phone: '554',
            email: 'library@fccollege.edu.pk',
            link: 'http://library.fccollege.edu.pk/information-commons/',
            message: 'The Information Commons is a learning space that provides comfortable and flexible discussion areas and meeting rooms as well as individual work areas for serious and focused research.This is a one stop shop for users to get printing and publishing support that facilitates the users in finalizing their projects conveniently in one place. Quick and guided access to information resources (online and offline) is provided with high-speed internet, latest computer hardware and utility software'
         },
         'information_tech': {
            name: 'Information Technology Services',
            address: 'Room # 016, 1st Floor, Ahmad Saeed Administration Building',
            phone: '250',
            email: 'ithelp@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/it-office/',
            message: 'The Information Technology Office provides the University administrative and academic departments with innovative, customer-centric, IT support and services.'
         },
         'international': {
            name: 'International Education',
            address: 'Room # 013, Ground Floor, Ahmad Saeed Administration Building',
            phone: '413',
            email: 'ieo@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/international-education-office/',
            message: 'The International Education Office (IEO) at Forman Christian College (A Chartered University) is committed to providing inclusive counseling and advising for extensive opportunities in prestigious foreign universities.'
         },
         'library': {
            name: 'Library',
            address: 'Ewing Memorial Library',
            phone: '426, 554',
            email: 'library@fccollege.edu.pk',
            link: 'http://library.fccollege.edu.pk/',
            message: 'The Ewing Memorial Library is one of the oldest and best college libraries in Lahore and now fast transforming itself into a state-of-the-art University Library.'
         },
         'mercy': {
            name: 'Mercy Health Center',
            address: 'Mercy Health Center,',
            phone: '413 or 0300 0642006',
            email: 'health@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/mercy-health-center/',
            message: 'The university operates an emergency first response centre services through the Mercy Health Center, an on-campus facility equipped for the routine medical needs of the on-campus residents, day scholars, faculty and staff and has an on-going relationship with the nearby United Christian Hospital for cases that require specialized attention. For emergencies, please call Ext 413 or 0300 0642006 for medical assistance during regular hours of operation.Please save this number in your phone.'
         },
         'quality': {
            name: 'Quality Enhancement Cell',
            address: 'Room # 125, First Floor, Ahmad Saeed Administration Building',
            phone: '323',
            email: 'info@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/quality-enhancement-cell/',
            message: 'The Office of Assessment and Institutional Research oversees continuous assessment activities that are done throughout university.  Our Quality Enhancement Cell (QEC) resides in the Office of Assessment and Institutional Research and meets the specifications of the Higher Education Commission of Pakistan.'
         },
         'residential': {
            name: 'Residential Life',
            address: 'Hostel Office behind Armacost Science Building',
            phone: '402',
            email: 'hostels@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/hostel-office/',
            message: 'This Office provides students with comfortable and secure housing in FCCU’s on and off-campus residential facilities.'
         },
         'sports': {
            name: 'Sports',
            address: 'Lucas Center',
            phone: '312',
            email: 'shoaibbarket@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/sports/',
            message: 'The Sports Office organizes, promotes and conducts games. The Sports Board features a very active intramural sports program with competition in athletics, basketball, cricket, football, hockey, table tennis, wrestling, lawn tennis and swimming.'
         },
         'student': {
            name: 'Student Affairs Office',
            address: 'Room # 010, Ground Floor, Ahmad Saeed Administration Building',
            phone: '321, 355',
            email: 'dos@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/student-affairs-office/',
            message: 'Student Affairs Office provides support to students throughout their academic career. This includes overseeing the academic advisors, and answering questions regarding courses or general “how to be successful in college” questions.'
         },
         'university': {
            name: 'First Floor, Mercy Health Center',
            address: 'Room # 010, Ground Floor, Ahmad Saeed Administration Building',
            phone: '554',
            email: 'ucc@fccollege.edu.pk',
            link: 'http://www.fccollege.edu.pk/university-counseling-center/',
            message: 'The UCC is a facility to help students deal with problems which they may not want to discuss with family, friends or their teachers. The Center provides individual and confidential counseling and may refer students to other professionals if needed.'
         },
         'cafeteria': {
            name: 'Cafeteria',
            address: false,
            phone: false,
            email: false,
            link: false,
            img: 'Cafeteria.jpg',
            p_link: 'page', params: { page: 'cafeteria' },
            message: 'FCCU’s Cafeteria .'
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
                           { name: 'Events Calendar', img: 'id-card', menu: [], link: 'events', params: { page: 'academy' } },
                           { name: 'Academic Calendar', img: 'check', menu: [], link: 'events', params: { page: 'international' } },
                           { name: 'Today’s Events', img: 'books', menu: [], link: 'events', params: { page: 'academy' } },
                        ]  },
                     {
                        img: 'team', name: 'Campus Services', link: 'campus',
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
                        img: 'blackboard', name: 'Courses', link: 'acadamic', params: { page: 'faculties' },
                        list: [
                           { name: 'Academic Faculties', img: 'id-card', menu: [], link: 'acadamic', params: { page: 'faculties' }    },
                           { name: 'Academic Departments', img: 'check', menu: [], link: 'acadamic', params: { page: 'departments' }   },
                           { name: 'Courses', img: 'books', menu: [] },
                        ]   },
                     {
                        img: 'professor', name: 'Jobs', link: 'home', params: { page: 'jobs' },
                        list: [
                           { name: 'Faculty Positions', img: 'id-card', menu: [], link:'http://www.fccollege.edu.pk/faculty-positions/' },
                           { name: 'Staff Positions', img: 'check', menu: [], link:'http://www.fccollege.edu.pk/staff-positions/' },
                           { name: 'Academic Support Staff Positions', img: 'books', menu: [], link: 'http://www.fccollege.edu.pk/academic-support-staff/' },
                        ]   },
                     {
                        img: 'boss', name: 'Society', link:'societies',
                        },
                     {
                        img: 'support', name: 'Support FCCU', link: 'home', params: { page: 'support-fccu' },
                        list: [
                           { name: 'Learn About Current Campaigns', img: 'id-card', menu: [] },
                           { name: 'Give to FCCU', img: 'check', menu: [] },
                        ]   },
                     {
                        img: 'photo-camera', name: 'Photos', link:'insta',
                        list: [
                           { name: 'Events Calendar', img: 'id-card', menu: [] },
                           { name: 'Academic Calendar', img: 'check', menu: [] },
                           { name: 'Today’s Events', img: 'books', menu: [] },
                        ]   }, 
                     {
                        img: 'network', name: 'Socials', link: 'social'
                        }, 
                     {
                        img: 'contact', name: 'Contact', link: 'page', params: { page: 'contact' },
                        list: [
                           { name: 'Address', img: 'id-card', menu: [],link:'page',params:{page:'contact'} },
                           { name: 'Phone', img: 'id-card', menu: [], link: 'page', params: { page: 'contact' }  },
                           { name: 'Email', img: 'id-card', menu: [], link: 'page', params: { page: 'contact' }  },
                        ]   }, 
                  ]
      this.societies = [
         {
            name: 'THE ART JUNCTION',
            Advisor: 'Mr Adil Arshad',
            President: 'Qudsia Shahzad qudsiashahzad@yahoo.com',
            link:'http://www.fccsocieties.org/directory/art-junction/'
         },
         {
            name: 'ARMACOST PSYCHOLOGICAL SOCIETY',
            Advisor: 'Nazia Asif',
            President: 'Anam Nadeem Khan anamkhan10389@gmail.com',
            link: 'http://www.fccsocieties.org/directory/armacost-psychological-society/'
         },
         {

            name: 'BAZM-E-FIKR-O-NAZAR',
            Advisor: 'Dr Mohammad Tahir',
            President: 'Ali Shaharyar Khan 18-10088@formanite.fccollege.edu.pk',
            link: 'http://www.fccsocieties.org/directory/bazm-e-fikr-o-nazar/'
         },
         {

            name: 'BENADE PHYSICS SOCIETY',
            Advisor: 'Syeda Ammara Anwar',
            President: 'Arsalan Ahmad Chattha  arsalanahmadchattha@gmail.com',
            link: 'http://www.fccsocieties.org/directory/benade-physics-society/'
         },
         {
            name: 'CHRISTIAN LIFE PROGRAM',
            Advisor: 'Rev Babar Iqbal- babarrana@fccollege.edu.pk',
            President: 'Eraj Naeem John 17-10446@formanite.fccollege.edu.pk, Shayan Qamar shahyan.qamar@gmail.com',
            link: 'http://www.fccsocieties.org/directory/christian-life-program/'
         },
         {
            name: 'CHARACTER BUILDING CLUB',
            Advisor: 'Dr Hamid Latif',
            President: 'Qindeel Rabbani 16-10590@formanite.fccollege.edu.pk ',
            link: 'http://www.fccsocieties.org/directory/character-building-club/'
         },
         {
            name: 'DEAN GEOGRAPHICAL SOCIETY',
            Advisor: 'Mr Adeel Ahmad',
            President: 'Shahrukh Khan  17-10119@formanite.fccollege.edu.pk',
            link: 'http://www.fccsocieties.org/directory/'
         },
         {
            name: 'EARTH WATCH CLUB',
            Advisor: 'Ms Sara Ali',
            President: 'Hamza Irshad hamzairshadch@gmail.com',
            link: 'http://www.fccsocieties.org/directory/earth-watch-club/'
   },
   {
      name: 'FCCYDC',
      Advisor: 'Salahuddin Ayyubi',
      President: 'Abdul Malik malikkhan353@gmail.com',
      link: 'http://www.fccsocieties.org/directory/fccydc/'
   },
   {
      name: 'EWING ENGLISH SOCIETY',
      Advisor: ' Jacqoline J Austin',
      President: 'Arslan Rashid  a1ch.arslan@gmail.com',
      link: 'http://www.fccsocieties.org/directory/ewing-english-society/'
   },
   {
      name: 'JUNIOR BIOLOGICAL SOCIETY',
      Advisor: 'Muhammad Umer Bhatti',
      President: 'Muhammad Asadullah asadchaudhry414@gmail.com',
      link: 'http://www.fccsocieties.org/directory/'
   },
   {
      name: 'FORMAN BIOLOGY SOCIETY (SENIOR)',
      Advisor: 'Dr Muhammad Irfan',
      President: 'Syed Mohammad Khizar  18-10528@formanite.fccollege.edu.pk',
      link: 'http://www.fccsocieties.org/societies/forman-biology-society-senior/'
   },
   {
      name: 'FORMANITES COMPUTING SOCIETY',
      Advisor: 'Dr Nazim Ashraf- nazimashraf@fccollege.edu.pk',
      President: 'Abubakar Siddique Bhatti abubakarbhatti95@gmail.com',
      link: 'http://www.fccsocieties.org/directory/formanites-computing-society/'
   },
   {
      name: 'FORMANITES DEBATING SOCIETY',
      Advisor: 'Ms Neelam Hanif',
      President: 'Osama Aziz  osama.mazari@gmail.com',
      link: 'http://www.fccsocieties.org/directory/formanites-debating-society/'
   },
   {
      name: 'FORMAN DRAMATICS CLUB',
      Advisor: 'Ms Qurra-tul-Aen',
      President: 'Daniyal Azher  daniyalazhar8@gmail.com',
      link: 'http://www.fccsocieties.org/directory/forman-dramatics-club/'
   },
   {
      name: 'FORMANITES EDUCATION SOCIETY',
      Advisor: 'Ms Fizza Anwar',
      President: 'Haseeb Bilal  hbr328@gmail.com',
      link: 'http://www.fccsocieties.org/directory/formanites-education-society/'
   },
   {
      name: 'FORMANITE JOURNALISM SOCIETY',
      Advisor: 'Mr Muhammad Saqib Saleem',
      President: 'Muhammad Ahmad Imtiaz  ahmad1710558@gmail.com',
      link: 'http://www.fccsocieties.org/directory/formanite-journalism-society/'
   },
   {
      name: 'FORMAN MODEL UN SOCIETY',
      Advisor: 'Mr Omer Chauhdray',
      President: 'Aneeq Sarwar  aneeq.alikhan@gmail.com',
      link: 'http://formun.fccsocieties.org/'
},
   {
      name: 'FORMAN MUSIC SOCIETY',
      Advisor: 'Mr Rizwan Sabir- rizwansabir@fccollege.edu.pk',
      President: 'Nokhiaz Joseph  17-10160@formanite.fccollege.edu.pk',
      link: 'http://www.fccsocieties.org/directory/forman-music-society/'
   },
   {
      name: 'FORMAN PHOTOGRAPHIC SOCIETY',
      Advisor: 'Mr Fakhir Shaheen',
      President: 'Muhammad Saad Amin Hotiana  saadaminhotiana@hotmail.com',
      link: 'http://www.fccsocieties.org/directory/forman-photographic-society/'
   },
   {
      name: 'FORMAN POLITICAL SCIENCE SOCIETY',
      Advisor: 'Dr Muhammad Younis',
      President: 'Muqarab Husaain 17-10437@formanite.fccollege.edu.pk',
      link: 'http://www.fccsocieties.org/directory/forman-political-science-society/'
   },
   {
      name: 'FORMAN SOCIOLOGICAL ASSOCIATION',
      Advisor: 'Mr Ather Azeem',
      President: 'Ramsha Khalil  17-10613@formanite.fccollege.edu.pk',
      link: 'http://www.fccsocieties.org/directory/forman-sociological-association/'
   },
   {
      name: 'GRISWOLD HISTORY SOCIETY',
      Advisor: 'Mr Umber Bin Ibad',
      President: 'Muhammad Sohaib Lali  muhammadsohaiblali@yahoo.com',
      link: 'http://www.fccsocieties.org/directory/griswold-history-society/'
   },
   {
      name: 'ISLAMIC SOCIETY',
      Advisor: 'Dr Farhat Aziz',
      President: 'TBD',
      link: 'http://www.fccsocieties.org/directory/'
   },
   {
      name: 'INTERNATIONAL AFFAIRS SOCIETY (IAS)',
      Advisor: 'Dr Grace Clark',
      President: 'Syeda Sumbleen Zahra sumbleen.fcc@gmail.com',
      Facebook: 'http://www.facebook.com/pages/International-Affairs-Society/183777181635077',
      link: 'http://www.fccsocieties.org/directory/international-affairs-societies/'
   },
   {
      name: 'LEADERSHIP FORUM',
      Advisor: 'Mr Zeeshan Bhutta',
      President: 'Junaid Iqbal 18-10801@formanite.fccollege.edu.pk, Zantasha Baig  zbaig171@gmail.com',
      link: 'http://www.fccsocieties.org/directory/leadership-forum/'
     
   },
   {
      name: 'LUCAS ECONOMICS SOCIETY',
      Advisor: 'Mr Salahuddin Ayubi & Ms Ayesha Anwar- salahuddinayyubi@fccollege.edu.pk',
      President: 'Abdul Malik malikkhan353@gmail.com',
      link: 'http://www.fccsocieties.org/directory/lucas-economics-society/'
   },
   {
      name: 'MATHEMATICS SOCIETY',
      Advisor: 'Ms Sadia Arif',
      President: 'M.Hasher Havaid  18- 10393@formanite.fccollege.edu.pk',
      link: 'http://www.fccsocieties.org/directory/mathematics-society/'
},
{
   name: 'PHILOSOPHY SOCIETY',
      Advisor: 'Dr Mark J Boone',
         President: 'Sara Onar  17-10302@formanite.fccollege.edu.pk',
         link: 'http://www.fccsocieties.org/philosophy-society/'
},
{
   name: 'ROTARACT CLUB',
      Advisor: 'Mr Raheem ul Haq',
         President: 'Farooq Khan   farooqkhan434@gmail.com',
         link: 'http://www.fccsocieties.org/directory/rotaract-club/'
},
{
   name: 'SPEERS CHEMICAL SOCIETY',
      Advisor: 'Dr Sadia Shaukat',
         President: 'Fawad Mehmood  17-10593@formanite.fccollege.edu.pk',
         link: 'http://www.fccsocieties.org/directory/speers-chemical-society/'
},
{
   name: 'SPORTS SOCIETY',
      Advisor: 'Mr Shahzad Nazir',
         President: 'Abuzar Hassan  17-10145@formanite.fccollege.edu.pk',
         link: 'http://www.fccsocieties.org/directory/'
},
{
   name: 'INTERMEDIATE ENGLISH SOCIETY',
      Advisor: 'Sara Youhanna',
         President: 'TBD',
         link: 'http://www.fccsocieties.org/directory/intermediate-english-society/'
},
{
   name: 'INTERMEDIATE CHEMISTRY CLUB',
      Advisor: 'Dr Rubab Zohra',
         President: ' Zaib Hassan Malik',
            Email: 'zaibmalik_11998@yahoo.com ',
            link: 'http://www.fccsocieties.org/directory/intermediate-chemistry-club/'
},
{
   name: 'Women Empowerment Society',
      Advisor: 'Julie Flowerday',
      President: 'Rameeza Ahmad  rameezaahmad@gmail.com, Jaffar Hussain Gardezi   17-10032@formanite.fccollege.edu.pk',
      link: 'http://www.fccsocieties.org/directory/women-empowerment-society/'
}
      ];
      $scope.tempInsat = { "items": [{ "id": "1567948956516181317_2158748948", "code": "BXCeUTDF2VF", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/20394371_359205091178414_2803235466592124928_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/20394371_359205091178414_2803235466592124928_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/20394371_359205091178414_2803235466592124928_n.jpg" } }, "created_time": "1501134102", "caption": { "id": "17888661436065172", "text": "#FCCU provides its students comprehensive guidance and counseling to become self sufficient in building their own life-long career strategies which can continue well beyond graduation. #Admissions2017 #formanchristiancollege", "created_time": "1501134102", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2191105701", "full_name": "Hassaan Akram Hashmi", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20180874_1476779729026323_5159660030772903936_a.jpg", "username": "hasaan.hashmi" }, { "id": "1762208541", "full_name": "\u062d\u0633\u0646\u06cc\u0646 \u0645\u0646\u06cc\u0631 \u062c\u0633\u06a9\u0627\u0646\u06cc", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20398353_256319404884552_7429263699375816704_a.jpg", "username": "hasnainjaskani" }, { "id": "2237944054", "full_name": "Ammar Mukhtar", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19436320_723924554475619_5684342383932604416_a.jpg", "username": "ammarraja599" }, { "id": "1494747081", "full_name": "Sheikh Usama \u2122", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20213839_141375903113580_2991701547823398912_a.jpg", "username": "beingsheikh9" }], "count": 128 }, "comments": { "data": [], "count": 0 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BXCeUTDF2VF/", "location": null, "alt_media_url": null }, { "id": "1566494929815255671_2158748948", "code": "BW9TtbKFrp3", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/20214464_259398664561069_4579678629352439808_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/20214464_259398664561069_4579678629352439808_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/20214464_259398664561069_4579678629352439808_n.jpg" } }, "created_time": "1500960769", "caption": { "id": "17865035968161576", "text": "Our wide range of scholarships \u0026 financial assistance ensures that no deserving student is denied an education with us because of financial difficulty. Feel secure \u0026 apply now! #FCCU #Admissions2017 #formanchristiancollege", "created_time": "1500960769", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "3768891741", "full_name": "Farhan imtiaz", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17818196_202677380234195_8555484869772181504_a.jpg", "username": "haleemamalik2016" }, { "id": "2035868052", "full_name": "Mr.\u00dfuN\u00f1y...!\ud83d\udc07", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19933005_251593801995133_4796373030949355520_a.jpg", "username": "bunnyy__here" }, { "id": "4181646905", "full_name": "Osama Khalid", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19623670_234532157056197_2631054861965197312_a.jpg", "username": "osama_khalid786" }, { "id": "3032805889", "full_name": "Sheheryar Nasir\ud83d\ude0d", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20346948_1950040181920570_4570666976216612864_a.jpg", "username": "sheheryar_nasir" }], "count": 205 }, "comments": { "data": [{ "id": "17890876261000010", "text": "Everything is possible if you work hard for getting your success", "created_time": "1501010673", "from": { "id": "1545766254", "full_name": "Sultan Haider", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/15625231_399638820368737_108976003337945088_a.jpg", "username": "sultan__haider" } }, { "id": "17876058634082537", "text": "Addmissions open for bachelors?", "created_time": "1501122480", "from": { "id": "4831095354", "full_name": "", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/18513581_760013420839672_3967944319964282880_a.jpg", "username": "shonaa_0077" } }], "count": 2 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BW9TtbKFrp3/", "location": null, "alt_media_url": null }, { "id": "1565194862240079157_2158748948", "code": "BW4sG84Fh01", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/19535427_456171411419756_1440257634207793152_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/19535427_456171411419756_1440257634207793152_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/19535427_456171411419756_1440257634207793152_n.jpg" } }, "created_time": "1500805789", "caption": { "id": "17889770107037784", "text": "#FCCU is recognised as much for its distinguished sporting tradition as it is for its excellence in education. A wide variety of #sports activities are made available to the students for an all-round development. #fccollege #formanchristiancollege", "created_time": "1500805789", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "1405161110", "full_name": "Mirza Husnain Baig", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12107578_971163092933133_139733297_a.jpg", "username": "mirzahusnain.baig.5" }, { "id": "1722466500", "full_name": "\u0633\u0644\u0637\u0627\u0646 \u062e\u0627\u0646 \u0628\u0627\u0628\u0631", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20346818_309732779487832_75416795334311936_a.jpg", "username": "sultaaanbabar" }, { "id": "3639412363", "full_name": "i.am.asfand", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19932209_249242392245978_5469798794583343104_a.jpg", "username": "i.am.asfand" }, { "id": "1599593551", "full_name": "\u062a\u06cc\u0645\u0648\u0631 \u0645\u0633\u0639\u0648\u062f \u06d4\ud83d\udc96", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18579953_127522151149228_6184567595581046784_a.jpg", "username": "taimoormasaud" }], "count": 256 }, "comments": { "data": [], "count": 0 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BW4sG84Fh01/", "location": null, "alt_media_url": null }, { "id": "1564429840308167719_2158748948", "code": "BW1-KarluQn", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/20181198_293128121096311_4470889538696249344_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/20181198_293128121096311_4470889538696249344_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/20181198_293128121096311_4470889538696249344_n.jpg" } }, "created_time": "1500714591", "caption": { "id": "17885463553065137", "text": "#FCCU will prepare you for a range of careers in which independent thought, analysis \u0026 effective #communication can contribute to economic welfare. #fccollege #formanchristiancollege #university", "created_time": "1500714591", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "3235282095", "full_name": "The_Xtrome10", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19379535_143143862906495_1449980383603982336_a.jpg", "username": "the_xtrome10" }, { "id": "1349385916", "full_name": "Monis Abbas", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18161501_411043595944821_3233034325666562048_a.jpg", "username": "syedmonisabbas" }, { "id": "2127136433", "full_name": "Muhammad Khurram Anwaar", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/15624083_1171455299617434_53448548716380160_n.jpg", "username": "mkhurram_57" }, { "id": "1484172766", "full_name": "Ally", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19428690_1880948622174004_2225320257973649408_a.jpg", "username": "ally_faizan" }], "count": 175 }, "comments": { "data": [], "count": 0 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BW1-KarluQn/", "location": null, "alt_media_url": null }, { "id": "1563056357363789385_2158748948", "code": "BWxF3nAla5J", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/20180867_468496003517927_5677631665036328960_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/20180867_468496003517927_5677631665036328960_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/20180867_468496003517927_5677631665036328960_n.jpg" } }, "created_time": "1500550859", "caption": { "id": "17864495098191244", "text": "#FCCU is the university that will recognize your outstanding academic achievements and support you in fulfilling your goals.", "created_time": "1500550859", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "1762208541", "full_name": "\u062d\u0633\u0646\u06cc\u0646 \u0645\u0646\u06cc\u0631 \u062c\u0633\u06a9\u0627\u0646\u06cc", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20398353_256319404884552_7429263699375816704_a.jpg", "username": "hasnainjaskani" }, { "id": "1936228141", "full_name": "Mahnoor Talat \ud83d\udc3c", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19955220_247910665727206_3574728291510124544_a.jpg", "username": "itsnoortalat" }, { "id": "3905532925", "full_name": "Peerzada Hamza shah", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18809600_100747047195272_8095968638055481344_a.jpg", "username": "peerzada_hamza_shah" }, { "id": "2261918427", "full_name": "Salik Razzaque", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20347085_872517062923832_3248424816985767936_a.jpg", "username": "salikrazzaque" }], "count": 166 }, "comments": { "data": [], "count": 0 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BWxF3nAla5J/", "location": null, "alt_media_url": null }, { "id": "1557969883203169209_2158748948", "code": "BWfBVqzFOu5", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e15/19985514_483836718617792_2026988533784248320_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e15/19985514_483836718617792_2026988533784248320_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/e15/19985514_483836718617792_2026988533784248320_n.jpg" } }, "created_time": "1499944504", "caption": { "id": "17863092763189589", "text": "Admissions are open! Apply now to FCCU and be a part of the learning experience that will give you a greater purpose. Merit \u0026 Need-Based scholarships available. Apply now to be a Formanite. https://goo.gl/f02QWq", "created_time": "1499944504", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "1727902852", "full_name": "Khayam khalid", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19955448_114136222464296_2883518215059668992_a.jpg", "username": "rising_mughal" }, { "id": "2008970224", "full_name": "FASEEH ABBAS", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20214312_247740825739811_6440744390284541952_a.jpg", "username": "faseeh_abbas" }, { "id": "647351805", "full_name": "Mirza Aamin", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19932108_479558895721053_2341441394675023872_a.jpg", "username": "aamino.acid" }, { "id": "1746846145", "full_name": "Barrister At Law \u2696\ufe0f", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19050985_2012804285656632_5819155368630026240_a.jpg", "username": "azhar_ali_csp" }], "count": 122 }, "comments": { "data": [{ "id": "17888632009029572", "text": "FCCU was the first love \u003c3 I miss that place \ud83d\ude0d", "created_time": "1499950221", "from": { "id": "2974236104", "full_name": "Rana Arslan Tariq", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19051057_1865368040380328_407149370513817600_a.jpg", "username": "ranaarslan_tariq" } }], "count": 1 }, "can_view_comments": true, "can_delete_comments": false, "type": "video", "link": "https://www.instagram.com/p/BWfBVqzFOu5/", "location": null, "alt_media_url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19958582_293071051160528_8760153805321928704_n.mp4", "videos": { "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19958582_293071051160528_8760153805321928704_n.mp4" }, "low_bandwidth": { "width": 480, "height": 480, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/20130329_455439511498776_5105465867144003584_n.mp4" }, "low_resolution": { "width": 480, "height": 480, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/20130329_455439511498776_5105465867144003584_n.mp4" } }, "video_views": 639 }, { "id": "1545169378731355451_2158748948", "code": "BVxi10BF-07", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/c135.0.810.810/19379673_801056666735674_2125398384998088704_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/c135.0.810.810/19379673_801056666735674_2125398384998088704_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c135.0.810.810/19379673_801056666735674_2125398384998088704_n.jpg" } }, "created_time": "1498418565", "caption": { "id": "17888157403036980", "text": "#FCCU wishes everyone a blessed #Eid. May this day and life ahead be enveloped in happiness and love. #HappyEid #eidmubarak #EidWishes", "created_time": "1498418565", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2883401502", "full_name": "S Y E D I Q B A L \u2764", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18160458_422937144749359_5594973786769195008_a.jpg", "username": "syediqbal.2311" }, { "id": "1601764544", "full_name": "Arslan Malik", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20226065_341916269573716_7710208350704631808_a.jpg", "username": "ars_lanmalik" }, { "id": "1822586270", "full_name": "Sunny Javed", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/11142098_357538417775669_483508625_a.jpg", "username": "sunnyjaved8" }, { "id": "4111557531", "full_name": "iamAsfandchaudhary", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19429460_147479302468051_8143265835826282496_a.jpg", "username": "asfand_chaudhary" }], "count": 335 }, "comments": { "data": [], "count": 0 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BVxi10BF-07/", "location": null, "alt_media_url": null }, { "id": "1537619105624202783_2158748948", "code": "BVWuG4OlZ4f", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e15/c236.0.607.607/19051987_754101611418021_8935652967969718272_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e15/c236.0.607.607/19051987_754101611418021_8935652967969718272_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/e15/c236.0.607.607/19051987_754101611418021_8935652967969718272_n.jpg" } }, "created_time": "1497518502", "caption": { "id": "17887862782029341", "text": "Admissions are open for Baccalaureate, Pharm D and Postgraduate programs \nApply Now! https://goo.gl/f02QWq\n\n#MYFCCU #University #FCCUSocial #Admissions", "created_time": "1497518502", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "4676574057", "full_name": "Abia Ali", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20214447_1708589146101835_2221059375538110464_a.jpg", "username": "abia_ali97" }, { "id": "2270910665", "full_name": "Moeez Suleman", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17333240_423871414627744_8151966404480860160_a.jpg", "username": "moeez3198" }, { "id": "2357200933", "full_name": "Rohma Batool", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20347637_274985206313601_4539717351687323648_a.jpg", "username": "rohmabatool" }, { "id": "1517774265", "full_name": "\u0641\u0627\u0637\u0645\u06c1 \u0627\u06cc\u0645\u0627\u0646", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20347291_467154116989264_6243940428912001024_a.jpg", "username": "fatima.malik22" }], "count": 229 }, "comments": { "data": [{ "id": "17872559398118095", "text": "@eiman.18 \ud83e\udd17\ud83d\ude18\u2764\ufe0f", "created_time": "1497754437", "from": { "id": "2200232801", "full_name": "Hejab\ud83c\udf38", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20393807_119221295374743_478590533665554432_a.jpg", "username": "hejabahmed" } }, { "id": "17873236927105744", "text": "\ud83d\udc4d", "created_time": "1497862275", "from": { "id": "3087110152", "full_name": "Bestways Travels", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12519662_981405711929825_263264915_a.jpg", "username": "bestwaystravels" } }, { "id": "17861459068160741", "text": "How I apply", "created_time": "1499006806", "from": { "id": "3075103111", "full_name": "Bushra Iftikhar", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724708_103503153384542_295628067_a.jpg", "username": "bushraiftikhar364" } }, { "id": "17886139225008124", "text": "Marks required for admission", "created_time": "1499006820", "from": { "id": "3075103111", "full_name": "Bushra Iftikhar", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724708_103503153384542_295628067_a.jpg", "username": "bushraiftikhar364" } }], "count": 5 }, "can_view_comments": true, "can_delete_comments": false, "type": "video", "link": "https://www.instagram.com/p/BVWuG4OlZ4f/", "location": { "name": "Forman Christian College" }, "alt_media_url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19231648_318678891907488_3442774161598971904_n.mp4", "videos": { "standard_resolution": { "width": 640, "height": 359, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19232316_647720022094211_9024536684800245760_n.mp4" }, "low_bandwidth": { "width": 480, "height": 269, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19230352_1910286522577889_7486225625829605376_n.mp4" }, "low_resolution": { "width": 480, "height": 269, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19230352_1910286522577889_7486225625829605376_n.mp4" } }, "video_views": 1562 }, { "id": "1531170557437400479_2158748948", "code": "BU_z4Jul9Wf", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e15/c236.0.607.607/18950011_1680373475325955_4460300747799527424_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e15/c236.0.607.607/18950011_1680373475325955_4460300747799527424_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/e15/c236.0.607.607/18950011_1680373475325955_4460300747799527424_n.jpg" } }, "created_time": "1496749776", "caption": { "id": "17868566116090206", "text": "Admissions now open for Baccalaureate, Pharm D and Postgraduate program.\n\nApply Now! https://t.co/Mu1sKB6YVo\n\n#MYFCCU #University #Admissions https://t.co/nXQ7ldxokY", "created_time": "1496749776", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "993521530", "full_name": "Fatima Chaudhary", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18809638_447985912229657_6778901111257432064_a.jpg", "username": "fati_chaudhary" }, { "id": "3432938123", "full_name": "Chaudhry Daniyal Zaheer", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20180672_1915846221996509_4528362063747088384_a.jpg", "username": "ch.daniyal121" }, { "id": "198385761", "full_name": "Hashim Khan", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12677290_467396226787397_487543556_a.jpg", "username": "hashiaus" }, { "id": "2279109654", "full_name": "Muhammad Talha", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20181097_762148540622839_3813799056107372544_a.jpg", "username": "muhammad_talha70" }], "count": 196 }, "comments": { "data": [{ "id": "17872362856104314", "text": "Is there any entry test for bsc math hons?", "created_time": "1497523405", "from": { "id": "3516113031", "full_name": "Fahad khan", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/14499056_233178633754450_5373225003233837056_a.jpg", "username": "faddykhan1" } }, { "id": "17859950914152064", "text": "What is the last date for apply?", "created_time": "1497523423", "from": { "id": "3516113031", "full_name": "Fahad khan", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/14499056_233178633754450_5373225003233837056_a.jpg", "username": "faddykhan1" } }, { "id": "17886811327017191", "text": "Is there any entry test for pharm d", "created_time": "1499006882", "from": { "id": "3075103111", "full_name": "Bushra Iftikhar", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724708_103503153384542_295628067_a.jpg", "username": "bushraiftikhar364" } }, { "id": "17860723984169732", "text": "Kindly tell", "created_time": "1499006888", "from": { "id": "3075103111", "full_name": "Bushra Iftikhar", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724708_103503153384542_295628067_a.jpg", "username": "bushraiftikhar364" } }], "count": 8 }, "can_view_comments": true, "can_delete_comments": false, "type": "video", "link": "https://www.instagram.com/p/BU_z4Jul9Wf/", "location": { "name": "Forman Christian College" }, "alt_media_url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19026441_278720032599642_637691940673945600_n.mp4", "videos": { "standard_resolution": { "width": 640, "height": 359, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19000597_262988790843827_4282965078610804736_n.mp4" }, "low_bandwidth": { "width": 480, "height": 269, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19000216_499918310356249_5136285461538406400_n.mp4" }, "low_resolution": { "width": 480, "height": 269, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19000216_499918310356249_5136285461538406400_n.mp4" } }, "video_views": 1126 }, { "id": "1530410545366653204_2158748948", "code": "BU9HEhVF1kU", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e15/18888635_778553905638127_3779061614020395008_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e15/18888635_778553905638127_3779061614020395008_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/e15/18888635_778553905638127_3779061614020395008_n.jpg" } }, "created_time": "1496659175", "caption": { "id": "17858143783181229", "text": "Admissions are open! Apply now to FCCU and be a part of the learning experience that will give you a greater purpose. Merit \u0026 Need-Based scholarships available. Apply now to be a Formanite http://www.fccollege.edu.pk/apply-now/", "created_time": "1496659175", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "4034878698", "full_name": "Jannat Afzal", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20213824_1402398129842678_1754595797996929024_a.jpg", "username": "jannat_afzal" }, { "id": "3918249147", "full_name": "Madiha Aamir", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17265328_190219311470452_8792667691300159488_a.jpg", "username": "maddiaamir" }, { "id": "5359596769", "full_name": "Usman Sharif", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19933163_1952261915053797_5409707679511740416_a.jpg", "username": "usmansharif8605" }, { "id": "5490981091", "full_name": "Danyal Tabassam", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19534799_143013129587283_3042979725011058688_a.jpg", "username": "danyaltabassam" }], "count": 197 }, "comments": { "data": [{ "id": "17873908804074479", "text": "@qarsamgardezi1", "created_time": "1496660507", "from": { "id": "1917084292", "full_name": "Aimen", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19932971_1844211179229502_7781224239079620608_a.jpg", "username": "aimenrashidniaz" } }, { "id": "17857990369178766", "text": "Saaf juth .jitny obstacles fc mai hain itni zalalat kahen ni. Koi kam parh jaye sahi itnaa zaleel krty hain itny chakar lagaty hain", "created_time": "1496667158", "from": { "id": "2347432629", "full_name": "Ali Hassan Bukhari", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/14597300_1313123258721635_1074537818878902272_a.jpg", "username": "syedbukhari5" } }, { "id": "17882799124060804", "text": "Fsc k liay merit kiya hota fc ka", "created_time": "1496812407", "from": { "id": "2680399116", "full_name": "Tayyabamehmood", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17586659_1875577826032820_5613489751559503872_a.jpg", "username": "duadoll" } }, { "id": "17843480584194689", "text": "900 marks", "created_time": "1496900819", "from": { "id": "1647693630", "full_name": "Shoaib Bukhari", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20347624_412102222517855_7394377608470724608_a.jpg", "username": "shoaib_bukhari.7" } }], "count": 4 }, "can_view_comments": true, "can_delete_comments": false, "type": "video", "link": "https://www.instagram.com/p/BU9HEhVF1kU/", "location": null, "alt_media_url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/18951686_476153916066109_5602606583604314112_n.mp4", "videos": { "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/18951686_476153916066109_5602606583604314112_n.mp4" }, "low_bandwidth": { "width": 480, "height": 480, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19001084_304923656625310_495674809762447360_n.mp4" }, "low_resolution": { "width": 480, "height": 480, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/19001084_304923656625310_495674809762447360_n.mp4" } }, "video_views": 1019 }, { "id": "1525240342068345148_2158748948", "code": "BUqvgKSFDk8", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/18809439_1901081860114831_8948225166173798400_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/18809439_1901081860114831_8948225166173798400_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18809439_1901081860114831_8948225166173798400_n.jpg" } }, "created_time": "1496042839", "caption": { "id": "17881511203033889", "text": "Congratulations to @hamza.b93 for winning this week's #FCCU Instagram Photography Competition. The winner can collect his prize from the Communications Office, N 217 tomorrow Monday 30 May at 11:00 am. \n#FCCUPC17 #PhotographyCompetition #MYFCCU #FCCUSocial #FCCUCampus", "created_time": "1496042839", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2459539934", "full_name": "Ch Faisal Rajput", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/15876048_741669299322314_7778231608946982912_a.jpg", "username": "chfaisalrajput" }, { "id": "1269124868", "full_name": "Araaf Ahmad Khan", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19624707_121009818507130_211916499588218880_a.jpg", "username": "araafkhan" }, { "id": "2325289740", "full_name": "Abdullah Sarfraz", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20214700_344195599342942_4237264165565104128_a.jpg", "username": "abdullahsarfraz_" }, { "id": "2327520560", "full_name": "Muaviya Ijaz", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/16123987_586637561547519_3508531124513013760_a.jpg", "username": "muaviya_ijaz" }], "count": 322 }, "comments": { "data": [{ "id": "17881233871022064", "text": "@hamza.b93 congratulations buddy", "created_time": "1496060377", "from": { "id": "1315212061", "full_name": "Hamza Latif", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/11424694_941001712589185_1966769875_a.jpg", "username": "hamza.latif.90" } }, { "id": "17867782975088489", "text": "@hamza.latif.90 Thanks a lot man.", "created_time": "1496064371", "from": { "id": "2308375066", "full_name": "Hamza Butt", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18382391_740030462845202_254738938437042176_a.jpg", "username": "hamza.b93" } }, { "id": "17868049948080682", "text": "Congrats boyee \ud83d\udc4d\ud83c\udffb @hamza.b93", "created_time": "1496079267", "from": { "id": "1689371392", "full_name": "Manazir Ali Chaudhry", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17663026_269215796869995_7162912560939794432_a.jpg", "username": "manazir_ali_chaudhry" } }, { "id": "17882603647033937", "text": "@manazir_ali_chaudhry Thank you sir.", "created_time": "1496080557", "from": { "id": "2308375066", "full_name": "Hamza Butt", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18382391_740030462845202_254738938437042176_a.jpg", "username": "hamza.b93" } }], "count": 6 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUqvgKSFDk8/", "location": { "name": "Forman Christian College" }, "alt_media_url": null }, { "id": "1525214595669031561_2158748948", "code": "BUqppgFF_qJ", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/18646451_782449158586705_9134491524069851136_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/18646451_782449158586705_9134491524069851136_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18646451_782449158586705_9134491524069851136_n.jpg" } }, "created_time": "1496039770", "caption": { "id": "17881774063031629", "text": "FCCU won\u2019t just be a place to study. It will be your new home for the next few years. Fully-equipped \u0026 secure accommodation in #FCCU will help you make lasting memories. Join the #Baccalaureate (Hons) programs now. For admission details https://goo.gl/VvLSmX\n#Admission2017 #Hostel #ApplyNow #formanchristiancollege", "created_time": "1496039770", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "4626209210", "full_name": "Adil Khan Niazi", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/16585243_1392485314136370_211279384139530240_a.jpg", "username": "adilkhanniazi970" }, { "id": "1587631078", "full_name": "\u0627\u0644\u0644\u06c1 \u062f\u0627\u062f \u06af\u06be\u0645\u0646. \ud83d\udd31", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20184709_706970272823015_4477605226869686272_a.jpg", "username": "allahdad_ghumman" }, { "id": "2261918427", "full_name": "Salik Razzaque", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20347085_872517062923832_3248424816985767936_a.jpg", "username": "salikrazzaque" }, { "id": "1497230104", "full_name": "Akif Sher \ud83d\udc05 \ud83d\ude04", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19765148_1719399021695936_2083532680179220480_a.jpg", "username": "akif_sher" }], "count": 137 }, "comments": { "data": [{ "id": "17870846440110189", "text": "@samancutie its 22nd June. I've applied too", "created_time": "1496402243", "from": { "id": "5341803953", "full_name": "", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18948302_312029839222133_5594913425298817024_a.jpg", "username": "blaccklisted_" } }, { "id": "17882670559054537", "text": "@samancutie oh You got admission... I'll see you then xD ;)", "created_time": "1496412381", "from": { "id": "5341803953", "full_name": "", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18948302_312029839222133_5594913425298817024_a.jpg", "username": "blaccklisted_" } }], "count": 2 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUqppgFF_qJ/", "location": null, "alt_media_url": null }, { "id": "1523280622537607950_2158748948", "code": "BUjx6fPlwsO", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/c180.0.720.720/18581260_1223903151051607_4203955165176266752_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/c180.0.720.720/18581260_1223903151051607_4203955165176266752_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/18581260_1223903151051607_4203955165176266752_n.jpg" } }, "created_time": "1495809222", "caption": { "id": "17880611992001744", "text": "Contestant # 5: @sehar.khurshid\n\nVoting is open till 12:00 pm, Monday 29 May 2017. \nGreater the number of likes, higher the chances of winning. \n#FCCUPC17 #PhotographyCompetition #Photography #VoteNow #FCCUSocial #MYFCCU", "created_time": "1495809222", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "3056734440", "full_name": "Muhammad Imran Khetran", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/15875691_1903045159931636_7059693364261683200_a.jpg", "username": "khetranmuhammad" }, { "id": "2537640011", "full_name": "Mahnoor Naveed", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19624664_249473208886885_684355441790025728_a.jpg", "username": "mahnoornaveed94" }, { "id": "1813891522", "full_name": "Ch Muhammad Tayyab Sindhu", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19761494_243307652847349_1968596460530302976_a.jpg", "username": "tayyabsindhu" }, { "id": "4299730294", "full_name": "clever catoo", "profile_picture": "https://scontent-mad1-1.cdninstagram.com/t51.2885-19/11906329_960233084022564_1448528159_a.jpg", "username": "clever_catoo" }], "count": 749 }, "comments": { "data": [{ "id": "17870266051100273", "text": "Beautiful click", "created_time": "1495819976", "from": { "id": "229502319", "full_name": "UmerDurrani", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/14099613_1049772951738185_848695123_a.jpg", "username": "durranimusic" } }, { "id": "17857807930158635", "text": "Beautiful Click", "created_time": "1495820493", "from": { "id": "3032805889", "full_name": "Sheheryar Nasir\ud83d\ude0d", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20346948_1950040181920570_4570666976216612864_a.jpg", "username": "sheheryar_nasir" } }, { "id": "17870063284104682", "text": "woww amazing", "created_time": "1495820908", "from": { "id": "1810490352", "full_name": "Siki BOi", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/14596890_1713058945676351_2411597765604802560_a.jpg", "username": "sikandarnawazrajput" } }, { "id": "17859797389130532", "text": "@sehar.khurshid great stuff, solid balance and the perspective is very intricate yet easy on the eyes!", "created_time": "1495832985", "from": { "id": "813447220", "full_name": "Irtiza Shafaat Bokharee", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20225295_1281419961967202_8349157106183569408_a.jpg", "username": "irtiza_shafaat" } }], "count": 14 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUjx6fPlwsO/", "location": { "name": "Forman Christian College" }, "alt_media_url": null }, { "id": "1523280293779634769_2158748948", "code": "BUjx1tEFnpR", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/c236.0.607.607/18645067_1946029382335057_5542225897542647808_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/c236.0.607.607/18645067_1946029382335057_5542225897542647808_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/e35/c236.0.607.607/18645067_1946029382335057_5542225897542647808_n.jpg" } }, "created_time": "1495809183", "caption": { "id": "17881526947009757", "text": "Contestant # 4: @fastomar\n\nVoting is open till 12:00 pm, Monday 29 May 2017. \nGreater the number of likes, higher the chances of winning. \n#FCCUPC17 #PhotographyCompetition #Photography #VoteNow #FCCUSocial #MYFCCU", "created_time": "1495809183", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2281967890", "full_name": "Azeem Samson", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18812078_316158368805163_7650540161062666240_a.jpg", "username": "azeem_samson" }, { "id": "1956290176", "full_name": "Manahil", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19932248_1938531973054460_3335982350994505728_a.jpg", "username": "the_manahilghani" }, { "id": "1695198500", "full_name": "bluewater94", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18013788_1851970351721883_1507726510956478464_a.jpg", "username": "ata.ahmad94" }, { "id": "445407220", "full_name": "Mehreen Tahir", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19765081_607357112721669_5240402482475040768_a.jpg", "username": "mehreentahir" }], "count": 697 }, "comments": { "data": [{ "id": "17881273759016405", "text": "\u2764\u2764\u2764\u2764\u2764", "created_time": "1495818539", "from": { "id": "1570471594", "full_name": "\u2133\u03b1\u043d\u03b1\u2202 \u2133\u03b1\u043d\u043c\u03c3\u03c3\u2202 \u01ea\u03c5\u044f\u03b5s\u043d\u03b9", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19932861_133324180587210_2207681398519627776_a.jpg", "username": "mahadmahmood" } }, { "id": "17881711372029656", "text": "Brilliant \ud83d\udc4d", "created_time": "1495824097", "from": { "id": "53979449", "full_name": "", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/11324365_1772783166282046_1381492085_a.jpg", "username": "saad_rahman" } }, { "id": "17857272424164859", "text": "Level \ud83d\udc4d", "created_time": "1495879043", "from": { "id": "1610571044", "full_name": "Mohammad Ahmad Azeem", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19624587_166430580565468_8385821974974169088_a.jpg", "username": "ahmad_azeem55" } }, { "id": "17880632440018784", "text": "That's mine favorite", "created_time": "1495881939", "from": { "id": "3184238222", "full_name": "MALIK HAROON", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19051380_1778303562480139_7578928208536403968_a.jpg", "username": "malikharoon789" } }], "count": 15 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUjx1tEFnpR/", "location": { "name": "Forman Christian College" }, "alt_media_url": null }, { "id": "1523279964761619578_2158748948", "code": "BUjxw6pFfx6", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/c0.135.1080.1080/18722001_368634326871877_1449209625952911360_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/c0.135.1080.1080/18722001_368634326871877_1449209625952911360_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/18722001_368634326871877_1449209625952911360_n.jpg" } }, "created_time": "1495809144", "caption": { "id": "17857142098182022", "text": "Contestant # 3: @queenamite\n\nVoting is open till 12:00 pm, Monday 29 May 2017. \nGreater the number of likes, higher the chances of winning. \n#FCCUPC17 #PhotographyCompetition #Photography #VoteNow #FCCUSocial #MYFCCU", "created_time": "1495809144", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2295847256", "full_name": "Hassan Raza", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17819074_410105852702038_1769805642991665152_a.jpg", "username": "hasspeaks" }, { "id": "30604041", "full_name": "Mohsin Khalid", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17586977_1528016970571288_5742266133952593920_a.jpg", "username": "sheikhmohsink" }, { "id": "3056734440", "full_name": "Muhammad Imran Khetran", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/15875691_1903045159931636_7059693364261683200_a.jpg", "username": "khetranmuhammad" }, { "id": "2537640011", "full_name": "Mahnoor Naveed", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19624664_249473208886885_684355441790025728_a.jpg", "username": "mahnoornaveed94" }], "count": 895 }, "comments": { "data": [{ "id": "17881895269044062", "text": "Love", "created_time": "1495810197", "from": { "id": "1501654648", "full_name": "Talha Butt \u25cb\u00b0\u25cb", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19535427_202429933621917_6145583573299625984_a.jpg", "username": "talhabutt1500" } }, { "id": "17882093749041169", "text": "Bring in your shots @zaiddsaleem", "created_time": "1495817098", "from": { "id": "1438424133", "full_name": "Fatimah.", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19624635_135469437035226_8069599639097049088_a.jpg", "username": "fatimahzaheer7" } }, { "id": "17842453105197932", "text": "\u2764\u2764\u2764\ud83d\udc95\ud83d\udc95\ud83d\udc95\ud83d\udc95\ud83d\udc95\ud83d\udc95\ud83d\udcab", "created_time": "1495818479", "from": { "id": "1570471594", "full_name": "\u2133\u03b1\u043d\u03b1\u2202 \u2133\u03b1\u043d\u043c\u03c3\u03c3\u2202 \u01ea\u03c5\u044f\u03b5s\u043d\u03b9", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19932861_133324180587210_2207681398519627776_a.jpg", "username": "mahadmahmood" } }, { "id": "17857733341159061", "text": "Damn \ud83d\ude33\u2764\ufe0f\u2764\ufe0f", "created_time": "1495876388", "from": { "id": "1499792545", "full_name": "Zohaib Ahsan Khan Niazi", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19984449_2094315317308304_4042624824760074240_a.jpg", "username": "z.ahsan46" } }], "count": 5 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUjxw6pFfx6/", "location": null, "alt_media_url": null }, { "id": "1523279650180425473_2158748948", "code": "BUjxsVqlecB", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/c0.135.1080.1080/18645709_613809075495292_1809004976278601728_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/c0.135.1080.1080/18645709_613809075495292_1809004976278601728_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/18645709_613809075495292_1809004976278601728_n.jpg" } }, "created_time": "1495809106", "caption": { "id": "17881359523022552", "text": "Contestant # 2: @hamza.b93\n\nVoting is open till 12:00 pm, Monday 29 May 2017. \nGreater the number of likes, higher the chances of winning. \n#FCCUPC17 #PhotographyCompetition #Photography #VoteNow #FCCUSocial #MYFCCU", "created_time": "1495809106", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "1033812965", "full_name": "Khushnood Warriach", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/15099502_593167130869103_5720995291239284736_a.jpg", "username": "khushnood_warriach" }, { "id": "2461531085", "full_name": "Kashaf_Naeem Gondal", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/13381043_578571272321536_1515905306_a.jpg", "username": "kashaf_naeem" }, { "id": "1731011218", "full_name": "", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18380754_791596527675256_3009382515136790528_a.jpg", "username": "saadtariq441" }, { "id": "1524650600", "full_name": "Attique Ahmed", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/13256964_1042779942470151_1307602039_a.jpg", "username": "this_is_atiq" }], "count": 1204 }, "comments": { "data": [{ "id": "17882389207018827", "text": "@fatimahzaheer7 art is never worthy of this. It'll always perish differently. It'll always be judged differently. I'll always be perceived differently. So Yeah. Also I'm scared :D", "created_time": "1495827156", "from": { "id": "385267827", "full_name": "Zaid Saleem", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12237562_741033772669573_36080393_a.jpg", "username": "zaiddsaleem" } }, { "id": "17858166616150233", "text": "Love it", "created_time": "1495838238", "from": { "id": "445923305", "full_name": "Talha Murtaza Chaudary", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19051092_454603784908042_9000399075970908160_a.jpg", "username": "talhamch" } }, { "id": "17881066936038183", "text": "\ud83d\ude0d\ud83d\ude0d", "created_time": "1495879601", "from": { "id": "3320364650", "full_name": "Ehtisham Ali", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19534692_235331153636930_6651463616199393280_a.jpg", "username": "ehti_sham_007" } }, { "id": "17870445994129036", "text": "\u2714\ufe0f", "created_time": "1496269902", "from": { "id": "5537769435", "full_name": "M Salman Bilal", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18809438_1505135456227390_6738144637577330688_a.jpg", "username": "msb_m_salman_bilal" } }], "count": 12 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUjxsVqlecB/", "location": { "name": "Forman Christian College" }, "alt_media_url": null }, { "id": "1523279340481298315_2158748948", "code": "BUjxn1PFD-L", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/c0.135.1080.1080/18645352_1282971811840064_5966316457317892096_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/c0.135.1080.1080/18645352_1282971811840064_5966316457317892096_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/18645352_1282971811840064_5966316457317892096_n.jpg" } }, "created_time": "1495809069", "caption": { "id": "17881482700047668", "text": "Contestant # 1: @qasimamjad\n\nVoting is open till 12:00 pm, Monday 29 May 2017. \nGreater the number of likes, higher the chances of winning. \n#FCCUPC17 #PhotographyCompetition #Photography #VoteNow #FCCUSocial #MYFCCU", "created_time": "1495809069", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2290373725", "full_name": "Maryam", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20180633_1962623967314981_2556201600699858944_a.jpg", "username": "mariamh31" }, { "id": "1631884865", "full_name": "Asfand yar Nasir", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/10963845_1529547233965196_1598350844_a.jpg", "username": "asfandyarnasir" }, { "id": "1514327001", "full_name": "Muhammad Ali Tarar", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18646671_447493675600643_6693364531160154112_a.jpg", "username": "ali.tarar.3110" }, { "id": "3019011780", "full_name": "Gohar", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19535511_456021041434603_6544318673383849984_a.jpg", "username": "gohar.abid" }], "count": 417 }, "comments": { "data": [{ "id": "17856639949172438", "text": "Fan tas tic", "created_time": "1495810227", "from": { "id": "1501654648", "full_name": "Talha Butt \u25cb\u00b0\u25cb", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19535427_202429933621917_6145583573299625984_a.jpg", "username": "talhabutt1500" } }, { "id": "17881248031030328", "text": "\ud83d\udd25\ud83d\udd25", "created_time": "1495811360", "from": { "id": "2258530024", "full_name": "Rana Osama", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20225516_1862673484060119_5999268945356390400_a.jpg", "username": "osamarana_ro" } }], "count": 2 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUjxn1PFD-L/", "location": { "name": "Forman Christian College" }, "alt_media_url": null }, { "id": "1523208295413995311_2158748948", "code": "BUjhd_XFFcv", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/18646215_1872787379713961_6950252757131460608_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/18646215_1872787379713961_6950252757131460608_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18646215_1872787379713961_6950252757131460608_n.jpg" } }, "created_time": "1495800600", "caption": { "id": "17889389290016720", "text": "Congratulations to the 5 finalists of the #FCCU Instagram Photography Competition. Vote for your favourite picture in the upcoming posts. The more the number of likes, the more the chances of winning. #FCCUPC17", "created_time": "1495800600", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "1943708017", "full_name": "A.K _ Official", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19535250_472548443078399_6826067574518710272_a.jpg", "username": "azizkhan.a.k" }, { "id": "1560129586", "full_name": "\u0645\u062d\u0645\u062f \u0641\u0635\u064a\u062d \u0634\u0627\u0647\u062f \u0642\u0631\u064a\u0634\u064a \ud83d\udd31", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/15258795_596925553844474_1809751643458109440_a.jpg", "username": "faseehs" }, { "id": "1822586270", "full_name": "Sunny Javed", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/11142098_357538417775669_483508625_a.jpg", "username": "sunnyjaved8" }, { "id": "1491728739", "full_name": "Aqsa Ijaz", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18722672_1162438087194690_7214236028557590528_a.jpg", "username": "_aqsa_ijaz_" }], "count": 304 }, "comments": { "data": [{ "id": "17881541224032797", "text": "5th one", "created_time": "1495875257", "from": { "id": "229502319", "full_name": "UmerDurrani", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/14099613_1049772951738185_848695123_a.jpg", "username": "durranimusic" } }, { "id": "17867605186093388", "text": "3rd natural beauty", "created_time": "1495878869", "from": { "id": "1969050058", "full_name": "Ali Nazish", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17076571_1737743376516636_3506981066520920064_a.jpg", "username": "alinazish5" } }, { "id": "17859867862134408", "text": "3", "created_time": "1496043727", "from": { "id": "4005424024", "full_name": "Moiz Akram", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18094985_1342663142436004_2704721685759655936_a.jpg", "username": "akram_moiz" } }, { "id": "17876373895064944", "text": "5", "created_time": "1496430123", "from": { "id": "5427107913", "full_name": "fatimaa", "profile_picture": "https://scontent-mad1-1.cdninstagram.com/t51.2885-19/11906329_960233084022564_1448528159_a.jpg", "username": "fatimaa3800" } }], "count": 33 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BUjhd_XFFcv/", "location": { "name": "Forman Christian College" }, "alt_media_url": null }, { "id": "1523078461664863991_2158748948", "code": "BUjD8qQlSb3", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e15/c236.0.607.607/18646129_115417029041551_7568911034837106688_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e15/c236.0.607.607/18646129_115417029041551_7568911034837106688_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/e15/c236.0.607.607/18646129_115417029041551_7568911034837106688_n.jpg" } }, "created_time": "1495785123", "caption": { "id": "17857625548155853", "text": "Admissions are open for Baccalaureate and Pharm D program\n\nApply Now! https://goo.gl/f02QWq\n\n#MYFCCU #University #FCCUSocial #Admissions", "created_time": "1495785123", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2297052067", "full_name": "\u0639\u0628\u062f\u0627\u0644\u0631\u062d\u0645\u0627\u0646 \u06af\u06cc\u0644\u0627\u0646\u06cc", "profile_picture": "https://ig-s-b-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19050631_459521481049413_1278892908283428864_a.jpg", "username": "im__a.r" }, { "id": "1661803545", "full_name": "Hamza Hafeez", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18013526_425047824522711_8704240018392088576_a.jpg", "username": "hamxa_here" }, { "id": "1722466500", "full_name": "\u0633\u0644\u0637\u0627\u0646 \u062e\u0627\u0646 \u0628\u0627\u0628\u0631", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20346818_309732779487832_75416795334311936_a.jpg", "username": "sultaaanbabar" }, { "id": "1693725129", "full_name": "leena", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/19379807_110462739571171_1198140204494356480_a.jpg", "username": "alinatiwana" }], "count": 150 }, "comments": { "data": [], "count": 0 }, "can_view_comments": true, "can_delete_comments": false, "type": "video", "link": "https://www.instagram.com/p/BUjD8qQlSb3/", "location": { "name": "Forman Christian College" }, "alt_media_url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/18784048_211818749329962_2085725681890623488_n.mp4", "videos": { "standard_resolution": { "width": 640, "height": 359, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/18785551_258354221306284_3470889292396494848_n.mp4" }, "low_bandwidth": { "width": 480, "height": 269, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/18719323_226380077862164_3689917471847874560_n.mp4" }, "low_resolution": { "width": 480, "height": 269, "url": "https://scontent-mxp1-1.cdninstagram.com/t50.2886-16/18719323_226380077862164_3689917471847874560_n.mp4" } }, "video_views": 967 }, { "id": "1518034247818239737_2158748948", "code": "BURJBsCFV75", "user": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" }, "images": { "thumbnail": { "width": 150, "height": 150, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s150x150/e35/c38.0.1003.1003/18512510_285637951894141_1507785725670588416_n.jpg" }, "low_resolution": { "width": 320, "height": 320, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s320x320/e35/c38.0.1003.1003/18512510_285637951894141_1507785725670588416_n.jpg" }, "standard_resolution": { "width": 640, "height": 640, "url": "https://scontent-mxp1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c38.0.1003.1003/18512510_285637951894141_1507785725670588416_n.jpg" } }, "created_time": "1495183805", "caption": { "id": "17868890323120071", "text": "To all those who think they can pull out unique photos from their cameras, get prepared! Challenge your photography skills \u0026 bag fantastic weekly surprises for your creativity. \n#FCCU Instagram #Photography Competition\u201917, sponsored by @messagepk is creating an opportunity for all the shutterbugs. Avail it!! Terms and Conditions:\n\u25aa\ufe0f Be creative \u0026 unique with your photos, while remaining within the premises of the University\n\u25aa\ufe0f The photos should not contain any watermark or logo\n\u25aa\ufe0f Make sure you submit your entries till every week\u2019s Wednesday \u25aa\ufe0f With the consent of internal jury, 5 best entries will be uploaded on FCCU\u2019s Insta account (contestants\u2019 IDs must clearly be mentioned with #FCCUPC17) \u25aa\ufe0f Voting time begins right after the post gets uploaded and will end sharp on Monday, 12pm. So make sure you don\u2019t miss the chance.\n\u25aa\ufe0f Greater the number of likes, higher the chances of winning \u25aa\ufe0f Treat awaits the winner that will be announced every Monday \nNote: Kindly note that these pictures will not be subject to any copyrights once they have been submitted. FCCU will be using them later on its Instagram. Let your talent be ours!\n\n#photographycontest #photographycompetition #FCC #Instagram #creative #fccollege #campusphotography #surprises #NatureatFCCU #university", "created_time": "1495183805", "from": { "id": "2158748948", "full_name": "Forman Christian College", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/12724763_768177853315583_108625580_a.jpg", "username": "formanchristiancollege" } }, "likes": { "data": [{ "id": "2126962318", "full_name": "Hamza Irshad", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18161327_432091977139372_956154424118476800_a.jpg", "username": "lame._.me" }, { "id": "2925233519", "full_name": "Mohammad Usman", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17493467_234348536971939_6874788888955584512_a.jpg", "username": "m.usman950" }, { "id": "325326303", "full_name": "Fatima Zehra", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/18644759_1952126521689047_3128668200921726976_a.jpg", "username": "fatimaxehra" }, { "id": "1534301160", "full_name": "Abdullah Aslam", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/16788609_206788966463694_8038387987202965504_a.jpg", "username": "abdullah.aslam29" }], "count": 269 }, "comments": { "data": [{ "id": "17881156750002638", "text": "@ismaayill", "created_time": "1495189069", "from": { "id": "970764362", "full_name": "Arbaz Khan (KhanTastic)", "profile_picture": "https://ig-s-c-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/17077113_373365283050842_3632148873226485760_a.jpg", "username": "arbazkhan21" } }, { "id": "17866790815090597", "text": "Awesome.", "created_time": "1495191428", "from": { "id": "29177607", "full_name": "Jules Bruff \ud83d\udcfd\ud83d\udcfa\ud83c\udf0e", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/13395145_1715446045404451_1845716989_a.jpg", "username": "julesbruff" } }, { "id": "17882263714045654", "text": "@abdullahviews you should send them your pictures.", "created_time": "1495207684", "from": { "id": "614273837", "full_name": "Rija Imtiaz", "profile_picture": "https://ig-s-a-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20066597_2035266666759884_6658227455251185664_a.jpg", "username": "rijaaim" } }, { "id": "17869650412102658", "text": "@fastomar read them all", "created_time": "1495341553", "from": { "id": "3013930108", "full_name": "\u0633\u06cc\u062f \u0645\u062d\u0645\u062f \u0639\u0644\u06cc \u0632\u06cc\u0646 \u0631\u0636\u0648\u06cc", "profile_picture": "https://ig-s-d-a.akamaihd.net/h-ak-igx/t51.2885-19/s150x150/20394376_2342830822608219_2239174929117347840_a.jpg", "username": "ali_zainrizvi" } }], "count": 8 }, "can_view_comments": true, "can_delete_comments": false, "type": "image", "link": "https://www.instagram.com/p/BURJBsCFV75/", "location": null, "alt_media_url": null }], "more_available": true, "status": "ok" }
      $scope.instaFeeds = [];
      $scope.instagram = function(){
         $http.get('https://www.instagram.com/formanchristiancollege/media/')
            .then(function (respose) {
               $scope.instaFeeds = respose.data.items;
            })
      }
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
