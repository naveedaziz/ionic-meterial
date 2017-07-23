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
                           { name: 'Events Calendar', img: 'id-card', menu: [], link: 'events', params: { page: 'academy' } },
                           { name: 'Academic Calendar', img: 'check', menu: [], link: 'events', params: { page: 'international' } },
                           { name: 'Today’s Events', img: 'books', menu: [], link: 'events', params: { page: 'academy' } },
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
                        img: 'professor', name: 'Jobs', link: 'home', params: { page: 'jobs' },
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
                        img: 'support', name: 'Support FCCU', link: 'home', params: { page: 'support-fccu' },
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
                        img: 'network', name: 'Social', link: 'home', params: { page: 'social' },
                        list: [
                           { name: 'Facebook', img: 'id-card', menu: [], link:'https://www.facebook.com/fccollege/' },
                           { name: 'Twitter', img: 'check', menu: [], link: 'https://twitter.com/FCCollege' },
                           { name: 'Instagram', img: 'books', menu: [], link: 'https://www.instagram.com/formanchristiancollege/' },
                           { name: 'LinkedIn', img: 'books', menu: [], link: 'https://www.linkedin.com/school/310575/' },
                           { name: 'YouTube', img: 'books', menu: [], link: 'https://www.youtube.com/user/FCCUniversity' },
                        ]   }, 
                     {
                        img: 'contact', name: 'Contact', link: 'page', params: { page: 'contact' },
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
