'use strict';

angular.module('xbertsApp')
  .controller('ExpertCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$uibModal', '_', 'Paginator',
    'ProjectsNoDetail', 'Interact', 'expert', 'roleRequests', 'Applicantsreview', 'SystemConstant',
    function ($scope, $rootScope, $location, $state, $stateParams, $uibModal, _, Paginator,
              ProjectsNoDetail, Interact, expert, roleRequests, Applicantsreview, SystemConstant) {
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.user_id;
      $scope.pendingExpert = $scope.isCurrentUser && roleRequests.length > 0;
      $scope.isExpert = _($scope.expert.roles).contains(SystemConstant.ROLES.DOMAIN_EXPERT);
      $scope.btnText = 'Send';
      $scope.btnSecret = true;
      $scope.isOutDated = function (time) {
        return Date.now() - new Date(time) > 0;
      };
      $scope.tabs = [
        {title: 'profile', active: true},
        {title: 'products', active: false},
        {title: 'followers', active: false},
        {title: 'followings', active: false},
        {title: 'comments', active: false},
        {title: 'reviews', active: false}
      ];
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info
      $scope.projectsTabActive = false;
      $scope.followingsTabActive = false;
      $scope.commentsTabActive = false;
      $scope.followersTabActive = false;
      $scope.reviewsTabActive = false;
      $scope.select = function (step) {
        $scope.projectsTabActive = false;
        $scope.followingsTabActive = false;
        $scope.commentsTabActive = false;
        $scope.followersTabActive = false;
        $scope.reviewsTabActive = false;
        switch (step) {
          case 'products':
            $scope.projectsTabActive = true;
            var par = {
              name: 'project_' + $scope.expert.user_id,
              params: {account_id: $scope.expert.user_id},
              fetchFunction: function (params) {
                return ProjectsNoDetail.get(params).$promise;
              }
            };
            $scope.projectPaginator = Paginator(par);
            $scope.projectPaginator.clear();
            break;
          case 'followers':
            $scope.followersTabActive = true;
            var par1 = {
              name: 'followers_' + $scope.expert.user_id,
              fetchFunction: function (params) {
                return Interact.Join({interact_id: $scope.expert.interact.id, vote: 'True'}).get(params).$promise;
              }
            };
            $scope.followersPaginator = Paginator(par1);
            $scope.followersPaginator.clear();
            break;
          case 'followings':
            $scope.followingsTabActive = true;
            var par2 = {
              name: 'followings_' + $scope.expert.user_id,
              fetchFunction: function (params) {
                return Interact.Following({
                  joiner_id: $scope.expert.user_id,
                  vote: 'True',
                  interact__type: '0'
                }).get(params).$promise;
              }
            };
            $scope.followingsPaginator = Paginator(par2);
            $scope.followingsPaginator.clear();
            break;
          case 'comments':
            $scope.commentsTabActive = true;
            // TODO: Doesn't seem be used, remove if no issue is seen
            //$scope.$broadcast('feedback', step);
            break;
          case 'reviews':
            $scope.reviewsTabActive = true;
            var par3 = {
              name: 'reviewapplicant_' + $scope.expert.user_id,
              params: {reviewer_id: $scope.expert.user_id},
              fetchFunction: function (params) {
                return Applicantsreview.get(params).$promise;
              }
            };
            $scope.reviewApplicantPaginator = Paginator(par3);
            $scope.reviewApplicantPaginator.clear();
            break;
        }

        // Update query param in URL
        $location.search('tab', step);

        // TODO: Doesn't seem be used, remove if no issue is seen
        //$scope.$broadcast('expert', step);
      };
      var search = $location.search();
      var tab = search.tab || 'profile';
      if (search.tab) {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].active = $scope.tabs[i].title === search.tab;
        }
      }

      var sendMessage = function () {
        if (!$rootScope.user.authRequired()) {
          return;
        }

        var sendMessageModal = $uibModal.open({
          templateUrl: 'views/modal/send-message.html',
          windowClass: 'dialog-vertical-center',
          controller: 'SendMessageCtrl',
          resolve: {
            recipientId: function() {
              return $scope.expert.user_id;
            }
          }
        });
      };

      $scope.contactUser = function () {
        $state.go('application.expert', {expertId: $scope.expert.user_id, action: 'contact'});

        sendMessage();
      };

      if ($stateParams.action === 'applyExpert' && $rootScope.user.authRequired() && $scope.isCurrentUser && !$scope.isExpert && !$scope.pendingExpert) {
        if (!$rootScope.user.isLinkedinConnected()) {
          $uibModal.open({
            templateUrl: 'views/profile/linkedin-connect-modal.html',
            controller: 'LinkedinConnectCtrl',
            scope: $scope
          });
        } else {
          var applyExpertModal = $uibModal.open({
            templateUrl: 'views/profile/apply-expert-modal.html',
            controller: 'ApplyExpertCtrl',
            scope: $scope,
            resolve: {
              stages: ['SystemData', function (SystemData) {
                return SystemData.getStagesPromise();
              }]
            }
          });

          applyExpertModal.result
            .then(function () {
              $state.go('application.protected.profile', {}, {location: "replace"});
            })
            .catch(function () {
              $location.search('action', null);
            });
        }
      } else if ($stateParams.action === 'contact' && $rootScope.user.authRequired() &&
        $rootScope.user.getUserId() !== $scope.expert.user_id) {
        sendMessage();
      }

      $scope.editProfile = function () {
        $state.go('application.protected.editProfile');
      };
    }]);
