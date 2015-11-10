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
    'ngFileUpload'
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
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/projects");
    $stateProvider
      .state('projects', {
        url: "/projects",
        templateUrl: "/views/projects.html",
        controller: "ProjectsCtrl"
      })
      .state('launchProject', {
        url: "/launch/project/{projectId:[0-9]*}",
        templateUrl: '/views/launchproject.html',
        controller: 'LaunchprojectCtrl',
        controllerAs: 'launchProject',
        resolve: {
          projectTypes: ['SystemData',function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
          targetGeos: ['SystemData',function (SystemData) {
            return SystemData.getTargetGeosPromise();
          }],
          supportTypes: ['SystemData',function (SystemData) {
            return SystemData.getSupportTypesPromise();
          }],
          transportationModels:['SystemData', function (SystemData) {
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
        controllerAs: 'events'
      })
      .state('event', {
        url: "/events/:eventId",
        templateUrl: '/views/event.html',
        controller: 'EventCtrl',
        resolve: {
          event: ['EventLoad','$stateParams',function (EventLoad,$stateParams) {
            return EventLoad($stateParams);
          }]
        }
      })

      .state('launch', {
        url: "/launch",
        templateUrl: '/views/eventlauch.html',
        controller: 'EventLauchCtrl'
      });
  }]);
