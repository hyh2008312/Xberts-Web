'use strict';

angular.module('xbertsApp')
  .controller('ExpertCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$uibModal', 'Paginator',
    'ReviewService', 'Interact', 'expert', 'ApplicationService', 'Sales', 'SystemConstant', 'ShareProductService', 'ShareProduct',
    function ($scope, $rootScope, $location, $state, $stateParams, $uibModal, Paginator,
              ReviewService, Interact, expert, ApplicationService, Sales, SystemConstant, ShareProductService, ShareProduct) {
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.user_id;
      $scope.isExpert = _($scope.expert.roles).contains(SystemConstant.ROLES.DOMAIN_EXPERT);

      $scope.selectedIndex = 0;

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
        if ($rootScope.user.getUserId() != expert.user_id) {
          filter = {is_submit_report: true, review: {status: 'ENDED'}};
        }
        var par = {
          name: 'trials_' + $scope.expert.user_id,
          params: {reviewer_id: $scope.expert.user_id},
          filter: filter,
          fetchFunction: ApplicationService.getApplications
        };
        $scope.reviewApplicantPaginator = new Paginator(par);
      };

      $scope.loadMyCampaings = function () {
        updateUrl();
        if ($scope.campaignPaginator) return;
        var par = {
          name: 'campaigns_' + $scope.expert.user_id,
          params: {owner: $scope.expert.user_id},
          fetchFunction: ReviewService.getList
        };
        $scope.campaignPaginator = new Paginator(par);
      };

      $scope.loadMyBio = function () {
        updateUrl();
      };

      var par = {
        name: 'posts_' + $scope.expert.user_id,
        objClass: ShareProduct,
        params: {owner: $scope.expert.user_id},
        fetchFunction: ShareProductService.getList
      };
      $scope.postsProductPaginator = new Paginator(par);

      $scope.loadMyPosts = function () {
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
              return $scope.expert.user_id;
            }
          }
        });
      };

      $scope.editProfile = function () {
        $state.go('application.protected.editProfile');
      };

      $scope.loadMyReferrals = function () {
        updateUrl();
      };
    }]);
