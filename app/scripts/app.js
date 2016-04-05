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
    'ngImgCrop',
    'ngFileUpload',
    'ngTagsInput',
    'ngIdle',
    'angularMoment',
    'angular-growl',
    'ui.router',
    'infinite-scroll',
    'LocalStorageModule',
    'summernote',
    'ui.bootstrap',
    'internationalPhoneNumber',
    'duScroll',
    'dcbImgFallback',
    'configuration.properties',
    'satellizer',
    'checklist-model',
    'angularRandomString',
    '720kb.socialshare'
  ])
  .value('duScrollOffset', 50)
  .run(['$rootScope', '$state', '$stateParams', '$window', 'localStorageService', 'PageService', 'SignupService',
    function ($rootScope, $state, $stateParams, $window, localStorageService, PageService, SignupService) {
      $rootScope.state = $state;
      $rootScope.stateParams = $stateParams;
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
      $rootScope.pageSettings = PageService.pageSetting;
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
        //popover: {
        //  image: [['remove', ['removeMedia']] ],
        //  air: [['insert', ['picture']]]
        //}
      };
      localStorageService.clearAll();

      // Capture potential campaign/source query param
      SignupService.saveSourceParam();
    }])
  .config(['$locationProvider', function ($locationProvider) {
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
  .config(['$authProvider', 'ConfigurationProvider', function ($authProvider, ConfigurationProvider) {
    $authProvider.linkedin({
      clientId: ConfigurationProvider.linkedinClientId,
      url: ConfigurationProvider.apiBaseUrl + '/accounts/linkedin/token/'
    });
  }])
  .config(['tagsInputConfigProvider', function (tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', {
      minLength: 1
    });
  }])
  .config(['IdleProvider', 'KeepaliveProvider', 'ConfigurationProvider',
    function (IdleProvider, KeepaliveProvider, ConfigurationProvider) {
      IdleProvider.idle(ConfigurationProvider.idleTimeout); // seconds
      // Disable timeout feature since automatic logout is not desired for now
      IdleProvider.timeout(0);
      KeepaliveProvider.interval(ConfigurationProvider.tokenRefreshCheckInterval);
    }])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");

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
              var params = {page: nextPage, is_recommended: 'True'};
              angular.extend(params, otherParams);
              EventNoDetail.get(params, callback);
            };
            var paginator = Paginator('eventRec', fetchFunction);
            return paginator.load();
          }],
          expertPaginator: ['Paginator', 'Influencer', function (Paginator, Influencer) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, recommended: 'True'};
              angular.extend(params, otherParams);
              Influencer.get(params, callback);
            };
            var paginator = Paginator('influencerRec', fetchFunction);
            return paginator.load();
          }],
          projectReviewPaginator: ['Paginator', 'ProjectReview', function (Paginator, ProjectReview) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage};
              angular.extend(params, otherParams);
              ProjectReview.get(params, callback);

            };
            var paginator = Paginator('projectReviewREc', fetchFunction);
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
        templateUrl: 'views/project/projects.html',
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
        templateUrl: 'views/project/launchproject.html',
        controller: 'LaunchprojectCtrl',
        controllerAs: 'launchProject',
        resolve: {
          projectTypes: ['SystemData', function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
          targetGeos: ['SystemData', function (SystemData) {
            return SystemData.getTargetGeosPromise();
          }],
          //supportTypes: ['SystemData', function (SystemData) {
          //  return SystemData.getSupportTypesPromise();
          //}],
          transportationModels: ['SystemData', function (SystemData) {
            return SystemData.getTransportationModelsPromise();
          }]
        }
      })
      .state('application.project', {
        url: "/projects/:projectId?tab",
        templateUrl: 'views/project/project.html',
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
          //supportTypes: ['SystemData', function (SystemData) {
          //  return SystemData.getSupportTypesPromise();
          //}],
          //transportationModels: ['SystemData', function (SystemData) {
          //  return SystemData.getTransportationModelsPromise();
          //}],
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
      .state('application.events', {
        url: '/events',
        templateUrl: 'views/event/events.html',
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
        templateUrl: 'views/event/event.html',
        controller: 'EventCtrl',
        resolve: {
          event: ['EventLoad', '$stateParams', function (EventLoad, $stateParams) {
            return EventLoad($stateParams);
          }]
        }
      })
      .state('application.vote', {
        url: "/vote/:eventId",
        templateUrl: 'views/event/vote.html',
        controller: 'VoteCtrl'
      })
      .state('application.voteoff', {
        url: "/voteoff/:eventId",
        templateUrl: 'views/event/voteoffline.html',
        controller: 'VoteOffCtrl'
      })
      .state('application.experts', {
        url: '/influencers',
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
        url: '/influencers/:expertId?tab&action',
        templateUrl: 'views/profile/expert.html',
        controller: 'ExpertCtrl',
        reloadOnSearch: false,
        resolve: {
          expert: ['ExpertLoad', '$stateParams', function (ExpertLoad, $stateParams) {
            return ExpertLoad.get($stateParams);
          }],
          roleRequests: ['authCheck', 'SystemConstant', 'RoleRequestsResolver',
            function (authCheck, SystemConstant, RoleRequestsResolver) {
              return RoleRequestsResolver.resolver(SystemConstant.ROLES.DOMAIN_EXPERT);
            }]
        }
      })
      .state('application.protected.profile', {
        url: '/profile?action',
        controller: 'UserProfileCtrl'
      })
      .state('application.protected.companyInfo', {
        url: '/profile/company',
        templateUrl: 'views/profile/companyform.html',
        controller: 'CompanyFormCtrl'
      })
      .state('application.protected.editProfile', {
        url: '/editprofile',
        templateUrl: 'views/profile/edit-profile.html',
        controller: 'EditProfileCtrl',
        resolve: {
          userProfile: ['authCheck', 'UserProfileResolver', function (authCheck, UserProfileResolver) {
            return UserProfileResolver.resolver();
          }],
          stages: ['SystemData', function (SystemData) {
            return SystemData.getStagesPromise();
          }]
        }
      })
      .state('application.protected.reviewerShipAddress', {
        url: '/reviews/:reviewId/confirmaddress',
        templateUrl: 'views/review/review_applicant_shipping_address.html',
        controller: 'ShipAddressCtrl',
        resolve: {
          reviewer: ['ProfileReviewerLoad', 'authCheck', function (ProfileReviewerLoad, authCheck) {
            return ProfileReviewerLoad();
          }],
          review: ['ReviewLoad', '$stateParams', function (ReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewLoad($stateParams);
          }]
        }
      })
      .state('application.protected.launch', {
        url: '/launch/:eventId',
        templateUrl: 'views/event/eventlauch.html',
        controller: 'EventLauchCtrl',
        resolve: {
          event: ['EventLoad', '$stateParams', function (EventLoad, $stateParams) {
            var eventId = $stateParams.eventId || null;
            return eventId === null ? {} : EventLoad($stateParams);
          }]
        }
      })
      .state('application.reviewRequest', {
        url: "/review/request",
        templateUrl: 'views/review/review_request.html',
        controller: 'ReviewRequestCtrl',
        controllerAs: 'reviewRequest',
        resolve: {
          targetGeos: ['SystemData', function (SystemData) {
            return SystemData.getTargetGeosPromise();
          }]
        }
      })
      .state('application.reviews', {
        url: "/reviews",
        templateUrl: 'views/review/review_projects.html',
        controller: 'ReviewProjectsCtrl',
        resolve: {
          projectReviewPaginator: ['Paginator', 'ProjectReview', function (Paginator, ProjectReview) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage};
              angular.extend(params, otherParams);
              ProjectReview.get(params, callback);

            };
            var paginator = Paginator('projectReview', fetchFunction);
            paginator.setOrder('state',false);
            return paginator.load();
          }]
        }
      })
      .state('application.crowdtestings', {
        url: "/crowdtesting",
        templateUrl: 'views/review/review_projects.html',
        controller: 'ReviewProjectsCtrl',
        resolve: {
          projectReviewPaginator: ['Paginator', 'ProjectReview', function (Paginator, ProjectReview) {
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage};
              angular.extend(params, otherParams);
              ProjectReview.get(params, callback);
            };
            var paginator = Paginator('projectReview', fetchFunction);
            paginator.setOrder('state',false);
            return paginator.load();
          }]
        }
      })
      .state('application.crowdtesting', {
        url: "/crowdtesting/:reviewId",
        templateUrl: 'views/review/review_project.html',
        controller: 'ReviewprojectCtrl',
        resolve: {
          review: ['ProjectReviewLoad', '$stateParams', function (ProjectReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ProjectReviewLoad($stateParams);
          }]
        }
      })
      .state('application.review', {
        url: "/reviews/:reviewId",
        templateUrl: 'views/review/review_project.html',
        controller: 'ReviewprojectCtrl',
        resolve: {
          review: ['ProjectReviewLoad', '$stateParams', function (ProjectReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ProjectReviewLoad($stateParams);
          }]
        }
      })
      .state('application.reviewApplicants', {
        url: "/reviews/:reviewId/applicants",
        templateUrl: 'views/review/review_applicants.html',
        controller: 'ReviewApplicantsCtrl',
        resolve: {
          review: ['ReviewApplicantsLoad', '$stateParams', function (ReviewApplicantsLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewApplicantsLoad($stateParams);
          }]
        }
      })
      .state('application.selectApplicants', {
        url: "/crowdtesting/:reviewId/applicants",
        templateUrl: 'views/review/review_applicants.html',
        controller: 'ReviewApplicantsCtrl',
        resolve: {
          review: ['ReviewApplicantsLoad', '$stateParams', function (ReviewApplicantsLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewApplicantsLoad($stateParams);
          }]
        }
      })
      .state('application.reviewReports', {
        url: "/reviews/:reviewId/reports",
        templateUrl: 'views/review/review_reports.html',
        controller: 'ReviewReportsCtrl',
        resolve: {
          review: ['ReviewApplicantsLoad', '$stateParams', function (ReviewApplicantsLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewApplicantsLoad($stateParams);
          }]
        }
      })
      .state('application.crowdtestingReports', {
        url: "/crowdtesting/:reviewId/reports",
        templateUrl: 'views/review/review_reports.html',
        controller: 'ReviewReportsCtrl',
        resolve: {
          review: ['ReviewApplicantsLoad', '$stateParams', function (ReviewApplicantsLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewApplicantsLoad($stateParams);
          }]
        }
      })
      .state('application.protected.reviewApplicant', {
        url: '/review/:reviewId/applicant',
        templateUrl: 'views/review/review_application.html',
        controller: 'ReviewapplicationCtrl',
        resolve: {
          review: ['ReviewLoad', '$stateParams', function (ReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewLoad($stateParams);
          }],
          reviewer: ['ProfileReviewerLoad', 'authCheck', function (ProfileReviewerLoad, authCheck) {
            return ProfileReviewerLoad();
          }],
          application: ['ReviewApplicant', '$stateParams', 'authCheck', function (ReviewApplicant, $stateParams, authCheck) {
            return ReviewApplicant.getApplicationPromise($stateParams);
          }]
        }
      })
      .state('application.protected.apply', {
        url: '/crowdtesting/:reviewId/apply',
        templateUrl: 'views/review/review_application.html',
        controller: 'ReviewapplicationCtrl',
        resolve: {
          review: ['ReviewLoad', '$stateParams', function (ReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewLoad($stateParams);
          }],
          reviewer: ['ProfileReviewerLoad', 'authCheck', function (ProfileReviewerLoad, authCheck) {
            return ProfileReviewerLoad();
          }],
          application: ['ReviewApplicant', '$stateParams', 'authCheck', function (ReviewApplicant, $stateParams, authCheck) {
            return ReviewApplicant.getApplicationPromise($stateParams);
          }]
        }
      })
      .state('application.protected.reviewReport', {
        url: '/review/:reviewId/report',
        templateUrl: 'views/review/review_report.html',
        controller: 'ReviewreportCtrl',
        resolve: {
          applicant: ['ApplicantsreviewLoad', 'authCheck', '$stateParams', function (ApplicantsreviewLoad, authCheck, $stateParams) {
            return ApplicantsreviewLoad($stateParams);
          }]
        }
      })
      .state('application.protected.crowdtestingReport', {
        url: '/crowdtesting/:reviewId/report',
        templateUrl: 'views/review/review_report.html',
        controller: 'ReviewreportCtrl',
        resolve: {
          applicant: ['ApplicantsreviewLoad', 'authCheck', '$stateParams', function (ApplicantsreviewLoad, authCheck, $stateParams) {
            return ApplicantsreviewLoad($stateParams);
          }]
        }
      })
      .state('application.report', {
        url: '/reports/:reportId',
        templateUrl: 'views/review/review_report_visual.html',
        controller: 'ReviewReportVisualCtrl',
        resolve: {
          report: ['ReviewReportMoreLoad', '$stateParams', function (ReviewReportMoreLoad, $stateParams) {
            return ReviewReportMoreLoad($stateParams);
          }]
        }
      })
      .state('application.login', {
        url: '/login?error',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        reloadOnSearch: false
      })
      .state('application.linkedinLogin', {
        url: '/linkedinlogin',
        templateUrl: 'views/login.html',
        controller: 'LinkedinLoginCtrl'
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
