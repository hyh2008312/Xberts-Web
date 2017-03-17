'use strict';

angular
  .module('xbertsApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('application.expert', {
        url: '/influencers/:expertId?tab&action',
        params:{
          tab:'profile'
        },
        templateUrl: 'scripts/feature/profile/expert.html',
        controller: 'ExpertCtrl',
        reloadOnSearch: false,
        resolve: {
          expert: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
            return ExpertService.getExpert($stateParams.expertId);
          }]
        }
      })
      .state('application.protected.profile', {
        url: '/profile?action',
        controller: 'UserProfileCtrl'
      })
      .state('application.protected.editProfile', {
        url: '/editprofile',
        templateUrl: 'scripts/feature/profile/edit-profile.html',
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
        templateUrl: 'scripts/feature/profile/setting.html',
        controller: 'SettingCtrl',
        resolve: {
          settingAuthCheck: ['protectedAuthCheck', function (protectedAuthCheck) {
            // no-opt
          }]
        }
      })
  }]);
