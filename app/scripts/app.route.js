'use strict';

angular
  .module('xbertsApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/crowdtesting/:reviewId', '/campaigns/:reviewId');


    $urlRouterProvider.otherwise("/");
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
          protectedAuthCheck: ['authCheck', 'UserResolver', function (authCheck, UserResolver) {
            return UserResolver.protectedResolver();
          }]
        }
      })
      .state('application.about', {
        url: "/about",
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('application.projects', {
        url: '/productlisting',
        templateUrl: 'views/project/projects.html',
        controller: 'ProjectsCtrl',
        resolve: {
          projectTypes: ['SystemData', function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
          projectPaginator: ['Paginator', 'ProjectsNoDetail', function (Paginator, ProjectsNoDetail) {
            var par = {
              name: 'project',
              minSize: 2,
              fetchFunction: function (params) {
                return ProjectsNoDetail.get(params).$promise;
              }
            };
            return Paginator(par).load();
          }]
        }
      })
      .state('application.protected.projectEdit', {
        url: "/products/{projectId:[0-9]*}/edit",
        templateUrl: 'views/project/launchproject.html',
        controller: 'LaunchprojectCtrl',
        controllerAs: 'launchProject',
        abstract: true,
        resolve: {
          projectTypes: ['protectedAuthCheck', 'SystemData', function (protectedAuthCheck, SystemData) {
            return SystemData.getProjectTypesPromise();
          }]
        }
      })
      .state('application.protected.projectLaunch', {
        url: "/products/launch",
        templateUrl: 'views/project/launchproject.html',
        controller: 'LaunchprojectCtrl',
        controllerAs: 'launchProject',
        resolve: {
          projectTypes: ['protectedAuthCheck', 'SystemData', function (protectedAuthCheck, SystemData) {
            return SystemData.getProjectTypesPromise();
          }]
        }
      })
      .state('application.protected.projectLaunch.basic', {
        url: "/BasicInfo",
        templateUrl: 'views/project/project_basic.html'
      })
      .state('application.protected.projectLaunch.detail', {
        url: "/ProductDetail",
        templateUrl: 'views/project/project_detail.html',
        controller: 'LaunchProjectDetailCtrl',
        controllerAs: 'launchProjectDetail'
      })
      .state('application.protected.projectEdit.basic', {
        url: "/BasicInfo",
        templateUrl: 'views/project/project_basic.html'
      })
      .state('application.protected.projectEdit.detail', {
        url: "/ProductDetail",
        templateUrl: 'views/project/project_detail.html',
        controller: 'LaunchProjectDetailCtrl',
        controllerAs: 'launchProjectDetail'
      })
      .state('application.project', {
        url: "/products/:projectId?tab",
        templateUrl: 'views/project/project.html',
        controller: 'ProjectCtrl',
        resolve: {
          projectTypes: ['SystemData', function (SystemData) {
            return SystemData.getProjectTypesPromise();
          }],
          project: ['ProjectLoad', '$stateParams', function (ProjectLoad, $stateParams) {
            return ProjectLoad($stateParams);
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
          }]
        }
      })
      .state('application.protected.profile', {
        url: '/profile?action',
        controller: 'UserProfileCtrl'
      })
      .state('application.protected.editProfile', {
        url: '/editprofile',
        templateUrl: 'views/profile/edit-profile.html',
        controller: 'EditProfileCtrl',
        resolve: {
          userProfile: ['protectedAuthCheck', 'UserProfileResolver', function (protectedAuthCheck, UserProfileResolver) {
            return UserProfileResolver.resolver();
          }],
          stages: ['SystemData', function (SystemData) {
            return SystemData.getStagesPromise();
          }]
        }
      })
      .state('application.protected.confirmShipAddress', {
        url: '/crowdtesting/:reviewId/confirmaddress',
        templateUrl: 'views/review/review_applicant_shipping_address.html',
        controller: 'ShipAddressCtrl',
        resolve: {
          reviewer: ['ProfileReviewerLoad', 'protectedAuthCheck', function (ProfileReviewerLoad, protectedAuthCheck) {
            return ProfileReviewerLoad();
          }],
          review: ['ReviewLoad', '$stateParams', function (ReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewLoad($stateParams);
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
      .state('application.protected.apply', {
        url: '/crowdtesting/:reviewId/apply',
        templateUrl: 'views/review/review_application.html',
        controller: 'ReviewapplicationCtrl',
        resolve: {
          review: ['ReviewLoad', '$stateParams', function (ReviewLoad, $stateParams) {
            var reviewId = $stateParams.reviewId || null;
            return reviewId === null ? {} : ReviewLoad($stateParams);
          }],
          reviewer: ['ProfileReviewerLoad', 'protectedAuthCheck', function (ProfileReviewerLoad, protectedAuthCheck) {
            return ProfileReviewerLoad();
          }],
          application: ['ReviewApplicant', '$stateParams', 'protectedAuthCheck', function (ReviewApplicant, $stateParams, protectedAuthCheck) {
            return ReviewApplicant.getApplicationPromise($stateParams);
          }]
        }
      })
      .state('application.protected.crowdtestingReport', {
        url: '/crowdtesting/:reviewId/report',
        templateUrl: 'views/review/review_report.html',
        controller: 'ReviewreportCtrl',
        resolve: {
          applicant: ['ApplicantsreviewLoad', 'protectedAuthCheck', '$stateParams',
            function (ApplicantsreviewLoad, protectedAuthCheck, $stateParams) {
              return ApplicantsreviewLoad($stateParams);
            }]
        }
      })
      .state('application.report', {
        url: '/crowdtesting/{reviewId:[0-9]*}/reports/{reportId:[0-9]*}',
        templateUrl: 'views/review/review-report.html',
        controller: 'ReviewReportVisualCtrl',
        resolve: {
          report: ['ReviewReport', '$stateParams', function (ReviewReport, $stateParams) {
            return ReviewReport.get({reviewId: $stateParams.reviewId, id: $stateParams.reportId}).$promise;
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
      })
      .state('application.protected.message', {
        abstract: true,
        templateUrl: 'views/message/message.html',
        controller: 'MessageCtrl'
      })
      .state('application.protected.message.inbox', {
        url: '/message/inbox?direction&category',
        templateUrl: 'views/message/inbox.html',
        controller: 'MessageInboxCtrl',
        resolve: {
          messages: ['$stateParams', 'MessageResolver', 'protectedAuthCheck',
            function ($stateParams, MessageResolver, protectedAuthCheck) {
              return MessageResolver.getMessages($stateParams);
            }]
        }
      })
      .state('application.protected.message.thread', {
        url: '/message/thread/{threadId:[0-9]+}',
        templateUrl: 'views/message/thread.html',
        controller: 'MessageThreadCtrl',
        resolve: {
          messages: ['$stateParams', 'MessageResolver', 'protectedAuthCheck',
            function ($stateParams, MessageResolver, protectedAuthCheck) {
              return MessageResolver.viewThread($stateParams);
            }]
        }
      })
      .state('application.error', {
        url: '/error',
        templateUrl: 'views/error.html',
        controller: function ($rootScope) {
          $rootScope.pageSettings.setBackgroundColor('');
        }
      })
      .state('application.campaign', {
        url: "/campaigns/{reviewId:[0-9]+}?action&tab",
        templateUrl: 'views/review/review-detail.html',
        controller: 'ReviewDetailCtrl',
        reloadOnSearch: false,
        resolve: {
          review: ['$stateParams', 'ReviewService', function ($stateParams, ReviewService) {
            return ReviewService.getDetail($stateParams.reviewId);
          }],
          reportPaginator: ['Paginator', 'ReviewReport', '$stateParams', function (Paginator, ReviewReport, $stateParams) {
            var par = {
              name: 'report_list_' + $stateParams.reviewId,
              params: {reviewId: $stateParams.reviewId, is_approved: 'APPROVED'},
              fetchFunction: function (params) {
                return ReviewReport.get(params).$promise;
              }
            };
            return Paginator(par).load();
          }]
        }
      })
      .state('application.main', {
        url: "/",
        templateUrl: 'views/review/review-list.html',
        controller: 'ReviewListCtrl',
        reloadOnSearch: false,
        resolve: {
          releaseReviewPaginator: ['Paginator', 'ReviewService', function (Paginator, ReviewService) {
            var par = {
              name: 'callingReview',
              params: {
                stage: 'READY_FOR_SALE',
                status: 'APPLICATION',
                page_size: 9
              },
              fetchFunction: function (params) {
                return ReviewService.getList(params);
              }
            };
            return Paginator(par).load();
          }],
          betaReviewPaginator: ['Paginator', 'ReviewService', function (Paginator, ReviewService) {
            var par = {
              name: 'progressingReview',
              params: {
                stage: 'BETA',
                status: 'APPLICATION',
                page_size: 12
              },
              fetchFunction: function (params) {
                return ReviewService.getList(params);
              }
            };
            return Paginator(par).load();
          }],
          completedReviewPaginator: ['Paginator', 'ReviewService', function (Paginator, ReviewService) {
            var par = {
              name: 'completedReview',
              params: {
                status: ['ENDED'],
                ordering: '-application_end_date',
                page_size: 6
              },
              fetchFunction: function (params) {
                return ReviewService.getList(params);
              }
            };
            return Paginator(par).load();
          }]
        }
      })
      .state('application.terms', {
        url: "/terms",
        templateUrl: 'views/terms.html'
      })
      .state('application.privacy', {
        url: "/privacy",
        templateUrl: 'views/privacy.html'
      });
  }]);
