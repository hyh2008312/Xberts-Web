'use strict';

angular
  .module('xbertsApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
            return new Paginator(par).load();
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
              return MessageResolver.getThreads($stateParams);
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
      .state('application.protected.message.notification', {
        url: '/message/notification',
        templateUrl: 'views/message/notification.html',
        controller: 'MessageNotificationCtrl',
        resolve: {
          messagePaginator: ['Paginator', 'MessageResolver', 'protectedAuthCheck',
            function (Paginator, MessageResolver, protectedAuthCheck) {
              return new Paginator({
                name: 'message',
                fetchFunction: MessageResolver.getNotifications
              }).load();
            }]
        }
      })
      .state('application.protected.message.notificationDetail', {
        url: '/message/notification/{messageId:[0-9]+}',
        templateUrl: 'views/message/notification-detail.html',
        controller: 'MessageNotificationDetailCtrl',
        resolve: {
          message: ['$stateParams', 'MessageResolver', 'protectedAuthCheck',
            function ($stateParams, MessageResolver, protectedAuthCheck) {
              return MessageResolver.viewNotification($stateParams);
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
      .state('application.terms', {
        url: "/terms",
        templateUrl: 'views/terms.html'
      })
      .state('application.privacy', {
        url: "/privacy",
        templateUrl: 'views/privacy.html'
      });
  }]);
