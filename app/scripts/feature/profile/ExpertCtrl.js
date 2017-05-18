'use strict';

angular.module('xbertsApp')
  .controller('ExpertCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$uibModal', 'Paginator','ReviewService',
    'Interact', 'expert', 'ApplicationService', 'Sales', 'SystemConstant', 'ShareProductService', 'ShareProduct','ExpertService',
    'AskModel','AskService',
    function ($scope, $rootScope, $location, $state, $stateParams, $uibModal, Paginator, ReviewService, Interact, expert,
              ApplicationService, Sales, SystemConstant, ShareProductService, ShareProduct, ExpertService,AskModel,AskService) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;
      $scope.isExpert = _($scope.expert.roles).contains(SystemConstant.ROLES.DOMAIN_EXPERT);

      $scope.selectedIndex = 0;
      $scope.selectedIndex1 = 0;

      var tabIndexToParam = ['profile', 'trials', 'posts', 'referrals', 'campaigns'];

      var updateUrl = function () {
        setTimeout(function () {
          $scope.$apply(function () {
            $location.search('tab', tabIndexToParam[$scope.selectedIndex.toString()]);
          });
        }, 0);
      };

      var updateActiveTabOnSearch = function () {
        var tab = $location.search().tab || 'profile';
        $scope.selectedIndex = parseInt(tabIndexToParam.findIndex(function(x) {
          return x == tab;
        }));
      };

      updateActiveTabOnSearch();

      $scope.$on('$locationChangeSuccess', function () {
        updateActiveTabOnSearch();
      });

      $scope.loadMyTrials = function () {
        updateUrl();
        if ($scope.reviewApplicantPaginator) return;
        var filter = '';
        if ($rootScope.user.getUserId() != expert.userId) {
          filter = {is_submit_report: true};
        }
        var par = {
          name: 'trials_' + $scope.expert.userId,
          params: {reviewer_id: $scope.expert.userId},
          filter: filter,
          fetchFunction: ApplicationService.getApplications
        };
        $scope.reviewApplicantPaginator = new Paginator(par);
      };



      $scope.loadMyCampaings = function () {
        updateUrl();
        if ($scope.campaignPaginator) return;
        var par = {
          name: 'campaigns_' + $scope.expert.userId,
          params: {owner: $scope.expert.userId},
          fetchFunction: ReviewService.getList
        };
        $scope.campaignPaginator = new Paginator(par);
      };

      $scope.loadMyBio = function () {
        updateUrl();
      };

      var par = {
        name: 'posts_' + $scope.expert.userId,
        objClass: ShareProduct,
        params: {
          owner: $scope.expert.userId,
          page_size:12
        },
        fetchFunction: ShareProductService.getList
      };
      $scope.postsProductPaginator = new Paginator(par);

      var parQuestion = {
        name: 'questions_list_' + $scope.expert.userId,
        objClass: AskModel,
        params: {
          owner: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: AskService.getList
      };
      $scope.postsQuestionPaginator = new Paginator(parQuestion);

      var parAnswers = {
        name: 'answers_list_' + $scope.expert.userId,
        objClass: AskModel,
        params: {
          owner: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: AskService.getAnswersList
      };
      $scope.postsAnswerPaginator = new Paginator(parAnswers);

      $scope.loadMyPosts = function () {
        updateUrl();
      };

      $scope.loadMyQuestions = function() {
        updateUrl();
      };

      $scope.loadMyAnswers = function() {
        updateUrl();
      };

      $scope.contactUser = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        var sendMessageModal = $uibModal.open({
          templateUrl: 'views/modal/send-message.html',
          windowClass: 'dialog-vertical-center',
          controller: 'SendMessageCtrl',
          resolve: {
            recipientId: function () {
              return $scope.expert.userId;
            }
          }
        });
      };

      $scope.editProfile = function () {
        $state.go('application.protected.editProfile');
      };

      var par = {
        name: 'myReferrals_' + $scope.expert.userId,
        objClass: ShareProduct,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getInviteList
      };
      $scope.myReferrals = new Paginator(par);

      $scope.loadMyReferrals = function () {
        updateUrl();
      };
    }]);
