'use strict';

angular.module('xbertsApp')
  .controller('ExpertCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$uibModal', '_', 'Paginator',
    'ReviewService', 'Interact', 'expert', 'ApplicationService', 'Sales', 'SystemConstant',
    function ($scope, $rootScope, $location, $state, $stateParams, $uibModal, _, Paginator,
              ReviewService, Interact, expert, ApplicationService, Sales, SystemConstant) {
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.user_id;
      $scope.isExpert = _($scope.expert.roles).contains(SystemConstant.ROLES.DOMAIN_EXPERT);

      var tabIndexToParam = {
        '0': 'profile',
        '1': 'campaigns',
        '2': 'trials',
        '3': 'orders'
      };
      var tabParamToIndex = _(tabIndexToParam).invert();

      $scope.select = function () {
        // Active tab index is only accurate after timeout
        setTimeout(function () {
          $scope.$apply(function () {
            switch ($scope.tabActive) {
              case 1:
                var par = {
                  name: 'campaigns_' + $scope.expert.user_id,
                  params: {owner: $scope.expert.user_id},
                  fetchFunction: function (params) {
                    return ReviewService.getList(params);
                  }
                };
                $scope.campaignPaginator = new Paginator(par);
                break;
              case 2:
                var filter = '';
                if ($rootScope.user.getUserId() != expert.user_id) {
                  filter = {is_submit_report: true, review: {status: 'ENDED'}};
                }
                var par3 = {
                  name: 'trials_' + $scope.expert.user_id,
                  params: {reviewer_id: $scope.expert.user_id},
                  filter: filter,
                  fetchFunction: function (params) {
                    return ApplicationService.getApplicationsWithReview(params);
                  }
                };
                $scope.reviewApplicantPaginator = new Paginator(par3);
                break;
              case 3:
                var par4 = {
                  name: 'orders_' + $scope.expert.user_id,
                  fetchFunction: function (params) {
                    return Sales.getList(params);
                  }
                };
                $scope.ordersPaginator = new Paginator(par4);
                break;
              default:
                break;
            }

            $location.search('tab', tabIndexToParam[$scope.tabActive.toString()]);
          });
        }, 0);
      };

      var updateActiveTabOnSearch = function () {
        var tab = $location.search().tab || 'profile';
        $scope.tabActive = parseInt(tabParamToIndex[tab]);
      };

      updateActiveTabOnSearch();

      $scope.$on('$locationChangeSuccess', function () {
        updateActiveTabOnSearch();
      });

      var sendMessage = function () {
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

      $scope.contactUser = function () {
        $state.go('application.expert', {expertId: $scope.expert.user_id, action: 'contact'});

        sendMessage();
      };

      var inviteFriend = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        var inviteFriendModal = $uibModal.open({
          templateUrl: 'views/modal/invite-friend.html',
          windowClass: 'dialog-vertical-center',
          controller: 'InviteFriendCtrl'
        });
      };

      if ($stateParams.action === 'contact' && $rootScope.user.authRequired() &&
        $rootScope.user.getUserId() !== $scope.expert.user_id) {
        sendMessage();
      } else if ($stateParams.action === 'invite' && $rootScope.user.authRequired() &&
        $rootScope.user.getUserId() === $scope.expert.user_id) {
        inviteFriend();
      }

      $scope.editProfile = function () {
        $state.go('application.protected.editProfile');
      };
    }]);
