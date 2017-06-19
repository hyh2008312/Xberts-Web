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
          }],
          achievement: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
            return ExpertService.getAchievement($stateParams.expertId);
          }]
        }
      })
      .state('application.protected.profile', {
        url: '/profile?action',
        controller: 'UserProfileCtrl'
      })
      .state('application.protected.editProfile', {
        url: '/editprofile?tab&action',
        params:{
          tab:'profile'
        },
        templateUrl: 'scripts/feature/profile/edit-profile.html',
        controller: 'EditProfileCtrl',
        reloadOnSearch: false,
        resolve: {
          userProfile: ['protectedAuthCheck', 'UserProfileResolver', function (protectedAuthCheck, UserProfileResolver) {
            return UserProfileResolver.resolver();
          }],
          stages: ['SystemData', function (SystemData) {
            return SystemData.getStagesPromise();
          }]
        }
      })
      .state('application.protected.invite', {
        url: '/inviteFriends',
        templateUrl: 'scripts/feature/profile/InviteFriends.html',
        controller: 'InviteFriendsCtrl'
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
      .state('application.protected.editPost', {
        url: '/editPost/:productId',
        templateUrl: 'scripts/feature/profile/EditPost.html',
        controller: 'EditPostCtrl',
        resolve: {
          editPost: ['ShareProductService', '$stateParams', function (ShareProductService, $stateParams) {
            return ShareProductService.getDetail($stateParams.productId);
          }],
          category: ['ShareProductService', function (ShareProductService) {
            return ShareProductService.getCategoryList();
          }]
        }
      })
      .state('application.protected.editQuestion', {
        url: '/editQuestion/:questionId',
        templateUrl: 'scripts/feature/profile/myQuestionsList/editMyQuestions.html',
        controller: 'EditMyQuestionsCtrl',
        resolve: {
          editMyQuestion: ['AskService', '$stateParams', function (AskService, $stateParams) {
            return AskService.getQuestionsDetail($stateParams.questionId);
          }]
        }
      })
      .state('application.protected.editAnswer', {
        url: '/answer/:answerId/edit?source&questionId',
        templateUrl: 'scripts/feature/profile/myAnswersList/editMyAnswers.html',
        controller: 'EditMyAnswersCtrl',
        resolve: {
          editMyAnswer: ['AskService', '$stateParams', function(AskService, $stateParams) {
            return AskService.getAnswer({id:$stateParams.answerId});
          }]
        }
      })
      .state('application.protected.biography', {
        url: '/profile/biography?expertId',
        templateUrl: 'scripts/feature/profile/myBiography/myBiographyCtrl.html',
        controller: 'MyBiographyCtrl',
        reloadOnSearch: false,
        resolve: {
          expert: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
            return ExpertService.getExpert($stateParams.expertId);
          }]
        }
      })
      .state('application.protected.trials', {
        url: '/profile/trials?expertId',
        templateUrl: 'scripts/feature/profile/myTrials/myTrialsCtrl.html',
        controller: 'MyTrialsCtrl',
        reloadOnSearch: false,
        resolve: {
          expert: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
            return ExpertService.getExpert($stateParams.expertId);
          }]
        }
      })
      .state('application.protected.posts', {
        url: '/profile/posts?expertId',
        templateUrl: 'scripts/feature/profile/myPostList/MyPostCtrl.html',
        controller: 'MyPostsCtrl',
        reloadOnSearch: false,
        resolve: {
          expert: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
            return ExpertService.getExpert($stateParams.expertId);
          }]
        }
      })
      .state('application.protected.referrals', {
        url: '/profile/referrals?expertId',
        templateUrl: 'scripts/feature/profile/myReferrals/myReferralsCtrl.html',
        controller: 'MyReferralsCtrl',
        reloadOnSearch: false,
        resolve: {
          expert: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
            return ExpertService.getExpert($stateParams.expertId);
          }]
        }
      })
      .state('application.protected.follow', {
        url: '/profile/follow?expertId',
        templateUrl: 'scripts/feature/profile/myFollow/myFollow.html',
        controller: 'MyFollowCtrl',
        reloadOnSearch: false,
        resolve: {
          expert: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
            return ExpertService.getExpert($stateParams.expertId);
          }]
        }
      });
  }]);
