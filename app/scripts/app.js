'use strict';

/**
 * @ngdoc overview
 * @name yeodjangoApp
 * @description
 * # yeodjangoApp
 *
 * Main module of the application.
 */
angular
  .module('yeodjangoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'infinite-scroll',
    //'srph.infinite-scroll',
    'LocalStorageModule',
    'angularMoment',
    'summernote',
    'ngTagsInput',
    'ui.bootstrap',
    //'ngImgCrop',
    'ngFileUpload',
    'internationalPhoneNumber'
  ])
  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      $rootScope.state = $state;
      $rootScope.stateParams = $stateParams;
      $rootScope.bodyBackground = 'background-light-white';
      $rootScope.summerNoteSimple = {
        height: 200,
        toolbar: [
          ['style', ['bold', 'italic', 'strikethrough']],
          ['fontface', ['fontname']],
          ['textsize', ['fontsize']],
          ['alignment', ['ul', 'ol']],
          ['insert', ['link']]
        ]
      };
      $rootScope.summerNoteFull = {
        height: 300,
        toolbar: [
          ['edit', ['undo', 'redo']],
          ['headline', ['style']],
          ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
          ['fontface', ['fontname']],
          ['textsize', ['fontsize']],
          ['fontclr', ['color']],
          ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video', 'hr']],
          ['view', ['fullscreen']]
        ]
      };
    }])
  .config(['$httpProvider', '$resourceProvider', function ($httpProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('xberts')
      .setStorageType('sessionStorage');
  }])
  .config(['ipnConfig', function (ipnConfig) {
    ipnConfig.autoHideDialCode=false;
    ipnConfig.nationalMode=false;
    ipnConfig.autoPlaceholder=false;
  }])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
    $stateProvider
      .state('main', {
        url: "/main",
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          projectPaginator: ['Paginator', 'ProjectsNoDetail', function (Paginator, ProjectsNoDetail) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, is_recommended: 'True'};
              angular.extend(params, otherParams);
              ProjectsNoDetail.get(params, callback);
            };
            var paginator = Paginator('projectRec', fetchFunction);
            return paginator.load();
          }],
          eventPaginator: ['Paginator', 'EventNoDetail', function (Paginator, EventNoDetail) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage};
              angular.extend(params, otherParams);
              EventNoDetail.get(params, callback);
            };
            var paginator = Paginator('eventRec', fetchFunction);
            return paginator.load();
          }],
          expertPaginator: ['Paginator', 'Expert', function (Paginator, Expert) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, recommended: 'True'};
              angular.extend(params, otherParams);
              Expert.get(params, callback);
            };
            var paginator = Paginator('expertRec', fetchFunction);
            return paginator.load();
          }]
        }
      })
      .state('about', {
        url: "/about",
        templateUrl: '/views/about.html'
      })
      .state('projects', {
        url: "/projects",
        templateUrl: "/views/projects.html",
        controller: "ProjectsCtrl",
        resolve: {
          projectPaginator: ['Paginator', 'ProjectsNoDetail', function (Paginator, ProjectsNoDetail) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage};
              angular.extend(params, otherParams);
              ProjectsNoDetail.get(params, callback);

            };
            var paginator = Paginator('project', fetchFunction);
            return paginator.load();
          }]
        }
      })
      .state('project', {
        url: "/projects/:projectId?tab",
        templateUrl: '/views/project.html',
        controller: 'ProjectCtrl',
        resolve: {
          distributions: ['DistributionLoad', '$stateParams', function (DistributionLoad, $stateParams) {
            return DistributionLoad($stateParams);
          }],
          projectTypes: ['SystemData', function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
          targetGeos: ['SystemData', function (SystemData) {
            return SystemData.getTargetGeosPromise();
          }],
          supportTypes: ['SystemData', function (SystemData) {
            return SystemData.getSupportTypesPromise();
          }],
          transportationModels: ['SystemData', function (SystemData) {
            return SystemData.getTransportationModelsPromise();
          }],
          project:['ProjectLoad','$stateParams',function(ProjectLoad,$stateParams){
            return ProjectLoad($stateParams);
          }]
        }
      })
      .state('launchProject', {
        url: "/launch/project/{projectId:[0-9]*}",
        templateUrl: '/views/launchproject.html',
        controller: 'LaunchprojectCtrl',
        controllerAs: 'launchProject',
        resolve: {
          projectTypes: ['SystemData', function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
          targetGeos: ['SystemData', function (SystemData) {
            return SystemData.getTargetGeosPromise();
          }],
          supportTypes: ['SystemData', function (SystemData) {
            return SystemData.getSupportTypesPromise();
          }],
          transportationModels: ['SystemData', function (SystemData) {
            return SystemData.getTransportationModelsPromise();
          }]
        }
      })
      .state('resources', {
        url: "/resources",
        templateUrl: "/views/resources.html",
        controller: "ResourcesCtrl"
      })
      .state('events', {
        url: "/events/",
        templateUrl: '/views/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events',
        resolve: {
          eventPaginator: ['Paginator', 'EventNoDetail', function (Paginator, EventNoDetail) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage,is_partner:'False'};
              angular.extend(params, otherParams);
              EventNoDetail.get(params, callback);
            };
            var paginator = Paginator('event', fetchFunction);
            return paginator.load();
          }],
          eventPartnerPaginator: ['Paginator', 'EventNoDetail', function (Paginator, EventNoDetail) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage,is_partner:'True'};
              angular.extend(params, otherParams);
              EventNoDetail.get(params, callback);
            };
            var paginator = Paginator('event', fetchFunction);
            return paginator.load();
          }]
        }
      })
      .state('event', {
        url: "/events/:eventId",
        templateUrl: '/views/event.html',
        controller: 'EventCtrl',
        resolve: {
          event: ['EventLoad', '$stateParams', function (EventLoad, $stateParams) {
            return EventLoad($stateParams);
          }]
        }
      })
      .state('experts', {
        url: "/experts",
        templateUrl: '/views/experts.html',
        controller: 'ExpertsCtrl',
        controllerAs: 'experts',
        resolve: {
          stages: ['SystemData', function (SystemData) {
            return SystemData.getStagesPromise();
          }],
          expertPaginator: ['Paginator', 'Expert', function (Paginator, Expert) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage};
              angular.extend(params, otherParams);
              Expert.get(params, callback);
            };
            var paginator = Paginator('expert', fetchFunction);
            return paginator.load();
          }]
        }
      })
      .state('expert', {
        url: "/experts/:expertId?tab",
        templateUrl: '/views/expert.html',
        controller: 'ExpertCtrl',
        resolve:{
          expert:['ExpertLoad','$stateParams',function(ExpertLoad,$stateParams){
            return ExpertLoad($stateParams);
          }]
        }
      })
      .state('launch', {
        url: "/launch/:eventId",
        templateUrl: '/views/eventlauch.html',
        controller: 'EventLauchCtrl',
        resolve: {
          event: ['EventLoad', '$stateParams', function (EventLoad, $stateParams) {
            var eventId = $stateParams.eventId || null;
            return eventId === null ? {} : EventLoad($stateParams);
          }]
        }
      })
      .state('reviewApplicant', {
        url: "/review/:reviewId/applicant",
        templateUrl: '/views/reviewapplication.html',
        controller: 'ReviewapplicationCtrl',
        resolve: {
          review: ['ReviewLoad', '$stateParams', function (ReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewLoad($stateParams);
          }],
          reviewer: ['ProfileReviewerLoad', function (ProfileReviewerLoad) {
            return ProfileReviewerLoad();
          }]
        }
      });
  }]);
