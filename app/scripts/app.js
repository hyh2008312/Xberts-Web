'use strict';

angular
  .module('xbertsApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'infinite-scroll',
    'LocalStorageModule',
    'angularMoment',
    'summernote',
    'ngTagsInput',
    'ui.bootstrap',
    'ngImgCrop',
    'ngFileUpload',
    'internationalPhoneNumber',
    'duScroll',
    'angular-growl',
    'configuration.properties',
    'dcbImgFallback'
  ])
  .value('duScrollOffset', 50)
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
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }])
  .config(['$httpProvider', '$resourceProvider', function ($httpProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $httpProvider.interceptors.push('RequestInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');
  }])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('xberts')
      .setStorageType('sessionStorage');
  }])
  .config(['ipnConfig', function (ipnConfig) {
    ipnConfig.autoHideDialCode = false;
    ipnConfig.nationalMode = false;
    ipnConfig.autoPlaceholder = false;
  }])
  .config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalDisableCountDown(true);
  }])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");

    // TODO: Remove after CES event ends
    $urlRouterProvider.when('/ces2016', ['$state', function($state) {
      $state.go('application.voteoff', {eventId: 1});
    }]);

    $stateProvider
      .state('application', {
        abstract: true,
        templateUrl: 'views/navigation.html',
        controller: 'ApplicationCtrl',
        resolve: {
          authCheck: ['UserResolver', function (UserResolver) {
            return UserResolver.resolver();
          }]
        }
      })
      .state('application.protected', {
        abstract: true,
        template: '<div ui-view></div>',
        resolve: {
          protectedAuthCheck: ['authCheck', function (authCheck) {
            // no-opt
          }]
        }
      })
      .state('application.main', {
        url: "/main",
        templateUrl: 'views/main.html',
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
      .state('application.about', {
        url: "/about",
        templateUrl: 'views/about.html'
      })
      .state('application.projects', {
        url: '/projects',
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        resolve: {
          projectTypes: ['SystemData', function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
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
      .state('application.protected.launchProject', {
        url: "/launch/project/{projectId:[0-9]*}",
        templateUrl: 'views/launchproject.html',
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
      .state('application.project', {
        url: "/projects/:projectId?tab",
        templateUrl: 'views/project.html',
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
          project: ['ProjectLoad', '$stateParams', function (ProjectLoad, $stateParams) {
            return ProjectLoad($stateParams);
          }]
        }
      })
      .state('application.projectnorequest', {
        url: "/projectsnorequest/:projectId",
        templateUrl: 'views/project_no_request.html',
        controller: 'ProjectNoRequestCtrl',
        resolve: {
          projectTypes: ['SystemData', function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
          project: ['ProjectLoad', '$stateParams', function (ProjectLoad, $stateParams) {
            return ProjectLoad($stateParams);
          }]
        }
      })
      .state('application.resources', {
        url: '/resources',
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl'
      })
      .state('application.events', {
        url: '/events/',
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events',
        resolve: {
          eventPaginator: ['Paginator', 'EventNoDetail', function (Paginator, EventNoDetail) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, is_partner: 'False'};
              angular.extend(params, otherParams);
              EventNoDetail.get(params, callback);
            };
            var paginator = Paginator('event', fetchFunction);
            return paginator.load();
          }],
          eventPartnerPaginator: ['Paginator', 'EventNoDetail', function (Paginator, EventNoDetail) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, is_partner: 'True'};
              angular.extend(params, otherParams);
              EventNoDetail.get(params, callback);
            };
            var paginator = Paginator('event_r', fetchFunction);
            return paginator.load();
          }]
        }
      })
      .state('application.event', {
        url: '/events/:eventId',
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        resolve: {
          event: ['EventLoad', '$stateParams', function (EventLoad, $stateParams) {
            return EventLoad($stateParams);
          }]
        }
      })
      .state('application.vote', {
        url: "/vote/:eventId",
        templateUrl: 'views/vote.html',
        controller: 'VoteCtrl'
      })
      .state('application.voteoff', {
        url: "/voteoff/:eventId",
        templateUrl: 'views/voteoffline.html',
        controller: 'VoteOffCtrl'
      })
      .state('application.experts', {
        url: '/experts',
        templateUrl: 'views/experts.html',
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
      .state('application.expert', {
        url: '/experts/:expertId?tab',
        templateUrl: 'views/profile/expert.html',
        controller: 'ExpertCtrl',
        resolve: {
          expert: ['ExpertLoad', '$stateParams', function (ExpertLoad, $stateParams) {
            return ExpertLoad.get($stateParams);
          }]
        }
      })
      .state('application.protected.editProfile', {
        url: '/editprofile',
        templateUrl: 'views/profile/edit-profile.html',
        controller: 'EditProfileCtrl',
        resolve: {
          userProfile: ['authCheck', 'UserProfileResolver', function (authCheck, UserProfileResolver) {
            return UserProfileResolver.resolver();
          }]
        }
      })
      .state('application.protected.launch', {
        url: '/launch/:eventId',
        templateUrl: 'views/eventlauch.html',
        controller: 'EventLauchCtrl',
        resolve: {
          event: ['EventLoad', '$stateParams', function (EventLoad, $stateParams) {
            var eventId = $stateParams.eventId || null;
            return eventId === null ? {} : EventLoad($stateParams);
          }]
        }
      })
      .state('application.reviews', {
        url: "/reviews",
        templateUrl: 'views/reviewprojects.html',
        controller: 'ReviewProjectsCtrl',
        resolve:{
          projectReviewPaginator: ['Paginator', 'ProjectReview', function (Paginator, ProjectReview) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage};
              angular.extend(params, otherParams);
              ProjectReview.get(params, callback);

            };
            var paginator = Paginator('projectReview', fetchFunction);
            return paginator.load();
          }]
        }
      })
      .state('application.review', {
        url: "/reviews/:reviewId",
        templateUrl: 'views/reviewproject.html',
        controller: 'ReviewprojectCtrl',
        resolve: {
          review: ['ProjectReviewLoad', '$stateParams', function (ProjectReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ProjectReviewLoad($stateParams);
          }]
        }
      })
      .state('application.protected.reviewApplicant', {
        url: '/review/:reviewId/applicant',
        templateUrl: 'views/reviewapplication.html',
        controller: 'ReviewapplicationCtrl',
        resolve: {
          review: ['ReviewLoad', '$stateParams', function (ReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewLoad($stateParams);
          }],
          reviewer: ['ProfileReviewerLoad', 'authCheck', function (ProfileReviewerLoad, authCheck) {
            return ProfileReviewerLoad();
          }]
        }
      })
      .state('application.protected.reviewReport', {
        url: '/review/:reviewId/report',
        templateUrl: 'views/reviewreport.html',
        controller: 'ReviewreportCtrl',
        resolve: {
          applicant: ['ApplicantsreviewLoad', 'authCheck', '$stateParams', function (ApplicantsreviewLoad, authCheck, $stateParams) {
            return ApplicantsreviewLoad($stateParams);
          }]
        }
      })
      .state('application.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('application.signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .state('application.resetPassword', {
        abstract: true,
        template: '<div ui-view></div>',
        controller: 'ResetPasswordCtrl'
      })
      .state('application.resetPassword.request', {
        url: '/resetpw/request',
        templateUrl: 'views/reset_password/reset_password_request.html',
        controller: 'ResetPasswordRequestCtrl'
      })
      .state('application.resetPassword.sent', {
        templateUrl: 'views/reset_password/reset_password_sent.html'
      })
      .state('application.resetPassword.confirm', {
        url: '/resetpw/confirm/:uid/:token',
        templateUrl: 'views/reset_password/reset_password_confirm.html',
        resolve: {
          tokenCheck: ['$stateParams', 'TokenCheckResolver', function ($stateParams, TokenCheckResolver) {
            return TokenCheckResolver.resolver($stateParams.uid, $stateParams.token);
          }]
        },
        controller: 'ResetPasswordConfirmCtrl'
      })
      .state('application.resetPassword.success', {
        templateUrl: 'views/reset_password/reset_password_success.html'
      })
      .state('application.resetPassword.error', {
        templateUrl: 'views/reset_password/reset_password_error.html'
      })
      .state('application.protected.setting', {
        url: '/setting',
        templateUrl: 'views/profile/setting.html',
        controller: 'SettingCtrl',
        resolve: {
          settingAuthCheck: ['protectedAuthCheck', function (protectedAuthCheck) {
            // no-opt
          }]
        }
      });
  }]);
